# PureYuna — Premium Editorial Skincare Commerce Platform

PureYuna is a state-of-the-art, recruiter-ready skincare e-commerce frontend designed with a premium, warm editorial aesthetic. Inspired by minimalist luxury skincare brands, it blends clean typography with sophisticated warm-nude, deep burgundy, and espresso design tokens.

The application serves as a comprehensive skincare discovery and purchasing platform, helping users identify exact solutions for their skin type, manage routines, and purchase individual items or curated multi-category routine packages.

---

## 1. Project Overview
PureYuna is a Next.js 16 Web Application designed to solve the complexity of modern skincare shopping. Rather than displaying a generic grid of products, PureYuna organizes product discovery around user attributes (Skin Type, Product Type) and curated daily routines. 

Key architectural components include:
*   **Next.js 16 (App Router)** for optimized server-client orchestration.
*   **Zustand** for lightweight, persistent global client-side state.
*   **Dual API Integration** featuring automatic local fallback capabilities ensuring offline accessibility or database cold-start recovery.
*   **Base UI & Shadcn Tailwind Components** customized around a luxury editorial brand identity.

---

## 2. Real-World Problem
Modern consumers face several challenges when purchasing skincare:
1.  **Product Overwhelm:** Navigating large skincare catalogs without understanding which ingredients pair together or suit their skin.
2.  **Skin Type Incompatibility:** Buying products that irritate sensitive skin or worsen oily conditions.
3.  **Routine Fragmentation:** Buying multiple individual products from separate places rather than a cohesive routine.
4.  **Inefficient Search & Filtering:** Struggling to filter organic/natural formulas from lab-formulated products.
5.  **Lack of Cohesive State:** Guest shoppers losing cart selections or wishlists when reloading pages or deciding to register later.

---

## 3. Real-World Impact
PureYuna addresses these issues by delivering:
*   **Tailored Discovery:** Streamlined search, categories, and skin-type routing to find targeted solutions.
*   **Dynamic Routine Lab:** A custom 4-step package builder allowing users to design and bundle a tailored routine (Cleanser + Treatment + Moisturizer + Sun Protection) at a 15% discount.
*   **Zero-Disruption Experience:** Guest shoppers can manage a fully functional shopping cart and wishlist saved in `localStorage`, which seamlessly transfers to the server once authenticated.
*   **Role-Based Partitioning:** Clean separation of customer settings and order history from store management and analytical charts.

---

## 4. Core Frontend Features

| Feature | Status | Description |
| :--- | :---: | :--- |
| **Authentication & Authorization** | ✅ | Email/Password login and registration with automatic JWT persistence. Strict route protection using role-based guards. |
| **Product Discovery System** | ✅ | Responsive filtering by Category, Skin Type (`OILY`, `DRY`, `NORMAL`, `COMBINATION`, `SENSITIVE`), and Product Type (`ORGANIC` / `FORMULATED`). |
| **Bespoke Product Search** | ✅ | Live text queries matching name and description, synchronized with Next.js URL query parameters. |
| **Product Sorting** | ✅ | Dynamic sorting by Price ascending (`price-low`), Price descending (`price-high`), and Newest arrival. |
| **Product Details** | ✅ | Detailed view with multi-image gallery thumbnail slider, size variant selectors (`30ml`, `50ml`, `100ml`), accordion specifications, and a customer review list + submission form. |
| **Routine Builder (Custom)** | ✅ | Interactive 3-step Routine Lab wizard (`/build-package`) filtering items to curate a cleanser, serum, moisturizer, and SPF bundle with a 15% package discount. |
| **Curated Packages** | ✅ | Ready-Made routines page (`/packages`) that loads curated routines and syncs them to the cart at dynamic discount ratios. |
| **Shopping Cart & Drawer** | ✅ | Persistent cart drawer triggering on-item addition, with quantity capping based on live stock bounds, client-side subtotal, shipping, and tax estimation. |
| **Wishlist** | ✅ | Dual-state wishlist system. Synced with backend API for authenticated members; falls back to guest storage for anonymous users. |
| **Checkout Flow** | ✅ | Multi-field secure checkout form (`/checkout`) validating address, city, and phone number, with purchase summary details and order placement. |
| **Order History** | ✅ | Dedicated Customer Orders dashboard (`/orders`) sorting purchases chronologically with tracking indicators (`PENDING`, `SHIPPED`, `DELIVERED`, `CANCELLED`). |
| **Admin Portal** | ✅ | Robust dashboard (`/admin`) protecting access to authenticated admins, providing store-wide revenue, stock level alerts, and CRUD management for products, packages, categories, and order statuses. |
| **Responsive UI** | ✅ | Fully fluid layout designed from mobile-first layouts up to high-resolution desktop screens. |
| **Loading & Error States** | ✅ | Graceful skeleton loaders, spinner icons, inline connection retry buttons, and toast notifications. |

