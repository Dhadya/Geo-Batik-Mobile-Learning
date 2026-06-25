# Batik Geometry — Style Guide

> Design system reference. Uses **RetroUI** (NeoBrutalism) components via `@retroui/*` (shadcn registry).  
> Import from `@/components/retroui/<Component>` or `@/components/ui/<Component>`.

---

## RetroUI Components (Installed)

All components live in `components/retroui/` and are re-exported through `components/ui/` where needed.

| Component | Import Path | Description |
|-----------|-------------|-------------|
| `Button` | `@/components/retroui/Button` | Pressable with shadow, variants |
| `Card` | `@/components/retroui/Card` | Panel with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content` |
| `Input` | `@/components/retroui/Input` | Text input with validation styles |
| `Badge` | `@/components/retroui/Badge` | Label/chip with variants |
| `Tabs` | `@/components/retroui/Tab` | `Tabs.Root` / `Tabs.List` / `Tabs.Trigger` / `Tabs.Content` |
| `Progress` | `@/components/retroui/Progress` | Progress bar indicator |
| `Dialog` | `@/components/retroui/Dialog` | Modal with `Dialog.Trigger`, `.Header`, `.Content`, `.Footer`, `.Close` |
| `Radio` | `@/components/retroui/Radio` | Radio group for quiz answers |
| `Checkbox` | `@/components/retroui/Checkbox` | Checkbox input |
| `Select` | `@/components/retroui/Select` | Dropdown select |
| `Loader` | `@/components/retroui/Loader` | Loading spinner |
| `Alert` | `@/components/retroui/Alert` | Notification banner |
| `Toggle` | `@/components/retroui/Toggle` | On/off toggle switch |
| `Tooltip` | `@/components/retroui/Tooltip` | Hover tooltip |
| `Label` | `@/components/retroui/Label` | Form label |
| `Textarea` | `@/components/retroui/Textarea` | Multi-line input |
| `Text` | `@/components/retroui/Text` | Typography component |

---

## Design Philosophy

**NeoBrutalism** — bold, unapologetic, high-contrast. Thick black borders, hard solid shadows, square elements, uppercase text. Combined with **Indonesian Batik cultural motifs** as subtle background textures.

Key principles:
- Thick black borders on EVERYTHING (`border-2` or `border-4`)
- Hard drop shadows (`shadow-md` / `shadow-lg` via RetroUI theme)
- Square/rectangular elements
- Uppercase labels and headings
- Heavy font weights (700+)
- High-contrast flat colors
- Interactive press effect via RetroUI's built-in `hover:translate-y-1 active:translate-y-2`

---

## Color Palette

### Theme CSS Variables (defined in `app/globals.css`)

Use Tailwind semantic classes instead of raw hex values:

| Token | Tailwind Class | Hex | Usage |
|-------|---------------|------|-------|
| `--background` | `bg-background` | `#F5ECE7` | Page background |
| `--foreground` | `text-foreground` | `#000` | Body text |
| `--primary` | `bg-primary` / `text-primary` | `#FFCC00` | CTA buttons, active states |
| `--primary-foreground` | `text-primary-foreground` | `#000` | Text on primary |
| `--secondary` | `bg-secondary` | `#000` | Dark buttons |
| `--secondary-foreground` | `text-secondary-foreground` | `#fff` | Text on dark |
| `--muted` | `bg-muted` | `#d5d5d5` | Inactive areas |
| `--muted-foreground` | `text-muted-foreground` | `#5a5a5a` | Secondary labels |
| `--accent` | `bg-accent` | `#fae583` | Highlights |
| `--card` | `bg-card` | `#fff` | Card surfaces |
| `--border` | `border-border` | `#000` | All borders |
| `--destructive` | `bg-destructive` | `#e63946` | Errors |

### Module-Specific Palettes

| Module | Header/Accent | Button | Container |
|--------|-------------|--------|-----------|
| Translation | `#ffe3ab` (warm cream) | `bg-primary` (gold) | Green accents |
| Reflection | `#ffd1ce` (coral) | `bg-primary` (gold) | Coral/pink |
| Login | `bg-background` | `bg-primary` (gold) | — |
| Splash/CTA | `bg-primary` (gold) | `bg-primary` (gold) | — |

