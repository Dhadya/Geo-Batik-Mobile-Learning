"use client"

import { Tabs } from "@/components/retroui/Tab"
import { SandboxContent } from "./pengamatan/SandboxContent"
import { PengamatanTitikForm } from "./pengamatan/PengamatanTitikForm"
import { PengamatanBangunForm } from "./pengamatan/PengamatanBangunForm"
import { PengamatanMockForm } from "./pengamatan/PengamatanMockForm"
import { getModuleTab } from "../data"

interface ObservationPanelProps {
  slug: string
  tab: string
  instruction: string
}

/** Right-side panel with percobaan/pengamatan tabs and conditional form content. */
export function ObservationPanel({ slug, tab, instruction }: ObservationPanelProps) {
  // Determine which form variant to show based on module and tab
  const isTranslasiTitik = slug === "translasi" && tab === "titik"
  const isTranslasiBangun = slug === "translasi" && tab === "bangun"
  const showMockForm = !isTranslasiTitik && !isTranslasiBangun

  // Section content from tab config for data-driven forms
  const tabConfig = getModuleTab(slug, tab)
  const sections = tabConfig?.sections

  return (
    <div className="h-auto lg:h-full flex flex-col gap-4">
      <Tabs defaultValue="pengamatan" className="flex flex-col h-full gap-4">
        {/* Tab navigation bar */}
        <Tabs.List className="border-4 border-black bg-white p-1.5 flex gap-2 shadow-[4px_4px_0_0_#000] w-full rounded-none">
          <Tabs.Trigger
            value="pengamatan"
            className="flex-1 py-2.5 text-center font-black uppercase cursor-pointer rounded-none border-2 border-transparent text-muted-foreground text-base md:text-lg data-active:border-black data-active:bg-primary data-active:text-foreground data-active:shadow-[2px_2px_0_0_#000] data-active:-translate-y-0.5 data-active:-translate-x-0.5 transition-all duration-150"
          >
            Pengamatan
          </Tabs.Trigger>
          <Tabs.Trigger
            value="percobaan"
            className="flex-1 py-2.5 text-center font-black uppercase cursor-pointer rounded-none border-2 border-transparent text-muted-foreground text-base md:text-lg data-active:border-black data-active:bg-primary data-active:text-foreground data-active:shadow-[2px_2px_0_0_#000] data-active:-translate-y-0.5 data-active:-translate-x-0.5 transition-all duration-150"
          >
            Percobaan
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab content container */}
        <div className="border-4 border-black bg-white grow flex flex-col shadow-lg overflow-hidden">
          {/* Percobaan tab — sandbox with coordinate input and live preview */}
          <Tabs.Content value="percobaan" className="p-4 md:p-6 grow overflow-y-auto space-y-4 md:space-y-6 mt-0">
            <SandboxContent
              slug={slug}
              tab={tab}
              instruction={instruction}
              sectionBlock={sections?.percobaan}
            />
          </Tabs.Content>

          {/* Pengamatan tab — form variant based on module/tab */}
          <Tabs.Content value="pengamatan" className="p-4 md:p-6 grow overflow-y-auto space-y-4 mt-0">
            {isTranslasiTitik && <PengamatanTitikForm />}
            {isTranslasiBangun && <PengamatanBangunForm />}
            {showMockForm && <PengamatanMockForm />}
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  )
}
