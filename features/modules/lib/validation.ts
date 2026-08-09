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

/** Per-field color status after checking answers. */
export type FieldColor = "green" | "orange" | "red" | null

export interface ValidationResult {
  isCorrect: boolean
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  summary: string
  correctCount: number
  totalItems: number
}

/** Normalize a string for lenient comparison: lowercase, collapse whitespace, remove spaces around operators/symbols. */
const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*([,();:=+*/\-])\s*/g, "$1")
    .trim()

/** Check whether a student answer merely echoes the question text instead of answering it. */
function echoesQuestion(question: string | undefined, answer: string): boolean {
  const q = normalizeText(question ?? "")
  const a = normalizeText(answer)
  if (q.length < 4 || a.length < 4) return false
  // Answer pasted the whole question (possibly with a trailing sentence appended).
  if (a === q || a.includes(q)) return true
  // Both are short: if the majority of the question tokens appear in the answer
  // and the answer is not notably longer, it is likely a reworded echo.
  const qTokens = q.split(" ")
  const aTokens = a.split(" ")
  const overlap = qTokens.filter((t) => aTokens.includes(t)).length
  const similarLength = aTokens.length >= qTokens.length * 0.6 && aTokens.length <= qTokens.length * 1.6
  return similarLength && overlap >= Math.max(2, Math.ceil(qTokens.length * 0.7))
}

