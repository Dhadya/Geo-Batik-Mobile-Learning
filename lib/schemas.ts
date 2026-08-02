import { z } from "zod";

export const TranslasiTitikSchema = z.object({
  t1_a: z.number({ message: "Wajib diisi" }).refine(val => val === 2, { message: "Salah" }),
  t1_b: z.number({ message: "Wajib diisi" }).refine(val => val === 1, { message: "Salah" }),
  t2_a: z.number({ message: "Wajib diisi" }).refine(val => val === 5, { message: "Salah" }),
  t2_b: z.number({ message: "Wajib diisi" }).refine(val => val === 0, { message: "Salah" }),
  t3_a: z.number({ message: "Wajib diisi" }).refine(val => val === 6, { message: "Salah" }),
  t3_b: z.number({ message: "Wajib diisi" }).refine(val => val === 2, { message: "Salah" }),
  t4_x: z.number({ message: "Wajib diisi" }).refine(val => val === 2, { message: "Salah" }),
  t4_y: z.number({ message: "Wajib diisi" }).refine(val => val === 2, { message: "Salah" }),
});

export const TranslasiBangunSchema = z.object({
  b1_x: z.number({ message: "Wajib diisi" }).refine(val => val === -1, { message: "Salah" }),
  b1_y: z.number({ message: "Wajib diisi" }).refine(val => val === 7, { message: "Salah" }),
  b2_x: z.number({ message: "Wajib diisi" }).refine(val => val === -1, { message: "Salah" }),
  b2_y: z.number({ message: "Wajib diisi" }).refine(val => val === 5, { message: "Salah" }),
  b3_x: z.number({ message: "Wajib diisi" }).refine(val => val === 1, { message: "Salah" }),
  b3_y: z.number({ message: "Wajib diisi" }).refine(val => val === 5, { message: "Salah" }),
  b4_x: z.number({ message: "Wajib diisi" }).refine(val => val === 1, { message: "Salah" }),
  b4_y: z.number({ message: "Wajib diisi" }).refine(val => val === 7, { message: "Salah" }),
});

export type TranslasiTitikData = z.infer<typeof TranslasiTitikSchema>;
export type TranslasiBangunData = z.infer<typeof TranslasiBangunSchema>;

/** Validates a section attempt payload: which tab/section, attempt number, answer data, score, and final status. */
export const saveSectionSchema = z.object({
  tab: z.string().min(1),
  sectionType: z.enum(["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"]),
  attempt: z.union([z.literal(1), z.literal(2)]),
  answer: z.record(z.string(), z.unknown()),
  score: z.number().int().min(0).max(100).nullable().optional(),
  status: z.enum(["correct", "wrong_attempt1", "wrong_attempt2"]).optional(),
  feedback: z.string().optional(),
});

/** Inferred input type for saving a section attempt. */
export type SaveSectionInput = z.infer<typeof saveSectionSchema>;

/** Validates a client-supplied terminal section claim used to reconcile + unlock a tab. */
export const sectionClaimSchema = z.object({
  sectionType: z.enum(["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"]),
  status: z.enum(["correct", "wrong_attempt2"]),
  score: z.number().int().min(0).max(100).nullable().optional(),
  attempt: z.union([z.literal(1), z.literal(2)]).optional(),
  answer: z.record(z.string(), z.unknown()).optional(),
});

/** Inferred type for a client-supplied terminal section claim. */
export type SectionClaim = z.infer<typeof sectionClaimSchema>;

/** Validates an unlock request: which tab was completed to trigger the next unlock, plus optional terminal section claims. */
export const unlockSchema = z.object({
  completedTab: z.string().min(1),
  sections: z.array(sectionClaimSchema).optional(),
});

/** Validates a section evaluation request for Gemini AI. */
export const evaluateSectionSchema = z.object({
  module: z.string().min(1),
  tab: z.string().min(1),
  sectionType: z.enum(["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"]),
  items: z.array(z.any()).min(1),
  answers: z.record(z.string(), z.record(z.string(), z.string())),
  attempt: z.union([z.literal(1), z.literal(2)]),
});

/** Validates a pembahasan generation request for Gemini AI. */
export const pembahasanSchema = z.object({
  questions: z.array(z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    explanation: z.string(),
  })),
  answers: z.record(z.number(), z.number()),
});
