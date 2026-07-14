# GEMATRI Style Guide

> Design system reference for agents. Follow these rules exactly when modifying or creating UI.

---

## Design Philosophy

**Nusantara Rebel** — The Academic Rebel: Indonesian heritage meets NeoBrutalism. Structured Batik geometry (Kawung, Parang) meets raw, unapologetic high-contrast modernism.

Key principles:

- **4px solid black borders** on EVERYTHING interactive or containing
- **Hard drop shadows** (no blur, no fade) — `8px 8px 0 0 #000`
- **Square/rectangular** elements (0px border-radius on cards and buttons)
- **Uppercase** labels and headings (`font-black uppercase`)
- **Space Grotesk** for all text (weights 400–900)
- **High contrast** — almost all text is `#000` on warm paper
- **Interactive press** — element shifts into its shadow on click

---

## Color Palette

All colors are defined as CSS custom properties in `app/globals.css` and mapped to Tailwind utilities via `@theme inline`. **Never use raw hex values** — always use Tailwind semantic classes (e.g. `bg-primary`, `text-foreground`, `border-border`).

### Theme Tokens (Light — `:root`)

| Token                   | Hex       | Tailwind Utility          | Usage                                  |
| ----------------------- | --------- | ------------------------- | -------------------------------------- |
| `--background`          | `#fff8ef` | `bg-background`           | Page background (warm paper)           |
| `--foreground`          | `#1f1b12` | `text-foreground`         | All body text                          |
| `--card`                | `#ffffff` | `bg-card`                 | Card, popover, input backgrounds       |
| `--card-foreground`     | `#1f1b12` | `text-card-foreground`    | Text on cards                          |
| `--primary`             | `#ffd93d` | `bg-primary`              | CTA buttons, primary actions           |
| `--primary-foreground`  | `#000`    | `text-primary-foreground` | Text on primary bg                     |
| `--primary-dark`        | `#705d00` | `text-primary-dark`       | Dark gold for headings, accents        |
| `--secondary`           | `#006e29` | `bg-secondary`            | Success states, translation module     |
| `--secondary-container` | `#93f59c` | `bg-secondary-container`  | Active tabs, success indicators        |
| `--tertiary`            | `#ae2f34` | `bg-tertiary`             | Errors, reflection module              |
| `--tertiary-container`  | `#ffd1ce` | `bg-tertiary-container`   | Reflection headers, decorative accents |
| `--muted`               | `#eae2d2` | `bg-muted`                | Secondary surface, inactive areas      |
| `--muted-foreground`    | `#4d4633` | `text-muted-foreground`   | Secondary text, labels                 |
| `--accent`              | `#ffe173` | `bg-accent`               | Highlight, badge backgrounds           |
| `--border`              | `#000`    | `border-border`           | All borders (always black)             |
| `--outline`             | `#7e7761` | `border-outline`          | Secondary borders, dividers            |
| `--error`               | `#ba1a1a` | `bg-error`                | Destructive actions                    |
| `--error-container`     | `#ffdad6` | `bg-error-container`      | Error toast backgrounds                |
| `--surface-dim`         | `#e1d9c9` | `bg-surface-dim`          | Dimmed surface areas                   |
| `--surface-container`   | `#f5eddd` | `bg-surface-container`    | Container backgrounds                  |

### Dark Mode (`.dark`)

Inverted surface with bright accent glow. Applied via the `.dark` class on `<html>`.

| Token          | Hex       | Tailwind Utility  |
| -------------- | --------- | ----------------- |
| `--background` | `#1a1a1a` | `bg-background`   |
| `--foreground` | `#f8f0df` | `text-foreground` |
| `--card`       | `#242424` | `bg-card`         |
| `--primary`    | `#ffd93d` | `bg-primary`      |
| `--border`     | `#5c5c5c` | `border-border`   |
| `--secondary`  | `#7bdb85` | `bg-secondary`    |
| `--tertiary`   | `#ffb3b0` | `bg-tertiary`     |

### Module-Specific Accents

| Module     | Primary Button      | Container                        | Heading Accent      |
| ---------- | ------------------- | -------------------------------- | ------------------- |
| Translasi  | `bg-primary` (gold) | `bg-secondary-container` (green) | `text-primary-dark` |
| Refleksi   | `bg-primary` (gold) | `bg-tertiary-container` (coral)  | `text-tertiary`     |
| Login/Auth | `bg-primary` (gold) | `bg-background`                  | `text-primary-dark` |

### Canvas/Grid Colors (not tokenised — use raw hex in canvas components)

| Element           | Hex       |
| ----------------- | --------- |
| Grid lines        | `#e5ddcc` |
| Grid labels       | `#8a7b66` |
| Canvas background | `#fdf3e4` |

