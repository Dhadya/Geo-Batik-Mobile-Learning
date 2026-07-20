import type { ModuleSlug, ModuleTab } from "../types"
import { translasiTabs } from "./translasi"
import { refleksiTabs } from "./refleksi"

export const MODULE_TABS: Record<ModuleSlug, ModuleTab[]> = {
  translasi: translasiTabs,
  refleksi: refleksiTabs,
}

/** Ordered list of section types within a tab. */
export const SECTION_ORDER = [
  "pengamatan",
  "percobaan",
  "penyimpulan",
  "cek-pemahaman",
] as const

/** Human-readable labels for each section type. */
export const SECTION_LABELS: Record<string, string> = {
  pengamatan: "Pengamatan",
  percobaan: "Percobaan",
  penyimpulan: "Penyimpulan",
  "cek-pemahaman": "Cek Pemahaman",
}

export type SectionKey = "pengamatan" | "percobaan" | "penyimpulan" | "cekPemahaman"

const REFLEKSI_BANGUN_SECTIONS = ["pengamatan", "percobaan", "cekPemahaman"] as const
const DEFAULT_SECTIONS = ["pengamatan", "percobaan", "penyimpulan", "cekPemahaman"] as const

/** Returns the active section types for a given module tab (refleksi/bangun has no penyimpulan). */
export function getSectionsForTab(slug: string, tab: string): readonly SectionKey[] {
  return slug === "refleksi" && tab === "bangun"
    ? REFLEKSI_BANGUN_SECTIONS
    : DEFAULT_SECTIONS
}

/** Returns the expected number of active sections for a given module tab. */
export function getExpectedSectionCount(slug: string, tab: string): number {
  return getSectionsForTab(slug, tab).length
}

/** Get tabs for a given module slug. */
export function getModuleTabs(slug: string): ModuleTab[] | undefined {
  return MODULE_TABS[slug as ModuleSlug]
}

/** Get a specific tab config by module slug and tab value. */
export function getModuleTab(
  slug: string,
  tab: string,
): ModuleTab | undefined {
  const tabs = getModuleTabs(slug)
  return tabs?.find((t) => t.value === tab)
}
