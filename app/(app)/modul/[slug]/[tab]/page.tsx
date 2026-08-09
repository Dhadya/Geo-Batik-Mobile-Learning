import { ModuleContent, MODULE_TABS } from "@/features/modules"

/** Prerenders every known slug/tab combination so module content is served static/CDN. */
export function generateStaticParams(): { slug: string; tab: string }[] {
  return Object.entries(MODULE_TABS).flatMap(([slug, tabs]) =>
    tabs.map((tab) => ({ slug, tab: tab.value })),
  )
}

export default async function ModulTabPage(props: {
  params: Promise<{ slug: string; tab: string }>
}) {
  const { slug, tab } = await props.params

  return <ModuleContent slug={slug} tab={tab} />
}
