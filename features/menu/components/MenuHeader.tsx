import { Text } from "@/components/retroui/Text"

/** Menu page header with title and description. */
export function MenuHeader() {
  return (
    <div className="text-center md:text-left">
      <Text
        as="h1"
        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase inline-block mb-3 md:mb-4"
      >
        Menu Utama
      </Text>
      <p className="text-base md:text-lg max-w-2xl">
        Selamat datang di GEMATRI! Jelajahi transformasi geometri melalui lensa budaya batik.
        Pilih modul di bawah ini untuk memulai pembelajaran.
      </p>
    </div>
  )
}
