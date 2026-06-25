# GEO-BATIK Style Guide

> Design system reference for agents. Follow these rules exactly when modifying or creating UI.

---

## Design Philosophy

**Neubrutalism** — bold, unapologetic, high-contrast. Think thick black borders, hard solid shadows, square buttons, and uppercase text. Combined with **Indonesian Batik cultural motifs** as subtle background textures.

Key principles:
- Thick black borders on EVERYTHING
- Hard drop shadows (no blur, no fade)
- Square/rectangular elements (no rounded buttons)
- Uppercase labels and headings
- Heavy font weights (800-900)
- High contrast, vibrant flat colors
- Interactive press effect (element shifts + shadow shrinks on click)

---

## Color Palette

### Brand Colors

| Token | Hex | Name | Usage |
|---|---|---|---|
| `brand-primary` | `#705d00` | Sogan Kuning | Primary headings, accents, scrollbar thumb |
| `brand-secondary` | `#006e29` | Pesisir Hijau | Translation module, success states |
| `brand-tertiary` | `#ae2f34` | Merah Gentongan | Reflection module, error states |

### Surfaces

| Token | Hex | Usage |
|---|---|---|
| `brand-bg` / `brand-surface` | `#fff8ef` | Page background (warm off-white) |
| `brand-surface-variant` | `#eae2d2` | Secondary surface, inactive areas |
| `brand-surface-container` | `#f5eddd` | Card backgrounds, containers |
| `brand-surface-container-high` | `#efe7d7` | Elevated containers |
| `brand-surface-container-highest` | `#eae2d2` | Highest elevation surface |

### Container Colors (Vibrant Accents)

| Token | Hex | Usage |
|---|---|---|
| `brand-primary-container` | `#ffd93d` | CTA buttons, badges, highlights, play button |
| `brand-secondary-container` | `#93f59c` | Success indicators, active tab states |
| `brand-tertiary-container` | `#ffd1ce` | Reflection headers, decorative accents |

### Text Colors

| Color | Hex | Usage |
|---|---|---|
| Body text | `#1f1b12` | All body copy (dark near-black) |
| Headings | `#705d00` | Primary heading color |
| Uppercase labels | `#1f1b12` | Always black, font-weight 900 |
| Muted labels | `#8a7b66` / `#a89882` | Grid labels, secondary info |

### Module-Specific Palettes

| Module | Header BG | Button BG | Container |
|---|---|---|---|
| Translation | `#ffe3ab` (warm cream) | `#ffd93d` (gold) | `#93f59c` (green) |
| Reflection | `#ffd1ce` (coral) | `#ffd1ce` (coral) | `#ffd1ce` (pink) |
| Login | `#fff8ef` (surface) | `#93f59c` (green) | — |
| Welcome CTA | `#ffd93d` (gold) | `#ffd93d` (gold) | — |

### Canvas/Grid Colors

| Element | Hex |
|---|---|
| Grid lines | `#e5ddcc` / `#e8dfce` |
| Grid labels | `#8a7b66` / `#a89882` |
| Canvas background | `#fdf3e4` / `#fffbf0` |
| Scrollbar track | `#fbf3e2` |

---

## Typography

### Font Family

**Space Grotesk** — single font for everything. Loaded via Google Fonts.

```
font-family: "Space Grotesk", sans-serif;
```

Weights available: 300, 400, 500, 600, 700, 800, 900

### Icon Font

**Google Material Symbols Outlined** — used for all UI icons.

```html
<span class="material-symbols-outlined">icon_name</span>
```

### Type Scale

| Element | Tailwind Classes | Usage |
|---|---|---|
| Page title | `text-3xl md:text-4xl font-black uppercase` | Welcome page hero |
| Section heading | `text-xl md:text-2xl font-black uppercase` | Module titles |
| Card heading | `text-lg font-extrabold` | Panel titles |
| Label (uppercase) | `text-xs font-black uppercase tracking-wide` | All labels, tab text |
| Body text | `text-sm font-bold` | Paragraphs, descriptions |
| Small text | `text-xs font-bold` | Captions, hints |
| Micro text | `text-[9px] font-bold` | Coordinate readouts, tiny labels |
| Button text | `text-xs font-extrabold uppercase` | All buttons |

### Rules

- **ALL labels are uppercase** — `text-xs font-black uppercase`
- **ALL headings are uppercase** — `font-black uppercase`
- **Body text is NEVER uppercase** — `text-sm font-bold`
- **Never use font-weight below 400** for UI text
- **Icons are inline** with text: `flex items-center gap-1.5`

---

## Spacing

### Page Layout

```
max-w-7xl mx-auto                    // Centered container, max 1280px
p-4 md:p-6 lg:p-8                    // Responsive page padding
grid grid-cols-1 lg:grid-cols-12     // 12-column grid on desktop
gap-6                                 // Section gap
```

### Standard Spacing Scale

