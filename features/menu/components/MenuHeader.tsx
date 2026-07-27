import { Text } from "@/components/retroui/Text"

/** Menu page header with title and description. */
export function MenuHeader() {
  return (
    <div className="text-left">
      <Text
        as="h1"
        className="text-3xl md:text-4xl lg:text-5xl font-black uppercase inline-block mb-3 md:mb-4"
      >
        Menu Utama
      </Text>
      <p className="text-lg md:text-xl font-medium">
        Selamat datang di GEMATRI! Jelajahi transformasi geometri melalui lensa budaya batik.
        Pilih modul di bawah ini untuk memulai pembelajaran.
      </p>
    </div>
  )
}
