import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Tabs } from "@/components/retroui/Tab"
import Link from "next/link"

export default function TranslasiTitikPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Text as="h1" className="text-2xl font-black uppercase">Translasi</Text>
      <Tabs defaultValue="titik">
        <Tabs.List>
          <Tabs.Trigger value="titik">TRANSLASI TITIK</Tabs.Trigger>
          <Tabs.Trigger value="bangun">TRANSLASI BANGUN</Tabs.Trigger>
          <Tabs.Trigger value="garis">TRANSLASI GARIS</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="titik">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <div className="lg:col-span-2">
              <Card className="w-full min-h-[400px]">
                <Card.Content>
                  <Text as="p" className="text-sm">Interactive canvas placeholder</Text>
                </Card.Content>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <Card.Header>
                  <Card.Title>PENYIMPULAN</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Text as="p" className="text-xs text-muted-foreground">Summary here</Text>
                </Card.Content>
              </Card>
              <Card>
                <Card.Header>
                  <Card.Title>CEK PEMAHAMAN</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Text as="p" className="text-xs text-muted-foreground">Quiz section</Text>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="bangun">
          <Text as="p" className="text-sm mt-4">Translasi Bangun</Text>
        </Tabs.Content>
        <Tabs.Content value="garis">
          <Text as="p" className="text-sm mt-4">Translasi Garis</Text>
        </Tabs.Content>
      </Tabs>
      <div className="flex justify-between">
        <Link href="/translasi">
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href="/translasi/kuis">
          <Button variant="default" size="md">KUIS</Button>
        </Link>
      </div>
    </div>
  )
}
