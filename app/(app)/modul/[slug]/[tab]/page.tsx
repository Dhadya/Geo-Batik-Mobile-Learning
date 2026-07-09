import { ModuleContent } from "@/features/modules"

export default async function ModulTabPage(props: {
  params: Promise<{ slug: string; tab: string }>
}) {
  const { slug, tab } = await props.params
  return <ModuleContent slug={slug} tab={tab} />
}
