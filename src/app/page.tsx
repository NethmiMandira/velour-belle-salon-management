import { ArrowDown, ArrowUpRight, Clock3, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Image from "next/image";

import BookingForm from "@/components/client/booking-form";
import Footer from "@/components/client/footer";
import GalleryCard from "@/components/client/gallery-card";
import Navbar from "@/components/client/navbar";
import ReviewCard from "@/components/client/review-card";
import TeamCard from "@/components/client/team-card";
import { clientReviews, clientServices, galleryItems, teamMembers } from "@/data/client-content";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal">
      <Navbar />
      <main>
        <section id="home" className="relative overflow-hidden border-b border-brand-blush/50 bg-brand-ivory px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10 max-w-xl"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-rose"><Sparkles className="h-4 w-4 text-brand-gold" /> A beauty sanctuary</p><h1 className="mt-5 font-serif text-5xl font-light leading-[0.95] text-brand-burgundy sm:text-7xl">Glow from <span className="italic text-brand-rose">within.</span></h1><p className="mt-6 max-w-md text-base leading-relaxed text-brand-charcoal/70">Thoughtful hair, skin, beauty, and wellness rituals designed around the person you are becoming.</p><a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-burgundy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-burgundy/15 transition-colors hover:bg-brand-rose">Book your visit <ArrowUpRight className="h-4 w-4 text-brand-gold" /></a></div>
            <div className="relative"><div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-brand-gold/50" /><div className="relative h-[380px] overflow-hidden rounded-[2rem] border border-brand-blush/60 bg-brand-blush/30 p-3 shadow-2xl sm:h-[500px]"><Image src="/images/hero-salon.jpg" alt="Velour Belle salon interior" fill priority className="rounded-[1.5rem] object-cover p-3" /></div><div className="absolute -bottom-5 -left-5 rounded-2xl border border-brand-gold/50 bg-brand-ivory px-5 py-4 shadow-lg"><p className="font-serif text-2xl text-brand-burgundy">12+</p><p className="text-[10px] uppercase tracking-widest text-brand-rose">signature rituals</p></div></div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-brand-burgundy px-6 py-20 text-brand-ivory md:px-8"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">About Velour Belle</p><h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">Beauty that feels like time well spent.</h2></div><div className="max-w-2xl"><p className="text-base leading-relaxed text-brand-ivory/75">We are a small team of specialists who believe the best salon experience is personal, considered, and quietly luxurious. Every visit begins with a real conversation and ends with you feeling more like yourself.</p><div className="mt-7 flex flex-wrap gap-8 text-sm text-brand-ivory/70"><span><strong className="block font-serif text-2xl text-brand-gold">8</strong> years of care</span><span><strong className="block font-serif text-2xl text-brand-gold">4.9</strong> guest rating</span><span><strong className="block font-serif text-2xl text-brand-gold">3k+</strong> rituals shared</span></div></div></div></section>

        <Section id="services" eyebrow="The menu" title="Treatments crafted around you"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{clientServices.map((service) => <article key={service.id} className="flex flex-col rounded-2xl border border-brand-blush/60 bg-white/65 p-6 shadow-sm transition-transform hover:-translate-y-1"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">{service.tagline}</p><h3 className="mt-2 font-serif text-2xl text-brand-burgundy">{service.name}</h3></div><span className="font-serif text-lg text-brand-burgundy">${service.price}</span></div><p className="mt-4 flex-1 text-sm leading-relaxed text-brand-charcoal/70">{service.description}</p><div className="mt-5 flex items-center gap-2 border-t border-brand-blush/50 pt-4 text-xs text-brand-charcoal/60"><Clock3 className="h-3.5 w-3.5 text-brand-rose" />{service.duration} minutes <span className="ml-auto uppercase tracking-wider text-brand-rose">{service.category}</span></div></article>)}</div></Section>

        <Section id="team" eyebrow="The people" title="Meet your beauty team" tone="soft"><div className="grid gap-6 md:grid-cols-3">{teamMembers.map((member) => <TeamCard key={member.id} member={member} />)}</div></Section>

        <Section id="gallery" eyebrow="The atmosphere" title="A glimpse inside"><div className="grid gap-6 md:grid-cols-3">{galleryItems.map((item) => <GalleryCard key={item.id} item={item} />)}</div></Section>

        <Section id="reviews" eyebrow="Guest notes" title="Kind words from the studio" tone="soft"><div className="grid gap-6 md:grid-cols-3">{clientReviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div></Section>

        <section id="book" className="scroll-mt-20 bg-brand-blush/20 px-6 py-20 md:px-8"><div className="mx-auto max-w-4xl"><div className="mb-8 max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-rose">Your next ritual</p><h2 className="mt-3 font-serif text-4xl font-light text-brand-burgundy sm:text-5xl">Request an appointment.</h2><p className="mt-4 text-sm leading-relaxed text-brand-charcoal/70">Tell us what you are looking for and our concierge will get back to you with a time that feels right.</p></div><BookingForm /></div></section>

        <section id="contact" className="scroll-mt-20 px-6 py-20 md:px-8"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-rose">Come say hello</p><h2 className="mt-3 font-serif text-4xl font-light text-brand-burgundy">Find your way to us.</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-brand-charcoal/70">We are open Tuesday through Sunday for appointments, consultations, and a little calm in the middle of your week.</p></div><div className="grid gap-5 text-sm text-brand-charcoal/75"><p className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-rose" /><span>24 Rose Avenue<br />Colombo 03, Sri Lanka</span></p><p className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-rose" />+94 11 234 5678</p><p className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand-rose" />hello@velourbelle.lk</p></div></div></section>
      </main>
      <Footer />
    </div>
  );
}

function Section({ id, eyebrow, title, children, tone }: { id: string; eyebrow: string; title: string; children: React.ReactNode; tone?: "soft" }) {
  return <section id={id} className={`scroll-mt-20 px-6 py-20 md:px-8 ${tone === "soft" ? "bg-brand-blush/10" : "bg-brand-ivory"}`}><div className="mx-auto max-w-7xl"><div className="mb-9 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-rose">{eyebrow}</p><h2 className="mt-3 font-serif text-4xl font-light text-brand-burgundy sm:text-5xl">{title}</h2></div><ArrowDown className="hidden h-5 w-5 text-brand-gold sm:block" /></div>{children}</div></section>;
}
