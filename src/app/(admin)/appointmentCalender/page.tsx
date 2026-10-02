"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  Scissors,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { EditableCombobox } from "@/components/admin/EditableCombobox";
import { Navbar } from "@/components/admin/Navbar";
import type { CalendarAppointment, CalendarAppointmentStatus, CalendarView } from "@/types/admin";

const EXISTING_CLIENTS = [
  { name: "Nimasha Fernando", phone: "0771234567" },
  { name: "Dilini Rathnayake", phone: "0719876543" },
  { name: "Kavindi Perera", phone: "0751122334" },
  { name: "Sachini De Silva", phone: "0765544332" },
  { name: "Oshadhee Jayawardena", phone: "0789988776" },
  { name: "Tharushi Wickramasinghe", phone: "0723344556" },
];

const INITIAL_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: "APT-2001",
    clientName: "Nimasha Fernando",
    clientPhone: "0771234567",
    service: "Hair Cut & Layering",
    stylist: "Anura Jayasinghe",
    date: "2026-09-28",
    time: "10:00",
    durationMinutes: 60,
    status: "Confirmed",
    price: "LKR 2,500",
  },
  {
    id: "APT-2002",
    clientName: "Dilini Rathnayake",
    clientPhone: "0719876543",
    service: "Gel Manicure",
    stylist: "Samanthi Perera",
    date: "2026-09-28",
    time: "11:30",
    durationMinutes: 45,
    status: "Booked",
    price: "LKR 3,000",
  },
  {
    id: "APT-2003",
    clientName: "Kavindi Perera",
    clientPhone: "0751122334",
    service: "Gold Facial Glow",
    stylist: "Samanthi Perera",
    date: "2026-09-27",
    time: "14:00",
    durationMinutes: 90,
    status: "Completed",
    price: "LKR 5,000",
  },
  {
    id: "APT-2004",
    clientName: "Sachini De Silva",
    clientPhone: "0765544332",
    service: "Keratin Hair Treatment",
    stylist: "Kavinda Silva",
    date: "2026-09-29",
    time: "13:00",
    durationMinutes: 120,
    status: "Cancelled",
    price: "LKR 18,000",
  },
  {
    id: "APT-2005",
    clientName: "Oshadhee Jayawardena",
    clientPhone: "0789988776",
    service: "Luxury Pedicure",
    stylist: "Samanthi Perera",
    date: "2026-09-30",
    time: "09:00",
    durationMinutes: 60,
    status: "Confirmed",
    price: "LKR 3,200",
  },
  {
    id: "APT-2006",
    clientName: "Tharushi Wickramasinghe",
    clientPhone: "0723344556",
    service: "Blow Dry & Styling",
    stylist: "Anura Jayasinghe",
    date: "2026-09-28",
    time: "15:00",
    durationMinutes: 45,
    status: "Booked",
    price: "LKR 2,000",
  },
];

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function AppointmentCalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2026-09-28"));
  const [view, setView] = useState<CalendarView>("month");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [appointments, setAppointments] =
    useState<CalendarAppointment[]>(INITIAL_APPOINTMENTS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<CalendarAppointment | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    service: "",
    stylist: "Anura Jayasinghe",
    date: "2026-09-28",
    time: "10:00",
    status: "Confirmed" as CalendarAppointmentStatus,
    price: "LKR 2,500",
  });

  const clientOptions = useMemo(
    () => EXISTING_CLIENTS.map((c) => c.name),
    []
  );

  // Navigation handlers
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (apt) => statusFilter === "All" || apt.status === statusFilter
    );
  }, [appointments, statusFilter]);

  // Form handlers
  const handleClientNameChange = (name: string) => {
    const match = EXISTING_CLIENTS.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    setFormData((prev) => ({
      ...prev,
      clientName: name,
      clientPhone: match ? match.phone : prev.clientPhone,
    }));
  };

  const handleOpenEditModal = (apt: CalendarAppointment) => {
    setSelectedAppointment(apt);
    setFormData({
      clientName: apt.clientName,
      clientPhone: apt.clientPhone,
      service: apt.service,
      stylist: apt.stylist,
      date: apt.date,
      time: apt.time,
      status: apt.status,
      price: apt.price,
    });
    setIsModalOpen(true);
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.service || !selectedAppointment) return;

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === selectedAppointment.id
          ? { ...a, ...formData, durationMinutes: 60 }
          : a
      )
    );
    setIsModalOpen(false);
  };

  const getStatusBadgeStyle = (status: CalendarAppointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return "bg-[#10B981]/15 text-[#065F46] border-[#10B981]/30";
      case "Booked":
        return "bg-[#F59E0B]/15 text-[#92400E] border-[#F59E0B]/30";
      case "Completed":
        return "bg-[#3B82F6]/15 text-[#1E40AF] border-[#3B82F6]/30";
      case "Cancelled":
        return "bg-[#EF4444]/15 text-[#991B1B] border-[#EF4444]/30";
    }
  };

  const getStatusIcon = (status: CalendarAppointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle2 className="w-3 h-3 text-[#065F46]" />;
      case "Booked":
        return <AlertCircle className="w-3 h-3 text-[#92400E]" />;
      case "Completed":
        return <CheckCircle2 className="w-3 h-3 text-[#1E40AF]" />;
      case "Cancelled":
        return <XCircle className="w-3 h-3 text-[#991B1B]" />;
    }
  };

  const viewTitle = useMemo(() => {
    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }
  }, [currentDate, view]);

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2]">
      {/* Background Image Container */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/bgImage.jpg"
          alt="Background Design"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Navigation Bar */}
      <Navbar />

      <Container
        size="full"
        className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 text-[#292426]"
      >
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <PageTitle
            title="Appointment Calendar"
            description="Manage client schedules across monthly, weekly, and daily timelines."
          />

          {/* Controls Bar */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#E8CDD2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* View Switching Tabs */}
            <div className="flex items-center gap-1 bg-[#FAF7F2]/80 p-1 rounded-xl border border-[#E8CDD2]">
              {(["month", "week", "day"] as CalendarView[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${
                    view === v
                      ? "bg-[#4A1728] text-white shadow-xs"
                      : "text-[#8E4057] hover:bg-[#E8CDD2]/40"
                  }`}
                >
                  {v} View
                </button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl border border-[#E8CDD2] text-[#8E4057] hover:bg-[#E8CDD2]/30 bg-white/50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <h2 className="text-base font-bold text-[#4A1728] min-w-[180px] text-center">
                {viewTitle}
              </h2>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl border border-[#E8CDD2] text-[#8E4057] hover:bg-[#E8CDD2]/30 bg-white/50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8E4057]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-bold text-[#8E4057] bg-[#FAF7F2]/80 border border-[#E8CDD2] rounded-xl px-3 py-2 outline-hidden focus:ring-1 focus:ring-[#8E4057] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Booked">Booked</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Calendar Rendering Views */}
          <div className="bg-white/95 rounded-2xl border border-[#E8CDD2] shadow-md overflow-hidden">
            {view === "month" && (
              <MonthView
                currentDate={currentDate}
                appointments={filteredAppointments}
                onSelectAppointment={handleOpenEditModal}
                getStatusStyle={getStatusBadgeStyle}
                getStatusIcon={getStatusIcon}
              />
            )}

            {view === "week" && (
              <WeekView
                currentDate={currentDate}
                appointments={filteredAppointments}
                onSelectAppointment={handleOpenEditModal}
                getStatusStyle={getStatusBadgeStyle}
              />
            )}

            {view === "day" && (
              <DayView
                currentDate={currentDate}
                appointments={filteredAppointments}
                onSelectAppointment={handleOpenEditModal}
                getStatusStyle={getStatusBadgeStyle}
                getStatusIcon={getStatusIcon}
              />
            )}
          </div>
        </div>
      </Container>

      {/* Edit Booking Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#E8CDD2] p-6 relative">
            <div className="flex items-center justify-between border-b border-[#E8CDD2] pb-4 mb-6">
              <h3 className="text-lg font-bold text-[#4A1728]">
                Edit Booking: {selectedAppointment.id}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8E4057] hover:text-[#4A1728] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAppointment} className="space-y-4">
              <div>
                <Label htmlFor="clientName" required>
                  CLIENT NAME
                </Label>
                <EditableCombobox
                  id="clientName"
                  options={clientOptions}
                  value={formData.clientName}
                  onChange={handleClientNameChange}
                  placeholder="Select or enter client name"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientPhone">PHONE</Label>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, clientPhone: e.target.value })
                    }
                    placeholder="077XXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="service">SERVICE</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">DATE</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="time">TIME (24-HR)</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <DropdownList
                    id="status"
                    name="status"
                    label="STATUS"
                    options={[
                      { label: "Booked", value: "Booked" },
                      { label: "Confirmed", value: "Confirmed" },
                      { label: "Completed", value: "Completed" },
                      { label: "Cancelled", value: "Cancelled" },
                    ]}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as CalendarAppointmentStatus,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="price">PRICE</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8CDD2]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MONTH VIEW SUB-COMPONENT
// ==========================================
function MonthView({
  currentDate,
  appointments,
  onSelectAppointment,
  getStatusStyle,
  getStatusIcon,
}: {
  currentDate: Date;
  appointments: CalendarAppointment[];
  onSelectAppointment: (apt: CalendarAppointment) => void;
  getStatusStyle: (s: CalendarAppointmentStatus) => string;
  getStatusIcon: (s: CalendarAppointmentStatus) => React.ReactNode;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDay, daysInMonth]);

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-[#E8CDD2] bg-[#FAF7F2]/80 text-center text-xs font-bold text-[#8E4057] py-3 uppercase">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-fr gap-px bg-[#E8CDD2]">
        {calendarDays.map((day, idx) => {
          if (!day)
            return <div key={idx} className="bg-[#FAF7F2]/40 min-h-[110px]" />;

          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const dayAppointments = appointments.filter(
            (a) => a.date === dateStr
          );

          return (
            <div
              key={idx}
              className="bg-white/95 min-h-[110px] p-1.5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-extrabold text-[#4A1728]">
                  {day}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="text-[10px] bg-[#E8CDD2] text-[#4A1728] px-1.5 py-0.5 rounded-full font-bold">
                    {dayAppointments.length}
                  </span>
                )}
              </div>

              <div className="space-y-1 overflow-y-auto max-h-[80px]">
                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => onSelectAppointment(apt)}
                    className={`p-1 rounded-md text-[11px] border font-medium flex items-center justify-between gap-1 shadow-xs hover:opacity-80 transition-opacity cursor-pointer ${getStatusStyle(
                      apt.status
                    )}`}
                  >
                    <div className="truncate flex items-center gap-1">
                      {getStatusIcon(apt.status)}
                      <span className="font-bold truncate">
                        {apt.clientName}
                      </span>
                    </div>
                    <span className="text-[9px] opacity-80 shrink-0">
                      {apt.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// WEEK VIEW SUB-COMPONENT
// ==========================================
function WeekView({
  currentDate,
  appointments,
  onSelectAppointment,
  getStatusStyle,
}: {
  currentDate: Date;
  appointments: CalendarAppointment[];
  onSelectAppointment: (apt: CalendarAppointment) => void;
  getStatusStyle: (s: CalendarAppointmentStatus) => string;
}) {
  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  }, [currentDate]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header Days */}
        <div className="grid grid-cols-8 border-b border-[#E8CDD2] bg-[#FAF7F2]/80 text-center text-xs font-bold text-[#8E4057]">
          <div className="py-3 border-r border-[#E8CDD2]">Time</div>
          {weekDays.map((d) => (
            <div key={d.toISOString()} className="py-3">
              <div>
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className="text-sm font-extrabold text-[#4A1728]">
                {d.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        {TIME_SLOTS.map((time) => (
          <div
            key={time}
            className="grid grid-cols-8 border-b border-[#E8CDD2]/60 text-xs min-h-[60px]"
          >
            <div className="p-2 border-r border-[#E8CDD2] text-center font-bold text-[#8E4057]/70 bg-[#FAF7F2]/30">
              {time}
            </div>

            {weekDays.map((d) => {
              const dateStr = d.toISOString().split("T")[0];
              const slotAppointments = appointments.filter(
                (a) => a.date === dateStr && a.time.startsWith(time.split(":")[0])
              );

              return (
                <div
                  key={dateStr}
                  className="p-1 border-r border-[#E8CDD2]/40 flex flex-col gap-1 bg-white/90"
                >
                  {slotAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => onSelectAppointment(apt)}
                      className={`p-1.5 rounded-lg border text-[11px] shadow-xs cursor-pointer hover:opacity-80 transition-opacity ${getStatusStyle(
                        apt.status
                      )}`}
                    >
                      <div className="font-bold truncate">{apt.clientName}</div>
                      <div className="text-[10px] opacity-80">{apt.service}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// DAY VIEW SUB-COMPONENT
// ==========================================
function DayView({
  currentDate,
  appointments,
  onSelectAppointment,
  getStatusStyle,
  getStatusIcon,
}: {
  currentDate: Date;
  appointments: CalendarAppointment[];
  onSelectAppointment: (apt: CalendarAppointment) => void;
  getStatusStyle: (s: CalendarAppointmentStatus) => string;
  getStatusIcon: (s: CalendarAppointmentStatus) => React.ReactNode;
}) {
  const dateStr = currentDate.toISOString().split("T")[0];

  return (
    <div className="p-4 space-y-3">
      {TIME_SLOTS.map((time) => {
        const slotAppointments = appointments.filter(
          (a) => a.date === dateStr && a.time.startsWith(time.split(":")[0])
        );

        return (
          <div
            key={time}
            className="flex items-start gap-4 p-3 rounded-xl border border-[#E8CDD2]/60 bg-white/90"
          >
            <div className="w-16 font-bold text-xs text-[#8E4057] pt-1">
              {time}
            </div>

            <div className="flex-1 space-y-2">
              {slotAppointments.length === 0 ? (
                <span className="text-xs text-gray-400 italic">
                  No appointments scheduled.
                </span>
              ) : (
                slotAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => onSelectAppointment(apt)}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs cursor-pointer hover:opacity-80 transition-opacity ${getStatusStyle(
                      apt.status
                    )}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(apt.status)}
                        <span className="font-bold text-sm">
                          {apt.clientName}
                        </span>
                        <span className="text-xs opacity-75">
                          ({apt.clientPhone})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="flex items-center gap-1">
                          <Scissors className="w-3 h-3" /> {apt.service}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {apt.stylist}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-xs">{apt.price}</div>
                      <div className="text-[10px] uppercase font-bold opacity-80">
                        {apt.status}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}