---

## Typography

### Font Family

**Space Grotesk** — single font for everything. Loaded via `next/font/google` in `app/layout.tsx` with variable `--font-sans`.

```
--font-sans: "Space Grotesk", sans-serif;
```

Weights available: 300, 400, 500, 600, 700

### Icons

**lucide-react** — used for all UI icons. Import from `lucide-react`.

```tsx
import { Eye, EyeOff, ArrowRight, Check, X, Menu } from "lucide-react";
```

### Type Scale

| Element           | Classes                                     | Usage                        |
| ----------------- | ------------------------------------------- | ---------------------------- |
| Hero title        | `text-[84px] font-black uppercase`          | Landing page GEMATRI         |
| Page title        | `text-2xl md:text-3xl font-black uppercase` | Module/quiz page titles      |
| Section heading   | `text-xl font-black uppercase`              | Card titles, section headers |
| Card heading      | `text-lg font-black uppercase`              | Card.Title                   |
| Label (uppercase) | `text-xs font-black uppercase`              | Tab labels, form labels      |
| Body text         | `text-sm font-medium`                       | Paragraphs, descriptions     |
| Small text        | `text-xs`                                   | Captions, hints              |
| Button text       | implicit in `<Button>` variant              | All buttons                  |

### Rules

- **ALL labels and headings are uppercase** — `font-black uppercase`
- **Body text is NEVER uppercase** — `font-medium` or `font-bold`
- **Never use `font-weight` below 400** for UI text
- **Icons are inline** with text: `flex items-center gap-2`

---

## Spacing

### Page Layout

```
max-w-8xlxl mx-auto                    // Centered container, max 1280px
p-4 md:p-6 lg:p-8                    // Responsive page padding
space-y-6                             // Vertical spacing between children
gap-6                                 // Grid/card gaps
```

### Standard Spacing

| Tailwind    | Usage                            |
| ----------- | -------------------------------- |
| `gap-2`     | Compact element gaps             |
| `gap-3`     | Icon + text gaps                 |
| `p-4`       | Card padding, mobile page edges  |
| `p-6`       | Large card padding, section gaps |
| `p-8`       | Hero padding                     |
| `space-y-6` | Vertical rhythm between sections |

---

## Border Radius

The design system is intentionally **square** (`--radius: 0`).

| Element       | Radius | Tailwind        |
| ------------- | ------ | --------------- |
| Buttons       | 0      | `!rounded-none` |
| Cards         | 0      | (default)       |
| Inputs        | 4px    | `rounded`       |
| Checkboxes    | 4px    | `rounded`       |
| Labels/Badges | 4px    | `rounded`       |
| Decor circles | 9999px | `rounded-full`  |

### Rules

- **Buttons are ALWAYS square** — add `!rounded-none` if the component defaults include rounding
- **Cards are ALWAYS square**

---

## Borders

All borders use `--border` which is always `#000` in light mode.

| Element                    | Width | Classes                  |
| -------------------------- | ----- | ------------------------ |
| Major cards, panels        | 4px   | `border-4 border-border` |
| Sub-components, inputs     | 2px   | `border-2 border-border` |
| Minor elements, checkboxes | 2px   | `border-2 border-border` |

---

## Shadows (NeoBrutalism)

Hard offset shadows defined in `globals.css`. **No blur, no opacity fade.**

| Shadow  | Box-shadow                            | Tailwind Class |
| ------- | ------------------------------------- | -------------- |
| Small   | `2px 2px 0 0 var(--color-border)`     | `shadow-sm`    |
| Default | `3px 3px 0 0 var(--color-border)`     | `shadow`       |
| Large   | `6px 6px 0 0 var(--color-border)`     | `shadow-lg`    |
| XLarge  | `10px 10px 0 1px var(--color-border)` | `shadow-xl`    |
| 2XLarge | `16px 16px 0 1px var(--color-border)` | `shadow-2xl`   |

Custom `.neubrutal-shadow` and `.hover-shift` / `.active-shift` utilities are available for CTA buttons:

```css
.neubrutal-shadow {
  box-shadow: 12px 12px 0 0 #000;
}
.hover-shift:hover {
  transform: translate(-4px, -4px);
  box-shadow: 16px 16px 0 0 #000;
}
.active-shift:active {
  transform: translate(8px, 8px);
  box-shadow: 0 0 0 0 #000;
}
```

---

## Component Rules

### Buttons — ALWAYS use RetroUI `<Button>`

**Never use a plain `<button>` element.** Always import from `@/components/retroui/Button`.

