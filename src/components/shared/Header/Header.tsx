"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const publicLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Explore" },
  { href: "/about", label: "About" },
];

const adminLinks: NavLink[] = [
  { href: "/items/add", label: "Add Event" },
  { href: "/items/manage", label: "Manage Events" },
];

const userLinks: NavLink[] = [{ href: "/my-bookings", label: "My Bookings" }];

export default function Header() {
  const { user, logout, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

const navLinks: NavLink[] = user
    ? isAdmin
      ? [...publicLinks, ...adminLinks, { href: "/dashboard/statistics", label: "Statistics" }]
      : [...publicLinks, ...userLinks, { href: "/contact", label: "Contact" }]
    : [...publicLinks, { href: "/contact", label: "Contact" }];

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const initials =
    user?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span>EventSphere</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                pathname === link.href
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL || undefined}
                        alt={user.displayName ?? "User"}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium flex items-center gap-1.5">
                      {user.displayName ?? "User"}
                      {isAdmin && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-semibold">
                          ADMIN
                        </span>
                      )}
                    </span>
                  </Button>
                }
              />

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  render={<Link href="/profile" className="cursor-pointer" />}
                >
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>

                {isAdmin ? (
                  <DropdownMenuItem
                    render={
                      <Link href="/items/manage" className="cursor-pointer" />
                    }
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Manage Events
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    render={
                      <Link href="/my-bookings" className="cursor-pointer" />
                    }
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    My Bookings
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" render={<Link href="/login" />} nativeButton={false}>
                Login
              </Button>
              <Button render={<Link href="/signup" />} nativeButton={false}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium",
                pathname === link.href
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
<div className="pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Button
                  variant="outline"
                  render={<Link href="/profile" onClick={() => setMobileOpen(false)} />}
                  nativeButton={false}
                  className="w-full"
                >
                  My Profile
                </Button>
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  render={<Link href="/login" />}
                  nativeButton={false}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  render={<Link href="/signup" />}
                  nativeButton={false}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}