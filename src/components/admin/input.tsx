import * as React from "react";
import { cn } from "@/lib/util";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="pointer-events-none absolute left-3.5 text-brand-burgundy/50">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-brand-blush/60 bg-brand-ivory/80 px-4 py-2 text-sm text-brand-charcoal placeholder:text-brand-charcoal/40 font-sans transition-all duration-200 outline-none",
              "focus:border-brand-rose focus:bg-white focus:ring-2 focus:ring-brand-rose/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        
        {/* Error message or helper text display */}
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-brand-charcoal/60">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };