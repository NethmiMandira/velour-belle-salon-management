"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  Users,
  Scissors,
  UserCheck,
  FileText,
  BarChart3,
  Image as ImageIcon,
  Star,
  Menu,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/util";

export interface NavbarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface NavbarProps {
  items?: NavbarItem[];
  brandName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  className?: string;
}

const defaultNavItems: NavbarItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Calendar", href: "/appointmentCalender", icon: CalendarDays },
  { title: "Appointments", href: "/appointments", icon: Calendar },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Services", href: "/salonServices", icon: Scissors },
  { title: "Team", href: "/teamMembers", icon: UserCheck },
  { title: "Invoices", href: "/invoiceGenerating", icon: FileText },
  { title: "Reports", href: "/reportGenerating", icon: BarChart3 },
  { title: "Gallery", href: "/gallery", icon: ImageIcon },
  { title: "Reviews", href: "/reviews", icon: Star },
];

export function Navbar({
  items = defaultNavItems,
  brandName = "Velour Belle",
  userName = "Velour Belle Admin",
  userRole = "Salon Director",
  userAvatar,
  className,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Scroll Container Ref & Arrow Visibility State
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  // Helper to check scroll position & update arrows
  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Small offset buffer (4px) to handle fractional pixel rounding
    const hasScrollLeft = el.scrollLeft > 4;
    const hasScrollRight =
      el.scrollLeft < el.scrollWidth - el.clientWidth - 4;

    setCanScrollLeft(hasScrollLeft);
    setCanScrollRight(hasScrollRight);
  }, []);

  // Update scroll status on resize, initial render, and route change
  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const activeItem = el.querySelector<HTMLElement>("[data-nav-active='true']");
    activeItem?.scrollIntoView({ block: "nearest", inline: "nearest" });

    const frame = window.requestAnimationFrame(checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, pathname]);

  // Close mobile drawer when route changes
  React.useEffect(() => {
    if (!isMenuOpen) return;

    const frame = window.requestAnimationFrame(() => setIsMenuOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [isMenuOpen, pathname]);

  // Smooth scroll handler for arrow button clicks
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = 240; // Pixels to scroll per click
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-brand-blush/60 bg-brand-ivory/90 backdrop-blur-md transition-all",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
        >
          <span className="font-serif text-lg font-bold tracking-wider text-brand-burgundy drop-shadow-sm">
            {brandName}
          </span>
        </Link>

        {/* Desktop Navigation Container with Dedicated Arrow Slots */}
        <div className="hidden min-w-0 flex-1 items-center gap-1.5 xl:flex">
          {/* Dedicated Left Arrow Slot */}
          <div className="flex w-7 shrink-0 items-center justify-center">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-blush/80 bg-brand-ivory/95 text-brand-burgundy shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand-blush/40 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Nav Links Scroll Area */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex w-full items-center gap-1.5 overflow-x-auto py-1.5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  data-nav-active={isActive ? "true" : undefined}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-xs font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-brand-burgundy font-semibold text-white shadow-md shadow-brand-burgundy/15"
                      : "text-brand-charcoal/80 hover:bg-brand-blush/40 hover:text-brand-burgundy"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-brand-gold" : "text-brand-burgundy/70"
                    )}
                  />
                  <span>{item.title}</span>

                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        "flex h-4 min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none",
                        isActive
                          ? "bg-brand-gold text-brand-burgundy"
                          : "bg-brand-blush text-brand-burgundy"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Dedicated Right Arrow Slot */}
          <div className="flex w-7 shrink-0 items-center justify-center">
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-blush/80 bg-brand-ivory/95 text-brand-burgundy shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand-blush/40 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full bg-brand-burgundy px-3.5 py-1.5 font-sans text-xs font-medium text-brand-gold shadow-sm transition-all duration-200 hover:bg-brand-burgundy/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] lg:inline-flex"
          >
            <span>View Site</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <div className="hidden items-center gap-2.5 border-l border-brand-blush/60 pl-3 sm:flex">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-blush/80 bg-brand-blush/40 font-serif text-sm font-semibold text-brand-burgundy shadow-inner">
              {userAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                userName.charAt(0)
              )}
            </div>
            <div className="hidden flex-col leading-tight lg:flex">
              <span className="font-sans text-xs font-semibold text-brand-burgundy">
                {userName}
              </span>
              <span className="font-sans text-[10px] text-brand-charcoal/60">
                {userRole}
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-xl border border-brand-blush/80 p-2 text-brand-rose transition-colors hover:bg-brand-blush/30 hover:text-brand-burgundy xl:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="border-t border-brand-blush/60 bg-brand-ivory/95 px-4 pb-4 pt-3 backdrop-blur-md xl:hidden">
          <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-brand-burgundy font-semibold text-white shadow-sm shadow-brand-burgundy/20"
                      : "text-brand-charcoal/80 hover:bg-brand-blush/30 hover:text-brand-burgundy"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-brand-gold" : "text-brand-burgundy/70"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;