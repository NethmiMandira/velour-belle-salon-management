import type { ClientReview } from "@/types/client";

export default function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <article className="rounded-2xl border border-brand-blush/60 bg-brand-ivory p-6 shadow-sm">
      <p className="font-serif text-xl leading-relaxed text-brand-burgundy">“{review.quote}”</p>
      <div className="mt-5 border-t border-brand-blush/50 pt-4">
        <p className="text-sm font-semibold text-brand-charcoal">{review.customer}</p>
        <p className="text-xs text-brand-rose">{review.service}</p>
      </div>
    </article>
  );
}