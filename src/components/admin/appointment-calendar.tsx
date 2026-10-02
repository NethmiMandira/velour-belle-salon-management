"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/util";

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface AppointmentCalendarProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  selectedTime?: string;
  onTimeChange?: (time: string) => void;
  timeSlots?: TimeSlot[];
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const defaultSlots: TimeSlot[] = [
  { id: "1", time: "09:00 AM", available: true },
  { id: "2", time: "10:30 AM", available: true },
  { id: "3", time: "12:00 PM", available: false },
  { id: "4", time: "02:00 PM", available: true },
  { id: "5", time: "03:30 PM", available: true },
  { id: "6", time: "05:00 PM", available: true },
];

export function AppointmentCalendar({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  timeSlots = defaultSlots,
  minDate = new Date(),
  maxDate,
  className,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selectedDate || new Date()
  );
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    selectedDate
  );
  const [internalTime, setInternalTime] = React.useState<string | undefined>(
    selectedTime
  );

  const activeDate = selectedDate !== undefined ? selectedDate : internalDate;
  const activeTime = selectedTime !== undefined ? selectedTime : internalTime;

  // Days of week headers
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper calculation functions
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const chosenDate = new Date(year, month, day);
    setInternalDate(chosenDate);
    onDateChange?.(chosenDate);
  };

  const handleSelectTime = (time: string) => {
    setInternalTime(time);
    onTimeChange?.(time);
  };

  const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isPastDay = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 rounded-2xl border border-brand-blush/60 bg-brand-ivory/90 p-6 shadow-xl backdrop-blur-md lg:grid-cols-12",
        className
      )}
    >
      {/* Date Picker Section */}
      <div className="lg:col-span-7">
        {/* Month Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <h3 className="font-serif text-xl font-medium text-brand-burgundy">
              {monthNames[month]} {year}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="rounded-lg p-2 text-brand-burgundy/70 transition-colors hover:bg-brand-blush/40 hover:text-brand-burgundy"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded-lg p-2 text-brand-burgundy/70 transition-colors hover:bg-brand-blush/40 hover:text-brand-burgundy"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wider text-brand-burgundy/60 pb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty padding cells for start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-10" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const dateObj = new Date(year, month, day);
            const selected = isSameDay(activeDate, dateObj);
            const disabled = isPastDay(day);

            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectDate(day)}
                className={cn(
                  "flex h-10 w-full items-center justify-center rounded-xl text-sm font-sans transition-all duration-200",
                  disabled &&
                    "cursor-not-allowed text-brand-charcoal/30 line-through hover:bg-transparent",
                  !disabled &&
                    !selected &&
                    "text-brand-charcoal hover:bg-brand-blush/40 hover:text-brand-burgundy",
                  selected &&
                    "bg-brand-rose font-semibold text-white shadow-md shadow-brand-rose/20 scale-105"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="lg:col-span-5 lg:border-l lg:border-brand-blush/60 lg:pl-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-4">
            <Clock className="h-4 w-4 text-brand-burgundy/60" />
            <h4 className="font-serif text-lg font-medium text-brand-burgundy">
              Available Times
            </h4>
          </div>

          {!activeDate ? (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-brand-blush/80 p-4 text-center text-xs text-brand-charcoal/60">
              Please choose an appointment date first.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = activeTime === slot.time;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => handleSelectTime(slot.time)}
                    className={cn(
                      "rounded-xl border border-brand-blush/60 px-3 py-2.5 text-xs font-medium transition-all duration-200",
                      !slot.available &&
                        "cursor-not-allowed border-transparent bg-brand-charcoal/5 text-brand-charcoal/30 line-through",
                      slot.available &&
                        !isSelected &&
                        "bg-brand-ivory text-brand-charcoal hover:border-brand-rose hover:bg-brand-blush/30 hover:text-brand-burgundy",
                      isSelected &&
                        "border-brand-burgundy bg-brand-burgundy text-white shadow-sm"
                    )}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Summary */}
        {activeDate && activeTime && (
          <div className="mt-6 rounded-xl bg-brand-blush/30 p-3.5 text-center text-xs text-brand-burgundy border border-brand-blush/60">
            Selected:{" "}
            <span className="font-semibold">
              {activeDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>{" "}
            at <span className="font-semibold">{activeTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}