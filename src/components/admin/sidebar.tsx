"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/util";

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface SidebarGroup {
  groupLabel?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups?: SidebarGroup[];
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
  className?: string;
}

const defaultNavigationGroups: SidebarGroup[] = [
  {
    groupLabel: "Main Menu",
    items: [
      { title: "Overview", href: "/admin", icon: LayoutDashboard },
      {
        title: "Appointments",
        href: "/admin/appointments",
        icon: Calendar,
        badge: 3,
      },
      { title: "Clients", href: "/admin/clients", icon: Users },
      { title: "Services & Staff", href: "/admin/services", icon: Scissors },
    ],
  },
  {
    groupLabel: "Analytics & Settings",
    items: [
      { title: "Revenue", href: "/admin/revenue", icon: TrendingUp },
      { title: "Notifications", href: "/admin/notifications", icon: Bell },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  groups = defaultNavigationGroups,
  userName = "Maison Belle Admin",
  userRole = "Salon Director",
  userAvatar,
  onLogout,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col justify-between border-r border-brand-blush/60 bg-brand-ivory/95 p-4 text-brand-charcoal transition-all duration-300 ease-in-out backdrop-blur-md min-h-screen",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Collapse Toggle Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-brand-blush/80 bg-brand-ivory text-brand-burgundy shadow-md transition-all hover:bg-brand-blush/40 hover:scale-105"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Top Header / Logo */}
      <div className="flex flex-col gap-6">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-3 px-2 py-1 transition-opacity hover:opacity-85",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-burgundy text-brand-gold shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium tracking-wide text-brand-burgundy leading-none">
                Maison Belle
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-rose">
                Management
              </span>
            </div>
          )}
        </Link>

        {/* Navigation Section */}
        <div className="flex flex-col gap-5">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-1.5">
              {!isCollapsed && group.groupLabel && (
                <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-brand-burgundy/60">
                  {group.groupLabel}
                </span>
              )}

              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.title : undefined}
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium font-sans transition-all duration-200",
                        isActive
                          ? "bg-brand-burgundy text-white shadow-md shadow-brand-burgundy/20 font-semibold"
                          : "text-brand-charcoal/80 hover:bg-brand-blush/30 hover:text-brand-burgundy",
                        isCollapsed && "justify-center px-0"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? "text-brand-gold" : "text-brand-burgundy/70"
                        )}
                      />

                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}

                      {/* Badge indicator */}
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                            isActive
                              ? "bg-brand-gold text-brand-burgundy"
                              : "bg-brand-blush text-brand-burgundy",
                            isCollapsed && "absolute top-1 right-1 h-2 w-2 p-0 min-w-0"
                          )}
                        >
                          {!isCollapsed ? item.badge : ""}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-brand-blush/60 pt-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-brand-blush/20",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-blush/80 bg-brand-blush/40 font-serif text-sm font-semibold text-brand-burgundy">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                userName.charAt(0)
              )}
            </div>

            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-semibold text-brand-burgundy">
                  {userName}
                </span>
                <span className="truncate text-[10px] text-brand-charcoal/60">
                  {userRole}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg p-1.5 text-brand-burgundy/60 transition-colors hover:bg-brand-blush/40 hover:text-brand-burgundy"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}