"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  DropdownMenuGroup,
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
import * as React from "react";
import { mainNavLinks, packagesDropdownLinks } from "@/constants/site";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { CartDrawer } from "@/components/cart/cart-drawer";

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
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold tracking-[0.18em] text-charcoal/60 uppercase">
            Packs & Routines
          </DropdownMenuLabel>
        </DropdownMenuGroup>
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
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "info");
    if (onNavigate) {
      onNavigate();
    }
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Account menu"
            className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
          />
        }
      >
        <Avatar className="ring-1 ring-terracotta/20">
          <AvatarFallback className="bg-terracotta text-brand-cream">
            {getInitials(user.name) || <UserRound className="size-4" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#FAF5EF] border border-[#3A2820]/10 text-[#3A2820] p-1.5 rounded-lg shadow-md">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-3 py-1.5">
            <span className="font-semibold text-sm text-[#3A2820]">{user.name}</span>
            <span className="truncate text-xs font-normal text-[#3A2820]/60">
              {user.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 h-px bg-[#3A2820]/10 -mx-1.5" />
        
        <DropdownMenuItem
          render={<Link href="/profile" />}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3A2820] hover:bg-[#3A2820]/5 focus:bg-[#3A2820]/5 cursor-pointer rounded-md transition-colors outline-none"
          onClick={onNavigate}
        >
          <UserRound className="size-4 text-terracotta" />
          My Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem
          render={<Link href="/orders" />}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3A2820] hover:bg-[#3A2820]/5 focus:bg-[#3A2820]/5 cursor-pointer rounded-md transition-colors outline-none"
          onClick={onNavigate}
        >
          <ShoppingBag className="size-4 text-terracotta" />
          My Orders
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/wishlist" />}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3A2820] hover:bg-[#3A2820]/5 focus:bg-[#3A2820]/5 cursor-pointer rounded-md transition-colors outline-none"
          onClick={onNavigate}
        >
          <Heart className="size-4 text-terracotta" />
          My Wishlist
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 h-px bg-[#3A2820]/10 -mx-1.5" />
        
        <DropdownMenuItem
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer rounded-md transition-colors outline-none"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  const { isAuthenticated } = useAuthStore();

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

function IconLinks({ onCartClick }: { onCartClick: () => void }) {
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        render={<Link href="/wishlist" />}
        aria-label="Wishlist"
        className="text-terracotta hover:text-ochre relative"
      >
        <Heart className="size-6" strokeWidth={2.2} />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[0.62rem] font-bold text-cream">
            {wishlistCount}
          </span>
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onCartClick}
        aria-label="Cart"
        className="text-terracotta hover:text-ochre relative cursor-pointer"
      >
        <ShoppingBag className="size-6" strokeWidth={2.2} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[0.62rem] font-bold text-cream">
            {cartCount}
          </span>
        )}
      </Button>
    </>
  );
}

function MobileNavContent({
  onClose,
  pathname,
  onCartClick,
}: {
  onClose: () => void;
  pathname: string;
  onCartClick: () => void;
}) {
  const [packagesOpen, setPackagesOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "info");
    onClose();
    router.push("/login");
  };

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

      {isAuthenticated && user && (
        <div className="mt-6 border-t border-[#3A2820]/10 px-6 pt-5 text-[#3A2820]">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 ring-1 ring-terracotta/20">
              <AvatarFallback className="bg-terracotta text-brand-cream text-sm">
                {getInitials(user.name) || <UserRound className="size-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm leading-tight truncate">{user.name}</span>
              <span className="text-xs text-[#3A2820]/60 truncate">{user.email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-2 text-base font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
            >
              <UserRound className="size-4" />
              My Profile
            </Link>
            <Link
              href="/orders"
              onClick={onClose}
              className="flex items-center gap-2 text-base font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
            >
              <ShoppingBag className="size-4" />
              My Orders
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2 text-base font-medium text-terracotta transition-colors duration-200 hover:text-ochre"
            >
              <Heart className="size-4" />
              My Wishlist
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center gap-2 border-t border-taupe/50 px-6 pt-5">
        <IconLinks onCartClick={() => { onClose(); onCartClick(); }} />
      </div>

      <div className="mt-5 px-6">
        {isAuthenticated ? (
          <button
            type="button"
            className="flex items-center gap-2 text-base font-semibold text-red-600 transition-colors duration-200 hover:text-red-700 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Sign Out
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
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useCartStore((state) => state.getItemCount());
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const { isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, isAuthenticated]);

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
              <MobileNavContent onClose={closeMobile} pathname={pathname} onCartClick={() => setCartOpen(true)} />
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

        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Cart Button */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="md:hidden text-terracotta hover:text-ochre relative p-1.5 cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag className="size-6" strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[0.62rem] font-bold text-cream">
                {cartCount}
              </span>
            )}
          </button>

          <div className="hidden gap-2 md:flex">
            <IconLinks onCartClick={() => setCartOpen(true)} />
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
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}