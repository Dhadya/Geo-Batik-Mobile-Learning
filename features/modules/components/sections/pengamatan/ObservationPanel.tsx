"use client"

import { Tabs } from "@/components/retroui/Tab"
import { useAnswerStore } from "../../../store/answerStore"
import { SectionScoreIndicator } from "../../shared/SectionScoreIndicator"
import { PercobaanForm } from "../percobaan/PercobaanForm"
import { PilihanRefleksiForm } from "../../shared/PilihanRefleksiForm"
import { PercobaanRefleksiGarisForm } from "../percobaan/PercobaanRefleksiGarisForm"
import { PengamatanTitikForm } from "./PengamatanTitikForm"
import { PengamatanBangunForm } from "./PengamatanBangunForm"
import { PengamatanGarisForm } from "./PengamatanGarisForm"
import { PengamatanMockForm } from "./PengamatanMockForm"
import { ChecklistTableForm } from "../../shared/ChecklistTableForm"

interface ObservationPanelProps {
  slug: string
  tab: string
}

/** Right-side panel with percobaan/pengamatan tabs and conditional form content. */
export function ObservationPanel({ slug, tab }: ObservationPanelProps) {
  const isTranslasiTitik = slug === "translasi" && tab === "titik"
  const isTranslasiBangun = slug === "translasi" && tab === "bangun"
  const isTranslasiGaris = slug === "translasi" && tab === "garis"
  const isRefleksiBangun = slug === "refleksi" && tab === "bangun"
  const isRefleksiGaris = slug === "refleksi" && tab === "garis"
  const isRefleksi = slug === "refleksi"

  const tabKey = `${slug}-${tab}`
  const pengamatanScore = useAnswerStore((s) => s.answers[tabKey]?.pengamatan?.score ?? null)
  const percobaanScore = useAnswerStore((s) => s.answers[tabKey]?.percobaan?.score ?? null)

  return (
    <div className="flex flex-col shadow-[4px_4px_0_0_black]">
      {/* Scrolling area — top + side borders */}
      <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none border-t-4 border-x-4 border-black bg-white">
        <Tabs defaultValue="pengamatan" className="flex flex-col h-full">
          {/* Tab navigation bar */}
          <Tabs.List className="p-1 md:p-1.5 flex gap-1.5 md:gap-2 w-full overflow-x-hidden border-b-4 border-black shrink-0">
            <Tabs.Trigger
              value="pengamatan"
              className="flex-1 py-1.5 md:py-2.5 text-center font-black uppercase cursor-pointer border-2 border-transparent text-muted-foreground text-xs sm:text-sm md:text-lg data-active:border-black data-active:bg-primary data-active:text-foreground data-active:shadow-[2px_2px_0_0_black] data-active:-translate-y-0.5 data-active:-translate-x-0.5 transition-all duration-150 flex items-center justify-center gap-1 md:gap-1.5"
            >
              <span>Pengamatan</span>
              <SectionScoreIndicator score={pengamatanScore} />
            </Tabs.Trigger>
            <Tabs.Trigger
              value="percobaan"
              className="flex-1 py-1.5 md:py-2.5 text-center font-black uppercase cursor-pointer border-2 border-transparent text-muted-foreground text-xs sm:text-sm md:text-lg data-active:border-black data-active:bg-primary data-active:text-foreground data-active:shadow-[2px_2px_0_0_black] data-active:-translate-y-0.5 data-active:-translate-x-0.5 transition-all duration-150 flex items-center justify-center gap-1 md:gap-1.5"
            >
              <span>Percobaan</span>
              <SectionScoreIndicator score={percobaanScore} />
            </Tabs.Trigger>
          </Tabs.List>

          {/* Tab content */}
          <div className="grow flex flex-col">
            {/* Percobaan tab — structured experiment table from section data */}
            <Tabs.Content value="percobaan" className="p-3 md:p-6 grow space-y-3 md:space-y-6 mt-0">
              {isRefleksiBangun && <PilihanRefleksiForm slug={slug} tab={tab} />}
              {isRefleksiGaris && <PercobaanRefleksiGarisForm slug={slug} tab={tab} />}
              {!isRefleksiBangun && !isRefleksiGaris && <PercobaanForm slug={slug} tab={tab} />}
            </Tabs.Content>

            {/* Pengamatan tab — form variant based on module/tab */}
            <Tabs.Content value="pengamatan" className="p-3 md:p-6 grow space-y-3 md:space-y-4 mt-0">
              {isTranslasiTitik && <PengamatanTitikForm slug={slug} tab={tab} />}
              {isTranslasiBangun && <PengamatanBangunForm slug={slug} tab={tab} />}
              {isRefleksiBangun && <ChecklistTableForm slug={slug} tab={tab} />}
              {isRefleksiGaris && <PengamatanGarisForm slug={slug} tab={tab} />}
              {isRefleksi && !isRefleksiBangun && !isRefleksiGaris && <PengamatanBangunForm slug={slug} tab={tab} />}
              {isTranslasiGaris && <PengamatanGarisForm slug={slug} tab={tab} />}
              {!isTranslasiTitik && !isTranslasiBangun && !isTranslasiGaris && !isRefleksi && <PengamatanMockForm slug={slug} tab={tab} />}
            </Tabs.Content>
          </div>
        </Tabs>
      </div>
      {/* Bottom border — stays fixed outside scroll area */}
      <div className="border-b-4 border-black bg-white shrink-0" />
    </div>
  )
}
