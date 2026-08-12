export const SITE_NAME = "PureYuna";
export const SITE_TAGLINE = "Clean, natural skincare";

export interface NavLink {
  label: string;
  href: string;
}

export interface PackagesDropdownItem {
  label: string;
  description: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const packagesDropdownLinks: PackagesDropdownItem[] = [
  {
    label: "Ready-Made Packages",
    description: "Curated bundles, picked by our experts",
    href: "/packages",
  },
  {
    label: "Build Your Package",
    description: "Choose products for your own routine",
    href: "/build-package",
  },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Ready-Made Packages", href: "/packages" },
      { label: "Build Your Package", href: "/build-package" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Login", href: "/login" },
    ],
  },
];

export interface SocialHandle {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "x" | "youtube";
}

export const socialHandles: SocialHandle[] = [
  { label: "Instagram", href: "https://instagram.com/pureyuna", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/pureyuna", icon: "facebook" },
  { label: "X", href: "https://x.com/pureyuna", icon: "x" },
  { label: "YouTube", href: "https://youtube.com/@pureyuna", icon: "youtube" },
];