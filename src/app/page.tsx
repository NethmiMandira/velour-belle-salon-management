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

const formatLkr = (amount: number | string) => `LKR ${Number(amount).toLocaleString("en-US")}`;

export default function HomePage() {
  return (
    <div className={`${body.className} min-h-screen scroll-smooth bg-brand-ivory text-brand-charcoal antialiased selection:bg-brand-rose selection:text-white`}>
      <Navbar />
      <main>
        {/* HERO */}
        <section id="home" className="relative px-6 pb-20 pt-16 md:px-8 md:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-block rounded-full border border-brand-rose/20 bg-brand-blush/30 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-burgundy backdrop-blur-sm">
                Hair, skin &amp; beauty studio in Colombo
              </span>
              <h1 className={`${display.className} mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-brand-burgundy sm:text-7xl lg:text-[6.75rem]`}>
                Beauty, done <span className="text-brand-rose">with care.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brand-charcoal/75">
                Haircuts, colour, facials, nails and massage from a dedicated team that takes the time to listen first.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="#book"
                  className="rounded-2xl bg-brand-burgundy px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-rose shadow-md hover:shadow-xl"
                >
                  Book an appointment
                </a>
                <a
                  href="#services"
                  className="rounded-2xl border-2 border-brand-burgundy/15 px-8 py-4 text-sm font-semibold tracking-wide text-brand-burgundy transition-all duration-300 hover:border-brand-burgundy hover:bg-brand-burgundy/5"
                >
                  See our services
                </a>
              </div>
            </div>

            <div className="relative mt-16">
              <div className="relative h-[360px] overflow-hidden rounded-[2.5rem] sm:h-[540px] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"
                  alt="Velour Belle luxury salon interior"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-4 -bottom-8 mx-auto grid max-w-3xl grid-cols-3 divide-x divide-brand-blush/60 rounded-2xl border border-brand-blush/60 bg-brand-ivory/90 py-6 shadow-xl backdrop-blur-md sm:inset-x-8">
                <HeroStat value="12+" label="services" />
                <HeroStat value="8" label="years open" />
                <HeroStat value="3k+" label="guests welcomed" />
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <section className="mt-20 overflow-x-auto border-y border-brand-blush/60 bg-brand-blush/10 py-6">
          <div className="mx-auto flex w-max min-w-full items-center justify-center gap-12 px-8">
            {categories.map((category) => (
              <span key={category} className={`${display.className} flex items-center gap-12 whitespace-nowrap text-lg font-semibold tracking-wider text-brand-burgundy/80 uppercase`}>
                {category}
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              </span>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">About Velour Belle</p>
              <h2 className={`${display.className} mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
                A salon that never rushes you.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-charcoal/70">
                We are a team of stylists and therapists on Rose Avenue. Every visit starts with a proper consultation about what you want,
                and we only finish when you are completely satisfied with your look.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-3xl bg-brand-burgundy p-8 text-brand-ivory shadow-lg">
                <p className={`${display.className} text-7xl font-semibold tracking-tight text-brand-gold`}>8</p>
                <p className="mt-2 text-sm text-brand-ivory/70">years in Colombo</p>
              </div>
              <div className="rounded-3xl border-2 border-brand-blush/70 bg-brand-blush/30 p-6">
                <p className={`${display.className} text-5xl font-semibold tracking-tight text-brand-burgundy`}>12+</p>
                <p className="mt-2 text-sm text-brand-charcoal/70">services on the menu</p>
              </div>
              <div className="rounded-3xl border-2 border-brand-gold/50 bg-white/60 p-6">
                <p className={`${display.className} text-5xl font-semibold tracking-tight text-brand-burgundy`}>3k+</p>
                <p className="mt-2 text-sm text-brand-charcoal/70">guests welcomed</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <Section id="services" eyebrow="Services" title="What we offer" tone="soft">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clientServices.map((service, index) => {
              const featured = index === 0;
              return (
                <article
                  key={service.id}
                  className={`group flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                    featured
                      ? "bg-brand-burgundy text-brand-ivory md:col-span-2 lg:p-10 shadow-xl"
                      : "border border-brand-blush/70 bg-brand-ivory hover:border-brand-rose"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
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
                  <div className={`mt-6 border-t pt-4 text-xs font-medium uppercase tracking-wider ${featured ? "border-brand-ivory/10 text-brand-ivory/60" : "border-brand-blush/40 text-brand-charcoal/50"}`}>
                    Duration: {service.duration} mins
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* TEAM */}
        <Section id="team" eyebrow="Our team" title="Meet the people behind the chair">
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Section>

        {/* GALLERY */}
        <Section id="gallery" eyebrow="Gallery" title="Inside the salon" tone="soft">
          <div className="grid gap-6 md:grid-cols-3">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </Section>

        {/* REVIEWS */}
        <Section id="reviews" eyebrow="Reviews" title="What our guests say">
          <div className="grid gap-6 md:grid-cols-3">
            {clientReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <p className="text-sm leading-relaxed text-brand-charcoal/70">
              Been in recently? Leave a short review for other guests and let the team know how your visit went.
            </p>
            <ReviewForm />
          </div>
        </Section>

        {/* BOOKING */}
        <section id="book" className="scroll-mt-20 bg-brand-blush/20 px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">Book online</p>
            <h2 className={`${display.className} mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
              Request an appointment.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-brand-charcoal/70">
              Tell us what you need and we will call or message you to confirm a time.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[2.5rem] border border-brand-burgundy/10 bg-brand-ivory p-6 text-left md:p-12 shadow-2xl">
            <BookingForm />
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
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand-rose sm:text-xs">{label}</p>
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
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-rose">{eyebrow}</p>
          <h2 className={`${display.className} mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-brand-burgundy sm:text-6xl`}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}