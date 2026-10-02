"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Phone,
  Tag,
  Sparkles,
} from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Grid } from "@/components/admin/grid";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { SearchBar } from "@/components/admin/search-bar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/admin/card";
import { EditableCombobox } from "@/components/admin/EditableCombobox";
import { Navbar } from "@/components/admin/Navbar"; // Import the Navbar component
import type { AppointmentRecord, AppointmentStatus } from "@/types/admin";

// Registered Client Database for Combobox Suggestions
const EXISTING_CLIENTS = [
  { name: "Nimasha Fernando", phone: "0771234567" },
  { name: "Dilini Rathnayake", phone: "0719876543" },
  { name: "Kavindi Perera", phone: "0751122334" },
  { name: "Sachini De Silva", phone: "0765544332" },
  { name: "Oshadhee Jayawardena", phone: "0789988776" },
  { name: "Tharushi Wickramasinghe", phone: "0723344556" },
];

// Defined Service Prices (in LKR)
const SERVICE_PRICES: Record<string, number> = {
  "Hair Cut & Layering": 2500,
  "Blow Dry & Styling": 2000,
  "Gel Manicure": 3000,
  "Luxury Pedicure": 3200,
  "Keratin Hair Treatment": 18000,
  "Gold Facial Glow": 5000,
};

