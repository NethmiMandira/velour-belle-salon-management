import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/util";

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      disabled,
      value,
      id,
      min,
      max,
      step,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const timeInputId = id || generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={timeInputId}
            className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy/80"
          >
            {label}
            {required && <span className="ml-1 text-brand-rose">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative flex items-center">
          <input
            id={timeInputId}
            ref={ref}
            type="time"
            value={value}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            required={required}
            className={cn(
              "flex h-11 w-full rounded-xl border border-brand-blush/60 bg-brand-ivory/80 px-4 py-2 pr-10 font-sans text-sm text-brand-charcoal transition-all duration-200 outline-none cursor-pointer",
              "focus:border-brand-rose focus:bg-white focus:ring-2 focus:ring-brand-rose/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {/* Clock Icon */}
          <div className="pointer-events-none absolute right-3.5 text-brand-burgundy/60">
            <Clock className="h-4 w-4" />
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

TimePicker.displayName = "TimePicker";

export { TimePicker };