"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type ComboboxOption = {
  label: string;
  value: string;
};

export interface ComboboxProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | ComboboxOption)[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function EditableCombobox({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select or type...",
  className = "",
  disabled = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to a uniform array of ComboboxOption
  const normalizedOptions: ComboboxOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  // Filter options based on user input matching label or value
  const filteredOptions = normalizedOptions.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase()) ||
    option.value.toLowerCase().includes(value.toLowerCase())
  );

  // Close dropdown menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-[#8E4057] uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={id}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full h-11 px-3 pr-10 bg-[#FAF7F2] border border-[#D8B98A] text-[#292426] font-medium focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl outline-none transition-all disabled:opacity-50 ${className}`}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E4057] hover:text-[#4A1728] disabled:opacity-50"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <ul className="absolute z-50 left-0 right-0 top-[calc(100%+4px)] max-h-48 overflow-auto bg-[#FAF7F2] border border-[#E8CDD2] rounded-xl shadow-lg py-1 text-sm">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={`${option.value}-${index}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-3 py-2 cursor-pointer text-[#292426] hover:bg-[#E8CDD2]/40 hover:text-[#4A1728] font-medium transition-colors"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-xs text-[#8E4057]/70 italic">
              Press enter or keep typing custom text...
            </li>
          )}
        </ul>
      )}
    </div>
  );
}