| Value | Tailwind | Usage |
|---|---|---|
| 2px | `p-0.5` | Icon padding |
| 4px | `p-1` / `gap-1` | Inline element gaps |
| 6px | `p-1.5` / `gap-1.5` | Icon + text gaps |
| 8px | `p-2` / `gap-2` | Compact element gaps, small button padding |
| 10px | `p-2.5` | Input padding, checkbox padding |
| 12px | `p-3` / `gap-3` | Standard card padding, list item gaps |
| 16px | `p-4` / `gap-4` | Card padding, medium gaps |
| 20px | `p-5` / `gap-5` | Large card padding |
| 24px | `p-6` / `gap-6` | Section gaps, large card padding |
| 32px | `p-8` | Hero padding, large section spacing |

### Vertical Rhythm

| Spacing | Tailwind | Usage |
|---|---|---|
| 8px | `mb-2` | Space below small elements |
| 16px | `mb-4` | Space below paragraphs |
| 24px | `mb-6` | Space below section headers |
| 32px | `mb-8` | Space between major sections |

### Component Dimensions

| Element | Size |
|---|---|
| Button height | `py-2` (8px top/bottom) |
| Input height | `p-2.5` (10px) |
| Tab bar height | `p-1` container + button padding |
| Section banner | `p-4 sm:p-5` |

---

## Border Radius

The design system is intentionally **square**. Use minimal rounding.

| Element | Border Radius | Tailwind |
|---|---|---|
| Buttons | 0 (square) | `rounded-none` (default) |
| Cards/Panels | 0 (square) | `rounded-none` (default) |
| Inputs | 4px | `rounded` |
| Checkboxes | 4px | `rounded` |
| Labels/Badges | 4px | `rounded` |
| Slider tracks | 8px | `rounded-lg` |
| Circular elements | 9999px | `rounded-full` |

### Rules

- **Buttons are ALWAYS square** — never use `rounded` on buttons
- **Cards are ALWAYS square** — never use `rounded` on panels
- **Only inputs and small interactive elements** get `rounded` (4px)
- **`rounded-full`** ONLY for circular decorative elements (back buttons, color swatches, circles)

---

## Borders

All borders are **solid black** (`border-black`). No gradients, no colors on borders.

| Element | Border Width | Tailwind |
|---|---|---|
| Major cards, panels, headers | 4px | `border-4 border-black` |
| Sub-components, inputs, small buttons | 2px | `border-2 border-black` |
| Minor elements, checkboxes | 1px | `border border-black` |
| Tabs (inactive) | 2px | `border-2 border-transparent` |

---

## Shadows (Neubrutalism)

Hard, solid black offset shadows. **No blur, no opacity fade.**

| Shadow | CSS | Tailwind Class |
|---|---|---|
| Small | `4px 4px 0px 0px rgba(0,0,0,1)` | `neubrutalism-shadow-sm` |
| Default | `8px 8px 0px 0px rgba(0,0,0,1)` | `neubrutalism-shadow` |
| Large | `12px 12px 0px 0px rgba(0,0,0,1)` | `neubrutalism-shadow-lg` |

### Interactive Shadow (Press Effect)

```css
.interactive-card:hover  { transform: translate(2px, 2px); box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); }
.interactive-card:active { transform: translate(8px, 8px); box-shadow: 0px 0px 0px 0px rgba(0,0,0,1); }
```

### Button Press Effect

```
hover:translate-x-[2px] hover:translate-y-[2px]
hover:shadow-none
active:translate-x-[4px] active:translate-y-[4px]
```

---

## Component Rules

### Buttons

```jsx
// Primary CTA
<button className="bg-[#ffd93d] hover:bg-[#e6c335] text-black
  border-2 border-black font-extrabold text-xs py-2 px-4 uppercase
  cursor-pointer neubrutalism-shadow-sm
  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
  active:translate-x-[4px] active:translate-y-[4px]">
  LABEL
</button>

// Success action
<button className="bg-[#93f59c] hover:bg-[#7dd685] text-black
  border-2 border-black font-extrabold text-xs py-2 px-4 uppercase
  cursor-pointer ...">
</button>
```

Rules:
- Always `border-2 border-black`
- Always `text-black`
- Always `font-extrabold` or `font-black`
- Always `text-xs uppercase`
- Always `cursor-pointer`
- ALWAYS square corners (no `rounded`)
- Add shadow: `neubrutalism-shadow-sm`
- Add press effect on hover/active

### Cards / Panels

```jsx
<div className="bg-white border-4 border-black p-4 neubrutalism-shadow">
  {/* content */}
</div>
```

Rules:
- Always `bg-white` (or module-specific color like `bg-[#fff8ef]`)
- Always `border-4 border-black`
- Always `neubrutalism-shadow` (or `-sm` / `-lg`)
- Padding: `p-4` minimum, `p-6` for larger panels
- NEVER use `rounded` on cards

### Inputs