/** Validate all items in a section against stored answers. */
export function validateSection(
  items: SectionItem[],
  fields: Record<string, Record<string, string>>,
  selections?: (number | null)[],
): ValidationResult {
  const errors: Record<string, string> = {}
  const fieldColors: Record<string, FieldColor> = {}
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
        const aOk = aVal === m.answer.a
        const bOk = bVal === m.answer.b
        fieldColors[`${item.id}_a`] = aOk ? "green" : "red"
        fieldColors[`${item.id}_b`] = bOk ? "green" : "red"
        if (!aOk) errors[`${item.id}_a`] = "Komponen matriks a belum sesuai, periksa kembali vektor translasi dari soal"
        if (!bOk) errors[`${item.id}_b`] = "Komponen matriks b belum sesuai, periksa kembali vektor translasi dari soal"
        if (aOk && bOk) correctCount++
        break
      }
      case "koordinat": {
        if (hasPilihanRefleksi) break
        const k = item as KoordinatItem
        const xVal = Number(itemAnswers.x)
        const yVal = Number(itemAnswers.y)
        const xOk = xVal === k.answer.x
        const yOk = yVal === k.answer.y
        fieldColors[`${item.id}_x`] = xOk ? "green" : "red"
        fieldColors[`${item.id}_y`] = yOk ? "green" : "red"
        if (!xOk) errors[`${item.id}_x`] = "Komponen x belum sesuai, periksa kembali hasil translasi"
        if (!yOk) errors[`${item.id}_y`] = "Komponen y belum sesuai, periksa kembali hasil translasi"
        if (xOk && yOk) correctCount++
        break
      }
      case "uraian": {
        const u = item as UraianItem
        // Vector uraian (item 11): answer stored as a_val/b_val, validated per-field
        if (u.id === 11) {
          const aVal = (itemAnswers.a_val ?? "").trim()
          const bVal = (itemAnswers.b_val ?? "").trim()
          const aOk = aVal.toLowerCase() === "a"
          const bOk = bVal.toLowerCase() === "b"
          fieldColors[`${item.id}_a_val`] = aOk ? "green" : "red"
          fieldColors[`${item.id}_b_val`] = bOk ? "green" : "red"
          if (!aOk) errors[`${item.id}_a_val`] = aVal ? "Komponen a belum sesuai, isi dengan variabel" : "Komponen a belum diisi"
          if (!bOk) errors[`${item.id}_b_val`] = bVal ? "Komponen b belum sesuai, isi dengan variabel" : "Komponen b belum diisi"
          if (aOk && bOk) correctCount++
          break
        }
        const userAns = (itemAnswers.text ?? "").trim()
        if (!userAns) {
          fieldColors[`${item.id}_text`] = "red"
          errors[`${item.id}_text`] = "Jawaban belum diisi"
          break
        }
        /** Normalize string for comparison: trim, lower case, collapse all whitespace, and remove spaces around operators/symbols. */
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .replace(/\s+/g, " ")
            .replace(/\s*([,();:=+*/\-])\s*/g, "$1")
            .trim()
        const userLower = normalize(userAns)

        // Helper to extract formula/coordinate elements stripped of outer parentheses
        const cleanFormula = (str: string) => str.replace(/^\((.*)\)$/, "$1").trim()

        // Check if string contains coordinate-like pair or formula
        const isCoordinatePair = (str: string) => {
          const inner = cleanFormula(str)
          return inner.includes(",")
        }

        // Normalize simple linear algebraic expressions (e.g., "2h-y", "-y+2h", "2*h - y", "a+x", "x+a")
        const normalizeExpression = (expr: string) => {
          const s = expr.replace(/\s+/g, "").replace(/\*/g, "");

          // Canonicalize common coordinate formula expressions
          if (s === "2h-y" || s === "-y+2h" || s === "2h+(-y)") return "2h-y";
          if (s === "2h-x" || s === "-x+2h" || s === "2h+(-x)") return "2h-x";
          if (s === "2k-y" || s === "-y+2k" || s === "2k+(-y)") return "2k-y";
          if (s === "2k-x" || s === "-x+2k" || s === "2k+(-x)") return "2k-x";
          if (s === "x+a" || s === "a+x") return "x+a";
          if (s === "y+b" || s === "b+y") return "y+b";
          if (s === "x-a" || s === "-a+x") return "x-a";
          if (s === "y-b" || s === "-b+y") return "y-b";
          
          // Reject repeated variable inputs like "xx" or "yy"
          if (/^([a-z])\1+$/i.test(s)) return `invalid_${s}`;

          return s;
        };

        // Standardize coordinate format for flexible comparison, e.g. "(-x, y)" vs "-x, y" vs "( -x , y )"
        const normalizeCoordinate = (str: string) => {
          const cleaned = cleanFormula(normalize(str))
          if (!cleaned.includes(",")) return normalizeExpression(cleaned)
          const parts = cleaned.split(",").map((p) => normalizeExpression(p))
          return `(${parts.join(",")})`
        }

        // A student answer that merely repeats the question is NOT a correct answer
        if (echoesQuestion(u.question, userAns)) {
          fieldColors[`${item.id}_text`] = "red"
          errors[`${item.id}_text`] =
            "Jawaban hanya mengulang kata-kata dari pertanyaan. Tuliskan simpulanmu dengan kalimat yang menjelaskan konsep."
          break
        }

        let isCorrect = false

        // Special handling for coordinate formulas (e.g. (-x, y), (x+a, y+b), (2h-x, y))
        // Include original answer, accepted alternatives, and their negated forms (multiply both sides by -1)
        const originalAnswers = [u.answer, ...(u.acceptAnswers ?? [])]
        const negatedAnswers = originalAnswers.map((ans) => {
          const parts = ans.split('=')
          if (parts.length === 2) {
            const left = parts[0].trim()
            const right = parts[1].trim()
            return `-${left} = -${right}`
          }
          return ans
        })
        const allExpectedAnswers = [...originalAnswers, ...negatedAnswers]
        const expectedIsCoordinate = allExpectedAnswers.some(isCoordinatePair)

        if (expectedIsCoordinate) {
          const userNormCoord = normalizeCoordinate(userAns)
          isCorrect = allExpectedAnswers.some((exp) => {
            if (!isCoordinatePair(exp)) return false
            const expNormCoord = normalizeCoordinate(exp)
            return userNormCoord === expNormCoord
          })
        }

        // 1. If requiredKeywords are defined, treat each group as a required set (AND). The answer is correct only if all groups match.
        if (!isCorrect && u.requiredKeywords && u.requiredKeywords.length > 0) {
          const isCoordinateFormula = u.requiredKeywords.some((group) =>
            group.some(
              (kw) =>
                /^-?[xy]$/i.test(kw.trim()) ||
                /^2[a-z]-x$/i.test(kw.trim()) ||
                /^2[a-z]-y$/i.test(kw.trim())
            )
          )
          const hasCommaIfRequired = !isCoordinateFormula || userLower.includes(",")
          
          let matchesAllGroups =
            hasCommaIfRequired &&
            u.requiredKeywords.every((group) =>
              group.some((kw) => {
                const normKw = normalize(kw)
                if (normKw.length <= 2) {
                  return new RegExp(
                    `(?:^|[^a-z0-9])${normKw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}(?:$|[^a-z0-9])`,
                    "i"
                  ).test(userLower)
                }
                return userLower.includes(normKw)
              })
            )

          // If it's a coordinate pair formula (e.g. requiredKeywords = [["-y"], ["-x"]]), enforce the component sequence order
          if (matchesAllGroups && isCoordinateFormula && userLower.includes(",")) {
            const parts = userLower.split(",").map((p) => p.trim())
            if (parts.length === 2 && u.requiredKeywords.length === 2) {
              const firstGroupMatches = u.requiredKeywords[0].some((kw) => {
                const normKw = normalize(kw)
                return normKw.length <= 2
                  ? new RegExp(`(?:^|[^a-z0-9])${normKw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}(?:$|[^a-z0-9])`, "i").test(parts[0])
                  : parts[0].includes(normKw)
              })
              const secondGroupMatches = u.requiredKeywords[1].some((kw) => {
                const normKw = normalize(kw)
                return normKw.length <= 2
                  ? new RegExp(`(?:^|[^a-z0-9])${normKw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}(?:$|[^a-z0-9])`, "i").test(parts[1])
                  : parts[1].includes(normKw)
              })
              matchesAllGroups = firstGroupMatches && secondGroupMatches
            }
          }

          isCorrect = matchesAllGroups
        }
        // 2. Fallback to exact / partial / automatic clause matching (skip for coordinate formula or requiredKeywords items to enforce strict rules)
        if (!isCorrect && !expectedIsCoordinate && (!u.requiredKeywords || u.requiredKeywords.length === 0)) {
          isCorrect = allExpectedAnswers.some((expected) => {
            const expLower = normalize(expected)
            if (userLower === expLower) return true
            if (userLower.includes(expLower)) return true
            if (expLower.includes(userLower) && userLower.length >= expLower.length * 0.5) return true

            // Keyword matching: split expected into meaningful clauses, check user answer covers most keywords
            const clauses = expLower.split(/[,.;:!?]+/).map((c) => c.trim()).filter((c) => c.length > 3)
            if (clauses.length === 0) return false
            const matchedClauses = clauses.filter((clause) => {
              const keywords = clause.split(/\s+/).filter((w) => w.length > 2)
              if (keywords.length === 0) return false
              const matched = keywords.filter((kw) => userLower.includes(kw))
              return matched.length >= Math.ceil(keywords.length * 0.4)
            })
            return matchedClauses.length >= Math.ceil(clauses.length * 0.4)
          })
        }
        fieldColors[`${item.id}_text`] = isCorrect ? "green" : "red"
        if (!isCorrect) {
          errors[`${item.id}_text`] = "Jawaban uraian kurang tepat, coba periksa langkah penyelesaian dan pastikan sesuai dengan format yang diminta"
        } else {
          correctCount++
        }
        break
      }
      case "memasangkan": {
        const m = item as MemasangkanItem
        let allMatch = true
        for (const [leftId, expectedRightId] of Object.entries(m.correctMatches)) {
          const ok = itemAnswers[leftId] === expectedRightId
          fieldColors[`${item.id}_${leftId}`] = ok ? "green" : "red"
          if (!ok) {
            errors[`${item.id}_${leftId}`] = "Pasangan tidak sesuai, coba hubungkan kembali setiap pasangan berdasarkan konsep yang telah dipelajari"
            allMatch = false
          }
        }
        if (allMatch) correctCount++
        break
      }
      case "pilihan_ganda": {
        const pg = item as PilihanGandaItem
        if (pg.multiSelect && pg.correctIndices) {
          const bitmap = Number(fields[String(pg.id)]?.selected ?? 0)
          const selected: number[] = []
          let b = bitmap
          let idx = 0
          while (b) {
            if (b & 1) selected.push(idx)
            b >>= 1
            idx++
          }
          const correct = selected.length === pg.correctIndices.length &&
            pg.correctIndices.every((v) => selected.includes(v))
          fieldColors[`${pg.id}_selection`] = correct ? "green" : "red"
          if (correct) {
            correctCount++
          } else if (selected.some((v) => pg.correctIndices!.includes(v))) {
            errors[`${pg.id}_selection`] = "Jawaban kurang lengkap, ada opsi lain yang lebih tepat"
          } else {
            errors[`${pg.id}_selection`] = "Pilihan ganda belum tepat, pastikan semua opsi yang dipilih sesuai dengan jawaban yang benar"
          }
        } else if (selections !== undefined) {
          const idx = selections[i] ?? -1
          const ok = idx === pg.correctIndex
          fieldColors[`${pg.id}_selection`] = ok ? "green" : "red"
          if (ok) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Pilihan yang dipilih tidak sesuai jawaban benar, coba perhatikan kembali pertanyaan dengan seksama"
          }
        } else {
          const idx = fields[String(pg.id)]?.selected !== undefined
            ? Number(fields[String(pg.id)].selected)
            : -1
          const ok = idx === pg.correctIndex
          fieldColors[`${pg.id}_selection`] = ok ? "green" : "red"
          if (ok) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Jawaban belum tepat, pastikan opsi yang dipilih benar berdasarkan materi yang telah dipelajari"
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
        fieldColors[`${item.id}_order`] = isCorrect ? "green" : "red"
        if (isCorrect) {
          correctCount++
        } else {
            errors[`${item.id}_order`] = "Urutan tidak sesuai, perhatikan urutan logis langkah-langkah berdasarkan konsep yang dipelajari"
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
          const xOk = xVal === correctAnswers[idx].x
          const yOk = yVal === correctAnswers[idx].y
          fieldColors[`${item.id}_x${idx}`] = xOk ? "green" : "red"
          fieldColors[`${item.id}_y${idx}`] = yOk ? "green" : "red"
          if (!xOk) errors[`${item.id}_x${idx}`] = "Komponen x belum sesuai, hitung kembali berdasarkan jenis refleksi yang dipilih"
          if (!yOk) errors[`${item.id}_y${idx}`] = "Komponen y belum sesuai, hitung kembali berdasarkan jenis refleksi yang dipilih"
          if (!xOk || !yOk) allCorrect = false
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
          const ok = userValue === correctValue
          fieldColors[`${item.id}_checklist_${idx}`] = ok ? "green" : "red"
          if (!ok) {
            errors[`${item.id}_checklist`] = "Ada jawaban yang belum sesuai, perhatikan setiap pernyataan dengan cermat dan bandingkan dengan hasil pengamatan"
            allCorrect = false
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
    fieldColors,
    correctCount,
    totalItems: items.length,
    summary:
      correctCount === items.length
        ? "Semua jawaban benar! Kamu telah menjawab dengan tepat pada seluruh soal. Pertahankan pemahaman ini dan lanjutkan ke materi berikutnya."
        : `${correctCount}/${items.length} jawaban benar. Perhatikan bagian yang masih salah dan coba pahami konsep di baliknya sebelum mencoba lagi.`,
  }
}
