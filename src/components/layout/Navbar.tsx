"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  UserRound,
  Wand2,
} from "lucide-react";

import { BrandMark } from "@/components/shared/brand-mark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useAuthStore } from "@/stores/authStore";

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
        "text-lg tracking-wide font-medium transition-colors duration-200 hover:text-ochre",
        active ? "text-ochre font-semibold" : "text-terracotta"
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
        render={
          <button
            type="button"
            className="flex items-center gap-1.5 text-lg tracking-wide font-medium text-terracotta transition-colors duration-200 hover:text-ochre focus:text-ochre outline-none"
          >
            Packages
            <ChevronDown className="size-4 opacity-60" />
          </button>
        }
      >
        <span className="sr-only">Packages</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72" sideOffset={22}>
        <DropdownMenuLabel className="text-xs font-semibold tracking-[0.18em] text-charcoal/60 uppercase">
          Packs & Routines
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {packagesDropdownLinks.map((item, index) => (
          <DropdownMenuItem
            key={item.href}
            render={<Link href={item.href} />}
            className="gap-3 px-2 py-2.5 focus:bg-charcoal/5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ivory text-terracotta">
              {index === 0 ? (
                <Package className="size-4" />
              ) : (
                <Wand2 className="size-4" />
              )}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-medium">{item.label}</span>
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

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Account menu"
            className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        }
      >
        <Avatar className="ring-1 ring-terracotta/20">
          <AvatarFallback className="bg-terracotta text-brand-cream">
            {getInitials(user.name) || <UserRound className="size-4" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-medium">{user.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link href="/wishlist" />}
          className="gap-2 focus:bg-charcoal/5"
          onClick={onNavigate}
        >
          <Heart className="size-4" />
          My Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/orders" />}
          className="gap-2 focus:bg-charcoal/5"
          onClick={onNavigate}
        >
          <ShoppingBag className="size-4" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/5" onClick={logout}>
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  const isAuthenticated = useAuthStore((state) => Boolean(state.token && state.user));

  if (isAuthenticated) {
    return <UserMenu onNavigate={onNavigate} />;
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href="/login"
        onClick={onNavigate}
        className="text-lg tracking-wide font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={onNavigate}
        className="text-lg tracking-wide font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
      >
        Register
      </Link>
    </div>
  );
}

function IconLinks() {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        render={<Link href="/wishlist" />}
        aria-label="Wishlist"
        className="text-terracotta hover:text-ochre"
      >
        <Heart className="size-6" strokeWidth={2.2} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        render={<Link href="/cart" />}
        aria-label="Cart"
        className="text-terracotta hover:text-ochre"
      >
        <ShoppingBag className="size-6" strokeWidth={2.2} />
      </Button>
    </>
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
  const isAuthenticated = useAuthStore((state) => Boolean(state.token && state.user));

  return (
    <>
      <SheetHeader>
        <SheetTitle className="flex items-center">
          <BrandMark />
        </SheetTitle>
      </SheetHeader>

      <nav className="flex flex-col gap-6 px-6 pt-6" aria-label="Mobile navigation">
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
          className="flex items-center justify-between text-lg tracking-wide font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
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
            <div className="flex flex-col gap-4 border-l border-taupe/60 pl-5">
              {packagesDropdownLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-base font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ivory text-terracotta">
                    {index === 0 ? (
                      <Package className="size-4" />
                    ) : (
                      <Wand2 className="size-4" />
                    )}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-8 flex items-center gap-2 border-t border-taupe/50 px-6 pt-5">
        <IconLinks />
        {isAuthenticated && <UserMenu onNavigate={onClose} />}
      </div>

      <div className="mt-5 px-6">
        {isAuthenticated ? (
          <button
            type="button"
            className="flex items-center gap-2 text-base font-medium text-charcoal/80 transition-colors duration-200 hover:text-black"
            onClick={() => {
              useAuthStore.getState().logout();
              onClose();
            }}
          >
            <LogOut className="size-4" />
            Log out
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/login" />}
              onClick={onClose}
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              render={<Link href="/register" />}
              onClick={onClose}
            >
              Register
            </Button>
          </div>
        )}
      </div>

      <SheetFooter className="mt-auto">
        <Button
          variant="default"
          size="lg"
          render={<Link href="/products" />}
          onClick={onClose}
          className="w-full"
        >
          Shop Now
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
    <header className="sticky top-0 z-40 w-full border-b border-taupe/60 bg-[#F2C8B6]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="-ml-2 md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-80 max-w-sm flex-col sm:max-w-sm">
              <MobileNavContent onClose={closeMobile} pathname={pathname} />
            </SheetContent>
          </Sheet>
          <BrandMark />
        </div>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
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

        <div className="flex items-center gap-8">
          <div className="hidden gap-2 md:flex">
            <IconLinks />
          </div>
          <div className="hidden md:block">
            <AuthActions />
          </div>
          <Button
            variant="default"
            render={<Link href="/products" />}
            className="hidden lg:inline-flex text-lg font-medium h-12 px-7"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}