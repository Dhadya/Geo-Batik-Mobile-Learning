import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import Link from "next/link"

export default function RefleksiApersepsiPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Apersepsi Refleksi</Text>
      <Card className="w-full">
        <Card.Content className="space-y-4">
          <Text as="p" className="text-sm font-medium">
            Apa itu Refleksi? Konten interaktif akan ditampilkan di sini.
          </Text>
        </Card.Content>
      </Card>
      <div className="flex justify-between">
        <Link href="/menu">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href="/refleksi/sumbu-x">
          <Button variant="default" size="md">MULAI</Button>
        </Link>
      </div>
    </div>
  )
}
