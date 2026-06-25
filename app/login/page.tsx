"use client"

import { UserCircle, User, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Card } from "@/components/retroui/Card"
import { Checkbox } from "@/components/retroui/Checkbox"
import { Tabs } from "@/components/retroui/Tab"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-full bg-background p-4 md:p-12 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 z-0 batik-watermark pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 opacity-10 rotate-12 border-[16px] border-black rounded-full pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] opacity-5 border-[32px] border-black rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-md">
        <Card className="w-full border-4 border-black neubrutal-shadow relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none border-t-4 border-l-4 border-black" />

          <Card.Header className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent border-4 border-black mb-6 neubrutal-shadow-sm">
              <UserCircle className="size-10 text-foreground" />
            </div>
            <Card.Title className="font-black text-3xl uppercase tracking-tight mb-2">
              GEMATRI
            </Card.Title>
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
              The Academic Rebel / Portal Akses
            </p>
          </Card.Header>

          <Card.Content>
            <Tabs defaultValue="login">
              <Tabs.List>
                <Tabs.Trigger value="login">MASUK</Tabs.Trigger>
                <Tabs.Trigger value="register">DAFTAR</Tabs.Trigger>
              </Tabs.List>

              {/* ── Login Tab ── */}
              <Tabs.Content value="login">
                <form className="space-y-6 mt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Username</label>
                    <div className="relative">
                      <Input
                        placeholder="Siswa_Ahmad_24"
                        className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
                      />
                      <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none">
                        <User className="size-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Password</label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 h-full flex items-center pr-4 hover:text-foreground transition-colors"
                      >
                        <Eye className="size-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox variant="outline" className="border-4 border-black !rounded-none size-6" />
                      <span className="text-xs font-bold uppercase">Ingat Saya</span>
                    </label>
                    <Link href="#" className="text-xs font-bold uppercase text-primary underline">
                      Lupa?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full !h-16 !text-xl font-black uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3"
                  >
                    MASUK
                    <ArrowRight className="size-6" />
                  </Button>
                </form>

                <div className="mt-10 border-t-4 border-black pt-6 text-center">
                  <p className="text-sm mb-4">Belum punya akun akademik?</p>
                  <button
                    type="button"
                    className="w-full h-12 bg-white border-4 border-black text-xs font-bold uppercase hover:bg-secondary-container transition-all"
                  >
                    Daftar Baru
                  </button>
                </div>
              </Tabs.Content>

              {/* ── Register Tab ── */}
              <Tabs.Content value="register">
                <form className="space-y-6 mt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Nama Lengkap</label>
                    <div className="relative">
                      <Input
                        placeholder="Ahmad Santoso"
                        className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Username</label>
                    <div className="relative">
                      <Input
                        placeholder="Siswa_Ahmad_24"
                        className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
                      />
                      <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none">
                        <User className="size-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Password</label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 h-full flex items-center pr-4 hover:text-foreground transition-colors"
                      >
                        <Eye className="size-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full !h-16 !text-xl font-black uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3"
                  >
                    DAFTAR
                    <ArrowRight className="size-6" />
                  </Button>
                </form>

                <div className="mt-10 border-t-4 border-black pt-6 text-center">
                  <p className="text-sm mb-4">Sudah punya akun?</p>
                  <button
                    type="button"
                    className="w-full h-12 bg-white border-4 border-black text-xs font-bold uppercase hover:bg-secondary-container transition-all"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              </Tabs.Content>
            </Tabs>
          </Card.Content>
        </Card>

        {/* Footer accent */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] font-bold uppercase flex items-center gap-2">
            <span>Ver: 2.0.4-KAWUNG</span>
            <span className="size-2 bg-secondary rounded-full" />
          </div>
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] font-bold uppercase">
            2024 Geometry Lab
          </div>
        </div>
      </main>

      {/* Fixed decorative stamps */}
      <div className="fixed top-10 right-10 hidden lg:block">
        <div className="grid grid-cols-2 gap-2">
          <div className="size-8 border-4 border-black bg-primary" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black bg-secondary" />
        </div>
      </div>
      <div className="fixed bottom-10 left-10 hidden lg:block">
        <div className="size-16 border-4 border-black rotate-45 flex items-center justify-center">
          <div className="size-8 bg-tertiary border-2 border-black" />
        </div>
      </div>
    </div>
  )
}
