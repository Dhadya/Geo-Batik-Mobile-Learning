// Components
export { ModuleContent } from "./components/ModuleContent"
export { ProgressSyncWrapper } from "./components/ProgressSyncWrapper"
export { ModuleTabNav } from "./components/navigation/ModuleTabNav"
export { InteractiveWorkspace } from "./components/workspace/InteractiveWorkspace"
export { ObservationPanel } from "./components/sections/pengamatan/ObservationPanel"
export { PengamatanGarisForm } from "./components/sections/pengamatan/PengamatanGarisForm"
export { UrutkanInput } from "./components/shared/UrutkanInput"
export { ConclusionArea } from "./components/sections/penyimpulan/ConclusionArea"
export { AssessmentSection } from "./components/sections/cek-pemahaman/AssessmentSection"

// Data + helpers
export { MODULE_TABS, getModuleTabs, getModuleTab } from "./data"

// Store
export { useAnswerStore } from "./store/answerStore"
export type { SectionAnswers, CekPemahamanAnswers, TabAnswers } from "./store/answerStore"
export { useTabProgressStore } from "./store/tabProgressStore"
export type { TabProgressEntry } from "./store/tabProgressStore"

// Lib
export { syncTabProgress, syncSectionAttempt } from "./lib/progressSync"
export type { SectionSyncInput } from "./lib/progressSync"

// Types
export type {
  ModuleTab,
  AssessmentQuestion,
  ModuleSections,
  SectionBlock,
  SectionItem,
  MatriksItem,
  KoordinatItem,
  UraianItem,
  MemasangkanItem,
  PilihanGandaItem,
  UrutkanItem,
  MatchItem,
  ModuleSlug,
  TranslasiTab,
  RefleksiTab,
  TabSlug,
} from "./types"
