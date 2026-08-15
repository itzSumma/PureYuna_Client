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
import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((mod) => mod.CartDrawer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center p-8">
        <span className="text-xs text-cocoa/40 animate-pulse tracking-widest uppercase">Loading Sanctuary Cart...</span>
      </div>
    ),
  }
);

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
        "relative py-1 text-sm tracking-widest uppercase font-medium transition-colors duration-200 text-[#3D1B22]/80 hover:text-[#4A1E27] outline-none focus:outline-none",
        active && "text-[#4A1E27] font-semibold border-b-2 border-[#4A1E27] pb-1"
      )}
    >
      {label}
    </Link>
  );
}

function PackagesDropdown() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/packages");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(
              "relative py-1 flex items-center gap-1.5 text-sm tracking-widest uppercase font-medium text-[#3D1B22]/80 transition-colors duration-200 hover:text-[#4A1E27] focus:text-[#4A1E27] outline-none focus:outline-none cursor-pointer",
              isActive && "text-[#4A1E27] font-semibold border-b-2 border-[#4A1E27] pb-1"
            )}
          >
            Packages
            <ChevronDown className="size-4 opacity-60" />
          </button>
        }
      >
        <span className="sr-only">Packages</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 bg-[#FAF5F0] border border-[#EBDCD2] text-[#3D1B22] shadow-lg p-1.5 rounded-lg" sideOffset={22}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold tracking-[0.18em] text-[#3D1B22]/60 uppercase px-3 py-1.5">
            Packs & Routines
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 h-px bg-[#EBDCD2] -mx-1.5" />
        {packagesDropdownLinks.map((item, index) => (
          <DropdownMenuItem
            key={item.href}
            render={<Link href={item.href} />}
            className="group gap-3 px-3 py-2.5 text-sm font-medium text-[#3D1B22] hover:bg-[#4A1E27] hover:text-[#FAF5F0] focus:bg-[#4A1E27] focus:text-[#FAF5F0] cursor-pointer rounded-md transition-all outline-none"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#4A1E27]/10 text-[#4A1E27] group-hover:bg-[#FAF5F0]/20 group-hover:text-[#FAF5F0] transition-colors">
              {index === 0 ? (
                <Package className="size-4" />
              ) : (
                <Wand2 className="size-4" />
              )}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-medium text-[#3D1B22] group-hover:text-[#FAF5F0] transition-colors">{item.label}</span>
              <span className="text-xs font-normal text-[#3D1B22]/80 group-hover:text-[#FAF5F0]/90 transition-colors">
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

function UserMenu({ onNavigate, mounted }: { onNavigate?: () => void; mounted: boolean }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  if (!user || !mounted) return null;

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
        {user.image || user.avatar ? (
          <img
            src={user.image || user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-[#EBDCD2]"
          />
        ) : (
          <Avatar className="ring-1 ring-[#4A1E27]/20">
            <AvatarFallback className="bg-[#4A1E27] text-[#FAF5F0]">
              {getInitials(user.name) || <UserRound className="size-4" />}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#FAF5F0] border border-[#EBDCD2] text-[#3D1B22] p-1.5 rounded-lg shadow-md">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-3 py-1.5">
            <span className="font-semibold text-sm text-[#3D1B22]">{user.name}</span>
            <span className="truncate text-xs font-normal text-[#3D1B22]/60">
              {user.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 h-px bg-[#EBDCD2] -mx-1.5" />
        
        {user.role === "ADMIN" && (
          <DropdownMenuItem
            render={<Link href="/admin" />}
            className="text-[#4A1E27] font-semibold hover:bg-[#F3E8DF] focus:bg-[#F3E8DF] flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer outline-none text-sm"
            onClick={onNavigate}
          >
            <span>👑 Admin Dashboard</span>
          </DropdownMenuItem>
        )}
        
        {user.role === "CUSTOMER" && (
          <>
            <DropdownMenuItem
              render={<Link href="/profile" />}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3D1B22] hover:bg-[#4A1E27]/5 focus:bg-[#4A1E27]/5 cursor-pointer rounded-md transition-colors outline-none"
              onClick={onNavigate}
            >
              <UserRound className="size-4 text-[#4A1E27]" />
              My Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem
              render={<Link href="/orders" />}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3D1B22] hover:bg-[#4A1E27]/5 focus:bg-[#4A1E27]/5 cursor-pointer rounded-md transition-colors outline-none"
              onClick={onNavigate}
            >
              <ShoppingBag className="size-4 text-[#4A1E27]" />
              My Orders
            </DropdownMenuItem>

            <DropdownMenuItem
              render={<Link href="/wishlist" />}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3D1B22] hover:bg-[#4A1E27]/5 focus:bg-[#4A1E27]/5 cursor-pointer rounded-md transition-colors outline-none"
              onClick={onNavigate}
            >
              <Heart className="size-4 text-[#4A1E27]" />
              My Wishlist
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="my-1 h-px bg-[#4A1E27]/10 -mx-1.5" />
        
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

function AuthActions({ onNavigate, mounted }: { onNavigate?: () => void; mounted: boolean }) {
  const { isAuthenticated } = useAuthStore();

  if (!mounted) return null;

  if (isAuthenticated) {
    return <UserMenu onNavigate={onNavigate} mounted={mounted} />;
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href="/login"
        onClick={onNavigate}
        className="text-sm tracking-widest uppercase font-medium text-[#3D1B22]/80 transition-colors duration-200 hover:text-[#4A1E27]"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={onNavigate}
        className="text-sm tracking-widest uppercase font-medium text-[#3D1B22]/80 transition-colors duration-200 hover:text-[#4A1E27]"
      >
        Register
      </Link>
    </div>
  );
}

function IconLinks({ onCartClick, mounted }: { onCartClick: () => void; mounted: boolean }) {
  const { user } = useAuthStore();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  if (user?.role === "ADMIN") return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        render={<Link href="/wishlist" />}
        nativeButton={false}
        aria-label="Wishlist"
        className="text-[#3D1B22]/80 hover:text-[#4A1E27] relative"
      >
        <Heart className="size-6" strokeWidth={2.2} />
        {mounted && wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#4A1E27] text-[0.62rem] font-bold text-[#FAF5F0]">
            {wishlistCount}
          </span>
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onCartClick}
        aria-label="Cart"
        className="text-[#3D1B22]/80 hover:text-[#4A1E27] relative cursor-pointer"
      >
        <ShoppingBag className="size-6" strokeWidth={2.2} />
        {mounted && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#4A1E27] text-[0.62rem] font-bold text-[#FAF5F0]">
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
  mounted,
}: {
  onClose: () => void;
  pathname: string;
  onCartClick: () => void;
  mounted: boolean;
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
          className="flex items-center justify-between text-lg tracking-wide font-medium text-[#3D1B22] transition-colors duration-200 hover:text-[#4A1E27]"
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
            <div className="flex flex-col gap-4 border-l border-[#EBDCD2]/60 pl-5">
              {packagesDropdownLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-base font-medium text-[#3D1B22] transition-colors duration-200 hover:text-[#4A1E27]"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#4A1E27]/10 text-[#4A1E27]">
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

      {mounted && isAuthenticated && user && (
        <div className="mt-6 border-t border-[#EBDCD2] px-6 pt-5 text-[#3D1B22]">
          <div className="flex items-center gap-3 mb-4">
            {user.image || user.avatar ? (
              <img
                src={user.image || user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-[#EBDCD2]"
              />
            ) : (
              <Avatar className="h-10 w-10 ring-1 ring-[#4A1E27]/20">
                <AvatarFallback className="bg-[#4A1E27] text-[#FAF5F0] text-sm">
                  {getInitials(user.name) || <UserRound className="size-4" />}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm leading-tight truncate">{user.name}</span>
              <span className="text-xs text-[#3D1B22]/60 truncate">{user.email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={onClose}
                className="text-[#4A1E27] font-semibold hover:bg-[#F3E8DF] flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-base"
              >
                👑 Admin Dashboard
              </Link>
            )}
            {user.role === "CUSTOMER" && (
              <>
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center gap-2 text-base font-medium text-[#3D1B22] transition-colors duration-200 hover:text-[#4A1E27]"
                >
                  <UserRound className="size-4 text-[#4A1E27]" />
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="flex items-center gap-2 text-base font-medium text-[#3D1B22] transition-colors duration-200 hover:text-[#4A1E27]"
                >
                  <ShoppingBag className="size-4 text-[#4A1E27]" />
                  My Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-2 text-base font-medium text-[#3D1B22] transition-colors duration-200 hover:text-[#4A1E27]"
                >
                  <Heart className="size-4 text-[#4A1E27]" />
                  My Wishlist
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center gap-2 border-t border-[#EBDCD2] px-6 pt-5">
        <IconLinks onCartClick={() => { onClose(); onCartClick(); }} mounted={mounted} />
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
              nativeButton={false}
              onClick={onClose}
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              render={<Link href="/register" />}
              nativeButton={false}
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
          nativeButton={false}
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
  const cartOpen = useCartStore((state) => state.isOpen);
  const setCartOpen = useCartStore((state) => state.setOpen);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = useCartStore((state) => state.getItemCount());
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const { isAuthenticated, user } = useAuthStore();

  React.useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, isAuthenticated]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-golden-border bg-champagne">
      <div className="w-full bg-[#4A1E27] py-2 px-4 text-center text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
        Complimentary shipping on orders over $75 • Use code: PUREYUNA
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none hover:bg-charcoal/5 text-charcoal active:scale-[0.97] size-8 rounded-md -ml-2 md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-80 max-w-sm flex-col sm:max-w-sm">
              <MobileNavContent onClose={closeMobile} pathname={pathname} onCartClick={() => setCartOpen(true)} mounted={mounted} />
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
          {user?.role !== "ADMIN" && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="md:hidden text-[#3D1B22] hover:text-[#4A1E27] relative p-1.5 cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="size-6" strokeWidth={2.2} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#4A1E27] text-[0.62rem] font-bold text-[#FAF5F0]">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <div className="hidden gap-2 md:flex">
            <IconLinks onCartClick={() => setCartOpen(true)} mounted={mounted} />
          </div>
          <div className="hidden md:block">
            <AuthActions mounted={mounted} />
          </div>
          <Button
            variant="default"
            render={<Link href="/products" />}
            nativeButton={false}
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