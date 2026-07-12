"use client"

import { Tabs } from "@/components/retroui/Tab"
import { SandboxContent } from "./pengamatan/SandboxContent"
import { PengamatanTitikForm } from "./pengamatan/PengamatanTitikForm"
import { PengamatanBangunForm } from "./pengamatan/PengamatanBangunForm"
import { PengamatanMockForm } from "./pengamatan/PengamatanMockForm"

interface ObservationPanelProps {
  slug: string
  tab: string
  instruction: string
}

export function ObservationPanel({ slug, tab, instruction }: ObservationPanelProps) {
  const isTranslasiTitik = slug === "translasi" && tab === "titik"
  const isTranslasiBangun = slug === "translasi" && tab === "bangun"
  const showMockForm = !isTranslasiTitik && !isTranslasiBangun

  return (
    <div className="border-4 border-black bg-white h-auto lg:h-[600px] flex flex-col shadow-lg">
      <Tabs defaultValue="percobaan" className="flex flex-col h-full">
        <Tabs.List className="border-b-4 border-black bg-accent flex">
          <Tabs.Trigger
            value="percobaan"
            className="flex-1 py-3 text-center font-black uppercase border-r-2 border-black last:border-r-0 cursor-pointer"
          >
            Percobaan
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pengamatan"
            className="flex-1 py-3 text-center font-black uppercase cursor-pointer"
          >
            Pengamatan
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="percobaan" className="p-4 md:p-6 grow overflow-y-auto space-y-4 md:space-y-6 mt-0">
          <SandboxContent slug={slug} tab={tab} instruction={instruction} />
        </Tabs.Content>

        <Tabs.Content value="pengamatan" className="p-4 md:p-6 grow overflow-y-auto space-y-4 mt-0">
          {isTranslasiTitik && <PengamatanTitikForm />}
          {isTranslasiBangun && <PengamatanBangunForm />}
          {showMockForm && <PengamatanMockForm />}
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