```jsx
<input className="w-full border-2 border-black p-2.5 text-xs font-bold
  focus:outline-none focus:ring-2 focus:ring-black rounded" />
```

Rules:
- Always `border-2 border-black`
- Always `p-2.5`
- Always `text-xs font-bold`
- Use `rounded` (4px radius)
- Focus: `focus:ring-2 focus:ring-black`

### Labels

```jsx
<label className="text-xs font-black text-black uppercase tracking-wide
  flex items-center gap-1.5">
  <span className="material-symbols-outlined text-sm">icon</span>
  LABEL TEXT
</label>
```

Rules:
- Always `text-xs font-black uppercase`
- Always `tracking-wide`
- Icons are `text-sm` inline with label

### Section Headers / Banners

```jsx
<div className="bg-[#ffd1ce] border-4 border-black p-4 sm:p-5 mb-6
  neubrutalism-shadow flex flex-col sm:flex-row justify-between
  items-center gap-4">
  <h2 className="text-xl font-black uppercase text-[#ae2f34]">
    Section Title
  </h2>
</div>
```

Rules:
- Always `border-4 border-black`
- Always `neubrutalism-shadow`
- Flex layout with responsive direction
- Heading is `font-black uppercase`

### Tab Bars

```jsx
// Container
<div className="border-4 border-black bg-white p-1 neubrutalism-shadow-sm">
  {/* Tab buttons */}
</div>

// Individual tab
<button className="flex-1 font-black text-xs uppercase border-2
  py-2 px-3 cursor-pointer
  [selected]: bg-[#ffd1ce] border-black neubrutalism-shadow-sm
    translate-y-[-2px] z-10
  [unselected]: bg-transparent text-gray-700 border-transparent">
</button>
```

Rules:
- Tabs use `translate-y-[-2px]` when active (raised above peers)
- Active tab has full border, inactive has transparent border
- Active tab gets container color (green, coral, gold, etc.)

### Checkboxes (Inquiry Steps)

```jsx
<label className="flex items-start gap-3 p-2.5 border-2 border-black rounded cursor-pointer
  [&:has(input:checked)]:bg-[#93f59c]/20 [&:has(input:checked)]:border-[#006e29]">
  <input type="checkbox" className="accent-black mt-0.5" />
  <span className="text-xs font-bold">
    Step text
  </span>
</label>
```

Rules:
- Always `border-2 border-black rounded`
- Checked state: green tinted background, green border
- Checkbox accent color: `accent-black`

---

## Batik Pattern Backgrounds

Use these CSS classes for decorative Batik watermarks:

| Class | Pattern | Opacity |
|---|---|---|
| `.parang-pattern` | Diagonal zigzag | 4% |
| `.kawung-pattern` | Circular floral arcs | 4% |
| `.kawung-pattern-opacity-10` | Circular floral arcs | 8% |
| `.parang-watermark-small` | Outline diagonal | 6% |

Apply as background patterns on hero sections, banners, or decorative containers.

---

## Animation

### Float Animation

```css
.animate-float {
  animation: float 5s ease-in-out infinite;
}
/* translateY(-10px) + rotate(2deg) */
```

Use for decorative elements, badges, or playful accents.

### Interactive Press

All interactive cards/buttons should have:
```
transition-all duration-150
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
active:translate-x-[4px] active:translate-y-[4px]
```

---

## Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Target |
|---|---|---|
| Default | (none) | Mobile (< 640px) |
| `sm` | `sm:` | Small tablet (640px+) |
| `md` | `md:` | Tablet (768px+) |
| `lg` | `lg:` | Desktop (1024px+) |

### Responsive Patterns

| Element | Mobile | Desktop |
|---|---|---|
| Page layout | `grid-cols-1` | `lg:grid-cols-12` |
| Content columns | Full width | `col-span-6` / `col-span-7` + `col-span-5` / `col-span-6` |
| Padding | `p-4` | `lg:p-8` |
| Banner direction | `flex-col` | `sm:flex-row` |
| Text sizes | Smaller scale | Larger scale |

---

## Quick Reference — Do's and Don'ts

### Do

- Use `border-4 border-black` on all major panels
- Use `neubrutalism-shadow` on cards and containers
- Make buttons square with `font-extrabold uppercase`
- Use `text-xs font-black uppercase` for labels
- Use `#ffd93d` for primary CTAs
- Use `#93f59c` for success states
- Use `#ffd1ce` for reflection module accents
- Add press effect (translate + shadow) on interactive elements
- Use Material Symbols for icons
- Use Space Grotesk for all text

### Don't

- Don't use `rounded` on buttons or cards
- Don't use gradient backgrounds
- Don't use soft/diffused shadows (always hard offset)
- Don't use font-weight below 700 for UI elements
- Don't use colors outside the palette
- Don't use multiple font families
- Don't skip the black border on containers
- Don't use `text-sm` or `text-base` for labels (use `text-xs`)
- Don't add rounded corners to the tab bar buttons
