"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Package, Wand2 } from "lucide-react";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavLinks, packagesDropdownLinks } from "@/constants/site";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        active && "text-primary"
      )}
    >
      {label}
    </Link>
  );
}

function PackagesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="gap-1 text-muted-foreground hover:text-primary" />}
      >
        Packages
        <ChevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>Packages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {packagesDropdownLinks.map((item, index) => (
          <DropdownMenuItem
            key={item.href}
            render={<Link href={item.href} />}
            className="gap-2.5 px-2 py-2"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              {index === 0 ? <Package className="size-4" /> : <Wand2 className="size-4" />}
            </span>
            <span className="flex min-w-0 flex-col">
              <span>{item.label}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {item.description}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNavContent({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) {
  const [packagesOpen, setPackagesOpen] = useState(false);

  return (
    <>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <nav className="flex flex-col gap-1 px-4">
        {mainNavLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            active={pathname === link.href}
            onNavigate={onClose}
          />
        ))}
        <button
          type="button"
          onClick={() => setPackagesOpen((open) => !open)}
          className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          aria-expanded={packagesOpen}
        >
          Packages
          <ChevronDown
            className={cn(
              "size-4 opacity-60 transition-transform duration-200",
              packagesOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200",
            packagesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-l border-border/60 pl-3">
              {packagesDropdownLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
                    {index === 0 ? <Package className="size-3.5" /> : <Wand2 className="size-3.5" />}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <SheetFooter>
        <Button render={<Link href="/products" onClick={onClose} />} className="w-full">
          Shop Products
        </Button>
      </SheetFooter>
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:max-w-sm">
              <MobileNavContent onClose={closeMobile} pathname={pathname} />
            </SheetContent>
          </Sheet>
          <BrandMark />
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
          <PackagesDropdown />
        </nav>

        <div className="hidden md:block">
          <Button render={<Link href="/products" />}>Shop Now</Button>
        </div>
      </div>
    </header>
  );
}