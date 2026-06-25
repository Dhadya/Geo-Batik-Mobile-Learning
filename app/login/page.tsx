import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Card } from "@/components/retroui/Card"
import { Tabs } from "@/components/retroui/Tab"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-full bg-background p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title className="font-black uppercase text-center">Masuk</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <Tabs defaultValue="login">
            <Tabs.List>
              <Tabs.Trigger value="login">MASUK</Tabs.Trigger>
              <Tabs.Trigger value="register">DAFTAR</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="login">
              <div className="space-y-4 mt-4">
                <Input placeholder="Username" />
                <Input type="password" placeholder="Kata Sandi" />
                <Button variant="default" size="md" className="w-full">MASUK</Button>
              </div>
            </Tabs.Content>
            <Tabs.Content value="register">
              <div className="space-y-4 mt-4">
                <Input placeholder="Nama Lengkap" />
                <Input placeholder="Username" />
                <Input type="password" placeholder="Kata Sandi" />
                <Button variant="default" size="md" className="w-full">DAFTAR</Button>
              </div>
            </Tabs.Content>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  )
}
