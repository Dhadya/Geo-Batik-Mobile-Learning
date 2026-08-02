import { getDb } from "@/lib/db";
import { tabProgress, sectionProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { appError } from "@/lib/api/errors";
import { getSectionsForTab, MODULE_TABS } from "@/features/modules/data";
import type { SectionClaim } from "@/lib/schemas";
import type { ModuleSlug } from "@/features/modules/types";
import type { SectionKey } from "@/features/modules/data";

const TERMINAL_STATUSES = new Set(["correct", "wrong_attempt2"]);

/** Maps a DB section_type value back to its SectionKey (cek-pemahaman → cekPemahaman). */
function dbTypeToSectionKey(dbType: string): SectionKey {
  return dbType === "cek-pemahaman" ? "cekPemahaman" : (dbType as SectionKey);
}

/** Returns the student's tab-level progress for a module, seeding initial locked/unlocked state if none exists yet. */
export async function getTabProgress(userId: string, module: ModuleSlug) {
  const db = getDb();

  const rows = await db.query.tabProgress.findMany({
    where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
  });

  if (rows.length === 0) {
    const tabs = MODULE_TABS[module] ?? [];
    const seedRows = tabs.map((t, i) => ({
      id: crypto.randomUUID(),
      userId,
      module,
      tab: t.value,
      unlocked: i === 0,
      completed: false,
      updatedAt: new Date(),
    }));
    await db.insert(tabProgress).values(seedRows).onConflictDoNothing();
    return seedRows.map((r) => ({ tab: r.tab, unlocked: r.unlocked, completed: r.completed }));
  }

  // Auto-unlock safety: check each incomplete tab (except last) for terminal sections and unlock next
  await autoUnlockCompletedTabs(userId, module, rows);

  // Re-fetch after potential updates
  const updatedRows = await db.query.tabProgress.findMany({
    where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
  });

  return updatedRows.map((r) => ({
    tab: r.tab,
    unlocked: r.unlocked,
    completed: r.completed,
  }));
}

/**
 * Checks each incomplete tab (except the last) to see if all its sections are terminal.
 * If so, marks the tab as completed and unlocks the next one.
 * This is a safety net for when the client-side triggerTabUnlockIfComplete fails to fire.
 */
async function autoUnlockCompletedTabs(
  userId: string,
  module: ModuleSlug,
  currentRows: { tab: string; completed: boolean }[],
) {
  const db = getDb();
  const tabs = MODULE_TABS[module] ?? [];

  for (let i = 0; i < tabs.length; i++) {
    const tabValue = tabs[i].value;
    const row = currentRows.find((r) => r.tab === tabValue);
    if (!row || row.completed) continue;

    const sections = await db.query.sectionProgress.findMany({
      where: and(
        eq(sectionProgress.userId, userId),
        eq(sectionProgress.module, module),
        eq(sectionProgress.tab, tabValue),
      ),
      columns: { sectionType: true, status: true },
    });

    const expectedKeys = getSectionsForTab(module, tabValue);
    const allDone =
      expectedKeys.length > 0 &&
      expectedKeys.every((key) => {
        const row = sections.find((s) => dbTypeToSectionKey(s.sectionType) === key);
        return !!row && TERMINAL_STATUSES.has(row.status);
      });

    if (!allDone) continue;

    await db.transaction(async (tx) => {
      await tx
        .update(tabProgress)
        .set({ completed: true, updatedAt: new Date() })
        .where(
          and(
            eq(tabProgress.userId, userId),
            eq(tabProgress.module, module),
            eq(tabProgress.tab, tabValue),
          ),
        );

      const nextTab = tabs[i + 1]?.value;
      if (nextTab) {
        await tx
          .update(tabProgress)
          .set({ unlocked: true, updatedAt: new Date() })
          .where(
            and(
              eq(tabProgress.userId, userId),
              eq(tabProgress.module, module),
              eq(tabProgress.tab, nextTab),
            ),
          );
      }
    });
  }
}

export async function unlockNextTab(userId: string, module: ModuleSlug, completedTab: string) {
  const db = getDb();

  const tabs = MODULE_TABS[module] ?? [];
  const currentIndex = tabs.findIndex((t) => t.value === completedTab);
  const nextTab =
    currentIndex >= 0 && currentIndex < tabs.length - 1
      ? tabs[currentIndex + 1].value
      : null;

  // Everything inside one transaction to prevent TOCTOU race
  const updated = await db.transaction(async (tx) => {
    const sections = await tx.query.sectionProgress.findMany({
      where: and(
        eq(sectionProgress.userId, userId),
        eq(sectionProgress.module, module),
        eq(sectionProgress.tab, completedTab),
      ),
      columns: { sectionType: true, status: true },
    });

    const expectedKeys = getSectionsForTab(module, completedTab);
    const allDone =
      expectedKeys.length > 0 &&
      expectedKeys.every((key) => {
        const row = sections.find((s) => dbTypeToSectionKey(s.sectionType) === key);
        return !!row && TERMINAL_STATUSES.has(row.status);
      });

    if (!allDone) {
      throw appError("TAB_LOCKED");
    }

    const currentRow = await tx.query.tabProgress.findFirst({
      where: and(
        eq(tabProgress.userId, userId),
        eq(tabProgress.module, module),
        eq(tabProgress.tab, completedTab),
      ),
      columns: { completed: true },
    });

    if (currentRow?.completed) {
      const progress = await tx.query.tabProgress.findMany({
        where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
      });
      return { unlockedTab: nextTab, progress: progress.map((r) => ({ tab: r.tab, unlocked: r.unlocked, completed: r.completed })) };
    }

    await tx
      .update(tabProgress)
      .set({ completed: true, updatedAt: new Date() })
      .where(
        and(
          eq(tabProgress.userId, userId),
          eq(tabProgress.module, module),
          eq(tabProgress.tab, completedTab),
        ),
      );

    if (nextTab) {
      await tx
        .update(tabProgress)
        .set({ unlocked: true, updatedAt: new Date() })
        .where(
          and(
            eq(tabProgress.userId, userId),
            eq(tabProgress.module, module),
            eq(tabProgress.tab, nextTab),
          ),
        );
    }

    const progress = await tx.query.tabProgress.findMany({
      where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
    });
    return { unlockedTab: nextTab, progress: progress.map((r) => ({ tab: r.tab, unlocked: r.unlocked, completed: r.completed })) };
  });

  return updated;
}

/**
 * Reconciles missing/non-terminal section rows from the client's terminal claims, then unlocks the next tab.
 * Self-heals the case where section submissions failed to persist (client store terminal but DB rows absent).
 */
export async function reconcileAndUnlockNextTab(
  userId: string,
  module: ModuleSlug,
  completedTab: string,
  claims: SectionClaim[],
) {
  const db = getDb();

  const tabs = MODULE_TABS[module] ?? [];
  const currentIndex = tabs.findIndex((t) => t.value === completedTab);
  const nextTab =
    currentIndex >= 0 && currentIndex < tabs.length - 1
      ? tabs[currentIndex + 1].value
      : null;

  const expectedKeys = getSectionsForTab(module, completedTab);

  const updated = await db.transaction(async (tx) => {
    // 1) Upsert each claimed terminal section so the DB matches the client's evidence
    for (const claim of claims) {
      if (!TERMINAL_STATUSES.has(claim.status)) continue;

      const existing = await tx.query.sectionProgress.findFirst({
        where: and(
          eq(sectionProgress.userId, userId),
          eq(sectionProgress.module, module),
          eq(sectionProgress.tab, completedTab),
          eq(sectionProgress.sectionType, claim.sectionType),
        ),
        columns: { id: true, status: true },
      });

      if (existing && TERMINAL_STATUSES.has(existing.status)) continue;

      const attemptField = claim.attempt === 2 ? "attempt2" : "attempt1";
      const answerStr = claim.answer ? JSON.stringify(claim.answer) : null;
      const base = {
        userId,
        module,
        tab: completedTab,
        sectionType: claim.sectionType,
        status: claim.status,
        completedAt: new Date(),
      };

      if (existing) {
        await tx
          .update(sectionProgress)
          .set({
            ...base,
            [`${attemptField}Answer`]: answerStr,
            [`${attemptField}Score`]: claim.score ?? null,
          })
          .where(eq(sectionProgress.id, existing.id));
      } else {
        await tx
          .insert(sectionProgress)
          .values({
            id: crypto.randomUUID(),
            ...base,
            [`${attemptField}Answer`]: answerStr,
            [`${attemptField}Score`]: claim.score ?? null,
          })
          .onConflictDoNothing();
      }
    }

    // 2) Validate against the expected section set only (stale extra rows are ignored)
    const sections = await tx.query.sectionProgress.findMany({
      where: and(
        eq(sectionProgress.userId, userId),
        eq(sectionProgress.module, module),
        eq(sectionProgress.tab, completedTab),
      ),
      columns: { sectionType: true, status: true },
    });

    const allDone =
      expectedKeys.length > 0 &&
      expectedKeys.every((key) => {
        const row = sections.find((s) => dbTypeToSectionKey(s.sectionType) === key);
        return !!row && TERMINAL_STATUSES.has(row.status);
      });

    if (!allDone) {
      throw appError("TAB_LOCKED");
    }

    // 3) Mark the completed tab + unlock the next one (idempotent)
    const currentRow = await tx.query.tabProgress.findFirst({
      where: and(
        eq(tabProgress.userId, userId),
        eq(tabProgress.module, module),
        eq(tabProgress.tab, completedTab),
      ),
      columns: { completed: true },
    });

    if (currentRow?.completed) {
      const progress = await tx.query.tabProgress.findMany({
        where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
      });
      return { unlockedTab: nextTab, progress: progress.map((r) => ({ tab: r.tab, unlocked: r.unlocked, completed: r.completed })) };
    }

    await tx
      .update(tabProgress)
      .set({ completed: true, updatedAt: new Date() })
      .where(
        and(
          eq(tabProgress.userId, userId),
          eq(tabProgress.module, module),
          eq(tabProgress.tab, completedTab),
        ),
      );

    if (nextTab) {
      await tx
        .update(tabProgress)
        .set({ unlocked: true, updatedAt: new Date() })
        .where(
          and(
            eq(tabProgress.userId, userId),
            eq(tabProgress.module, module),
            eq(tabProgress.tab, nextTab),
          ),
        );
    }

    const progress = await tx.query.tabProgress.findMany({
      where: and(eq(tabProgress.userId, userId), eq(tabProgress.module, module)),
    });
    return { unlockedTab: nextTab, progress: progress.map((r) => ({ tab: r.tab, unlocked: r.unlocked, completed: r.completed })) };
  });

  return updated;
}
