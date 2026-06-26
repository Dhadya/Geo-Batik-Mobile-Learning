import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Tabs } from "@/components/retroui/Tab"
import Link from "next/link"

/* Refleksi sumbu X — 3-tab layout: observation canvas, conclusion, check understanding. */
export default function RefleksiSumbuXPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Refleksi Sumbu X</Text>
      <Tabs defaultValue="pengamatan">
        <Tabs.List>
          <Tabs.Trigger value="pengamatan">PENGAMATAN</Tabs.Trigger>
          <Tabs.Trigger value="penyimpulan">PENYIMPULAN</Tabs.Trigger>
          <Tabs.Trigger value="cek">CEK PEMAHAMAN</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="pengamatan">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <div className="lg:col-span-2">
              <Card className="w-full min-h-[400px]">
                <Card.Content>
                  <Text as="p" className="text-sm">Interactive canvas placeholder</Text>
                </Card.Content>
              </Card>
            </div>
            <Card>
              <Card.Header>
                <Card.Title>INFORMASI</Card.Title>
              </Card.Header>
              <Card.Content>
                <Text as="p" className="text-xs text-muted-foreground">Observation info</Text>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Content>
        <Tabs.Content value="penyimpulan">
          <Text as="p" className="text-sm mt-4">Kesimpulan</Text>
        </Tabs.Content>
        <Tabs.Content value="cek">
          <Text as="p" className="text-sm mt-4">Cek Pemahaman</Text>
        </Tabs.Content>
      </Tabs>
      <div className="flex justify-between">
        <Link href="/refleksi">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href="/refleksi/sumbu-y">
          <Button variant="default" size="md">LANJUT</Button>
        </Link>
      </div>
    </div>
  )
}