---

## 5. User Journey

```text
       [Landing Page]
             ↓
     [Product Discovery] ──(Custom Routine Wizard)──► [Routine Lab]
             │                                            │
   (Search / Filter / Sort)                               │ (Choose 4 Steps)
             │                                            │
             ▼                                            ▼
     [Product Details] ◄───(Add Set / Add to Cart)───────[Cart]
             │                                            │
             ├────────────────(Add to Wishlist)           │ (Subtotal/Tax Calc)
             ▼                                            ▼
     [Checkout Form] ◄──────────────────────────────[Cart Drawer]
             │
             ▼
     [Order Created] ──► [Order History] (Track Status)
```

---

## 6. Product Discovery System
PureYuna’s discovery engine is URL-driven, ensuring deep linking works flawlessly for sharing search queries and active filters.
*   **URL Query Integration:** `productType`, `category`, `skinType`, `sort`, `search`, and `page` parameters are read and synchronized with the search form and sidebar.
*   **Unified Client-Side Fallback:** If the production API endpoint fails or is asleep, the `product.service` automatically switches to client-side filtering and paging over a static `FALLBACK_PRODUCTS` constant to guarantee zero-downtime browsing.
*   **Visual Distinction:** Product cards visually demarcate `ORGANIC` (clean cream styling) from `FORMULATED` (espresso detailing) to guide conscious shoppers.

---

## 7. Authentication & Authorization
The application implements strict JSON Web Token (JWT) authorization:
*   **State Management:** Auth tokens and parsed user profile metadata are saved in `localStorage` and managed globally via Zustand (`useAuthStore`).
*   **Protected Route Guard:** The `<RequireAuth>` wrapper intercepts unauthorized navigation to sensitive pages (like `/profile`, `/orders`, `/checkout`, and `/admin`).
*   **Role-Based Isolation:** Customers are kept on core storefront pages. The `/admin` route is guarded and requires the `ADMIN` role. If a customer attempts to access `/admin`, they are automatically routed back to `/`.

---

## 8. Wishlist Experience
*   **Guest Mode:** Wishlist selections are managed in local storage under `pureyuna_wishlist` with guest identifiers.
*   **Authenticated Mode:** Automatically makes network requests to `GET /wishlists`, `POST /wishlists`, and `DELETE /wishlists` to synchronize data across the user's devices.
*   **Direct Feedback:** Instant visual feedback (filled/empty heart icon toggle) and real-time toast alerts inform users of item additions or removals.

---

## 9. Shopping Cart & Checkout
*   **Cart Actions:** Dynamic add-to-cart, remove, and quantity updates. Capped at the maximum product stock boundary.
*   **Calculations:** Computes subtotal, taxes (fixed 8%), and a flat shipping fee ($15) on the fly.
*   **Bundle Math:** Curated packages and custom routine bundles apply discount ratios to each product in the set, translating bulk savings directly into cart calculations.
*   **Checkout Validation:** Validates field completeness for `address`, `city`, and `phone` before submitting order payloads.

---

## 10. Order Management
*   **Sanctuary Shipments:** Customers track their orders chronologically inside `/orders`.
*   **Caching Fallback:** The `order.service` caches customer orders in local storage under `pureyuna_cached_orders`. In the event of backend network latency, the orders are rendered immediately from the cache.
*   **Status Styling:** Statuses are colored dynamically: Muted Ochre for `PENDING`, soft clay for `SHIPPED`, green for `DELIVERED`, and red for `CANCELLED`.