---

## Typography

### Font Family

**Geist Sans** (Tailwind `font-sans`) — single font for everything.

Weights: 400, 500, 600, 700, 800, 900

### Icon Library

**Lucide React** — used for all UI icons.

```tsx
import { ArrowRight, Check, X } from "lucide-react"
```

### Type Scale

Use RetroUI's `<Text>` component or raw Tailwind classes:

```tsx
<Text as="h1" className="text-3xl font-black uppercase">Page Title</Text>
<Text as="h2" className="text-xl font-black uppercase">Section Title</Text>
<Text as="p" className="text-sm font-medium">Body text</Text>
```

| Element | Classes | Usage |
|---------|---------|-------|
| Page title | `text-3xl md:text-4xl font-black uppercase` | Hero headlines |
| Section heading | `text-xl md:text-2xl font-black uppercase` | Module titles |
| Card heading | `text-lg font-extrabold` | Panel titles |
| Label | `text-xs font-black uppercase tracking-widest` | All labels |
| Body | `text-sm font-medium` | Paragraphs |
| Small | `text-xs` | Captions |

### Rules

- ALL labels are uppercase (`text-xs font-black uppercase tracking-widest`)
- ALL headings are uppercase
- Body text is NEVER uppercase
- Minimum font-weight: 500 for UI elements
- Icons inline with text: `flex items-center gap-1.5`

---

## Component Usage

### Button

```tsx
import { Button } from "@/components/retroui/Button"

// Variants: default | secondary | outline | link | ghost
// Sizes: sm | md | lg | icon

<Button variant="default" size="md">MASUK</Button>
<Button variant="outline" size="sm">KEMBALI</Button>
<Button variant="secondary" size="lg">MULAI</Button>
<Button variant="link">LIHAT</Button>
<Button variant="ghost" size="icon"><X /></Button>
```

Press effect is built-in: `hover:translate-y-1 active:translate-y-2 active:translate-x-1`.

### Card

```tsx
import { Card } from "@/components/retroui/Card"

<Card className="w-full max-w-md">
  <Card.Header>
    <Card.Title>Judul</Card.Title>
    <Card.Description>Deskripsi optional</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Isi konten</p>
  </Card.Content>
</Card>
```

### Input

```tsx
import { Input } from "@/components/retroui/Input"

<Input placeholder="Username" />
<Input type="password" placeholder="Password" aria-invalid={hasError} />
```

Error state: add `aria-invalid={true}` for red border + shadow.

### Badge

```tsx
import { Badge } from "@/components/retroui/Badge"

// Variants: default | outline | solid | surface
// Sizes: sm | md | lg
<Badge variant="solid" size="sm">BARU</Badge>
<Badge variant="surface">AKTIF</Badge>
```

### Tabs

```tsx
import { Tabs } from "@/components/retroui/Tab"

<Tabs defaultValue="titik">
  <Tabs.List>
    <Tabs.Trigger value="titik">TITIK</Tabs.Trigger>
    <Tabs.Trigger value="bangun">BANGUN</Tabs.Trigger>
    <Tabs.Trigger value="garis">GARIS</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="titik">Konten titik</Tabs.Content>
  <Tabs.Content value="bangun">Konten bangun</Tabs.Content>
  <Tabs.Content value="garis">Konten garis</Tabs.Content>
</Tabs>
```

### Progress

```tsx
import { Progress } from "@/components/retroui/Progress"

<Progress value={65} className="w-full" />
```

### Dialog (Modal)

