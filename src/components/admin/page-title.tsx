import * as React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/util";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  accentText?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  align?: "left" | "center";
}

export function PageTitle({
  className,
  badge,
  title,
  accentText,
  description,
  breadcrumbs,
  actions,
  align = "left",
  ...props
}: PageTitleProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 pb-6 border-b border-brand-blush/50",
        isCentered && "items-center text-center",
        className
      )}
      {...props}
    >
      {/* Breadcrumbs (Optional) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className={cn(
            "flex items-center gap-1.5 text-xs text-brand-charcoal/60 mb-1",
            isCentered && "justify-center"
          )}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={index}>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-burgundy"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={cn(isLast && "font-medium text-brand-burgundy")}>
                    {item.label}
                  </span>
                )}

                {!isLast && <ChevronRight className="h-3 w-3 opacity-50 shrink-0" />}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* Eyebrow / Badge */}
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-brand-blush bg-brand-blush/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-rose w-fit"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title Row */}
      <div
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          isCentered && "sm:flex-col sm:items-center"
        )}
      >
        <div className="flex flex-col gap-1.5 max-w-2xl">
          {/* Changed font-light to font-bold */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy tracking-tight">
            {title}{" "}
            {accentText && (
              <span className="italic text-brand-rose font-normal">
                {accentText}
              </span>
            )}
          </h1>

          {description && (
            <p className="text-sm font-sans text-brand-charcoal/70 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Triggers (Optional) */}
        {actions && (
          <div
            className={cn(
              "flex items-center gap-3 shrink-0 pt-2 sm:pt-0",
              isCentered && "justify-center"
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}