---

## 11. Admin Dashboard (`/admin`)
The dedicated admin portal features:
*   **Analytics Overview:** Revenue tracker, total sales counter, active products, and low stock alert warnings (< 15 items remaining).
*   **Product CRUD:** Create, read, update, and delete forms with field validations, category dropdowns, and category type selections.
*   **Package Builder Tab:** Dynamic form allowing admins to create bundles, specify package price, add covers, and link products.
*   **Order Management Tab:** Detailed view of all customer orders, shipping addresses, phone numbers, and a status selection dropdown to trigger status updates on the server.

---

## 12. UI/UX & Design Details
*   **Micro-Animations:** Fluid card translations (`hover:-translate-y-1`), scale checks, and sheet drawer entry/exit transitions powered by Framer Motion.
*   **Typography:** Editorial font layouts (headings styled with Serif-inspired styles, body copy with light sans-serif styles).
*   **Bespoke Assets:** Offline model portraits and premium Unsplash skincare photos used throughout the interface.
*   **Hydration Safety:** Client-side mounting state checks on layout elements (like the Navbar and Cart) to ensure zero hydration mismatches.

---

## 13. Design System
Built on a bespoke modern neutral palette configured inside Tailwind CSS v4:
*   `--color-background` / `cream`: `#FDF4EE` (Soft Peach / Warm Nude)
*   `--color-card` / `brand-cream`: `#FAF5F0` (Warm Cream)
*   `--color-primary` / `terracotta`: `#4A1E27` (Deep Wine / Burgundy)
*   `--color-border` / `taupe`: `#EBDCD2` (Soft Clay Border)
*   `--color-cocoa`: `#261C19` (Deep Espresso)
*   `--color-ochre`: `#A0827B` (Muted Rose)

---

## 14. Technical Architecture

```text
                  [User Interaction]
                           │
                           ▼
                  [Next.js App Router] (SSR & Client Hydration)
                           │
                           ▼
                 [React 19 Components]
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
   [Zustand Stores]                 [Axios Client Layer]
 (Auth, Cart, Wishlist)          (Interceptors & Header Auth)
          │                                 │
          └────────────────┬────────────────┘
                           ▼
                 [Express Backend API]
                           │
                           ▼
                   [Prisma ORM DB]
```

---

## 15. Project Structure

```text
src/
├── app/                        # Next.js app routes, layouts, and global assets
│   ├── about/                  # Static About Brand page
│   ├── admin/                  # Admin Dashboard (Tabbed CRUD & Analytics)
│   ├── build-package/          # 3-Step Custom Routine Builder Lab
│   ├── checkout/               # Checkout Summary & Validation Form
│   ├── contact/                # Static Customer Support Contact Form
│   ├── login/                  # User Login Form Page
│   ├── orders/                 # Customer Orders Timeline Tracker
│   ├── packages/               # Curated Skincare Routine Sets & detail pages
│   ├── products/               # Product Discovery (Filtering, Search, Detail Grid)
│   ├── profile/                # Profile Settings & Base64 Avatar Uploads
│   ├── register/               # User Registration Page
│   └── globals.css             # Tailwind v4 theme configurations & styling tokens
├── components/                 # Reusable UI component modules
│   ├── auth/                   # Route protection guards
│   ├── cart/                   # Cart Drawer and quantity controllers
│   ├── home/                   # Hero sections and collections
│   ├── layout/                 # Global Header (Navbar) & Footer
│   ├── packages/               # Package skeletons
│   ├── products/               # Filter sidebars, search elements, product cards
│   ├── shared/                 # Brand marks, image fallbacks, Framer reveals
│   └── ui/                     # Shadcn primitives (Buttons, Dialogs, Sheets)
├── constants/                  # Local fallback data assets (36 Products, Mappings)
├── hooks/                      # Custom hooks
├── lib/                        # Axios HTTP clients, error mapping, utility functions
├── services/                   # Frontend API network integration layer
├── stores/                     # Zustand state management stores
└── types/                      # TypeScript interface models
```

