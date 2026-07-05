/* Types for apersepsi feature — shared between translasi and refleksi modules. */

/** Apersepsi module slug identifiers */
export type ApersepsiSlug = "translasi" | "refleksi"

/** Content block types for apersepsi sections */
export interface ApersepsiContent {
  /** Module slug (translasi | refleksi) */
  slug: ApersepsiSlug
  /** Module label, e.g. "MODUL 1" */
  label: string
  /** Module title, e.g. "TRANSLASI" */
  title: string
  /** Opening question/hook text */
  hook: string
  /** Main explanation text */
  explanation: string
  /** Visual explanation title, e.g. "Apa itu Translasi?" */
  visualTitle: string
  /** Visual explanation description */
  visualDescription: string
  /** CTA button text */
  ctaText: string
  /** First tab to navigate to after apersepsi */
  firstTab: string
  /** Material Symbol icon for the module */
  icon: string
  /** Background color class */
  bgColor: string
}
