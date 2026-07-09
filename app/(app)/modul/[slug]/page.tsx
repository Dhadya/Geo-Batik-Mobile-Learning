import { redirect } from "next/navigation"

const FIRST_TABS: Record<string, string> = {
  translasi: "titik",
  refleksi: "sumbu-x",
}

export default async function ModulRedirect(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const tab = FIRST_TABS[slug]
  redirect(`/modul/${slug}/${tab}`)
}
