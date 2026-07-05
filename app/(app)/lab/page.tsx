import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import Link from "next/link"

/* Lab Batik workspace — 4-column layout: motif selection, canvas, transform tools, export. */
export default function LabBatikPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <Text as="h1" className="text-2xl font-black uppercase">Lab Batik</Text>
        <Link href="/menu">
          <Button variant="outline" size="sm">KEMBALI</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <Card.Header>
            <Card.Title>MOTIF</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2">
            <Text as="p" className="text-xs text-muted-foreground">Pilih motif batik</Text>
          </Card.Content>
        </Card>
        <Card className="lg:col-span-2 min-h-[500px]">
          <Card.Content>
            <Text as="p" className="text-sm">Canvas workspace</Text>
          </Card.Content>
        </Card>
        <Card className="lg:col-span-1">
          <Card.Header>
            <Card.Title>TRANSFORMASI</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2">
            <Text as="p" className="text-xs text-muted-foreground">Tool panel</Text>
          </Card.Content>
        </Card>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="md">EXPORT</Button>
      </div>
    </div>
  )
}
