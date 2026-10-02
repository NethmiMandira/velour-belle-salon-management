"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Grid } from "@/components/admin/grid";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { Navbar } from "@/components/admin/Navbar";
import type { CustomerRecord } from "@/types/admin";

export default function CustomersPage() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    contact: "",
    city: "",
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>([
    {
      id: "C003",
      title: "Miss",
      firstName: "Amelia",
      lastName: "Taylor",
      contact: "+94 702367895",
      city: "Anuradhapura",
    },
    {
      id: "C002",
      title: "Miss",
      firstName: "Nethmi",
      lastName: "Mandira",
      contact: "+94 776287273",
      city: "Galgamuwa",
    },
  ]);

  const titleOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Ms.", value: "Ms." },
    { label: "Dr.", value: "Dr." },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) return;

    if (editingId) {
      // Update existing record
      setCustomers((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formData.title,
                firstName: formData.firstName,
                lastName: formData.lastName,
                contact: formData.contact.startsWith("+94")
                  ? formData.contact
                  : `+94 ${formData.contact}`,
                city: formData.city,
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      // Create new record
      const newCustomer: CustomerRecord = {
        id: `C00${customers.length + 1}`,
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        contact: `+94 ${formData.contact}`,
        city: formData.city,
      };

      setCustomers((prev) => [newCustomer, ...prev]);
    }

    setFormData({
      title: "Mr.",
      firstName: "",
      lastName: "",
      contact: "",
      city: "",
    });
  };

  const handleEdit = (customer: CustomerRecord) => {
    setEditingId(customer.id);
    setFormData({
      title: customer.title,
      firstName: customer.firstName,
      lastName: customer.lastName,
      contact: customer.contact.replace("+94 ", ""),
      city: customer.city,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "Mr.",
      firstName: "",
      lastName: "",
      contact: "",
      city: "",
    });
  };

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      handleCancel();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Background Image Container */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url("/images/bgImage.jpg")`,
        }}
      />

      {/* Main Centered Content */}
      <Container
        size="full"
        className="relative z-10 py-10 px-4 sm:px-6 min-h-[calc(100vh-4rem)] text-[#292426] flex flex-col items-center"
      >
        <div className="w-full max-w-4xl relative z-10">
          {/* Main Title Block */}
          <div className="mb-8 text-left">
            <PageTitle
              title="Manage Customers"
              description="View, add, and update client records across your system."
            />
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-[#FAF7F2]/95 p-6 sm:p-8 shadow-md border border-[#E8CDD2] mb-10">
            <form onSubmit={handleSave}>
              <Grid cols={1} colsMd={12} gap="md" className="items-start">
                {/* Title Selection */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <DropdownList
                    id="title"
                    name="title"
                    label="TITLE"
                    options={titleOptions}
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>

                {/* First Name */}
                <div className="md:col-span-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="firstName"
                    className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                  >
                    FIRST NAME
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                    required
                  />
                </div>
                {/* Last Name */}
                <div className="md:col-span-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="lastName"
                    className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                  >
                    LAST NAME
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label
                    htmlFor="contact"
                    className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                  >
                    CONTACT (PHONE NO.)
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-[#D8B98A] bg-[#FAF7F2] text-[#8E4057] text-sm font-semibold">
                      +94
                    </span>
                    <Input
                      id="contact"
                      name="contact"
                      placeholder="XXXXXXXXX"
                      value={formData.contact}
                      onChange={handleChange}
                      className="rounded-l-none rounded-r-xl bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] h-11"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <Label
                    htmlFor="city"
                    className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                  >
                    CITY
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                  />
                </div>
              </Grid>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  type="submit"
                  className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                >
                  {editingId ? "Update Customer" : "Save Customer"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Registered Customers Table Section */}
          <div>
            <h2 className="text-xl font-bold text-[#4A1728] mb-4 tracking-tight text-left">
              Registered Customers
            </h2>

            <div className="overflow-x-auto rounded-2xl bg-[#FAF7F2]/95 border border-[#E8CDD2] shadow-sm">
              <table className="w-full text-left text-sm text-[#292426] border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#E8CDD2] bg-[#4A1728] text-xs uppercase tracking-wider font-semibold text-[#D8B98A]">
                    <th className="py-4 px-6">TITLE</th>
                    <th className="py-4 px-6">FIRST NAME</th>
                    <th className="py-4 px-6">LAST NAME</th>
                    <th className="py-4 px-6">CONTACT</th>
                    <th className="py-4 px-6">CITY</th>
                    <th className="py-4 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8CDD2]/60">
                  {customers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-sm text-[#8E4057]"
                      >
                        No customers found. Add a customer above.
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-[#E8CDD2]/25 transition-colors"
                      >
                        <td className="py-4 px-6 text-[#292426]">
                          {customer.title}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#292426]">
                          {customer.firstName}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#292426]">
                          {customer.lastName}
                        </td>
                        <td className="py-4 px-6 text-[#292426]">
                          {customer.contact}
                        </td>
                        <td className="py-4 px-6 text-[#292426]">
                          {customer.city}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-3 text-sm font-semibold">
                            <button
                              type="button"
                              onClick={() => handleEdit(customer)}
                              className="inline-flex items-center gap-1 text-[#8E4057] hover:text-[#4A1728] transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <span className="text-[#D8B98A]">|</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(customer.id)}
                              className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}