import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toast } from "@/components/shared/toast";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pureyuna.com"),
  title: {
    default: "PureYuna — Organic & Formulated Skincare Sanctuary",
    template: "%s · PureYuna",
  },
  description:
    "Discover clean, organic, and precision-formulated skincare. Match products to your skin type, browse ready-made packages, or build your own routine with PureYuna.",
  keywords: [
    "clean beauty",
    "organic skincare",
    "botanical extracts",
    "clinical actives",
    "personalized beauty",
    "PureYuna",
    "vegan cosmetics"
  ],
  authors: [{ name: "PureYuna Sanctuary" }],
  openGraph: {
    title: "PureYuna — Organic & Formulated Skincare Sanctuary",
    description: "Discover clean, organic, and precision-formulated skincare formulas.",
    url: "https://pureyuna.com",
    siteName: "PureYuna",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PureYuna Skincare Sanctuary Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PureYuna — Organic & Formulated Skincare Sanctuary",
    description: "Discover clean, organic, and precision-formulated skincare formulas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}