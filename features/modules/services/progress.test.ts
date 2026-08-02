import { describe, it, expect, beforeEach, vi } from "vitest"
import { MODULE_TABS } from "@/features/modules/data"

const USER = "test-user-1"

// Hoisted mutable holder so the mocked getDb() can return a fresh fake per test.
const holder = vi.hoisted(() => ({ db: undefined as unknown }))

vi.mock("@/lib/db", () => ({
  getDb: () => holder.db,
}))

vi.mock("drizzle-orm", () => ({
  eq: (col: { name: string }, value: unknown) => ({ op: "eq", col: col.name, value }),
  and: (...clauses: unknown[]) => ({ op: "and", clauses }),
}))

vi.mock("@/drizzle/schema", () => {
  const col = (name: string) => ({ name })
  return {
    tabProgress: {
      name: "tab_progress",
      id: col("id"),
      userId: col("userId"),
      module: col("module"),
      tab: col("tab"),
      unlocked: col("unlocked"),
      completed: col("completed"),
      updatedAt: col("updatedAt"),
    },
    sectionProgress: {
      name: "section_progress",
      id: col("id"),
      userId: col("userId"),
      module: col("module"),
      tab: col("tab"),
      sectionType: col("sectionType"),
      status: col("status"),
      attempt1Answer: col("attempt1Answer"),
      attempt2Answer: col("attempt2Answer"),
      attempt1Score: col("attempt1Score"),
      attempt2Score: col("attempt2Score"),
      completedAt: col("completedAt"),
    },
  }
})

vi.mock("@/lib/api/errors", () => ({
  appError: (code: string) => {
    const e = new Error(code) as Error & { code: string }
    e.code = code
    return e
  },
}))

// ── In-memory drizzle-like fake DB ─────────────────────────────────────────

function matches(row: Record<string, unknown>, pred: unknown): boolean {
  if (!pred) return true
  const p = pred as { op: string; col?: string; value?: unknown; clauses?: unknown[] }
  if (p.op === "eq") return row[p.col!] === p.value
  if (p.op === "and") return p.clauses!.every((c) => matches(row, c))
  return true
}

function createFakeDb() {
  const tables: Record<string, Record<string, unknown>[]> = {
    tab_progress: [],
    section_progress: [],
  }
  const filter = (rows: Record<string, unknown>[], where: unknown) =>
    where ? rows.filter((r) => matches(r, where)) : rows

  const db = {
    tables,
    query: {
      tabProgress: {
        findMany: async ({ where }: { where?: unknown } = {}) => filter(tables.tab_progress, where),
        findFirst: async ({ where }: { where?: unknown } = {}) =>
          filter(tables.tab_progress, where)[0] ?? undefined,
      },
      sectionProgress: {
        findMany: async ({ where }: { where?: unknown } = {}) => filter(tables.section_progress, where),
        findFirst: async ({ where }: { where?: unknown } = {}) =>
          filter(tables.section_progress, where)[0] ?? undefined,
      },
    },
    insert(table: { name: string }) {
      const name = table.name
      return {
        values(rows: unknown) {
          const arr = (Array.isArray(rows) ? rows : [rows]) as Record<string, unknown>[]
          return {
            onConflictDoNothing: async () => {
              for (const r of arr) tables[name].push({ ...r })
            },
          }
        },
      }
    },
    update(table: { name: string }) {
      const name = table.name
      return {
        set(patch: Record<string, unknown>) {
          return {
            where: async (where: unknown) => {
              for (const row of tables[name]) {
                if (matches(row, where)) Object.assign(row, patch)
              }
            },
          }
        },
      }
    },
    transaction: async (cb: (tx: unknown) => Promise<unknown>) => cb(db),
  }
  return db
}

// ── Fixture builders ───────────────────────────────────────────────────────

/** The fake db created for the currently-running test. */
let currentDb: ReturnType<typeof createFakeDb>

function seedTabs(module: "translasi" | "refleksi") {
  const tabs = MODULE_TABS[module]
  const rows = tabs!.map((t, i) => ({
    id: crypto.randomUUID(),
    userId: USER,
    module,
    tab: t.value,
    unlocked: i === 0,
    completed: false,
    updatedAt: new Date(),
  }))
  for (const r of rows) currentDb.tables.tab_progress.push(r)
  return rows
}

function seedSection(tab: string, sectionType: string, status: string, module = "translasi") {
  const row = {
    id: crypto.randomUUID(),
    userId: USER,
    module,
    tab,
    sectionType,
    status,
    completedAt: new Date(),
  }
  currentDb.tables.section_progress.push(row)
  return row
}

const terminalClaims: SectionClaim[] = [
  { sectionType: "pengamatan", status: "correct", score: 100, attempt: 1, answer: { a: "1" } },
  { sectionType: "percobaan", status: "correct", score: 100, attempt: 1, answer: { a: "1" } },
  { sectionType: "penyimpulan", status: "correct", score: 100, attempt: 1, answer: { a: "1" } },
  { sectionType: "cek-pemahaman", status: "correct", score: 100, attempt: 1, answer: { selections: [0] } },
]

