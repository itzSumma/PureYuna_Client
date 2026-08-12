import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Separator } from "@/components/ui/separator";
import {
  footerColumns,
  socialHandles,
  SITE_NAME,
  SITE_TAGLINE,
  type SocialHandle,
} from "@/constants/site";

const socialIconPaths: Record<SocialHandle["icon"], string> = {
  instagram:
    "M12 0c-3.2 0-3.6.01-4.85.07-3.17.13-5.07 1.05-5.83 2.3-.77 1.29-.87 3-.87 4.53 0 1.6.1 3.32.88 4.61.78 1.32 2.21 2.55 5.42 2.68 2.69.14 3.14.17 5.25.17 2.11 0 2.56-.03 5.25-.17 3.21-.13 4.64-1.36 5.42-2.68.78-1.29.88-3.01.88-4.61 0-1.54-.1-3.24-.87-4.53-.76-1.25-2.66-2.17-5.83-2.3C15.6.01 15.2 0 12 0zm0 4.08c2.66 0 2.98.01 4.03.06 2.29.11 3.18 1.05 3.29 3.29.05 1.05.06 1.37.06 4.03s-.01 2.98-.06 4.03c-.11 2.24-1 3.18-3.29 3.29-1.05.05-1.37.06-4.03.06s-2.98-.01-4.03-.06c-2.29-.11-3.18-1.05-3.29-3.29-.05-1.05-.06-1.37-.06-4.03s.01-2.98.06-4.03c.11-2.24 1-3.18 3.29-3.29 1.05-.05 1.37-.06 4.03-.06zm0 6.9a4.02 4.02 0 1 0 0 8.03 4.02 4.02 0 0 0 0-8.03zm0 6.61a2.59 2.59 0 1 1 0-5.17 2.59 2.59 0 0 1 0 5.17zm5.16-11.18a.94.94 0 1 0 0 1.88.94.94 0 0 0 0-1.88z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

function SocialIcon({ name }: { name: SocialHandle["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d={socialIconPaths[name]} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-terracotta text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <BrandMark variant="dark" />
            <p className="mt-5 text-lg font-medium text-brand-cream">
              {SITE_TAGLINE}
            </p>
            <p className="mt-3 text-base leading-relaxed text-brand-cream/75">
              Clean, natural skincare made with honest ingredients. Calm,
              minimal routines for skin that deserves the purest care.
            </p>
            <div className="mt-7 flex gap-2.5">
              {socialHandles.map((handle) => (
                <a
                  key={handle.label}
                  href={handle.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={handle.label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-200 hover:border-white/35 hover:bg-white/15 hover:text-white hover:scale-105"
                >
                  <SocialIcon name={handle.icon} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-semibold tracking-wider text-brand-cream uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-brand-cream/80 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-brand-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-brand-cream/50">
            Made with care, for skin and planet.
          </p>
        </div>
      </div>
    </footer>
  );
}