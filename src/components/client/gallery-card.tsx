import type { GalleryItem } from "@/types/client";

export default function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-brand-blush/60 bg-brand-ivory shadow-sm">
      <div className="relative h-64 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-brand-burgundy/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-gold">{item.category}</span>
      </div>
      <figcaption className="p-4 font-serif text-xl text-brand-burgundy">{item.title}</figcaption>
    </figure>
  );
}
