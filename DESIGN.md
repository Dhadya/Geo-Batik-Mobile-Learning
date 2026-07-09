---
name: Nusantara Rebel
colors:
  surface: "#fff8ef"
  surface-dim: "#e1d9c9"
  surface-bright: "#fff8ef"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fbf3e2"
  surface-container: "#f5eddd"
  surface-container-high: "#efe7d7"
  surface-container-highest: "#eae2d2"
  on-surface: "#1f1b12"
  on-surface-variant: "#4d4633"
  inverse-surface: "#343025"
  inverse-on-surface: "#f8f0df"
  outline: "#7e7761"
  outline-variant: "#d0c6ad"
  surface-tint: "#705d00"
  primary: "#705d00"
  on-primary: "#ffffff"
  primary-container: "#ffd93d"
  on-primary-container: "#725e00"
  inverse-primary: "#e8c426"
  secondary: "#006e29"
  on-secondary: "#ffffff"
  secondary-container: "#93f59c"
  on-secondary-container: "#00732b"
  tertiary: "#ae2f34"
  on-tertiary: "#ffffff"
  tertiary-container: "#ffd1ce"
  on-tertiary-container: "#b03136"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ffe173"
  primary-fixed-dim: "#e8c426"
  on-primary-fixed: "#221b00"
  on-primary-fixed-variant: "#554500"
  secondary-fixed: "#96f89f"
  secondary-fixed-dim: "#7bdb85"
  on-secondary-fixed: "#002107"
  on-secondary-fixed-variant: "#00531d"
  tertiary-fixed: "#ffdad8"
  tertiary-fixed-dim: "#ffb3b0"
  on-tertiary-fixed: "#410006"
  on-tertiary-fixed-variant: "#8c1520"
  background: "#fff8ef"
  on-background: "#1f1b12"
  surface-variant: "#eae2d2"
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: "500"
    lineHeight: "1.5"
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: "700"
    lineHeight: "1"
  caption:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: "400"
    lineHeight: "1.4"
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style

The design system embodies "The Academic Rebel"—a synthesis of structured Indonesian heritage and high-energy modernism. It marries the disciplined geometry of traditional Batik (specifically Kawung and Parang motifs) with the raw, unapologetic energy of Neubrutalism.

The brand personality is authoritative yet disruptive. It feels like a prestigious academic journal reimagined as a street-art zine. The target audience is intellectually curious, culturally grounded, and aesthetically bold. Every interaction should feel intentional, loud, and tactile, evoking a sense of "structured chaos" where heritage meets the future.

## Colors

The palette is a high-voltage interpretation of traditional Southeast Asian pigments. It utilizes a stark contrast between a "Paper" surface and saturated "Ink" primaries.

- **Canary Yellow (#FFD93D):** Primary action and highlight color.
- **Vibrant Cyan-Green (#6BCB77):** Success states and secondary features.
- **Electric Pink (#FF6B6B):** Alerts, destructive actions, and emphasis.
- **Deep Blue (#4D96FF):** Information and tertiary accents.
- **Base Surface (#FDFCFB):** An off-white textured feel resembling archival paper.
- **Ink Black (#000000):** Used for all borders, shadows, and primary text to ensure maximum legibility and structural integrity.

## Typography

Space Grotesk is used exclusively to maintain a technical, geometric, and modern feel.

- **Headlines:** Should be set with tight leading and slight negative tracking to enhance the "loud" editorial look.
- **Body:** Ample line height is required to balance the visual weight of the heavy borders and bright colors.
- **Contrast:** Almost all text should be #000000. Use white text only on the Pink or Blue backgrounds when absolutely necessary for legibility.
- **Batik Integration:** Larger display type can occasionally feature the Parang (diagonal slope) pattern as a clipping mask for a high-end editorial effect.

## Layout & Spacing

The layout follows a rigid 8px grid system, reflecting the precision of Batik wax-printing (Canting).

- **Grid:** Use a 12-column fluid grid for desktop and a 4-column grid for mobile.
- **Gutters:** Maintain a fixed 24px gutter to prevent the heavy 4px borders from feeling cluttered.
- **Visual Rhythm:** Elements should feel "blocked" together. Use exaggerated padding (minimum 24px) inside cards to allow the background Batik watermarks to breathe.
- **Alignment:** Stick to hard-left alignment for headlines to reinforce the academic structure.

## Elevation & Depth

This system rejects traditional Z-axis depth (blur) in favor of **Hard-Offset Shadows**.

- **Shadows:** Use a solid #000000 fill. The standard offset is `8px` horizontal and `8px` vertical. There is 0px blur.
- **Borders:** Every interactive or containing element must have a `4px` solid black border.
- **Interactivity:** On "Hover," the element should shift `4px` toward the shadow (reducing the offset to 4px). On "Active/Press," the element should shift the full `8px`, aligning perfectly with its shadow to simulate a physical button being pressed into the page.
- **Layering:** Use the Parang pattern watermarks (10% opacity black) to distinguish background sections from foreground cards.

## Shapes

The shape language is strictly **Sharp (0px)**.

- **Corners:** No border-radius is permitted. This reinforces the "Brutalist" aspect and mimics the clipped edges of traditional textile stamps.
- **Batik Watermarks:**
  - **Kawung (Intersecting Circles):** Use as a watermark for "Stable" or "Static" containers.
  - **Parang (Machete/Slope):** Use as a watermark for "Action-oriented" or "Dynamic" containers.
- **Dividers:** Use 4px thick black lines. For decorative dividers, use a repeating Parang geometric pattern string.

## Components

- **Buttons:** Large, sharp-edged rectangles with a 4px black border and an 8px hard shadow. Use Primary Yellow for main actions. Text is always bold and centered.
- **Cards:** Base color is Surface (#FDFCFB) or one of the primary colors. Must feature a subtle Kawung pattern watermark in the bottom-right corner.
- **Input Fields:** 4px black border, white background. On focus, the background shifts to the Quaternary Blue, and the shadow increases from 4px to 8px.
- **Chips/Labels:** Small boxes with 2px borders (the only exception to the 4px rule) and no shadows. Use for categories or tags.
- **Lists:** Items separated by 4px black lines. Selected items use the Secondary Green background with a 4px hard shadow.
- **Batik Accents:** Use a "Stamp" component—a small square container with a bold Batik motif—as a bullet point or a decorative icon frame.
