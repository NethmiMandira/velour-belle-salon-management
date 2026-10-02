import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/util";

export type ButtonVariant = "primary" | "outline" | "ghost" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8E4057]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] shadow-sm hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] hover:shadow-md",
  outline:
    "bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50",
  ghost: 
    "bg-transparent text-[#4A1728] hover:bg-[#E8CDD2]/30",
  gold: 
    "bg-[#D8B98A] text-[#4A1728] shadow-sm hover:bg-[#D8B98A]/80",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-8 py-2.5 text-sm",
  lg: "px-10 py-3 text-base",
};

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentProps<"button">, keyof ButtonBaseProps> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Renders a <button> by default, or a next/link when `href` is provided.
 * `type` defaults to "button" so it never submits a form by accident.
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof props.href === "string") {
    return (
      <Link {...props} href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type ?? "button"} {...buttonProps} className={classes}>
      {children}
    </button>
  );
}