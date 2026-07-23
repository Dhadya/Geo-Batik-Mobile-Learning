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
      userId,
      module,
      tab: t.value,
      unlocked: i === 0,
      completed: false,
    }));
    await db.insert(tabProgress).values(seedRows);
    return seedRows;
  }

  return rows.map((r) => ({
    tab: r.tab,
    unlocked: r.unlocked,
    completed: r.completed,
  }));
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