```tsx
import { Dialog } from "@/components/retroui/Dialog"
import { Button } from "@/components/retroui/Button"

<Dialog>
  <Dialog.Trigger>
    <Button>BUKA</Button>
  </Dialog.Trigger>
  <Dialog.Content size="md">
    <Dialog.Header>Konfirmasi</Dialog.Header>
    <Dialog.Description>Apakah kamu yakin?</Dialog.Description>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="outline">BATAL</Button>
      </Dialog.Close>
      <Button>YAKIN</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

### Radio & Checkbox

```tsx
import { Radio } from "@/components/retroui/Radio"
import { Checkbox } from "@/components/retroui/Checkbox"

<Radio name="quiz" value="a" label="Pilihan A" />
<Radio name="quiz" value="b" label="Pilihan B" />

<Checkbox label="Langkah 1" />
```

### Select

```tsx
import { Select } from "@/components/retroui/Select"

<Select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

### Alert

```tsx
import { Alert } from "@/components/retroui/Alert"

<Alert variant="default">Informasi penting</Alert>
<Alert variant="destructive">Terjadi kesalahan</Alert>
```

### Loader

```tsx
import { Loader } from "@/components/retroui/Loader"

<Loader />              {/* default size */}
<Loader size="lg" />    {/* large */}
```

### Toggle & Tooltip

```tsx
import { Toggle } from "@/components/retroui/Toggle"
import { Tooltip } from "@/components/retroui/Tooltip"

<Toggle>Nyalakan</Toggle>

<Tooltip content="Info tambahan">
  <Button>HOVER</Button>
</Tooltip>
```

### Label & Textarea

```tsx
import { Label } from "@/components/retroui/Label"
import { Textarea } from "@/components/retroui/Textarea"

<Label htmlFor="bio">BIOGRAFI</Label>
<Textarea id="bio" placeholder="Tulis..." />
```

### Text (Typography)

```tsx
import { Text } from "@/components/retroui/Text"

<Text as="h1" className="font-black uppercase">Heading 1</Text>
<Text as="h2" className="font-black uppercase">Heading 2</Text>
<Text as="p" className="text-sm font-medium">
  Paragraf dengan style default.
</Text>
```

---

## Batik Pattern Backgrounds

Use these CSS classes for decorative Batik watermarks:

| Class | Pattern | Opacity |
|-------|---------|---------|
| `.parang-pattern` | Diagonal zigzag | 4% |
| `.kawung-pattern` | Circular floral arcs | 4% |
| `.kawung-pattern-opacity-10` | Circular floral arcs | 8% |
| `.parang-watermark-small` | Outline diagonal | 6% |

Apply as background patterns on hero sections, banners, or decorative containers.

---

## Spacing

Standard spacing via Tailwind — same scale throughout.

| Value | Class | Usage |
|-------|-------|-------|
| 8px | `p-2` / `gap-2` | Compact gaps, small buttons |
| 12px | `p-3` / `gap-3` | Standard card padding |
| 16px | `p-4` / `gap-4` | Card content padding |
| 24px | `p-6` / `gap-6` | Section gaps |
| 32px | `p-8` | Large sections |

Page layout: `max-w-7xl mx-auto p-4 md:p-6 lg:p-8`

---

## Responsive Breakpoints

| Breakpoint | Prefix | Target |
|------------|--------|--------|
| Default | (none) | Mobile (< 640px) |
| `sm` | `sm:` | Small tablet (640px+) |
| `md` | `md:` | Tablet (768px+) |
| `lg` | `lg:` | Desktop (1024px+) |

---

## Quick Reference — Do's and Don'ts

### Do
- Use RetroUI components from `@/components/retroui/`
- Use `border-border` for all borders (automatically black)
- Use `bg-primary` / `bg-secondary` / `bg-muted` for backgrounds
- Use `text-foreground` / `text-muted-foreground` for text colors
- Add `className` overrides for module-specific colors
- Use Lucide icons (`lucide-react`)
- Apply Batik decorative patterns where needed

### Don't
- Don't use raw hex colors directly — use CSS variable classes
- Don't import from `@base-ui/react` directly — use RetroUI wrappers
- Don't add custom button styles — use RetroUI `Button` variants
- Don't skip the `border` prop on Card/Dialog — RetroUI includes them
- Don't use `rounded` on buttons — RetroUI buttons handle this
