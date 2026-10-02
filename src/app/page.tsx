import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import Image from "next/image";

import {
  BookingForm,
  Footer,
  GalleryCard,
  Navbar,
  ReviewCard,
  ReviewForm,
  TeamCard,
} from "@/components/client";
import { clientReviews, clientServices, galleryItems, teamMembers } from "@/data/client-content";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = DM_Sans({ subsets: ["latin"], display: "swap" });

const categories = Array.from(new Set(clientServices.map((service) => service.category)));

// Sri Lankan Rupees, e.g. 4500 -> "LKR 4,500"
const formatLkr = (amount: number | string) => `LKR ${Number(amount).toLocaleString("en-US")}`;

export default function HomePage() {
  return (
    <div className={`${body.className} min-h-screen scroll-smooth bg-brand-ivory text-brand-charcoal antialiased selection:bg-brand-rose selection:text-white`}>
      <Navbar />
      <main>
        {/* HERO — centered headline, wide image banner */}
        <section id="home" className="relative px-6 pb-20 pt-16 md:px-8 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-blush/40 px-4 py-2 text-sm font-medium text-brand-burgundy">
                <Sparkles className="h-4 w-4 text-brand-gold" /> A beauty sanctuary
              </span>
              <h1 className={`${display.className} mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-brand-burgundy sm:text-7xl lg:text-[8rem]`}>
                Glow from <span className="text-brand-rose">within.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brand-charcoal/70">
                Thoughtful hair, skin, beauty, and wellness rituals designed around the person you are becoming.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-burgundy px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-rose"
                >
                  Book your visit <ArrowUpRight className="h-4 w-4 text-brand-gold" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-2xl border-2 border-brand-burgundy/15 px-7 py-4 text-sm font-semibold text-brand-burgundy transition-colors hover:border-brand-burgundy"
                >
                  Explore the menu
                </a>
              </div>
            </div>

            <div className="relative mt-16">
              <div className="relative h-[340px] overflow-hidden rounded-[2rem] sm:h-[520px]">
                <Image src="/images/hero-salon.jpg" alt="Velour Belle salon interior" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/50 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-4 -bottom-8 mx-auto grid max-w-3xl grid-cols-3 divide-x divide-brand-blush/60 rounded-2xl border border-brand-blush/60 bg-brand-ivory/90 py-5 shadow-xl backdrop-blur-md sm:inset-x-8">
                <HeroStat value="12+" label="signature rituals" />
                <HeroStat value="4.9" label="guest rating" />
                <HeroStat value="3k+" label="rituals shared" />
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <section className="mt-20 overflow-x-auto border-y border-brand-blush/60 bg-brand-blush/10 py-5">
          <div className="mx-auto flex w-max min-w-full items-center justify-center gap-10 px-8">
            {categories.map((category) => (
              <span key={category} className={`${display.className} flex items-center gap-10 whitespace-nowrap text-xl font-medium text-brand-burgundy/70`}>
                {category}
                <Sparkles className="h-4 w-4 text-brand-gold" />
              </span>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-brand-rose">About Velour Belle</p>
              <h2 className={`${display.className} mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
                Beauty that feels like time well spent.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-charcoal/70">
                We are a small team of specialists who believe the best salon experience is personal, considered, and quietly luxurious.
                Every visit begins with a real conversation and ends with you feeling more like yourself.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-3xl bg-brand-burgundy p-8 text-brand-ivory">
                <p className={`${display.className} text-7xl font-semibold tracking-tight text-brand-gold`}>8</p>
                <p className="mt-2 text-sm text-brand-ivory/70">years of care</p>
              </div>
              <div className="rounded-3xl border-2 border-brand-blush/70 bg-brand-blush/30 p-6">
                <p className={`${display.className} text-5xl font-semibold tracking-tight text-brand-burgundy`}>4.9</p>
                <p className="mt-2 text-sm text-brand-charcoal/70">guest rating</p>
              </div>
              <div className="rounded-3xl border-2 border-brand-gold/50 bg-white/60 p-6">
                <p className={`${display.className} text-5xl font-semibold tracking-tight text-brand-burgundy`}>3k+</p>
                <p className="mt-2 text-sm text-brand-charcoal/70">rituals shared</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES — bento: first card is featured */}
        <Section id="services" eyebrow="The menu" title="Treatments crafted around you" tone="soft">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clientServices.map((service, index) => {
              const featured = index === 0;
              return (
                <article
                  key={service.id}
                  className={`group flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? "bg-brand-burgundy text-brand-ivory md:col-span-2 lg:p-10"
                      : "border-2 border-brand-blush/70 bg-brand-ivory hover:border-brand-rose"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        featured ? "bg-brand-ivory/10 text-brand-gold" : "bg-brand-blush/40 text-brand-rose"
                      }`}
                    >
                      {service.category}
                    </span>
                    <span className={`${display.className} whitespace-nowrap text-xl font-semibold ${featured ? "text-brand-gold" : "text-brand-burgundy"}`}>
                      {formatLkr(service.price)}
                    </span>
                  </div>
                  <h3
                    className={`${display.className} mt-8 font-semibold leading-tight tracking-[-0.02em] ${
                      featured ? "text-4xl sm:text-5xl" : "text-2xl text-brand-burgundy"
                    }`}
                  >
                    {service.name}
                  </h3>
                  <p className={`mt-1 text-sm font-medium ${featured ? "text-brand-ivory/70" : "text-brand-rose"}`}>{service.tagline}</p>
                  <p className={`mt-4 flex-1 text-sm leading-relaxed ${featured ? "max-w-xl text-brand-ivory/75" : "text-brand-charcoal/70"}`}>
                    {service.description}
                  </p>
                  <div
                    className={`mt-6 flex items-center gap-2 text-xs ${featured ? "text-brand-ivory/70" : "text-brand-charcoal/60"}`}
                  >
                    <Clock3 className={`h-4 w-4 ${featured ? "text-brand-gold" : "text-brand-rose"}`} />
                    {service.duration} minutes
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* TEAM */}
        <Section id="team" eyebrow="The people" title="Meet your beauty team">
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Section>

        {/* GALLERY */}
        <Section id="gallery" eyebrow="The atmosphere" title="A glimpse inside" tone="soft">
          <div className="grid gap-6 md:grid-cols-3">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </Section>

        {/* REVIEWS */}
        <Section id="reviews" eyebrow="Guest notes" title="Kind words from the studio">
          <div className="grid gap-6 md:grid-cols-3">
            {clientReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><p className="text-sm leading-relaxed text-brand-charcoal/70">Have you visited us recently? Leave a note for the next guest and let our team know what made your visit special.</p></div>
            <ReviewForm />
          </div>
        </Section>

        {/* BOOKING — centered card */}
        <section id="book" className="scroll-mt-20 bg-brand-blush/20 px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-brand-rose">Your next ritual</p>
            <h2 className={`${display.className} mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
              Request an appointment.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-brand-charcoal/70">
              Tell us what you are looking for and our concierge will get back to you with a time that feels right.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border-2 border-brand-burgundy/10 bg-brand-ivory p-5 text-left md:p-10">
            <BookingForm />
          </div>
        </section>

        {/* CONTACT — three tiles */}
        <section id="contact" className="scroll-mt-20 px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-rose">Come say hello</p>
              <h2 className={`${display.className} mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
                Find your way to us.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-charcoal/70">
                We are open Tuesday through Sunday for appointments, consultations, and a little calm in the middle of your week.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <ContactTile icon={<MapPin className="h-6 w-6" />} label="Visit">
                24 Rose Avenue
                <br />
                Colombo 03, Sri Lanka
              </ContactTile>
              <ContactTile icon={<Phone className="h-6 w-6" />} label="Call">
                +94 11 234 5678
              </ContactTile>
              <ContactTile icon={<Mail className="h-6 w-6" />} label="Write">
                hello@velourbelle.lk
              </ContactTile>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2 text-center">
      <p className={`${display.className} text-2xl font-semibold tracking-tight text-brand-burgundy sm:text-4xl`}>{value}</p>
      <p className="mt-1 text-[11px] text-brand-rose sm:text-xs">{label}</p>
    </div>
  );
}

function ContactTile({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="group rounded-3xl border-2 border-brand-blush/70 p-7 transition-colors hover:border-brand-burgundy hover:bg-brand-burgundy">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blush/40 text-brand-rose transition-colors group-hover:bg-brand-ivory/10 group-hover:text-brand-gold">
        {icon}
      </span>
      <p className={`${display.className} mt-6 text-lg font-semibold text-brand-burgundy transition-colors group-hover:text-brand-gold`}>{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75 transition-colors group-hover:text-brand-ivory/80">{children}</p>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "soft";
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-6 py-24 md:px-8 md:py-32 ${tone === "soft" ? "bg-brand-blush/10" : "bg-brand-ivory"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold text-brand-rose">{eyebrow}</p>
            <h2 className={`${display.className} mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}