// Components
export { ModuleContent } from "./components/ModuleContent"
export { ModuleTabNav } from "./components/navigation/ModuleTabNav"
export { InteractiveWorkspace } from "./components/workspace/InteractiveWorkspace"
export { ObservationPanel } from "./components/observation/ObservationPanel"
export { ConclusionArea } from "./components/conclusion/ConclusionArea"
export { AssessmentSection } from "./components/assessment/AssessmentSection"

// Data + helpers
export { MODULE_TABS, getModuleTabs, getModuleTab } from "./data"

// Store
export { useAnswerStore } from "./store/answerStore"
export type { SectionAnswers, CekPemahamanAnswers, TabAnswers } from "./store/answerStore"

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
  MatchItem,
  ModuleSlug,
  TranslasiTab,
  RefleksiTab,
  TabSlug,
} from "./types"
