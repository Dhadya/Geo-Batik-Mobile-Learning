import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import Link from "next/link"

export default function SplashPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-background p-8">
      <div className="flex flex-col items-center gap-8 max-w-sm text-center">
        <Text as="h1" className="text-4xl font-black uppercase">Batik Geometry</Text>
        <Text as="p" className="text-sm font-medium text-muted-foreground">
          Belajar Geometri Transformasi melalui Batik
        </Text>
        <Link href="/login">
          <Button variant="default" size="lg" className="w-48">MASUK</Button>
        </Link>
      </div>
    </div>
  )
}
