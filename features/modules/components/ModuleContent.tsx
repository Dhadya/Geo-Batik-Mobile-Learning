import { notFound } from "next/navigation"
import { Text } from "@/components/retroui/Text"
import { ModuleTabNav } from "./ModuleTabNav"
import { InteractiveWorkspace } from "./InteractiveWorkspace"
import { ObservationPanel } from "./ObservationPanel"
import { ConclusionArea } from "./ConclusionArea"
import { AssessmentSection } from "./AssessmentSection"
import { getModuleTabs, getModuleTab } from "../data"

/** Main module content orchestrator — composes all sections for a given slug and tab. */
export function ModuleContent({
  slug,
  tab,
}: {
  slug: string
  tab: string
}) {
  const tabs = getModuleTabs(slug)
  if (!tabs) notFound()

  const tabConfig = getModuleTab(slug, tab)
  if (!tabConfig) notFound()

  return (
    <div className="space-y-6">
      <ModuleTabNav slug={slug} tabs={tabs} currentTab={tab} />

      <Text as="h1" className="text-2xl md:text-3xl font-black uppercase">
        {tabConfig.title}
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-8">
          <InteractiveWorkspace />
        </div>
        <div className="lg:col-span-4">
          <ObservationPanel instruction={tabConfig.instruction} />
        </div>
      </div>

      <ConclusionArea formula={tabConfig.formula} />

      <AssessmentSection questions={tabConfig.assessment} />
    </div>
  )
}
