---
version: alpha
name: "Apolonio Ordaz Engineering Portfolio"
description: "A calm, fabrication-first mechanical engineering portfolio arranged like a refined project folio."
colors:
  carbon: "#F4ECDF"
  panel: "#F8F3EA"
  panel-raised: "#F1E5D5"
  alloy: "#2F2A26"
  steel: "#5F5148"
  line: "#D9C6A9"
  accent: "#D3B48A"
  accent-strong: "#B88F5D"
  focus: "#D8BF9D"
typography:
  display:
    fontFamily: "Arial Narrow, Aptos Narrow, Roboto Condensed, sans-serif"
  body:
    fontFamily: "Aptos, Segoe UI, Arial, sans-serif"
  utility:
    fontFamily: "Consolas, Courier New, monospace"
rounded:
  DEFAULT: "12px"
spacing:
  page-max: "90rem"
  desktop-gutter: "2.625rem"
  mobile-gutter: "1.125rem"
  section-gap: "9.375rem"
components:
  action:
    minHeight: "3.125rem"
  navigation:
    desktopHeight: "4.75rem"
  project-card:
    borderWidth: "1px"
---

# Apolonio Ordaz Engineering Portfolio Design System

## Overview

### Creative North Star

The site should feel like a refined engineering project folio laid out on warm drafting stock: calm ivory surfaces, graphite text, restrained brass-tan details, honest project photography, and concise technical annotations. It should signal technical confidence without borrowing the visual aggression of warning labels or shop signage.

### Product context and register

- **Audience and primary job:** Engineering recruiters and hiring managers need to understand Apolonio's technical range, evidence of hands-on work, and career direction within a few minutes.
- **Target market and evidence:** United States engineering internships and early-career roles, based on the Cal Poly, Baja SAE, and Vandenberg content in the repository.
- **Locale and language policy:** English only. Copy is direct, specific, and avoids unsupported performance claims.
- **Usage scene:** Desktop-first recruiting review with a complete narrow-mobile path. Project evidence must remain visible before supporting biography.
- **Register:** Brand portfolio on the homepage; supporting project pages and the timeline use a quieter technical-document register within the same warm neutral system.
- **Memorable signature:** Large image-first project plates pair real engineering evidence with small drawing-register labels and unboxed technical captions.
- **Restraint:** One quiet accent color, softened homepage geometry, no portrait overlays, no gratuitous motion, and no invented renders.
- **Anti-references:** Generic blue SaaS portfolios, rounded glass cards, neon cyberpunk dashboards, and editorial cream-and-serif templates.
- **Token ownership/runtime mapping:** Model B. `style.css` is the canonical runtime source; this file mirrors its `:root` values. Homepage components consume those variables under `.portfolio-home`. Drift is checked by comparing this frontmatter with the `:root` block.

## Colors

The warm ivory canvas, pale project surfaces, and sand-colored rules create quiet separation without stark contrast. Graphite is primary text and warm gray is secondary text. All headings and reading copy on ivory, beige, tan, or pale panel surfaces must remain graphite or warm gray; light text is reserved for genuinely dark image overlays and technical diagrams. The brass-tan accent is reserved for primary actions, focus-adjacent details, technical labels, and drawing highlights; it intentionally avoids warning-orange intensity. `style.css` retains its established runtime token names while this file mirrors their exact values. Case studies and the timeline inherit the same calm palette so movement between overview and evidence remains continuous.

## Typography

Condensed system sans faces carry large engineering headlines; the regular system sans stack handles prose without a font download or layout shift. Consolas and Courier New are reserved for metadata, labels, dates, dimensions, and navigation. Headlines may use uppercase with tight spacing; body copy remains sentence case and uses generous line height.

## Layout

The site is capped at 90rem and uses structural one-pixel rules. The homepage hero splits into a large thesis and a wider portrait-led profile panel, with the headshot above the academic and career information. Featured work appears before experience and capabilities as a uniform image-first portfolio wall: four large 4:3 project plates on wide screens, two on tablets, and one on phones. Case studies use a narrow evidence-first reading column with numbered sections, reserved media geometry, and horizontally scrollable data tables where needed. The timeline uses the same header and technical-label language, with role filters above a single chronological rail. The resume/contact route is an engineering request sheet with a revision label, candidate register, and work-coverage cells. A compact academic identity block with the provided Cal Poly seal sits inside the homepage contact section. At 820px the hero stacks; at 620px project cards become single-column and actions become full-width.

## Elevation & Depth

Hierarchy comes from tonal layers, borders, and the sticky blurred header. Static cards have no shadows. Homepage cards use restrained lift and a fine brass-tan border on hover without moving surrounding layout.

## Shapes

Homepage actions and the portrait use modest rounding to make the first impression calmer and more approachable. Project plates keep a restrained 14px image frame with unboxed text beneath it so the work, rather than a container, owns the visual weight. Technical case-study surfaces remain sharper and document-like. Circles appear only when they describe actual geometry or timeline markers.

## Components

### Foundational visual states

Links and buttons have visible hover, active, and `focus-visible` treatment. Pointer affordances never depend on hover-only content. Disabled and busy states are not currently used. Media geometry is reserved in CSS and explicit image dimensions are included in markup.

### Buttons and actions

Primary actions use a solid `accent` surface with graphite text. Secondary actions use transparent surfaces with `line` borders. Both keep a 50px minimum height, explicit text labels, and right-aligned directional symbols.

### Navigation and data display

The desktop header uses a compact identity, utility labels, and direct timeline and resume access. The mobile header reduces nonessential links while keeping identity and those primary paths. Homepage project cards share one canonical image-first structure: a reserved 4:3 media frame, honest sequence label, category and count metadata, descriptive title, concise contribution copy, and explicit case-study link. Real project photography leads whenever available; technical illustrations remain clearly representative where photography is unavailable or unsuitable. Case-study sections use numbered anchors and evidence captions. Timeline filters expose real button semantics and visible selected states. Lists use real semantic list markup.

### Forms and overlays

There are no forms or modal overlays. Contact uses direct email and external profile links; the current resume is available by email request.

### Iconography

No icon package is required. Directional Unicode marks accompany text and never replace accessible labels. Technical inline SVG is decorative or receives an explicit accessible name.

### Motion

Motion is limited to 180–500ms color, line, and media-scale transitions. It clarifies interactivity. `prefers-reduced-motion` reduces all transitions and forces non-animated scrolling.

### Content and data visualization

Copy names the work, tool, and responsibility directly. Claims must be grounded in repository content. FEA imagery and technical drawings are evidence; decorative drawings are clearly abstract or labeled not to scale.

## Do's and Don'ts

- **Do:** Lead with engineering evidence and describe personal contribution precisely.
- **Do:** Reuse the ivory, graphite, warm-gray, line, and brass-tan roles for new homepage components.
- **Don't:** Add orange or other warning-color accents, portrait crosshairs, glassmorphism, or soft card shadows.
- **Don't:** Invent confidential-looking imagery, performance metrics, or project outcomes to fill a visual gap.
