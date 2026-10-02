"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-5 pb-3 border-b border-[#E8CDD2]/60 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-5 py-3.5 bg-[#E8CDD2]/20 border-t border-[#E8CDD2]/60 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}