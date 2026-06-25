import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Progress } from "@/components/retroui/Progress"
import Link from "next/link"

export default function PrasyaratPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Materi Prasyarat</Text>
      <Text as="p" className="text-sm font-medium">Koordinat Kartesius</Text>
      <Progress value={0} className="w-full" />
      <Card className="w-full">
        <Card.Content className="space-y-4">
          <Text as="p" className="text-sm">Materi prasyarat akan ditampilkan di sini.</Text>
        </Card.Content>
      </Card>
      <div className="flex justify-between">
        <Link href="/menu">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href="/translasi">
          <Button variant="default" size="md">LANJUT</Button>
        </Link>
      </div>
    </div>
  )
}
