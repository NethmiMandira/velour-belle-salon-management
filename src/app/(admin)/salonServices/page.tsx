"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Tag, Scissors } from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Grid } from "@/components/admin/grid";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { Navbar } from "@/components/admin/Navbar";
import type { CategoryRecord, ServiceRecord } from "@/types/admin";

export default function SalonServicesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "categories">(
    "services"
  );

  // --- SERVICE STATE ---
  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
  });

  const [services, setServices] = useState<ServiceRecord[]>([
    {
      id: "S001",
      name: "Hair Rebonding",
      price: "2,000.00",
      duration: "02:00:00",
      category: "Hair",
    },
    {
      id: "S002",
      name: "Hair Trimming",
      price: "1,200.00",
      duration: "00:30:00",
      category: "Hair",
    },
    {
      id: "S003",
      name: "Nail polishing",
      price: "2,500.00",
      duration: "01:30:00",
      category: "Nail",
    },
    {
      id: "S006",
      name: "Hair coloring",
      price: "3,000.00",
      duration: "02:00:00",
      category: "Hair",
    },
  ]);

  // --- CATEGORY STATE ---
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });

  const [categories, setCategories] = useState<CategoryRecord[]>([
    { id: "C001", name: "Hair" },
    { id: "C002", name: "Nail" },
    { id: "C003", name: "Skin" },
    { id: "C004", name: "Makeup" },
  ]);

  const categoryOptions = [
    { label: "-- Select Category --", value: "" },
    ...categories.map((c) => ({ label: c.name, value: c.name })),
  ];

  // --- HANDLERS FOR SERVICES ---
  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !serviceFormData.name ||
      !serviceFormData.price ||
      !serviceFormData.category
    )
      return;

    const formattedPrice = parseFloat(
      serviceFormData.price || "0"
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const newService: ServiceRecord = {
      id: `S00${services.length + 1}`,
      name: serviceFormData.name,
      price: formattedPrice,
      duration: serviceFormData.duration || "00:30:00",
      category: serviceFormData.category,
    };

    setServices((prev) => [...prev, newService]);

    setServiceFormData({
      name: "",
      price: "",
      duration: "",
      category: "",
    });
  };

  const handleCancelService = () => {
    setServiceFormData({
      name: "",
      price: "",
      duration: "",
      category: "",
    });
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  // --- HANDLERS FOR CATEGORIES ---
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ name: e.target.value });
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) return;

    const newCategory: CategoryRecord = {
      id: `C00${categories.length + 1}`,
      name: categoryFormData.name.trim(),
    };

    setCategories((prev) => [...prev, newCategory]);
    setCategoryFormData({ name: "" });
  };

  const handleCancelCategory = () => {
    setCategoryFormData({ name: "" });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Navigation Bar */}
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
        className="relative z-10 py-10 px-6 min-h-screen text-[#292426] flex flex-col items-center"
      >
        <div className="w-full max-w-5xl relative z-10">
          
          {/* Main Title Block */}
          <div className="mb-8 text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <PageTitle
                title={
                  activeTab === "services"
                    ? "Manage Salon Services"
                    : "Service Categories"
                }
                description={
                  activeTab === "services"
                    ? "View, add, and update service offerings across your salon system."
                    : "Organize and manage categories for your salon services."
                }
              />
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] shadow-sm self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "services"
                    ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                    : "text-[#8E4057] hover:text-[#4A1728] hover:bg-[#E8CDD2]/30"
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Services</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("categories")}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "categories"
                    ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                    : "text-[#8E4057] hover:text-[#4A1728] hover:bg-[#E8CDD2]/30"
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Categories</span>
              </button>
            </div>
          </div>

          {/* ================= SERVICES SECTION ================= */}
          {activeTab === "services" && (
            <>
              {/* Service Form Card */}
              <div className="rounded-2xl bg-[#FAF7F2] p-8 shadow-md border border-[#E8CDD2] mb-10">
                <form onSubmit={handleSaveService}>
                  <Grid cols={1} colsMd={12} gap="md" className="items-start">
                    {/* Service Name */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        SERVICE NAME
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={serviceFormData.name}
                        onChange={handleServiceChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Price (LKR) */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="price"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        PRICE (LKR)
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="e.g. 1500.00"
                        value={serviceFormData.price}
                        onChange={handleServiceChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Duration */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="duration"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        DURATION (HH:MM:SS)
                      </Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="HH:mm:ss (e.g., 01:30:00)"
                        value={serviceFormData.duration}
                        onChange={handleServiceChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <DropdownList
                        id="category"
                        name="category"
                        label="CATEGORY"
                        options={categoryOptions}
                        value={serviceFormData.category}
                        onChange={handleServiceChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>
                  </Grid>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-8">
                    <Button
                      type="submit"
                      className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                    >
                      Save New Service
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelService}
                      className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Service List Table Section */}
              <div>
                <h2 className="text-xl font-bold text-[#4A1728] mb-4 tracking-tight text-left">
                  Service List
                </h2>

                <div className="overflow-x-auto rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] shadow-sm">
                  <table className="w-full text-left text-sm text-[#292426] border-collapse">
                    <thead>
                      <tr className="border-b border-[#E8CDD2] bg-[#4A1728] text-xs uppercase tracking-wider font-semibold text-[#D8B98A]">
                        <th className="py-4 px-6">SERVICE ID</th>
                        <th className="py-4 px-6">SERVICE NAME</th>
                        <th className="py-4 px-6">PRICE (LKR)</th>
                        <th className="py-4 px-6">DURATION</th>
                        <th className="py-4 px-6">CATEGORY</th>
                        <th className="py-4 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8CDD2]/60">
                      {services.map((service) => (
                        <tr
                          key={service.id}
                          className="hover:bg-[#E8CDD2]/25 transition-colors"
                        >
                          <td className="py-4 px-6 font-medium text-[#292426]">
                            {service.id}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#292426]">
                            {service.name}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {service.price}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {service.duration}
                          </td>
                          <td className="py-4 px-6 text-[#292426]">
                            {service.category}
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
                                onClick={() => handleDeleteService(service.id)}
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

          {/* ================= CATEGORIES SECTION ================= */}
          {activeTab === "categories" && (
            <div className="w-full">
              {/* Category Form Card */}
              <div className="rounded-2xl bg-[#FAF7F2] p-8 shadow-md border border-[#E8CDD2] mb-10">
                <form onSubmit={handleSaveCategory}>
                  <div className="flex flex-col gap-1.5 w-full">
                    <Label
                      htmlFor="categoryName"
                      className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                    >
                      CATEGORY NAME
                    </Label>
                    <Input
                      id="categoryName"
                      name="categoryName"
                      placeholder="e.g. Hair, Nail, Facial"
                      value={categoryFormData.name}
                      onChange={handleCategoryChange}
                      className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-8">
                    <Button
                      type="submit"
                      className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                    >
                      Save Category
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelCategory}
                      className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Category List Table Section */}
              <div>
                <h2 className="text-xl font-bold text-[#4A1728] mb-4 tracking-tight text-left">
                  Category List
                </h2>

                <div className="overflow-x-auto rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] shadow-sm">
                  <table className="w-full text-left text-sm text-[#292426] border-collapse">
                    <thead>
                      <tr className="border-b border-[#E8CDD2] bg-[#4A1728] text-xs uppercase tracking-wider font-semibold text-[#D8B98A]">
                        <th className="py-4 px-6">CATEGORY ID</th>
                        <th className="py-4 px-6">CATEGORY NAME</th>
                        <th className="py-4 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8CDD2]/60">
                      {categories.map((cat) => (
                        <tr
                          key={cat.id}
                          className="hover:bg-[#E8CDD2]/25 transition-colors"
                        >
                          <td className="py-4 px-6 font-medium text-[#292426]">
                            {cat.id}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#292426]">
                            {cat.name}
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
                                onClick={() => handleDeleteCategory(cat.id)}
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