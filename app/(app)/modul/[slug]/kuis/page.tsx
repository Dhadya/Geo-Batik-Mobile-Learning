import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Progress } from "@/components/retroui/Progress"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

export default async function KuisIntroPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const label = MODULE_LABELS[slug]
  if (!label) notFound()

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Kuis {label}</Text>
      <Progress value={25} className="w-full" />
      <Card className="w-full">
        <Card.Content className="space-y-4">
          <Text as="p" className="text-sm font-medium">Soal akan ditampilkan di sini.</Text>
          <div className="space-y-2">
            {["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border-2 border-border rounded cursor-pointer hover:bg-muted transition-colors">
                <input type="radio" name="quiz" className="accent-foreground" />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            ))}
          </div>
        </Card.Content>
      </Card>
      <div className="flex justify-between">
        <Link href={`/modul/${slug}`}>
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href={`/modul/${slug}/kuis/1`}>
          <Button variant="default" size="md">SELANJUTNYA</Button>
        </Link>
      </div>
    </div>
  )
}
