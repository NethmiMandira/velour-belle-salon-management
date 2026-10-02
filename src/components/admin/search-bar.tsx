import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/util";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  onSearchSubmit?: (query: string) => void;
  containerClassName?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      containerClassName,
      value = "",
      onChange,
      onClear,
      onSearchSubmit,
      placeholder = "Search services, treatments, or specialists...",
      disabled,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearchSubmit) {
        e.preventDefault();
        onSearchSubmit(String(value));
      }
    };

    return (
      <div className={cn("relative flex w-full items-center", containerClassName)}>
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-3.5 text-brand-burgundy/50">
          <Search className="h-4 w-4" />
        </div>

        {/* Search Input */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "flex h-11 w-full rounded-xl border border-brand-blush/60 bg-brand-ivory/80 pl-10 pr-10 font-sans text-sm text-brand-charcoal placeholder:text-brand-charcoal/40 transition-all duration-200 outline-none",
            "focus:border-brand-rose focus:bg-white focus:ring-2 focus:ring-brand-rose/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {/* Clear Button */}
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 rounded-md p-1 text-brand-burgundy/50 transition-colors hover:bg-brand-blush/30 hover:text-brand-burgundy focus:outline-none"
            aria-label="Clear search input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };