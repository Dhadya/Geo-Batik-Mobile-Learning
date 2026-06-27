import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Tabs } from "@/components/retroui/Tab"
import type { ReactNode } from "react"

type TabContent = Record<string, ReactNode>

const MODULE_CONTENT: Record<string, Record<string, ReactNode>> = {
  translasi: {
    titik: (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Translasi Titik</Text>
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
            <Card className="w-full mt-4">
              <Card.Content>
                <Text as="p" className="text-sm">Kesimpulan akan ditampilkan di sini.</Text>
              </Card.Content>
            </Card>
          </Tabs.Content>
          <Tabs.Content value="cek">
            <Card className="w-full mt-4">
              <Card.Content>
                <Text as="p" className="text-sm">Cek pemahaman akan ditampilkan di sini.</Text>
              </Card.Content>
            </Card>
          </Tabs.Content>
        </Tabs>
      </>
    ),
    garis: (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Translasi Garis</Text>
        <Text as="p" className="text-sm mt-4">Halaman Translasi Garis</Text>
      </>
    ),
    bangun: (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Translasi Bangun</Text>
        <Text as="p" className="text-sm mt-4">Halaman Translasi Bangun</Text>
      </>
    ),
  },
  refleksi: {
    "sumbu-x": (
      <>
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
            <Card className="w-full mt-4">
              <Card.Content>
                <Text as="p" className="text-sm">Kesimpulan akan ditampilkan di sini.</Text>
              </Card.Content>
            </Card>
          </Tabs.Content>
          <Tabs.Content value="cek">
            <Card className="w-full mt-4">
              <Card.Content>
                <Text as="p" className="text-sm">Cek pemahaman akan ditampilkan di sini.</Text>
              </Card.Content>
            </Card>
          </Tabs.Content>
        </Tabs>
      </>
    ),
    "sumbu-y": (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Refleksi Sumbu Y</Text>
        <Text as="p" className="text-sm mt-4">Halaman Refleksi Sumbu Y</Text>
      </>
    ),
    garis: (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Refleksi Garis</Text>
        <Text as="p" className="text-sm mt-4">Halaman Refleksi Garis</Text>
      </>
    ),
    bangun: (
      <>
        <Text as="h1" className="text-2xl font-black uppercase">Refleksi Bangun</Text>
        <Text as="p" className="text-sm mt-4">Halaman Refleksi Bangun</Text>
      </>
    ),
  },
}

export default async function ModulTabPage(props: {
  params: Promise<{ slug: string; tab: string }>
}) {
  const { slug, tab } = await props.params
  const moduleContent = MODULE_CONTENT[slug]
  if (!moduleContent) notFound()
  const content = moduleContent[tab]
  if (!content) notFound()

  return <div className="space-y-6">{content}</div>
}
