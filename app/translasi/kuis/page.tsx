import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Progress } from "@/components/retroui/Progress"
import Link from "next/link"

export default function TranslasiKuisPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Kuis Translasi</Text>
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
        <Link href="/translasi/titik">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Button variant="default" size="md">SELANJUTNYA</Button>
      </div>
    </div>
  )
}
