"use client";

import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Tag,
  ImageIcon,
  Eye,
  EyeOff,
  Globe,
  GlobeOff,
} from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Grid } from "@/components/admin/grid";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import { Navbar } from "@/components/admin/Navbar";
import { Card, CardContent, CardFooter } from "@/components/admin/card";
import type { CategoryRecord, GalleryItem } from "@/types/admin";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "categories">(
    "gallery"
  );

  // --- CATEGORY STATE ---
  const [categories, setCategories] = useState<CategoryRecord[]>([
    { id: "C001", name: "Hair Styling" },
    { id: "C002", name: "Nail Art" },
    { id: "C003", name: "Skin & Facial" },
    { id: "C004", name: "Bridal Makeup" },
  ]);

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });

  // --- GALLERY ITEM STATE ---
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: "G001",
      title: "Elegant Bridal Hair Styling",
      description: "Sophisticated updo with delicate floral accessories for modern brides.",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
      category: "Bridal Makeup",
      isPublished: true,
    },
    {
      id: "G002",
      title: "Rose Gold Gel Manicure",
      description: "Glass finish gel polish with subtle rose gold shimmer accents.",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
      category: "Nail Art",
      isPublished: true,
    },
    {
      id: "G003",
      title: "Hydrating Facial Treatment",
      description: "Deep cleansing and skin rejuvenation session using organic serums.",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
      category: "Skin & Facial",
      isPublished: false,
    },
  ]);

  const [galleryFormData, setGalleryFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  const categoryOptions = [
    { label: "-- Select Category --", value: "" },
    ...categories.map((c) => ({ label: c.name, value: c.name })),
  ];

  // --- HANDLERS FOR GALLERY ---
  const handleGalleryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGalleryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !galleryFormData.title ||
      !galleryFormData.imageUrl ||
      !galleryFormData.category
    )
      return;

    const newItem: GalleryItem = {
      id: `G00${galleryItems.length + 1}`,
      title: galleryFormData.title,
      description: galleryFormData.description,
      imageUrl: galleryFormData.imageUrl,
      category: galleryFormData.category,
      isPublished: true, // Default published status
    };

    setGalleryItems((prev) => [newItem, ...prev]);

    setGalleryFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
    });
  };

  const handleCancelGallery = () => {
    setGalleryFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
    });
  };

  const handleTogglePublish = (id: string) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPublished: !item.isPublished } : item
      )
    );
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
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
                  activeTab === "gallery"
                    ? "Salon Gallery Management"
                    : "Gallery Categories"
                }
                description={
                  activeTab === "gallery"
                    ? "Upload, edit, organize, and publish showcase images for your clients."
                    : "Organize and manage gallery categories for portfolio showcases."
                }
              />
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#E8CDD2] shadow-sm self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "gallery"
                    ? "bg-[#4A1728] text-[#FAF7F2] shadow-sm"
                    : "text-[#8E4057] hover:text-[#4A1728] hover:bg-[#E8CDD2]/30"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery Items</span>
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

          {/* ================= GALLERY ITEMS SECTION ================= */}
          {activeTab === "gallery" && (
            <>
              {/* Gallery Input Form Card */}
              <div className="rounded-2xl bg-[#FAF7F2] p-8 shadow-md border border-[#E8CDD2] mb-10">
                <form onSubmit={handleSaveGalleryItem}>
                  <Grid cols={1} colsMd={12} gap="md" className="items-start">
                    {/* Image Title */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <Label
                        htmlFor="title"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        TITLE
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Elegant Bridal Updo"
                        value={galleryFormData.title}
                        onChange={handleGalleryChange}
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
                        value={galleryFormData.category}
                        onChange={handleGalleryChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-12 flex flex-col gap-1.5">
                      <Label
                        htmlFor="imageUrl"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        IMAGE URL
                      </Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://example.com/photo.jpg"
                        value={galleryFormData.imageUrl}
                        onChange={handleGalleryChange}
                        className="bg-[#FAF7F2] border-[#D8B98A] text-[#292426] focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl h-11"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-12 flex flex-col gap-1.5">
                      <Label
                        htmlFor="description"
                        className="text-xs font-bold text-[#8E4057] tracking-wider uppercase"
                      >
                        DESCRIPTION
                      </Label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Briefly describe the showcase photo..."
                        value={galleryFormData.description}
                        onChange={handleGalleryChange}
                        className="w-full p-3 bg-[#FAF7F2] border border-[#D8B98A] text-[#292426] text-sm focus:border-[#8E4057] focus:ring-1 focus:ring-[#8E4057] rounded-xl outline-none transition-all placeholder:text-[#292426]/40"
                      />
                    </div>
                  </Grid>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-8">
                    <Button
                      type="submit"
                      className="bg-[#4A1728] border border-[#4A1728] text-[#FAF7F2] hover:bg-[#E8CDD2]/50 hover:text-[#4A1728] font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors shadow-sm hover:shadow"
                    >
                      Save Gallery Item
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelGallery}
                      className="bg-transparent border border-[#8E4057] text-[#8E4057] hover:bg-[#E8CDD2]/50 font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Gallery Image Grid Section */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#4A1728] mb-6 tracking-tight text-left">
                  Gallery Portfolio Cards
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => (
                    <Card
                      key={item.id}
                      className="flex flex-col justify-between border-[#E8CDD2] bg-[#FAF7F2]"
                    >
                      <div>
                        {/* Image Header Block */}
                        <div className="relative h-48 w-full overflow-hidden bg-[#E8CDD2]/30 border-b border-[#E8CDD2]">
                          {item.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-[#8E4057]/50">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}

                          {/* Category Badge */}
                          <span className="absolute top-3 left-3 bg-[#4A1728] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                            {item.category}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 ${
                              item.isPublished
                                ? "bg-emerald-700 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                          >
                            {item.isPublished ? (
                              <>
                                <Globe className="w-3 h-3" /> Published
                              </>
                            ) : (
                              <>
                                <GlobeOff className="w-3 h-3" /> Unpublished
                              </>
                            )}
                          </span>
                        </div>

                        {/* Content Body */}
                        <CardContent className="p-5">
                          <p className="text-[11px] font-bold text-[#8E4057] uppercase tracking-wider mb-1">
                            {item.id}
                          </p>
                          <h3 className="font-serif text-lg font-bold text-[#4A1728] mb-2 leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#292426]/80 leading-relaxed line-clamp-3">
                            {item.description || "No description provided."}
                          </p>
                        </CardContent>
                      </div>

                      {/* Card Actions Footer */}
                      <CardFooter className="px-5 py-3 bg-[#E8CDD2]/20 border-t border-[#E8CDD2]/60 flex items-center justify-between">
                        {/* Publish / Unpublish Action Button */}
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item.id)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                            item.isPublished
                              ? "border-amber-600 text-amber-700 hover:bg-amber-100/50"
                              : "border-emerald-700 text-emerald-800 hover:bg-emerald-100/50"
                          }`}
                        >
                          {item.isPublished ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Unpublish</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publish</span>
                            </>
                          )}
                        </button>

                        {/* Edit & Delete Controls */}
                        <div className="flex items-center gap-2.5 text-xs font-semibold">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-[#8E4057] hover:text-[#4A1728] transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <span className="text-[#D8B98A]">|</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
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
                      placeholder="e.g. Bridal Makeup, Nail Art"
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