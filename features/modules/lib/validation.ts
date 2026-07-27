import type {
  SectionItem,
  MatriksItem,
  KoordinatItem,
  UraianItem,
  MemasangkanItem,
  PilihanGandaItem,
  UrutkanItem,
  PilihanRefleksiItem,
  ChecklistTableItem,
} from "../types"

export interface ValidationResult {
  isCorrect: boolean
  errors: Record<string, string>
  summary: string
  correctCount: number
  totalItems: number
}

/** Validate all items in a section against stored answers. */
export function validateSection(
  items: SectionItem[],
  fields: Record<string, Record<string, string>>,
  selections?: (number | null)[],
): ValidationResult {
  const errors: Record<string, string> = {}
  let correctCount = 0
  const hasPilihanRefleksi = items.some((item) => item.type === "pilihan_refleksi")

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemAnswers = fields[String(item.id)] ?? {}

    switch (item.type) {
      case "matriks": {
        const m = item as MatriksItem
        const aVal = Number(itemAnswers.a)
        const bVal = Number(itemAnswers.b)
        if (aVal !== m.answer.a) errors[`${item.id}_a`] = "Komponen matriks a belum sesuai — periksa kembali vektor translasi dari soal"
        if (bVal !== m.answer.b) errors[`${item.id}_b`] = "Komponen matriks b belum sesuai — periksa kembali vektor translasi dari soal"
        if (aVal === m.answer.a && bVal === m.answer.b) correctCount++
        break
      }
      case "koordinat": {
        if (hasPilihanRefleksi) break
        const k = item as KoordinatItem
        const xVal = Number(itemAnswers.x)
        const yVal = Number(itemAnswers.y)
        if (xVal !== k.answer.x || yVal !== k.answer.y) {
          errors[`${item.id}_coord`] = "Koordinat titik belum sesuai — pastikan x dan y dihitung berdasarkan vektor translasi"
        } else {
          correctCount++
        }
        break
      }
      case "uraian": {
        const u = item as UraianItem
        const userAns = (itemAnswers.text ?? "").trim()
        const normalize = (s: string) => s.replace(/\u2212/g, "-").replace(/\s+/g, "").toLowerCase()
        const allExpected = [u.answer, ...(u.acceptAnswers ?? [])]
        const isCorrect = allExpected.some((expected) => {
          const normExpected = normalize(expected)
          const normUser = normalize(userAns)
          if (normUser === normExpected) return true
          return normExpected.split(/[.,;!?]+/).some((p) => p.trim() && normUser.includes(p))
        })
        if (!userAns || !isCorrect) {
          errors[`${item.id}_text`] = "Jawaban uraian kurang tepat — coba periksa langkah penyelesaian dan pastikan sesuai dengan format yang diminta"
        } else {
          correctCount++
        }
        break
      }
      case "memasangkan": {
        const m = item as MemasangkanItem
        const allCorrect = m.leftItems.every(
          (l) => itemAnswers[l.id] === m.correctMatches[l.id],
        )
        for (const [leftId, expectedRightId] of Object.entries(m.correctMatches)) {
          if (itemAnswers[leftId] !== expectedRightId) {
            errors[`${item.id}_${leftId}`] = "Pasangan tidak sesuai — coba hubungkan kembali setiap pasangan berdasarkan konsep yang telah dipelajari"
          }
        }
        if (allCorrect) correctCount++
        break
      }
      case "pilihan_ganda": {
        const pg = item as PilihanGandaItem
        if (pg.multiSelect && pg.correctIndices) {
          const selectedStr = fields[String(pg.id)]?.selected ?? ""
          const selected = selectedStr ? selectedStr.split(",").map(Number) : []
          const correct = selected.length === pg.correctIndices.length &&
            pg.correctIndices.every((v) => selected.includes(v))
          if (correct) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Pilihan ganda belum tepat — pastikan semua opsi yang dipilih sesuai dengan jawaban yang benar"
          }
        } else if (selections !== undefined) {
          const idx = selections[i] ?? -1
          if (idx === pg.correctIndex) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Pilihan yang dipilih tidak sesuai jawaban benar — coba perhatikan kembali pertanyaan dengan seksama"
          }
        } else {
          const idx = fields[String(pg.id)]?.selected !== undefined
            ? Number(fields[String(pg.id)].selected)
            : -1
          if (idx === pg.correctIndex) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Jawaban belum tepat — pastikan opsi yang dipilih benar berdasarkan materi yang telah dipelajari"
          }
        }
        break
      }
      case "urutkan": {
        const u = item as UrutkanItem
        const userOrder = (itemAnswers.order ?? "").split(",").map(Number)
        const expectedOrder = u.items.map((_, i) => i)
        const isCorrect = userOrder.length === expectedOrder.length &&
          userOrder.every((val, idx) => val === expectedOrder[idx])
        if (isCorrect) {
          correctCount++
        } else {
            errors[`${item.id}_order`] = "Urutan tidak sesuai — perhatikan urutan logis langkah-langkah berdasarkan konsep yang dipelajari"
        }
        break
      }
      case "pilihan_refleksi": {
        const pr = item as PilihanRefleksiItem
        const selected = itemAnswers.selected ?? ""
        if (!selected) {
          errors[`${item.id}_selected`] = "Pilih salah satu jenis refleksi terlebih dahulu sebelum mengisi jawaban"
          break
        }
        const correctAnswers = pr.correctAnswers[selected]
        if (!correctAnswers) {
          errors[`${item.id}_selected`] = "Jenis refleksi yang dipilih tidak tersedia dalam soal ini"
          break
        }
        let allCorrect = true
        for (let idx = 0; idx < correctAnswers.length; idx++) {
          const xVal = Number(itemAnswers[`x${idx}`])
          const yVal = Number(itemAnswers[`y${idx}`])
          if (xVal !== correctAnswers[idx].x || yVal !== correctAnswers[idx].y) {
            errors[`${item.id}_coord${idx}`] = "Koordinat bayangan belum sesuai — hitung kembali berdasarkan jenis refleksi yang dipilih"
            allCorrect = false
          }
        }
        if (allCorrect) correctCount++
        break
      }
      case "checklist_table": {
        const ct = item as ChecklistTableItem
        let allCorrect = true
        for (let idx = 0; idx < ct.statements.length; idx++) {
          const userValue = itemAnswers[`statement_${idx}`] ?? ""
          const correctValue = ct.correctAnswers[idx] ? "ya" : "tidak"
          if (userValue !== correctValue) {
            errors[`${item.id}_checklist`] = "Ada jawaban yang belum sesuai — perhatikan setiap pernyataan dengan cermat dan bandingkan dengan hasil pengamatan"
            allCorrect = false
            break
          }
        }
        if (allCorrect) correctCount++
        break
      }
    }
  }

  return {
    isCorrect: Object.keys(errors).length === 0,
    errors,
    correctCount,
    totalItems: items.length,
    summary:
      correctCount === items.length
        ? "Semua jawaban benar! Kamu telah menjawab dengan tepat pada seluruh soal. Pertahankan pemahaman ini dan lanjutkan ke materi berikutnya."
        : `${correctCount}/${items.length} jawaban benar. Perhatikan bagian yang masih salah dan coba pahami konsep di baliknya sebelum mencoba lagi.`,
  }
}
