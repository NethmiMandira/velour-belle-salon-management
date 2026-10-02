import type { TeamMember } from "@/types/client";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-blush/60 bg-brand-ivory shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={member.imageUrl} alt={member.name} className="h-64 w-full object-cover" />
      <div className="p-5"><p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">{member.role}</p><h3 className="mt-1 font-serif text-2xl text-brand-burgundy">{member.name}</h3><p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{member.bio}</p></div>
    </article>
  );
}
