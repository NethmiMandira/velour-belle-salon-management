"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { clientServices } from "@/data/client-content";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <div className="rounded-2xl border border-brand-gold/60 bg-brand-ivory p-6 text-center shadow-sm"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" /><h3 className="mt-3 font-serif text-2xl text-brand-burgundy">Thank you for sharing</h3><p className="mt-1 text-sm text-brand-charcoal/70">Your review has been received.</p></div>;
  }

  return <form onSubmit={(event) => { event.preventDefault(); if (rating > 0) setSubmitted(true); }} className="rounded-2xl border border-brand-blush/60 bg-brand-ivory p-6 shadow-sm"><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="review-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Your name</label><input id="review-name" required className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose" /></div><div><label htmlFor="review-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Service</label><select id="review-service" required defaultValue="" className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose"><option value="" disabled>Select a service</option>{clientServices.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></div><div className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Rating</span><div className="flex gap-1" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} star${value === 1 ? "" : "s"}`} onClick={() => setRating(value)} className="rounded-md p-1 text-brand-gold hover:bg-brand-blush/30"><Star className={`h-5 w-5 ${rating >= value ? "fill-current" : ""}`} /></button>)}</div></div><div className="sm:col-span-2"><label htmlFor="review-comment" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Your review</label><textarea id="review-comment" required rows={4} className="w-full rounded-xl border border-brand-blush bg-brand-ivory p-4 text-sm outline-none focus:border-brand-rose" placeholder="Tell us about your visit..." /></div><button type="submit" disabled={rating === 0} className="sm:col-span-2 inline-flex h-11 items-center justify-center rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-rose disabled:cursor-not-allowed disabled:opacity-45">Submit review</button></div></form>;
}