```tsx
import { Button } from "@/components/retroui/Button"

// Primary CTA (gold bg, thick shadow, press effect)
<Button variant="default" size="lg"
  className="neubrutal-shadow hover-shift active-shift rounded-none! flex items-center gap-3">
  MASUK
  <ArrowRight className="size-10!" />
</Button>

// Outline style (white bg, thick border)
<Button variant="outline" size="md" className="rounded-none!">
  KEMBALI
</Button>

// Icon-only button (password toggle, etc.)
<Button variant="ghost" size="icon" className="rounded-none!"
  onClick={() => setVisible(!visible)}>
  {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
</Button>
```

Rules:

- Always add `!rounded-none` (RetroUI may default to rounded)
- Use `variant="default"` for primary CTAs, `variant="outline"` for secondary, `variant="ghost"` for icon-only
- Add `neubrutal-shadow hover-shift active-shift` for primary CTAs
- Icons inside buttons use `lucide-react` components

### Cards

```tsx
import { Card } from "@/components/retroui/Card";

<Card className="w-full">
  <Card.Header>
    <Card.Title>JUDUL</Card.Title>
  </Card.Header>
  <Card.Content className="space-y-4">
    <p className="text-sm font-medium">Content text</p>
  </Card.Content>
</Card>;
```

Rules:

- Card borders are implicit in the component
- `Card.Title` is `font-black uppercase` automatically
- Padding is handled by `Card.Content`

### Tabs

```tsx
import { Tabs } from "@/components/retroui/Tab";

<Tabs defaultValue="titik">
  <Tabs.List>
    <Tabs.Trigger value="titik">TITIK</Tabs.Trigger>
    <Tabs.Trigger value="garis">GARIS</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="titik">Content</Tabs.Content>
</Tabs>;
```

Rules:

- Tab labels are always uppercase
- Use `defaultValue` for initial active tab
- Triggers and content are linked by `value`

### Inputs

```tsx
// Plain input (use AuthFormField for auth forms)
<input
  className="w-full border-2 border-border p-2.5 text-xs font-bold rounded
    focus:outline-none focus:ring-2 focus:ring-border bg-card text-foreground"
/>
```

```tsx
// Auth form field (label + input + optional icon)
import { AuthFormField } from "@/components/auth/AuthFormField";

<AuthFormField
  label="NAMA PENGGUNA"
  type="text"
  placeholder="Masukkan nama pengguna"
  icon={<User className="size-4" />}
/>;
```

Rules:

- Always `border-2 border-border`
- Always `p-2.5 text-xs font-bold`
- Use `rounded` (4px radius, not square)

### Labels

```tsx
<label className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
  LABEL TEXT
</label>
```

### AuthLayout (Authentication Pages)

```tsx
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthFormField } from "@/components/auth/AuthFormField"

<AuthLayout subtitle="MASUK UNTUK MELANJUTKAN">
  <AuthFormField label="NAMA PENGGUNA" ... />
  <Button variant="default" size="lg" className="w-full">MASUK</Button>
</AuthLayout>
```

AuthLayout provides: branding shell, decorative Kawung watermark, footer text, and Batik stamps.

---

## Module Config (Tab Mappings)

Defined in `data/moduleConfig.ts` (to be created). Controls tab navigation in `modul/[slug]/layout.tsx`.

```typescript
// slugs and their tab values
translasi → titik, garis, bangun
refleksi  → sumbu-x, sumbu-y, garis, bangun
```

The layout renders a tab bar from `MODULE_TABS[slug]` and footer with Kembali/Kuis buttons.

---

## Responsive Breakpoints

| Breakpoint | Tailwind | Target            |
| ---------- | -------- | ----------------- |
| Default    | (none)   | Mobile (< 640px)  |
| `sm`       | `sm:`    | Tablet (640px+)   |
| `md`       | `md:`    | Tablet (768px+)   |
| `lg`       | `lg:`    | Desktop (1024px+) |

---

## Quick Reference — Do's and Don'ts

### Do

- Use Tailwind semantic classes (`bg-primary`, `text-foreground`, `border-border`)
- Import `Button` from `@/components/retroui/Button` — never use plain `<button>`
- Add `!rounded-none` to buttons
- Use `font-black uppercase` for labels and headings
- Use `lucide-react` for all icons
- Use `space-y-6` for vertical section rhythm
- Use `neubrutal-shadow hover-shift active-shift` for primary CTAs

### Don't

- Don't use raw hex colors — always use Tailwind semantic tokens
- Don't use `<button>` HTML element — always use `<Button>` from RetroUI
- Don't use `rounded` on buttons or cards
- Don't use gradient backgrounds
- Don't use soft/diffused shadows
- Don't use Material Symbols — use `lucide-react`
- Don't use font-weight below 700 for labels
- Don't skip black borders on interactive elements
