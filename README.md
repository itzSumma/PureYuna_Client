# PureYuna — Premium Editorial Skincare Frontend

PureYuna is a high-end, editorial-quality skincare storefront interface designed with a premium, warm terracotta and peach aesthetic. The layout balances clean botanical care with precision formulation, following strict design guidelines inspired by Aesty-style ink-on-peach-paper aesthetics.

---

## 1. Design & Brand Vision
PureYuna positions skincare as a luxurious, minimal, and conscious routine. The storefront features a warm, highly saturated color space built around organic textures, beautiful campaign photography, and clear typographic hierarchy. All cold greys, organic greens, and default layouts have been replaced with a bespoke peach, terracotta, and warm cocoa system.

---

## 2. Color Palette & Typography Tokens

| Element | Hex Code / Tailwind Class | Purpose / Description |
| :--- | :--- | :--- |
| **Hero Section Background** | `#DF8E73` to `#E89F88` (`bg-gradient-to-r`) | Warm, deep pinkish-peach gradient background without light vertical glows. |
| **Skin Discovery Background** | `#E4967C` (`bg-[#E4967C]`) | Slightly lighter (~5-10%) warm peach background for smooth section transitions. |
| **Navbar Background** | `#F2C8B6` (`bg-[#F2C8B6]`) | Solid, deep warm peach background with zero transparency to prevent bleed-through. |
| **Primary CTAs & Quiz Cards** | `#B86B4B` (`bg-[#B86B4B]` / `bg-terracotta`) | Rich warm terracotta fill for actions, selected cards, and footer accents. |
| **Brand Logo & Title** | `#8C472E` (`text-[#8C472E]`) | Extra bold, deep cocoa-terracotta color for the "PureYuna" brand name. |
| **Light Surfaces / Text** | `#FFFFFF` or `#FAF5EF` (`text-white` / `text-brand-cream`) | High-contrast typography and buttons on terracotta and cocoa surfaces. |
| **Dark Surfaces / Text** | `#25201D` (`text-charcoal` / `text-[#25201D]`) | High-contrast Charcoal font used on light peach-cream surfaces. |

---

## 3. Core Component Customizations

### Navbar & Brand Logo (`Navbar.tsx` / `brand-mark.tsx`)
- **Prominent Brand Mark**: Logo title is styled as a 3xl, extra-heavy/black brand mark (`font-black`) using color `#8C472E` on light backgrounds.
- **Micro-Animations**: Custom hover scaling and active state transitions: `hover:scale-[1.02] active:scale-95`.
- **Solid Peach Background**: Removed all transparency and white hues from the header, replacing it with solid `bg-[#F2C8B6]`.

### Hero Section (`hero-section.tsx`)
- **Arch Frame mask**: Renders a luxury asymmetric model beauty portrait using a standard `<img>` tag pointing directly to `/hero-portrait.jpg` to guarantee offline reliability.
- **Richer Gradient Backdrop**: Set to the seamless warm pinkish-peach gradient `#DF8E73` via `#E89F88` to `#DF8E73`.

### Skin Discovery Section (`skin-discovery-section.tsx`)
- **Direct URLs**: Uses standard `<img>` elements loaded with direct Unsplash campaign links to completely bypass Next.js image loading delays and optimization caches.
- **Tighter Layout**: Reduced bottom card padding to `px-4 pt-3.5 pb-3` and tightened margins between labels, descriptions, and CTA pills to remove awkward blank spaces.
- **High-contrast cards**: Quiz buttons use the terracotta background (`bg-[#B86B4B]`) with white typography.

### Collection Showcase & Footer (`collection-showcase.tsx` / `Footer.tsx`)
- **Showcase Contrast**: Outer section is anchored by `bg-[#B86B4B]`. Organic and Formulated cards are styled with a warm dark peach background (`bg-[#E29D80]`) and charcoal text (`#25201D`) to evoke the "ink on warm paper" luxury feel.
- **Footer Harmonization**: Set to Cocoa Brown (`#3A2820` / `bg-brand-earth`) with clean white and cream links for readability.

---

## 4. Frontend Project Directory Structure

```
Client/
├── public/                     # Static assets (portraits and localized photography)
│   ├── hero-portrait.jpg       # Hero model beauty portrait
│   ├── skin-oily.jpg           # Local skin discovery fallbacks
│   └── ...
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── layout.tsx          # Global HTML/body wrapper
│   │   └── page.tsx            # Main landing page
│   ├── components/
│   │   ├── home/               # Homepage layout sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── skin-discovery-section.tsx
│   │   │   ├── collection-showcase.tsx
│   │   │   └── section-heading.tsx
│   │   ├── layout/             # Global layout elements
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── shared/             # Reusable shared items
│   │   │   ├── brand-mark.tsx  # Bold, luxury PureYuna logo mark
│   │   │   └── reveal.tsx      # Framer-motion scroll animations
│   │   └── ui/                 # Shadcn/Radix primitive components
│   │       └── button.tsx      # Gradient primary CTA button variants
│   ├── lib/
│   │   ├── images.ts           # Imagery definition mappings
│   │   └── utils.ts            # Class merges and Tailwind utility joins
│   └── types/                  # Shared TypeScript models and definitions
├── next.config.ts              # Next.js hostnames (plus.unsplash.com allowed)
├── tailwind.config.js          # Unified theme typography and terracotta tokens
└── package.json                # Project dependencies and script bindings
```

---

## 5. Setup & Running Instructions

### Prerequisites
- Node.js (v18.x or later recommended)
- npm or yarn

### Installation
Install project dependencies:
```bash
npm install
```

### Run the Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront in your browser.

### Cache Clearance
If Next.js Image caching or domain adjustments do not hot-reload immediately in your browser:
1. Stop the dev server (`Ctrl + C`).
2. Delete the local cache folder:
   ```bash
   rm -rf .next/cache
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```
