import type { ModuleSlug, ModuleTab } from "../types"
import { translasiTabs } from "./translasi"
import { refleksiTabs } from "./refleksi"

export const MODULE_TABS: Record<ModuleSlug, ModuleTab[]> = {
  translasi: translasiTabs,
  refleksi: refleksiTabs,
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
