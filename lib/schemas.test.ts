import { describe, it, expect } from "vitest"
import { unlockSchema, sectionClaimSchema, saveSectionSchema } from "@/lib/schemas"

describe("unlockSchema", () => {
  it("accepts a minimal valid payload without sections", () => {
    const result = unlockSchema.safeParse({ completedTab: "titik" })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.sections).toBeUndefined()
  })

  it("accepts valid terminal section claims", () => {
    const result = unlockSchema.safeParse({
      completedTab: "titik",
      sections: [
        { sectionType: "pengamatan", status: "correct", score: 100, attempt: 1 },
        { sectionType: "percobaan", status: "wrong_attempt2", score: 50, attempt: 2, answer: { a: "2" } },
      ],
    })
    expect(result.success).toBe(true)
  })

  it("rejects a missing completedTab", () => {
    expect(unlockSchema.safeParse({}).success).toBe(false)
    expect(unlockSchema.safeParse({ sections: [] }).success).toBe(false)
  })

  it("rejects an empty completedTab", () => {
    expect(unlockSchema.safeParse({ completedTab: "" }).success).toBe(false)
  })

  it("rejects a non-terminal claim status", () => {
    const result = unlockSchema.safeParse({
      completedTab: "titik",
      sections: [{ sectionType: "pengamatan", status: "wrong_attempt1" }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects an invalid sectionType", () => {
    const result = unlockSchema.safeParse({
      completedTab: "titik",
      sections: [{ sectionType: "foo", status: "correct" }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects a score out of range", () => {
    for (const score of [-1, 101, 100.5]) {
      const result = unlockSchema.safeParse({
        completedTab: "titik",
        sections: [{ sectionType: "pengamatan", status: "correct", score }],
      })
      expect(result.success).toBe(false)
    }
  })

  it("rejects an invalid attempt value", () => {
    const result = unlockSchema.safeParse({
      completedTab: "titik",
      sections: [{ sectionType: "pengamatan", status: "correct", attempt: 3 }],
    })
    expect(result.success).toBe(false)
  })

  it("accepts a nullable score and omittable attempt/answer", () => {
    const result = unlockSchema.safeParse({
      completedTab: "titik",
      sections: [{ sectionType: "cek-pemahaman", status: "wrong_attempt2", score: null }],
    })
    expect(result.success).toBe(true)
  })

  it("accepts an empty sections array", () => {
    expect(unlockSchema.safeParse({ completedTab: "titik", sections: [] }).success).toBe(true)
  })
})

describe("sectionClaimSchema", () => {
  it("accepts all valid section types and both terminal statuses", () => {
    for (const sectionType of ["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"]) {
      for (const status of ["correct", "wrong_attempt2"]) {
        expect(sectionClaimSchema.safeParse({ sectionType, status }).success).toBe(true)
      }
    }
  })

  it("rejects a missing status", () => {
    expect(sectionClaimSchema.safeParse({ sectionType: "pengamatan" }).success).toBe(false)
  })
})

describe("saveSectionSchema regression guard", () => {
  it("still accepts the existing save payload shape", () => {
    const result = saveSectionSchema.safeParse({
      tab: "titik",
      sectionType: "pengamatan",
      attempt: 1,
      answer: { "1": { a: "2" } },
      score: 100,
      status: "correct",
    })
    expect(result.success).toBe(true)
  })
})
