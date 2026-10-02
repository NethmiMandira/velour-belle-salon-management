import * as React from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/util";

export interface RevenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  totalRevenue: number;
  currency?: string;
  percentageChange: number;
  periodLabel?: string;
  monthlyTarget?: number;
  currentProgress?: number;
  onFilterChange?: (period: string) => void;
}

export function RevenueCard({
  className,
  totalRevenue = 12450,
  currency = "$",
  percentageChange = 14.8,
  periodLabel = "vs. last month",
  monthlyTarget = 15000,
  currentProgress = 83,
  ...props
}: RevenueCardProps) {
  const isPositive = percentageChange >= 0;

  // Format currency with commas
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalRevenue);

  const formattedTarget = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monthlyTarget);

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-blush/60 bg-brand-ivory/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Top Bar: Title & Icon */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blush/50 text-brand-burgundy">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-brand-burgundy">
              Total Revenue
            </h3>
            <p className="text-xs text-brand-charcoal/60">Financial Performance</p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-1.5 text-brand-burgundy/60 transition-colors hover:bg-brand-blush/40 hover:text-brand-burgundy"
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Main Metric Section */}
      <div className="my-2 flex flex-col gap-2">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-2xl font-light text-brand-rose">
            {currency}
          </span>
          <span className="font-serif text-4xl font-semibold tracking-tight text-brand-burgundy">
            {formattedRevenue}
          </span>
        </div>

        {/* Growth Badge */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isPositive
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {percentageChange}%
            </span>
          </div>
          <span className="text-xs text-brand-charcoal/60">{periodLabel}</span>
        </div>
      </div>

      {/* Monthly Target Progress Section */}
      <div className="mt-6 border-t border-brand-blush/40 pt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-brand-charcoal/80">Monthly Target</span>
          <span className="font-semibold text-brand-burgundy">
            {currentProgress}% ({currency}{formattedTarget})
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-brand-blush/40">
          <div
            className="h-full rounded-full bg-brand-rose transition-all duration-500 ease-out"
            style={{ width: `${Math.min(currentProgress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}