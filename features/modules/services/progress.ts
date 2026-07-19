import { getDb } from "@/lib/db";
import { tabProgress, sectionProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { appError } from "@/lib/api/errors";
import { MODULE_TABS } from "@/features/modules/data";
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

  const sections = await db.query.sectionProgress.findMany({
    where: and(
      eq(sectionProgress.userId, userId),
      eq(sectionProgress.module, module),
      eq(sectionProgress.tab, completedTab),
    ),
    columns: { status: true },
  });

  const allDone =
    sections.length === 4 &&
    sections.every((s) => s.status === "correct" || s.status === "wrong_attempt2");

  if (!allDone) {
    throw appError("TAB_LOCKED");
  }

  const tabs = MODULE_TABS[module] ?? [];
  const currentIndex = tabs.findIndex((t) => t.value === completedTab);
  const nextTab =
    currentIndex >= 0 && currentIndex < tabs.length - 1
      ? tabs[currentIndex + 1].value
      : null;

  await db
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
    await db
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

  const updated = await getTabProgress(userId, module);
  return { unlockedTab: nextTab, progress: updated };
}
