import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

export default async function KuisHasilPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const label = MODULE_LABELS[slug]
  if (!label) notFound()

  return (
    <div className="max-w-[96rem] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Hasil Kuis {label}</Text>
      <Card className="w-full">
        <Card.Header>
          <Card.Title>SKOR ANDA</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <Text as="p" className="text-sm">Skor akan ditampilkan di sini.</Text>
          <Text as="p" className="text-xs text-muted-foreground">Pembahasan setiap soal akan tersedia.</Text>
        </Card.Content>
      </Card>
      <div className="flex justify-between">
        <Link href={`/modul/${slug}/kuis/1`}>
          <Button variant="outline" size="md">ULANGI</Button>
        </Link>
        <Link href="/menu">
          <Button variant="default" size="md">KEMBALI KE MENU</Button>
        </Link>
      </div>
    </div>
  )
}
