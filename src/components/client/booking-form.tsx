"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock3 } from "lucide-react";

import { clientServices } from "@/data/client-content";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-gold/60 bg-brand-ivory p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-4 font-serif text-2xl text-brand-burgundy">Request received</h3>
        <p className="mt-2 text-sm text-brand-charcoal/70">Our concierge will call you shortly to confirm your appointment and selected services.</p>
        <button type="button" onClick={() => { setSubmitted(false); setSelectedServices([]); }} className="mt-5 text-sm font-semibold text-brand-rose hover:text-brand-burgundy">Make another request</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}
      className="grid gap-4 rounded-2xl border border-brand-blush/60 bg-brand-ivory p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <div>
        <label htmlFor="booking-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Your name</label>
        <input id="booking-name" required className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20" />
      </div>
      <div>
        <label htmlFor="booking-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Telephone number</label>
        <input id="booking-phone" type="tel" required pattern="[0-9+() -]{7,}" placeholder="+94 77 123 4567" className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20" />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Services</legend>
        <div className="relative">
          <button type="button" aria-expanded={isServicesOpen} onClick={() => setIsServicesOpen((current) => !current)} className="flex h-11 w-full items-center justify-between rounded-xl border border-brand-blush bg-brand-ivory px-4 text-left text-sm text-brand-charcoal outline-none transition-colors hover:border-brand-rose focus:border-brand-rose">
            <span className={selectedServices.length === 0 ? "text-brand-charcoal/50" : "font-medium text-brand-burgundy"}>{selectedServices.length === 0 ? "Select one or more services" : `${selectedServices.length} service${selectedServices.length === 1 ? "" : "s"} selected`}</span>
            <ChevronDown className={`h-4 w-4 text-brand-rose transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {isServicesOpen && <div className="absolute left-0 right-0 top-12 z-20 max-h-64 overflow-y-auto rounded-xl border border-brand-blush bg-brand-ivory p-2 shadow-xl">
            {clientServices.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return <label key={service.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${isSelected ? "bg-brand-blush/30" : "hover:bg-brand-blush/15"}`}><span className="flex items-center gap-3"><input type="checkbox" checked={isSelected} onChange={() => toggleService(service.id)} className="h-4 w-4 accent-brand-burgundy" /><span><span className="block text-sm font-semibold text-brand-burgundy">{service.name}</span><span className="block text-xs text-brand-charcoal/60">{service.category}</span></span></span><span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-brand-rose"><Clock3 className="h-3.5 w-3.5" />{service.duration}m</span></label>;
            })}
          </div>}
        </div>
        <p className="mt-2 text-xs text-brand-charcoal/55">Select one or more services for your visit.</p>
      </fieldset>
      <div>
        <label htmlFor="booking-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Preferred date</label>
        <input id="booking-date" type="date" required className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose" />
      </div>
      <div>
        <label htmlFor="booking-time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Preferred time</label>
        <input id="booking-time" type="time" required className="h-11 w-full rounded-xl border border-brand-blush bg-brand-ivory px-4 text-sm outline-none focus:border-brand-rose" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="booking-note" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-rose">Anything we should know?</label>
        <textarea id="booking-note" rows={3} className="w-full rounded-xl border border-brand-blush bg-brand-ivory p-4 text-sm outline-none focus:border-brand-rose" />
      </div>
      <button type="submit" disabled={selectedServices.length === 0} className="sm:col-span-2 inline-flex h-12 items-center justify-center rounded-xl bg-brand-burgundy px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-rose disabled:cursor-not-allowed disabled:opacity-45">Request appointment</button>
    </form>
  );
}
