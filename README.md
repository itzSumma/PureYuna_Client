# PureYuna — Premium Editorial Skincare Commerce Platform

PureYuna is a Next.js 16 skincare e-commerce storefront designed with a premium, warm editorial aesthetic. Inspired by minimalist luxury skincare brands, it blends clean typography with sophisticated warm-nude, deep burgundy, and espresso design tokens.

---

## 1. Real-World Problem, Solution & Impact

| Real-World Problem | PureYuna Technical Solution | User & Business Impact |
| :--- | :--- | :--- |
| **Routine Decision Fatigue:** Navigating large skincare catalogs without knowing which ingredients pair safely together. | **Routine Lab & Custom 4-Step Builder:** Filters products dynamically to build a custom cleanser, serum, moisturizer, and SPF bundle with a 15% discount. | Simplified product selection; increased average order value (AOV) via structured bundles. |
| **Network Latency & Cold Starts:** Slow page loads or server downtime disrupting purchase flows. | **Dual-Mode Failover Engine:** Automatically falls back to local JSON static catalog operations when API services time out or are offline. | Zero checkout drops; flawless, resilient shopping experience even during database cold-starts. |
| **Friction in Checkout & Orders:** Customer drop-off during multi-step checkout processes. | **Persistent Checkout & Order Tracker:** Multi-field validation flow saving guest states in `localStorage`, syncing instantly on authentication. | Streamlined path to purchase; lower cart abandonment rate; clear order status transparency. |

---

## 2. Core Implemented Features

### 👤 Authentication & Isolation
*   **Secure Session Handlers:** Email/password registration and login with automatic JWT injection in Axios authorization headers.
*   **Role Guards:** Strict separation between customer views (`/profile`, `/orders`) and the store administration dashboard (`/admin`).

### 🔍 Product Discovery & Navigation
*   **URL-Driven Discovery:** Real-time search, sorting (price high/low, newest), and category/skin-type filtering synced directly to URL search query parameters.
*   **Rich Product Details:** Multi-image gallery thumbnail slider, volume variant selection (`30ml`, `50ml`, `100ml`), ingredients accordion, and live client-side review submission.

### 🛒 Cart & Wishlist Ecosystem
*   **Dynamic Cart Drawer:** Interactive slide-out cart drawer with live stock boundary limits and on-the-fly subtotal, shipping, and tax estimation.
*   **Guest-to-User Wishlist:** Anonymous users can wishlist items locally; lists sync with the Postgres database upon account creation or login.

### 👑 Admin Portal
*   **Analytical Overview:** Revenue, low stock alert flags (<15 items remaining), and order counters.
*   **Dynamic Catalog CRUD:** Full modal controls to create, edit, or soft-delete products, categories, and routine packages.
*   **Order Fulfillment:** Fulfill store-wide orders and update shipping statuses (`PENDING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).

---

## 3. Technical Architecture

```text
       [User Interaction] ◄──► [Next.js App Router (SSR & Hydration Check)]
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼                                                               ▼
      [Zustand Stores]                                            [Axios API Integration]
   (Auth, Cart, Wishlist)                                      (Automatic Header JWT Injection)
             │                                                               │
             └───────────────────────────────┬───────────────────────────────┘
                                             ▼
                                   [Express Backend API]
                                             │
                                             ▼
                                     [PostgreSQL DB]
```

*   **Next.js 16 (App Router) & React 19:** Orchestrates server rendering, directory routes, and metadata.
*   **Zustand:** Controls light global states (Cart, User, Wishlist) with selective local persistence.
*   **Failover Service Layer:** Intercepts failures on `product.service` and pipes local fallback mock constants seamlessly to the UI.

---

## 4. Key Engineering Highlights

*   **Hydration Safety:** Solved Next.js SSR hydration mismatches in dynamic components (Navbar, Cart) by implementing two-phase mounting state checks.
*   **Recursive Bundle Discount Allocator:** Custom routines evaluate bundle-to-product discount ratios to apply fractional savings to individual items in the cart, preventing cart value tampering.
*   **Base64 Profile Syncing:** User settings portal enables local file uploads converted to Base64 strings, saved directly to the database or authorization state.

---

## 5. Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | Frontend framework (App Router) |
| **React 19** | Dynamic declarative UI component render engine |
| **TypeScript** | Static type safety across states and services |
| **Tailwind CSS v4** | Modern utility-first styling with inline custom design variables |
| **Zustand** | Dynamic state management with local persistence |
| **Framer Motion** | Micro-interactions, slide animations, and scroll reveals |
| **Axios** | Interceptor-managed API calls |
| **Base UI** | Accessible headless component primitives |

---

## 6. Project Structure

```text
Client/
├── src/
│   ├── app/                    # Next.js App Router pages & global styling
│   │   ├── admin/              # Admin CRUD & analytics page
│   │   ├── build-package/      # Interactive Custom Routine Builder
│   │   ├── checkout/           # Checkout summary & payment simulator
│   │   ├── orders/             # Customer order tracking timeline
│   │   ├── packages/           # Ready-made Curated Routine Bundles
│   │   ├── products/           # Catalog grid, sorting, & details
│   │   └── globals.css         # Theme typography and brand colors
│   ├── components/             # Reusable UI component modules
│   │   ├── cart/               # Slide-out Cart Drawer
│   │   ├── layout/             # Navbar and Footer elements
│   │   └── ui/                 # Shadcn primitives
│   ├── constants/              # Catalog mock fallbacks (36 Products)
│   ├── services/               # API network integration layer
│   ├── stores/                 # Zustand state stores
│   └── types/                  # Shared TypeScript interface models
├── public/                     # Static media and local beauty portraits
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

---

## 7. Setup & Running Instructions

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Run the Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Compile optimized static production bundle:
```bash
npm run build
```
