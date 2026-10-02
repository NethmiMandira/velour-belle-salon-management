"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/admin/Navbar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/admin/card";
import Button from "@/components/admin/button";
import { SearchBar } from "@/components/admin/search-bar";
import { Label } from "@/components/admin/label";
import { PageTitle } from "@/components/admin/page-title";
import type { Review } from "@/types/admin";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Calendar,
  ArrowUpDown,
  Scissors,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

// Initial mock dataset for reviews
const INITIAL_REVIEWS: Review[] = [
  {
    id: "REV-101",
    customerName: "Sophia Reynolds",
    serviceName: "Balayage & Styling",
    comment:
      "Absolutely adore the color work! The transition is seamless and my hair feels remarkably healthy and soft.",
    published: true,
    createdAt: "2026-09-20T10:30:00Z",
  },
  {
    id: "REV-102",
    customerName: "Elena Rostova",
    serviceName: "HydraFacial Glow",
    comment:
      "My skin has never looked so luminous! The atmosphere was super relaxing and treatment was top-tier.",
    published: true,
    createdAt: "2026-09-18T14:15:00Z",
  },
  {
    id: "REV-103",
    customerName: "Clara Vance",
    serviceName: "Gel Manicure Deluxe",
    comment:
      "Very friendly staff, but the waiting time was slightly longer than expected due to a late previous appointment.",
    published: false,
    createdAt: "2026-09-15T09:00:00Z",
  },
  {
    id: "REV-104",
    customerName: "Amara Patel",
    serviceName: "Aromatherapy Massage",
    comment:
      "The therapist targeted all my tension points with precision. Pure bliss from start to finish!",
    published: true,
    createdAt: "2026-08-28T16:45:00Z",
  },
  {
    id: "REV-105",
    customerName: "Vivian Thorne",
    serviceName: "Keratin Smooth Treatment",
    comment:
      "Pending approval from management before displaying. Fantastic result on thick curly hair.",
    published: false,
    createdAt: "2026-08-10T11:20:00Z",
  },
  {
    id: "REV-106",
    customerName: "Isabelle Moreau",
    serviceName: "Bridal Hair & Makeup",
    comment:
      "Made me feel like absolute royalty on my special day! Long-lasting makeup and flawless updos.",
    published: true,
    createdAt: "2026-07-02T13:00:00Z",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "earliest">("latest");

  // Toggle publish state
  const handleTogglePublish = (id: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === id ? { ...rev, published: !rev.published } : rev
      )
    );
  };

  // Delete review handler
  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== id));
  };

  // Filter and Sort logic
  const filteredAndSortedReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        return (
          review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
      });
  }, [reviews, searchQuery, sortOrder]);

  const publishedCount = reviews.filter((r) => r.published).length;
  const unpublishedCount = reviews.filter((r) => !r.published).length;

  return (
    <div className="relative min-h-screen w-full text-[#292426] font-sans">
      {/* Background image overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm z-0"
        style={{
          backgroundImage: `url("/images/bgImage.jpg")`,
        }}
      />

      {/* Content wrapper with z-index to stay above background */}
      <div className="relative z-10 min-h-screen">
        <Navbar />

        <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          {/* Clean Page Header without badge and breadcrumbs */}
          <PageTitle
            title="Customer Reviews"
            description="Manage and showcase verified feedback from your clients."
            actions={
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#E8CDD2] bg-white/90 px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm">
                  <MessageSquare className="h-4 w-4 text-[#8E4057]" />
                  <span className="font-medium text-[#292426]">Total:</span>
                  <span className="font-bold text-[#4A1728]">{reviews.length}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-900">Published:</span>
                  <span className="font-bold text-emerald-700">{publishedCount}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm">
                  <XCircle className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-900">Unpublished:</span>
                  <span className="font-bold text-amber-700">{unpublishedCount}</span>
                </div>
              </div>
            }
          />

          {/* Filters and Controls Toolbar */}
          <div className="my-6 rounded-2xl border border-[#E8CDD2] bg-[#FAF7F2]/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
              {/* Search Input */}
              <div className="lg:col-span-8">
                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery("")}
                  placeholder="Search by customer, service, or keywords..."
                />
              </div>

              {/* Sort Toggle */}
              <div className="lg:col-span-4">
                <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8E4057]">
                  Sort Order
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={sortOrder === "latest" ? "primary" : "outline"}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSortOrder("latest")}
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    Latest
                  </Button>
                  <Button
                    variant={sortOrder === "earliest" ? "primary" : "outline"}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSortOrder("earliest")}
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    Earliest
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Cards Grid */}
          {filteredAndSortedReviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedReviews.map((review) => {
                const formattedDate = new Date(review.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return (
                  <Card key={review.id} className="flex flex-col justify-between bg-white/90 backdrop-blur-sm">
                    <div>
                      {/* Card Header: Customer Info & Status Badge */}
                      <CardHeader>
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8CDD2] bg-[#E8CDD2]/30 font-serif text-sm font-semibold text-[#4A1728]">
                            {review.customerName.charAt(0)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="truncate font-sans text-sm font-bold text-[#4A1728]">
                              {review.customerName}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-medium text-[#8E4057]">
                              <Scissors className="h-3 w-3 shrink-0" />
                              <span className="truncate">{review.serviceName}</span>
                            </span>
                          </div>
                        </div>

                        {/* Status Tag */}
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            review.published
                              ? "bg-emerald-100/80 text-emerald-800 border border-emerald-300/60"
                              : "bg-amber-100/80 text-amber-800 border border-amber-300/60"
                          }`}
                        >
                          {review.published ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              Published
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 text-amber-600" />
                              Unpublished
                            </>
                          )}
                        </span>
                      </CardHeader>

                      {/* Card Content: Review Text */}
                      <CardContent className="pt-4">
                        <p className="font-sans text-sm leading-relaxed text-[#292426] italic">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </CardContent>
                    </div>

                    {/* Card Footer: Timestamp & Action Buttons */}
                    <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t border-[#E8CDD2]/40">
                      <span className="flex items-center gap-1.5 text-xs text-[#8E4057]/80">
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedDate}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant={review.published ? "outline" : "gold"}
                          size="sm"
                          onClick={() => handleTogglePublish(review.id)}
                          className="text-xs"
                        >
                          {review.published ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              Publish
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-xs border-rose-200 hover:bg-rose-50 text-rose-700 hover:text-rose-800 px-2.5"
                          title="Delete Review"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E8CDD2] bg-white/90 p-12 text-center backdrop-blur-sm">
              <MessageSquare className="h-12 w-12 text-[#8E4057]/40" />
              <h3 className="mt-4 font-serif text-lg font-bold text-[#4A1728]">
                No reviews found
              </h3>
              <p className="mt-1 text-xs text-[#8E4057]">
                Try adjusting your search query to view reviews.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Reset Search
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}