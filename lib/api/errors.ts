import { NextResponse } from "next/server";

export const appErrorCodes = [
  "UNAUTHORIZED",
  "TAB_LOCKED",
  "SECTION_ALREADY_COMPLETED",
  "ATTEMPT_LIMIT_REACHED",
  "SECTION_NOT_FOUND",
  "MODULE_NOT_FOUND",
  "TAB_NOT_FOUND",
  "QUIZ_ALREADY_SUBMITTED",
  "INVALID_ANSWER",
  "INVALID_REQUEST",
  "VALIDATION_ERROR",
  "AI_EVALUATION_FAILED",
  "RATE_LIMITED",
  "INTERNAL_ERROR",
] as const;

export type AppErrorCode = (typeof appErrorCodes)[number];

const appErrorMeta: Record<AppErrorCode, { status: number; message: string }> = {
  UNAUTHORIZED:              { status: 401, message: "Unauthorized" },
  TAB_LOCKED:                { status: 403, message: "Tab belum terbuka" },
  SECTION_ALREADY_COMPLETED: { status: 409, message: "Bagian ini sudah selesai" },
  ATTEMPT_LIMIT_REACHED:     { status: 429, message: "Batas percobaan tercapai" },
  SECTION_NOT_FOUND:         { status: 404, message: "Bagian tidak ditemukan" },
  MODULE_NOT_FOUND:          { status: 404, message: "Modul tidak ditemukan" },
  TAB_NOT_FOUND:             { status: 404, message: "Tab tidak ditemukan" },
  QUIZ_ALREADY_SUBMITTED:    { status: 409, message: "Kuis sudah dikerjakan" },
  INVALID_ANSWER:            { status: 422, message: "Jawaban tidak valid" },
  INVALID_REQUEST:           { status: 400, message: "Request tidak valid" },
  VALIDATION_ERROR:          { status: 422, message: "Data tidak valid" },
  AI_EVALUATION_FAILED:      { status: 502, message: "Gagal mengevaluasi jawaban" },
  RATE_LIMITED:              { status: 429, message: "Terlalu banyak permintaan" },
  INTERNAL_ERROR:            { status: 500, message: "Terjadi kesalahan" },
};

export class AppError extends Error {
  constructor(readonly code: AppErrorCode) {
    super(appErrorMeta[code].message);
    this.name = "AppError";
  }
}

export function appError(code: AppErrorCode) {
  return new AppError(code);
}

export function handleError(e: unknown) {
  if (e instanceof AppError) {
    const meta = appErrorMeta[e.code];
    return NextResponse.json(
      { ok: false, error: { code: e.code, message: meta.message } },
      { status: meta.status },
    );
  }
  if (e instanceof SyntaxError) {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_JSON", message: "Format JSON tidak valid" } },
      { status: 400 },
    );
  }
  const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
  console.error("[API]", msg, e);
  return NextResponse.json(
    { ok: false, error: { code: "INTERNAL_ERROR", message: "Terjadi kesalahan pada server" } },
    { status: 500 },
  );
}
