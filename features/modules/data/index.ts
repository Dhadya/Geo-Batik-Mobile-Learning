import type { ModuleSlug, ModuleTab } from "../types"
import { translasiTabs } from "./translasi"
import { refleksiTabs } from "./refleksi"

export const MODULE_TABS: Record<ModuleSlug, ModuleTab[]> = {
  translasi: translasiTabs,
  refleksi: refleksiTabs,
}

export type SectionKey = "pengamatan" | "percobaan" | "penyimpulan" | "cekPemahaman"

const ALL_SECTIONS = ["pengamatan", "percobaan", "penyimpulan", "cekPemahaman"] as const

/** Returns the active section types for a given module tab. */
export function getSectionsForTab(slug: string, tab: string): readonly SectionKey[] {
  void slug; void tab
  return ALL_SECTIONS
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
