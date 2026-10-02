import { Star } from "lucide-react";
import type { ClientReview } from "@/types/client";

export default function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <article className="rounded-2xl border border-brand-blush/60 bg-brand-ivory p-6 shadow-sm"><div className="flex gap-1 text-brand-gold">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 font-serif text-xl leading-relaxed text-brand-burgundy">“{review.quote}”</p><div className="mt-5 border-t border-brand-blush/50 pt-4"><p className="text-sm font-semibold text-brand-charcoal">{review.customer}</p><p className="text-xs text-brand-rose">{review.service}</p></div></article>
  );
}
