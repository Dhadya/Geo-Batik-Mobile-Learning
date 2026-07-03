/**
 * Shared `appearance.elements` for `<SignIn />` and `<SignUp />` components.
 * Matches Nusantara Rebel / NeoBrutalism design language:
 * - 4px solid black borders on interactive elements
 * - Hard offset shadows (no blur)
 * - `font-black uppercase` labels and headings
 * - Square corners (`border-radius: 0`)
 * - Primary yellow (`#ffd93d`) call-to-action buttons
 */
export const clerkElements = {
  /* ── Root layout ───────────────────────────────── */
  card: "bg-transparent shadow-none border-0 p-0",
  header: "hidden",

  /* ── Social (OAuth) buttons ────────────────────── */
  socialButtonsBlockButton: [
    "w-full !h-14",
    "!rounded-none",
    "!border-4 !border-black",
    "bg-white",
    "!font-bold !uppercase !text-base",
    "hover:bg-gray-50",
  ].join(" "),

  socialButtonsBlockButtonText: "!font-bold !uppercase !text-base",

  /* ── "ATAU" divider ────────────────────────────── */
  dividerRow: "my-6",
  dividerLine: "!bg-black h-1",
  dividerText: "!text-xs !font-bold !uppercase !text-foreground",

  /* ── Form fields ───────────────────────────────── */
  formFieldLabel: "!text-xs !font-bold !uppercase !text-foreground",
  formFieldInput: [
    "!w-full !h-14",
    "!rounded-none",
    "!border-4 !border-black",
    "bg-white",
    "!text-base px-4",
  ].join(" "),

  formFieldErrorText: "!text-xs !font-bold !uppercase !text-destructive",

  /* ── Primary submit button ──────────────────────── */
  formButtonPrimary: [
    "!w-full !h-16",
    "!rounded-none",
    "!border-4 !border-black",
    "!bg-primary",
    "!text-primary-foreground",
    "!text-xl !font-black !uppercase",
  ].join(" "),

  /* ── Footer / navigation links ──────────────────── */
  footerActionLink:
    "!text-xs !font-bold !uppercase !underline !text-primary-dark",
  footerActionText: "!text-sm !text-foreground",

  /* ── Hide "Secured by Clerk" badge ─────────────── */
  footerPages: "hidden",

  /* ── Identity preview (email verification step) ─── */
  identityPreviewText: "!text-sm !font-bold",
  identityPreviewEditButton:
    "!text-xs !font-bold !uppercase !underline !text-primary-dark",
};
