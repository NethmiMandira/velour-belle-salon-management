import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/util";

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DropdownListProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const DropdownList = React.forwardRef<HTMLSelectElement, DropdownListProps>(
  (
    {
      className,
      label,
      options,
      placeholder = "Select an option",
      error,
      helperText,
      required,
      disabled,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy/80"
          >
            {label}
            {required && <span className="ml-1 text-brand-rose">*</span>}
          </label>
        )}

        {/* Dropdown Container */}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            value={value}
            disabled={disabled}
            required={required}
            className={cn(
              "flex h-11 w-full appearance-none rounded-xl border border-brand-blush/60 bg-brand-ivory/80 px-4 py-2 pr-10 text-sm font-sans text-brand-charcoal transition-all duration-200 outline-none cursor-pointer",
              "focus:border-brand-rose focus:bg-white focus:ring-2 focus:ring-brand-rose/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              (value === "" || value === undefined) && "text-brand-charcoal/40",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-brand-charcoal/40">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-brand-ivory py-1 text-brand-charcoal"
                style={{ backgroundColor: "#FAF7F2", color: "#292426" }}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="pointer-events-none absolute right-3.5 text-brand-burgundy/60">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Helper/Error Message */}
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-brand-charcoal/60">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

DropdownList.displayName = "DropdownList";

export { DropdownList };