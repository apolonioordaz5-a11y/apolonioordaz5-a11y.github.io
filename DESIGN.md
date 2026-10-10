---
version: beta
name: "Apolonio Ordaz Engineering Portfolio"
description: "A stark black-and-white engineering portfolio: full-bleed imagery, oversized type, and generous negative space."
colors:
  bg: "#0A0A0A"
  bg-deep: "#000000"
  fg: "#FFFFFF"
  gray-1: "#1A1A1A"
  gray-2: "#2A2A2A"
  gray-3: "#555555"
  muted: "#888888"
  text-2: "#B3B3B3"
  overlay: "rgba(0, 0, 0, 0.55)"
  stress-steps: "6 hard bands: #2340B8, #1F86C9, #2AA889, #A8B334, #D08A2C, #C23B2E"
  cat-design: "#FF8A3D"
  cat-analysis: "#A78BFA"
  cat-fluids: "#22D3EE"
typography:
  family: "Inter (Google Fonts), Helvetica Neue, Arial, sans-serif"
  weights: "300 taglines · 400 body · 600 labels/buttons · 700–800 headlines"
  label-tracking: "0.16–0.18em uppercase"
rounded:
  DEFAULT: "0"
spacing:
  page-max: "1440px"
  gutter: "clamp(16px, 4vw, 56px)"
  section-pad: "clamp(96px, 12vw, 180px)"
components:
  action:
    minHeight: "48px"
  navigation:
    desktopHeight: "72px"
    mobileHeight: "64px"
    mobileBreakpoint: "960px"
---

# Apolonio Ordaz Engineering Portfolio Design System

## Overview

### Creative North Star

The site should feel like a serious hardware company's site: near-black canvas, white type, full-bleed imagery, and lots of negative space. Confidence comes from scale and restraint (huge headlines, hairline dividers, sharp outlined buttons), not from color or decoration.

### Product context and register

- **Audience and primary job:** Engineering recruiters and hiring managers need to understand Apolonio's technical range, evidence of hands-on work, and career direction within a few minutes.
- **Target market and evidence:** United States engineering internships and early-career roles, based on the Cal Poly, Baja SAE, and Vandenberg content in the repository.
- **Locale and language policy:** English only. Copy is direct, specific, and avoids unsupported performance claims.
- **Usage scene:** Desktop-first recruiting review with a complete narrow-mobile path. Project evidence must remain visible before supporting biography.
- **Register:** Brand portfolio on the homepage; supporting project pages and the timeline use a quieter technical-document register within the same black-and-white system.
- **Memorable signature:** Full-viewport grayscale hero, alternating image/copy feature blocks, and a minimal black footer with link columns.
- **Restraint:** Color only through the stress gradient and category colors, no rounded corners, no shadows, subtle motion only, and no invented renders.
- **Token ownership/runtime mapping:** `style.css` is the canonical runtime source; this file mirrors its `:root` values. Older case-study rules still reference legacy names (`--carbon`, `--alloy`, `--steel`, `--line`, `--safety`…), which are aliased to the new tokens in the same `:root` block.

## Colors

Strict black and white. `bg` is the page canvas; `bg-deep` (pure black) is used for the solid header, dropdowns, mobile overlay, CTA band, and footer. White is primary text and the only "accent": it is used for button outlines, button hover fills, and focus rings. `text-2` carries secondary copy, `muted` carries small labels and metadata, and `gray-1`/`gray-2`/`gray-3` are reserved for surfaces, borders, and dividers. The case-study B-2 diagram keeps its own internal palette because it is a figure, not chrome.

**Color accents.** The signature is a small FEA contour legend (`stress-steps`): six hard, muted color bands from blue to red with gray tick marks beneath, shown only under section headings. It deliberately avoids a smooth full-spectrum gradient so it reads as a simulation scale, not a rainbow. Nav hover underlines are plain white. Projects carry a category color that matches the Work dropdown groups: orange for Design & build, violet for Analysis & dynamics, cyan for Fluid mechanics. It shows on card tag lines (with a small square marker), the card divider, the project plate edge, the card button hover fill, and the dropdown group labels. Add `data-category="design|analysis|fluids"` to a card or label to apply it.

## Typography

Inter throughout. Headlines are big and bold (700–800) with tight negative tracking; the line under a headline is set in a lighter weight (300). Small labels, nav links, and button text are uppercase, 11–13px, weight 600, with wide (0.16–0.18em) letter-spacing.

## Layout

Content is capped at 1440px with fluid gutters. The homepage is a stack of full-width sections with generous vertical padding: hero (100vh, content bottom-left), profile strip, selected work as alternating image-left/image-right feature blocks, experience list, a centered mission statement with the capability grid, and a black CTA band. Case studies keep their evidence-first reading column. Inner pages pad the body by the header height; `scroll-padding-top` and `scroll-margin-top` keep anchor targets clear of the fixed header.

## Elevation & Depth

Flat. Hierarchy comes from scale, hairline `gray-2` borders, and the switch from transparent to solid black on the header. No shadows.

## Shapes

Square corners everywhere. Circles appear only for real geometry, timeline markers, and status dots.

## Components

### Buttons and actions

`.btn`: transparent fill, 1px white border, uppercase tracked label, 48px minimum height. Hover/focus fills white and turns the text black. `.btn--quiet` uses a gray border at rest. `.btn--sm` is used in the header and footer. `.text-link` is the inline underline variant.

### Navigation

A fixed header with the logo on the left, nav on the right, and a Resume CTA on the far right. It is transparent over the hero and becomes solid black with a bottom border after 40px of scroll, or whenever it holds focus or an open dropdown. "Work" opens a three-column dropdown of every case study (hover on desktop, click/tap and keyboard everywhere, Esc closes). Below 960px the nav collapses to a hamburger that opens a full-screen black overlay with a close (×) button, a Work accordion, focus trapping, and Esc to close.

### Footer

Logo, mission line, Email/LinkedIn buttons, three link columns, and copyright with back-to-top.

### Motion

The header background/border transition and hover fills run at about 240ms. Sections marked `.reveal` fade and slide up 28px on first entry into the viewport. `prefers-reduced-motion` disables reveals, transitions, and smooth scrolling.

## Do's and Don'ts

- **Do:** Lead with engineering evidence and describe personal contribution precisely.
- **Do:** Add new colors only as `:root` tokens; never hard-code hex values in components.
- **Don't:** Introduce colors outside the stress gradient and the three category colors, or add rounded corners, glassmorphism, or shadows.
- **Don't:** Invent confidential-looking imagery, performance metrics, or project outcomes to fill a visual gap.