// Defined Stylist Capabilities
const STYLIST_CAPABILITIES: { name: string; services: string[] }[] = [
  {
    name: "Anura Jayasinghe",
    services: ["Hair Cut & Layering", "Blow Dry & Styling", "Keratin Hair Treatment"],
  },
  {
    name: "Samanthi Perera",
    services: ["Gel Manicure", "Luxury Pedicure", "Gold Facial Glow"],
  },
  {
    name: "Kavinda Silva",
    services: ["Hair Cut & Layering", "Keratin Hair Treatment", "Gold Facial Glow"],
  },
];

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    selectedService: "",
    stylist: "",
    date: "",
    time: "",
    status: "Confirmed" as AppointmentStatus,
    price: "",
  });

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([
    {
      id: "APT-1001",
      clientName: "Nimasha Fernando",
      clientPhone: "0771234567",
      services: ["Hair Cut & Layering"],
      stylist: "Anura Jayasinghe",
      date: "2026-09-28",
      time: "10:00 AM",
      status: "Confirmed",
      price: "LKR 2,500",
    },
    {
      id: "APT-1002",
      clientName: "Dilini Rathnayake",
      clientPhone: "0719876543",
      services: ["Gel Manicure"],
      stylist: "Samanthi Perera",
      date: "2026-09-28",
      time: "11:30 AM",
      status: "Pending",
      price: "LKR 3,000",
    },
    {
      id: "APT-1003",
      clientName: "Kavindi Perera",
      clientPhone: "0751122334",
      services: ["Gold Facial Glow"],
      stylist: "Samanthi Perera",
      date: "2026-09-27",
      time: "02:00 PM",
      status: "Completed",
      price: "LKR 5,000",
    },
    {
      id: "APT-1004",
      clientName: "Sachini De Silva",
      clientPhone: "0765544332",
      services: ["Keratin Hair Treatment"],
      stylist: "Kavinda Silva",
      date: "2026-09-26",
      time: "03:30 PM",
      status: "Cancelled",
      price: "LKR 18,000",
    },
    {
      id: "APT-1005",
      clientName: "Oshadhee Jayawardena",
      clientPhone: "0789988776",
      services: ["Luxury Pedicure"],
      stylist: "Samanthi Perera",
      date: "2026-09-29",
      time: "09:00 AM",
      status: "Confirmed",
      price: "LKR 3,200",
    },
    {
      id: "APT-1006",
      clientName: "Tharushi Wickramasinghe",
      clientPhone: "0723344556",
      services: ["Blow Dry & Styling"],
      stylist: "Anura Jayasinghe",
      date: "2026-09-29",
      time: "01:15 PM",
      status: "Pending",
      price: "LKR 2,000",
    },
  ]);

  const clientOptions = useMemo(() => {
    return EXISTING_CLIENTS.map((client) => ({
      label: client.name,
      value: client.name,
    }));
  }, []);

  const servicesList = [
    { label: "-- Select Service --", value: "" },
    ...Object.keys(SERVICE_PRICES).map((service) => ({
      label: `${service} (LKR ${SERVICE_PRICES[service].toLocaleString()})`,
      value: service,
    })),
  ];

  const availableStylists = useMemo(() => {
    if (!formData.selectedService) {
      return [{ label: "-- Select Service First --", value: "" }];
    }

    const filtered = STYLIST_CAPABILITIES.filter((stylist) =>
      stylist.services.includes(formData.selectedService)
    );

    return [
      { label: "-- Select Stylist --", value: "" },
      ...filtered.map((s) => ({ label: s.name, value: s.name })),
    ];
  }, [formData.selectedService]);

  const statusOptions = [
    { label: "Confirmed", value: "Confirmed" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const handleClientNameChange = (name: string) => {
    const matchedClient = EXISTING_CLIENTS.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    setFormData((prev) => ({
      ...prev,
      clientName: name,
      clientPhone: matchedClient ? matchedClient.phone : prev.clientPhone,
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = e.target.value;
    const priceAmount = SERVICE_PRICES[selectedService];
    const formattedPrice = priceAmount ? `LKR ${priceAmount.toLocaleString()}` : "";

    setFormData((prev) => ({
      ...prev,
      selectedService,
      price: formattedPrice,
      stylist: STYLIST_CAPABILITIES.find(
        (s) => s.name === prev.stylist && s.services.includes(selectedService)
      )
        ? prev.stylist
        : "",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (appointment?: AppointmentRecord) => {
    if (appointment) {
      setEditingId(appointment.id);
      setFormData({
        clientName: appointment.clientName,
        clientPhone: appointment.clientPhone,
        selectedService: appointment.services[0] || "",
        stylist: appointment.stylist,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        price: appointment.price,
      });
    } else {
      setEditingId(null);
      setFormData({
        clientName: "",
        clientPhone: "",
        selectedService: "",
        stylist: "",
        date: new Date().toISOString().split("T")[0],
        time: "10:00 AM",
        status: "Confirmed",
        price: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.selectedService || !formData.stylist)
      return;

    if (editingId) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingId
            ? { ...apt, ...formData, services: [formData.selectedService] }
            : apt
        )
      );
    } else {
      const newAppointment: AppointmentRecord = {
        id: `APT-${1001 + appointments.length}`,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        services: [formData.selectedService],
        stylist: formData.stylist,
        date: formData.date,
        time: formData.time,
        status: formData.status,
        price: formData.price,
      };
      setAppointments((prev) => [newAppointment, ...prev]);
    }

    handleCloseModal();
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.services.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      apt.stylist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background image overlay */}
      <div
       className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm z-0"
        style={{
          backgroundImage: `url("/images/bgImage.jpg")`,
        }}
      />

      {/* Top sticky Navbar */}
      <Navbar />

      <Container
        size="full"
        className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 min-h-screen text-[#292426] flex flex-col items-center"
      >
        <div className="w-full max-w-6xl relative z-10">
          <PageTitle
            title="Manage Appointments"
            description="View, schedule, and organize client salon sessions seamlessly."
            actions={
              <Button
                variant="primary"
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book Appointment</span>
              </Button>
            }
          />

          {/* Search & Filter Bar */}
          <div className="rounded-2xl bg-[#FAF7F2] p-4 shadow-sm border border-[#E8CDD2] my-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-80">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm("")}
                placeholder="Search client, service, stylist..."
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-[#8E4057] uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      statusFilter === status
                        ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                        : "bg-white/60 text-[#8E4057] hover:bg-[#E8CDD2]/30 border border-[#E8CDD2]/60"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Grid View */}
          {filteredAppointments.length === 0 ? (
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] p-12 text-center text-[#8E4057] font-medium">
              No appointments match your search or filter criteria.
            </div>
          ) : (
            <Grid cols={1} colsMd={2} colsLg={3} gap="lg">
              {filteredAppointments.map((apt) => (
                <Card key={apt.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <div>
                      <span className="text-[11px] font-extrabold text-[#8E4057] tracking-wider uppercase">
                        {apt.id}
                      </span>
                      <h4 className="text-lg font-bold text-[#4A1728] mt-0.5">
                        {apt.clientName}
                      </h4>
                    </div>
                    <div>{getStatusBadge(apt.status)}</div>
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm">
                    <div className="bg-[#E8CDD2]/20 border border-[#E8CDD2]/60 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2 border-b border-[#E8CDD2]/50 pb-1.5">
                        <Scissors className="w-4 h-4 text-[#8E4057]" />
                        <span className="text-xs font-extrabold text-[#8E4057] uppercase tracking-wider">
                          Booked Services ({apt.services.length})
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {apt.services.map((service, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-xs font-semibold text-[#292426]"
                          >
                            <Sparkles className="w-3 h-3 text-[#D8B98A] shrink-0" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <User className="w-4 h-4 text-[#D8B98A] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[#8E4057]/70 uppercase font-extrabold">
                          Assigned Stylist
                        </p>
                        <p className="font-semibold text-[#292426]">
                          {apt.stylist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-white/70 p-2.5 rounded-xl border border-[#E8CDD2]/50">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-[#8E4057]" />
                        <span className="font-semibold text-[#292426]">
                          {apt.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#8E4057] font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{apt.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#8E4057]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{apt.clientPhone}</span>
                      </div>
                      <div className="flex items-center gap-1 font-extrabold text-[#4A1728]">
                        <Tag className="w-3.5 h-3.5 text-[#D8B98A]" />
                        <span>{apt.price || "N/A"}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        handleStatusChange(
                          apt.id,
                          e.target.value as AppointmentStatus
                        )
                      }
                      className="text-xs font-semibold bg-white/80 border border-[#E8CDD2] rounded-lg px-2 py-1 text-[#8E4057] focus:outline-none"
                    >
                      <option value="Confirmed">Mark Confirmed</option>
                      <option value="Pending">Mark Pending</option>
                      <option value="Completed">Mark Completed</option>
                      <option value="Cancelled">Mark Cancelled</option>
                    </select>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(apt)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8E4057] hover:text-[#4A1728] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAppointment(apt.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          )}
        </div>
      </Container>

      {/* Booking / Editing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#E8CDD2] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#E8CDD2] pb-4 mb-6">
              <h3 className="text-xl font-bold text-[#4A1728]">
                {editingId ? "Edit Appointment" : "New Appointment Booking"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-[#8E4057] hover:text-[#4A1728] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAppointment}>
              <Grid cols={1} colsMd={12} gap="md" className="items-start">
                
                {/* 1. Client Name with EditableCombobox */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label htmlFor="clientName" required>
                    CLIENT NAME
                  </Label>
                  <EditableCombobox
                    id="clientName"
                    options={clientOptions}
                    value={formData.clientName}
                    onChange={handleClientNameChange}
                    placeholder="Search or enter client name"
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* 2. Client Phone Number */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label htmlFor="clientPhone">PHONE NUMBER</Label>
                  <Input
                    id="clientPhone"
                    name="clientPhone"
                    placeholder="e.g. 0771234567"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* 3. Service Selection */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <DropdownList
                    id="selectedService"
                    name="selectedService"
                    label="SERVICE"
                    options={servicesList}
                    value={formData.selectedService}
                    onChange={handleServiceChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* 4. Filtered Stylist Selection */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <DropdownList
                    id="stylist"
                    name="stylist"
                    label="STYLIST"
                    options={availableStylists}
                    value={formData.stylist}
                    onChange={handleInputChange}
                    disabled={!formData.selectedService}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11 disabled:opacity-50"
                  />
                </div>

                {/* 5. Date Selection */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label htmlFor="date">DATE</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* 6. Time Input */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label htmlFor="time">TIME</Label>
                  <Input
                    id="time"
                    name="time"
                    placeholder="e.g. 10:30 AM"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* 7. Auto-Calculated Price Field */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label htmlFor="price">ESTIMATED PRICE</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Auto-generated price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11 font-semibold"
                  />
                </div>

                {/* 8. Status Dropdown */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <DropdownList
                    id="status"
                    name="status"
                    label="STATUS"
                    options={statusOptions}
                    value={formData.status}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>
              </Grid>

              <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-[#E8CDD2]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingId ? "Update Booking" : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}