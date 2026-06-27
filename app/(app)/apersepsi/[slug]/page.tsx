import { notFound } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import Link from "next/link"

const APERSEPSI_DATA: Record<string, { title: string; desc: string; firstTab: string }> = {
  translasi: {
    title: "Apersepsi Translasi",
    desc: "Apa itu Translasi? Konten interaktif akan ditampilkan di sini.",
    firstTab: "titik",
  },
  refleksi: {
    title: "Apersepsi Refleksi",
    desc: "Apa itu Refleksi? Konten interaktif akan ditampilkan di sini.",
    firstTab: "sumbu-x",
  },
}

export default async function ApersepsiPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = APERSEPSI_DATA[slug]
  if (!data) notFound()

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">{data.title}</Text>
      <Card className="w-full">
        <Card.Content className="space-y-4">
          <Text as="p" className="text-sm font-medium">{data.desc}</Text>
        </Card.Content>
      </Card>
      <div className="flex justify-between">
        <Link href="/menu">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href={`/modul/${slug}/${data.firstTab}`}>
          <Button variant="default" size="md">MULAI</Button>
        </Link>
      </div>
    </div>
  )
}