import { getTabProgress, unlockNextTab, reconcileAndUnlockNextTab } from "./progress"
import type { SectionClaim } from "@/lib/schemas"

describe("progress service", () => {
  beforeEach(() => {
    currentDb = createFakeDb()
    holder.db = currentDb
  })

  describe("getTabProgress", () => {
    it("seeds initial state with only the first tab unlocked", async () => {
      const progress = await getTabProgress(USER, "translasi")
      expect(progress.map((p) => p.tab)).toEqual(["titik", "bangun", "garis"])
      expect(progress[0].unlocked).toBe(true)
      expect(progress[1].unlocked).toBe(false)
      expect(progress[2].unlocked).toBe(false)
    })

    it("auto-unlocks the next tab when all sections are terminal", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan", "penyimpulan", "cek-pemahaman"]) {
        seedSection("titik", key, "correct")
      }
      const progress = await getTabProgress(USER, "translasi")
      expect(progress.find((p) => p.tab === "titik")!.completed).toBe(true)
      expect(progress.find((p) => p.tab === "bangun")!.unlocked).toBe(true)
      expect(progress.find((p) => p.tab === "garis")!.unlocked).toBe(false)
    })

    it("does NOT auto-unlock when a section is missing", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan"]) {
        seedSection("titik", key, "correct")
      }
      const progress = await getTabProgress(USER, "translasi")
      expect(progress.find((p) => p.tab === "titik")!.completed).toBe(false)
      expect(progress.find((p) => p.tab === "bangun")!.unlocked).toBe(false)
    })

    it("treats wrong_attempt2 as terminal for auto-unlock", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan", "penyimpulan", "cek-pemahaman"]) {
        seedSection("titik", key, "wrong_attempt2")
      }
      const progress = await getTabProgress(USER, "translasi")
      expect(progress.find((p) => p.tab === "bangun")!.unlocked).toBe(true)
    })
  })

  describe("unlockNextTab (legacy path)", () => {
    it("unlocks the next tab when all sections are terminal", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan", "penyimpulan", "cek-pemahaman"]) {
        seedSection("titik", key, "correct")
      }
      const result = await unlockNextTab(USER, "translasi", "titik")
      expect(result.unlockedTab).toBe("bangun")
      expect(result.progress.find((p) => p.tab === "titik")!.completed).toBe(true)
      expect(result.progress.find((p) => p.tab === "bangun")!.unlocked).toBe(true)
    })

    it("throws TAB_LOCKED when a section is missing or non-terminal", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan"]) {
        seedSection("titik", key, "correct")
      }
      seedSection("titik", "penyimpulan", "wrong_attempt1")
      await expect(unlockNextTab(USER, "translasi", "titik")).rejects.toMatchObject({
        code: "TAB_LOCKED",
      })
      expect(currentDb.tables.tab_progress.find((r) => r.tab === "bangun")!.unlocked).toBe(false)
    })

    it("is idempotent when the tab is already completed", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan", "penyimpulan", "cek-pemahaman"]) {
        seedSection("titik", key, "correct")
      }
      await unlockNextTab(USER, "translasi", "titik")
      const second = await unlockNextTab(USER, "translasi", "titik")
      expect(second.unlockedTab).toBe("bangun")
      expect(second.progress.find((p) => p.tab === "bangun")!.unlocked).toBe(true)
    })

    it("handles the last tab (no next tab)", async () => {
      seedTabs("translasi")
      for (const key of ["pengamatan", "percobaan", "penyimpulan", "cek-pemahaman"]) {
        seedSection("garis", key, "correct")
      }
      const result = await unlockNextTab(USER, "translasi", "garis")
      expect(result.unlockedTab).toBeNull()
      expect(result.progress.find((p) => p.tab === "garis")!.completed).toBe(true)
    })
  })

  describe("reconcileAndUnlockNextTab", () => {
    it("recreates missing section rows and unlocks the next tab (stuck-user fix)", async () => {
      seedTabs("translasi")
      const result = await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      expect(result.unlockedTab).toBe("bangun")
      expect(result.progress.find((p) => p.tab === "titik")!.completed).toBe(true)
      expect(result.progress.find((p) => p.tab === "bangun")!.unlocked).toBe(true)

      const sections = currentDb.tables.section_progress
      expect(sections).toHaveLength(4)
      expect(sections.every((s) => ["correct", "wrong_attempt2"].includes(s.status as string))).toBe(true)
      expect(sections.find((s) => s.sectionType === "cek-pemahaman")!.attempt1Answer).toBe(
        JSON.stringify({ selections: [0] }),
      )
    })

    it("keeps the tab locked when claims are empty", async () => {
      seedTabs("translasi")
      await expect(reconcileAndUnlockNextTab(USER, "translasi", "titik", [])).rejects.toMatchObject({
        code: "TAB_LOCKED",
      })
      expect(currentDb.tables.tab_progress.find((r) => r.tab === "bangun")!.unlocked).toBe(false)
    })

    it("throws TAB_LOCKED when claims do not cover all expected sections", async () => {
      seedTabs("translasi")
      const incomplete = terminalClaims.slice(0, 2)
      await expect(
        reconcileAndUnlockNextTab(USER, "translasi", "titik", incomplete),
      ).rejects.toMatchObject({ code: "TAB_LOCKED" })
      expect(currentDb.tables.tab_progress.find((r) => r.tab === "bangun")!.unlocked).toBe(false)
    })

    it("does not downgrade an already-terminal DB row", async () => {
      seedTabs("translasi")
      const existing = seedSection("titik", "percobaan", "correct")
      const claims = terminalClaims.map((c) =>
        c.sectionType === "percobaan"
          ? { ...c, status: "wrong_attempt2" as const }
          : c,
      )
      await reconcileAndUnlockNextTab(USER, "translasi", "titik", claims)
      const row = currentDb.tables.section_progress.find((r) => r.id === existing.id)
      expect(row!.status).toBe("correct")
    })

    it("upgrades an existing non-terminal row to the claimed terminal status", async () => {
      seedTabs("translasi")
      const existing = seedSection("titik", "percobaan", "wrong_attempt1")
      await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      const row = currentDb.tables.section_progress.find((r) => r.id === existing.id)
      expect(row!.status).toBe("correct")
      expect(row!.attempt1Answer).toBe(JSON.stringify({ a: "1" }))
      expect(row!.attempt1Score).toBe(100)
    })

    it("writes attempt2 answer fields when the claim uses attempt 2", async () => {
      seedTabs("translasi")
      const claims = terminalClaims.map((c) =>
        c.sectionType === "percobaan"
          ? { ...c, attempt: 2 as const, status: "wrong_attempt2" as const, answer: { b: "2" } }
          : c,
      )
      await reconcileAndUnlockNextTab(USER, "translasi", "titik", claims)
      const row = currentDb.tables.section_progress.find((r) => r.sectionType === "percobaan")
      expect(row!.status).toBe("wrong_attempt2")
      expect(row!.attempt2Answer).toBe(JSON.stringify({ b: "2" }))
      expect(row!.attempt2Score).toBe(100)
    })

    it("ignores stale extra rows outside the expected section set (refleksi/bangun)", async () => {
      for (const t of MODULE_TABS.refleksi!) {
        currentDb.tables.tab_progress.push({
          id: crypto.randomUUID(),
          userId: USER,
          module: "refleksi",
          tab: t.value,
          unlocked: t.value === "sumbu-x",
          completed: false,
          updatedAt: new Date(),
        })
      }
      seedSection("bangun", "penyimpulan", "unsubmitted", "refleksi")

      const bangunClaims: SectionClaim[] = [
        { sectionType: "pengamatan", status: "correct", score: 100, attempt: 1 },
        { sectionType: "percobaan", status: "correct", score: 100, attempt: 1 },
        { sectionType: "cek-pemahaman", status: "correct", score: 100, attempt: 1 },
      ]
      const result = await reconcileAndUnlockNextTab(USER, "refleksi", "bangun", bangunClaims)
      expect(result.unlockedTab).toBe("garis")
      expect(result.progress.find((p) => p.tab === "bangun")!.completed).toBe(true)
      expect(result.progress.find((p) => p.tab === "garis")!.unlocked).toBe(true)
    })

    it("reconciles a stuck user whose DB has only 2 of 4 rows for titik", async () => {
      seedTabs("translasi")
      seedSection("titik", "pengamatan", "correct")
      seedSection("titik", "percobaan", "correct")

      const result = await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      expect(result.unlockedTab).toBe("bangun")
      const sections = currentDb.tables.section_progress
      expect(sections).toHaveLength(4)
      expect(sections.filter((s) => s.status === "correct")).toHaveLength(4)
    })

    it("is idempotent across repeated calls", async () => {
      seedTabs("translasi")
      await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      const second = await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      expect(second.unlockedTab).toBe("bangun")
      expect(currentDb.tables.section_progress).toHaveLength(4)
      expect(currentDb.tables.tab_progress.filter((r) => r.tab === "titik")).toHaveLength(1)
    })

    it("maps cek-pemahaman claims to the cekPemahaman expected key", async () => {
      seedTabs("translasi")
      const result = await reconcileAndUnlockNextTab(USER, "translasi", "titik", terminalClaims)
      expect(result.unlockedTab).toBe("bangun")
      expect(currentDb.tables.section_progress.find((s) => s.sectionType === "cek-pemahaman")).toBeDefined()
    })
  })
})
