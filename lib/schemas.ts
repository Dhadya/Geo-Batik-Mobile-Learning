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
