import { getDb } from "@/lib/db";
import { tabProgress, sectionProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { appError } from "@/lib/api/errors";
import { getExpectedSectionCount, MODULE_TABS } from "@/features/modules/data";
import type { ModuleSlug } from "@/features/modules/types";

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
      columns: { status: true },
    });

    const expectedCount = getExpectedSectionCount(module, tabValue);
    const allDone =
      sections.length >= expectedCount &&
      sections.every((s) => s.status === "correct" || s.status === "wrong_attempt2");

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
      columns: { status: true },
    });

    const expectedCount = getExpectedSectionCount(module, completedTab);
    const allDone =
      sections.length >= expectedCount &&
      sections.every((s) => s.status === "correct" || s.status === "wrong_attempt2");

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
