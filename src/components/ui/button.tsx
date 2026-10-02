import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const classes = "inline-flex items-center justify-center rounded-xl bg-brand-burgundy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-rose";

export default function Button({ children, href, className = "", type = "button" }: ButtonProps) {
  if (href) return <Link href={href} className={`${classes} ${className}`}>{children}</Link>;
  return <button type={type} className={`${classes} ${className}`}>{children}</button>;
}
