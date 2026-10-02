"use client";

import React, { useState } from "react";
import { Pencil, Trash2, UserPlus, Briefcase } from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Grid } from "@/components/admin/grid";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { Navbar } from "@/components/admin/Navbar";
import type { RoleRecord, StylistRecord } from "@/types/admin";

export default function SalonStylistsPage() {
  const [activeTab, setActiveTab] = useState<"Stylists" | "roles">(
    "Stylists"
  );

  // --- Stylist STATE ---
  const [StylistFormData, setStylistFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [Stylists, setStylists] = useState<StylistRecord[]>([
    {
      name: "Anura Jayasinghe",
      email: "anura@salon.com",
      phone: "0771234567",
      role: "Senior Stylist",
    },
    {
      name: "Samanthi Perera",
      email: "samanthi@salon.com",
      phone: "0719876543",
      role: "Nail Technician",
    },
    {
      name: "Kavinda Silva",
      email: "kavinda@salon.com",
      phone: "0755551234",
      role: "Hairdresser",
    },
  ]);

  // --- ROLE STATE ---
  const [roleFormData, setRoleFormData] = useState({
    title: "",
  });

  const [roles, setRoles] = useState<RoleRecord[]>([
    { id: "R001", title: "Senior Stylist" },
    { id: "R002", title: "Hairdresser" },
    { id: "R003", title: "Nail Technician" },
    { id: "R004", title: "Beautician" },
  ]);

  const roleOptions = [
    { label: "-- Select Role --", value: "" },
    ...roles.map((r) => ({ label: r.title, value: r.title })),
  ];

  // --- HANDLERS FOR StylistS ---
  const handleStylistChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStylistFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !StylistFormData.name ||
      !StylistFormData.email ||
      !StylistFormData.role
    )
      return;

    const newStylist: StylistRecord = {
      name: StylistFormData.name,
      email: StylistFormData.email,
      phone: StylistFormData.phone || "N/A",
      role: StylistFormData.role,
    };

    setStylists((prev) => [...prev, newStylist]);

    setStylistFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleCancelStylist = () => {
    setStylistFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleDeleteStylist = (email: string) => {
    setStylists((prev) => prev.filter((item) => item.email !== email));
  };

  // --- HANDLERS FOR ROLES ---
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleFormData({ title: e.target.value });
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleFormData.title.trim()) return;

    const newRole: RoleRecord = {
      id: `R00${roles.length + 1}`,
      title: roleFormData.title.trim(),
    };

    setRoles((prev) => [...prev, newRole]);
    setRoleFormData({ title: "" });
  };

  const handleCancelRole = () => {
    setRoleFormData({ title: "" });
  };

  const handleDeleteRole = (id: string) => {
    setRoles((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm z-0"
        style={{
          backgroundImage: `url("/images/bgImage.jpg")`,
        }}
      />

      {/* Main Content Layer */}
      <Container
        size="full"
        className="relative z-10 py-10 px-4 sm:px-6 min-h-[calc(100vh-4rem)] text-[#292426] flex flex-col items-center"
      >
        <div className="w-full max-w-4xl relative z-10">
          {/* Main Title Block & Tab Switcher Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <PageTitle
                title={
                  activeTab === "Stylists"
                    ? "Manage Salon Staff"
                    : "Staff Roles"
                }
                description={
                  activeTab === "Stylists"
                    ? "View, add, and manage team members and their assignments."
                    : "Configure available job titles and operational roles."
                }
              />
            </div>

            {/* Tab Switcher */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF7F2]/95 border border-[#E8CDD2] shadow-sm self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("Stylists")}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "Stylists"
                    ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                    : "text-[#8E4057] hover:text-[#4A1728] hover:bg-[#E8CDD2]/30"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Stylists</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("roles")}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "roles"
                    ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                    : "text-[#8E4057] hover:text-[#4A1728] hover:bg-[#E8CDD2]/30"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Roles</span>
              </button>
            </div>
          </div>

          {/* ================= StylistS SECTION ================= */}
          {activeTab === "Stylists" && (
            <>
              {/* Stylist Form Card */}
              <div className="rounded-2xl bg-[#FAF7F2]/95 p-6 sm:p-8 shadow-md border border-[#E8CDD2] mb-10">
                <form onSubmit={handleSaveStylist}>
                  <Grid cols={1} colsMd={12} gap="md" className="items-start">
                    {/* Stylist Name */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        Stylist NAME
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Anura Jayasinghe"
                        value={StylistFormData.name}
                        onChange={handleStylistChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="email"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        EMAIL ADDRESS
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. Stylist@salon.com"
                        value={StylistFormData.email}
                        onChange={handleStylistChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        PHONE NUMBER
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="e.g. 0771234567"
                        value={StylistFormData.phone}
                        onChange={handleStylistChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Role Selection */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <DropdownList
                        id="role"
                        name="role"
                        label="ROLE"
                        options={roleOptions}
                        value={StylistFormData.role}
                        onChange={handleStylistChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>
                  </Grid>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      type="submit"
                      className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                    >
                      Save New Stylist
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelStylist}
                      className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Stylist List Table Section */}
              <div>
                <h2 className="text-xl font-bold text-[#4A1728] mb-4 tracking-tight text-left">
                  Stylist List
                </h2>

                <div className="overflow-x-auto rounded-2xl bg-[#FAF7F2]/95 border border-[#E8CDD2] shadow-sm">
                  <table className="w-full text-left text-sm text-[#292426] border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#E8CDD2] bg-[#4A1728] text-xs uppercase tracking-wider font-semibold text-[#D8B98A]">
                        <th className="py-4 px-6">Stylist NAME</th>
                        <th className="py-4 px-6">EMAIL</th>
                        <th className="py-4 px-6">PHONE</th>
                        <th className="py-4 px-6">ROLE</th>
                        <th className="py-4 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8CDD2]/60">
                      {Stylists.map((emp) => (
                        <tr
                          key={emp.email}
                          className="hover:bg-[#E8CDD2]/25 transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold text-[#292426]">
                            {emp.name}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {emp.email}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {emp.phone}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {emp.role}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-3 text-sm font-semibold">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 text-[#8E4057] hover:text-[#4A1728] transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <span className="text-[#D8B98A]">|</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteStylist(emp.email)}
                                className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= ROLES SECTION ================= */}
          {activeTab === "roles" && (
            <div>
              {/* Role Form Card */}
              <div className="rounded-2xl bg-[#FAF7F2]/95 p-6 sm:p-8 shadow-md border border-[#E8CDD2] mb-10">
                <form onSubmit={handleSaveRole}>
                  <div className="flex flex-col gap-1.5 w-full">
                    <Label
                      htmlFor="roleTitle"
                      className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                    >
                      ROLE TITLE
                    </Label>
                    <Input
                      id="roleTitle"
                      name="roleTitle"
                      placeholder="e.g. Senior Stylist, Receptionist"
                      value={roleFormData.title}
                      onChange={handleRoleChange}
                      className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      type="submit"
                      className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                    >
                      Save Role
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelRole}
                      className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Role List Table Section */}
              <div>
                <h2 className="text-xl font-bold text-[#4A1728] mb-4 tracking-tight text-left">
                  Role List
                </h2>

                <div className="overflow-x-auto rounded-2xl bg-[#FAF7F2]/95 border border-[#E8CDD2] shadow-sm">
                  <table className="w-full text-left text-sm text-[#292426] border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#E8CDD2] bg-[#4A1728] text-xs uppercase tracking-wider font-semibold text-[#D8B98A]">
                        <th className="py-4 px-6">ROLE ID</th>
                        <th className="py-4 px-6">ROLE TITLE</th>
                        <th className="py-4 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8CDD2]/60">
                      {roles.map((r) => (
                        <tr
                          key={r.id}
                          className="hover:bg-[#E8CDD2]/25 transition-colors"
                        >
                          <td className="py-4 px-6 font-medium text-[#292426]">
                            {r.id}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#292426]">
                            {r.title}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-3 text-sm font-semibold">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 text-[#8E4057] hover:text-[#4A1728] transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <span className="text-[#D8B98A]">|</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteRole(r.id)}
                                className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}