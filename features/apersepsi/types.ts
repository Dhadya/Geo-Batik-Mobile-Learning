/* Types for apersepsi feature — shared between translasi and refleksi modules. */

/** Apersepsi module slug identifiers */
export type ApersepsiSlug = "translasi" | "refleksi"

/** Content block for apersepsi page */
export interface ApersepsiContent {
  /** Module slug (translasi | refleksi) */
  slug: ApersepsiSlug
  /** Module label, e.g. "MODUL 1" */
  label: string
  /** Module title, e.g. "TRANSLASI" */
  title: string
  /** Material Symbol icon name */
  icon: string
  /** Background color class */
  bgColor: string
  /** Content text before the image (paragraphs separated by \n\n) */
  contentBeforeImage: string
  /** Content text after the image (paragraphs separated by \n\n) */
  contentAfterImage: string
  /** Batik motif image path */
  image: string
}
