import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import Link from "next/link"

/* Main menu — 3-card navigation grid: Translasi, Refleksi, Lab Batik. */
export default function MenuPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <Text as="h1" className="text-3xl font-black uppercase text-center">Menu Utama</Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/apersepsi/translasi">
          <Card className="w-full text-center cursor-pointer hover:translate-y-1 transition-all">
            <Card.Content className="py-8">
              <Text as="h2" className="text-lg font-black uppercase">TRANSLASI</Text>
            </Card.Content>
          </Card>
        </Link>
        <Link href="/apersepsi/refleksi">
          <Card className="w-full text-center cursor-pointer hover:translate-y-1 transition-all">
            <Card.Content className="py-8">
              <Text as="h2" className="text-lg font-black uppercase">REFLEKSI</Text>
            </Card.Content>
          </Card>
        </Link>
        <Link href="/lab">
          <Card className="w-full text-center cursor-pointer hover:translate-y-1 transition-all">
            <Card.Content className="py-8">
              <Text as="h2" className="text-lg font-black uppercase">LAB BATIK</Text>
            </Card.Content>
          </Card>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="/prasyarat">
          <Button variant="outline" size="md">KEMBALI KE APERSEPSI</Button>
        </Link>
      </div>
    </div>
  )
}