---

## 16. Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | Production-ready React framework (App Router) |
| **React 19** | Modern declarative UI component render engine |
| **TypeScript** | Type safety across API endpoints and properties |
| **Tailwind CSS v4** | Custom utility-first styling token configurations |
| **Zustand** | Dynamic, lightweight persistent client-side state management |
| **Framer Motion** | Highly performant scroll transitions and micro-interactions |
| **Axios** | Interceptor-managed API calls injecting JWT headers automatically |
| **Lucide React** | Premium icon vector indicators |
| **Base UI** | Accessible headless component primitives |

---

## 17. Key Engineering Highlights
*   **Dual Mode Failover:** Product and Category catalog service gracefully fails over to the client-side database if the backend database experiences cold starts or networking timeouts.
*   **SSR Mount Protection:** Prevents Hydration mismatches by delaying UI state rendering in client-centric components until verification is complete.
*   **Recursive Bundle Discount Allocator:** Custom routines automatically calculate discount proportions and apply discounts to the individual products in the cart, preventing cart value manipulation.
*   **Base64 Profile Uploader:** Profile portal allows users to upload local images using a client-side `FileReader` directly into their cached state profile.

---

## 18. Problems Solved → Technical Solution → User Impact

| Real-World Problem | PureYuna Solution | User Impact |
| :--- | :--- | :--- |
| Hard to find compatible skincare | Category, Skin-Type, and Product Type filters. | Easy matching of products to skin goals in seconds. |
| Inability to structure routines | 3-step Custom Routine Lab + Ready-made routines. | Confident routine creation with a 15% discount. |
| Stalled database cold-starts | Local static data fallback mechanisms. | Store remains browseable and functional at all times. |
| Disrupted checkout flows | Persistent cart drawer + checkout validation forms. | Clear checkout flow redirecting to purchase tracking. |
| Administrative overhead | Dynamic Admin CRUD tables, stats, and order updates. | Managers track stocks, sales, and fulfill orders easily. |

---

## 19. Frontend Implementation Status

| Area | Status | Notes |
| :--- | :---: | :--- |
| **Authentication** | ✅ | Full dynamic login/registration, token storage, and protected guards. |
| **Product Discovery** | ✅ | Filter by category, type, and skin needs. Search and sort fully functional. |
| **Wishlist** | ✅ | Guest failover to `localStorage` + live DB synchronization on login. |
| **Cart & Quantities** | ✅ | Cart Drawer, quantity adjustments, and stock boundary caps. |
| **Checkout** | ✅ | Validation shipping form, sum calculation, and order submission. |
| **Orders** | ✅ | Chronicle dashboard tracking status changes from the server. |
| **Admin** | ✅ | Analytics indicators, CRUD for products/packages, and order updates. |
| **Responsive UI** | ✅ | Fully fluid grids and responsive sheet drawers across all screens. |

---

## 20. Why PureYuna Is Portfolio-Worthy
PureYuna demonstrates professional-grade full-stack frontend development. Key attributes that make this project stand out include:
*   **Resiliency:** The dual-mode failover ensures the application never crashes even if the backend is offline.
*   **Data Integrity:** The recursive cart discount system prevents tampering with product values.
*   **Strict Security:** Implements route guards and role checks to protect the admin panel.
*   **Visual Precision:** Reflects a high-contrast editorial branding scheme with custom tokens rather than standard utility styling.

---

## 21. Future Improvements
*   **Dynamic Image CDNs:** Integrating a server-side storage handler (like Cloudinary) for direct admin image uploads.
*   **Active Chat Support:** Integrating a live customer chat support portal.
*   **Payment Gateways:** Incorporating test credit card checkout validation via Stripe.

---

## 22. Setup & Running Instructions

### Prerequisites
*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation
Install project dependencies:
```bash
npm install
```

### Run the Development Server
Start the local Next.js server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Cache Clearance
If Next.js Image cache configurations do not hot-reload immediately:
```bash
rm -rf .next/cache
npm run dev
```
