import { describe, expect, it } from "vitest"
import { refleksiTabs } from "../data/refleksi"
import { translasiTabs } from "../data/translasi"
import type { SectionItem } from "../types"
import { validateSection } from "./validation"

function validateText(item: SectionItem, text: string) {
  return validateSection([item], { [item.id]: { text } }).isCorrect
}

describe("validateSection coordinate formulas", () => {
  it("accepts spacing and parentheses variations for a valid formula", () => {
    const item = refleksiTabs.find((tab) => tab.value === "sumbu-y")!.sections!.penyimpulan!.items[0]!

    expect(validateText(item, "(-x, y)")).toBe(true)
    expect(validateText(item, "-x,    y")).toBe(true)
  })

  it("rejects an extra negative sign on a coordinate component", () => {
    const item = refleksiTabs.find((tab) => tab.value === "sumbu-y")!.sections!.penyimpulan!.items[0]!

    expect(validateText(item, "-x,-y")).toBe(false)
  })

  it("rejects a sign change in a translation formula", () => {
    const item = translasiTabs.find((tab) => tab.value === "titik")!.sections!.penyimpulan!.items[1]!

    expect(validateText(item, "x+a, y+b")).toBe(true)
    expect(validateText(item, "-x+a, y+b")).toBe(false)
  })
})
