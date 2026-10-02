import type { ClientReview, GalleryItem, Service, TeamMember } from "@/types/client";

export const clientServices: Service[] = [
  { id: "radiance-facial", name: "Signature Radiance Facial", tagline: "Most loved", description: "A tailored facial ritual with gentle exfoliation, massage, and a serum blend chosen for your skin.", price: 120, duration: 60, category: "Facials", featured: true },
  { id: "cut-finish", name: "Precision Cut & Finish", tagline: "Hair", description: "A consultation-led cut finished with a polished blow-dry and styling guidance for home.", price: 85, duration: 60, category: "Hair", featured: true },
  { id: "balayage-gloss", name: "Balayage & Gloss", tagline: "Hair colour", description: "Hand-painted dimension with a bonding gloss for soft, luminous grow-out.", price: 240, duration: 180, category: "Hair" },
  { id: "gel-manicure", name: "Luxury Gel Manicure", tagline: "Nails", description: "Cuticle care, shaping, long-wear colour, a warm hand mask, and pressure-point massage.", price: 65, duration: 60, category: "Nails" },
  { id: "bridal-beauty", name: "Bridal Beauty Package", tagline: "Occasions", description: "Trial plus wedding-day hair and makeup with touch-up kit and timing planned around your schedule.", price: 450, duration: 240, category: "Occasions", featured: true },
  { id: "aromatherapy", name: "Aromatherapy Massage", tagline: "Wellness", description: "A full-body massage with bespoke essential oil blends to release tension and settle the nervous system.", price: 130, duration: 60, category: "Wellness" },
];

export const teamMembers: TeamMember[] = [
  { id: "anura", name: "Anura Jayasinghe", role: "Senior Stylist", bio: "Known for precise cuts, effortless finishes, and calm consultations.", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80" },
  { id: "samanthi", name: "Samanthi Perera", role: "Beauty Therapist", bio: "Creates restorative facial and nail rituals with a quietly meticulous touch.", imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=500&q=80" },
  { id: "kavinda", name: "Kavinda Silva", role: "Colour Specialist", bio: "Builds dimensional colour plans that feel personal, wearable, and beautifully lived-in.", imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=500&q=80" },
];

export const galleryItems: GalleryItem[] = [
  { id: "gallery-1", title: "Soft bridal finish", category: "Occasions", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80" },
  { id: "gallery-2", title: "Rose gold manicure", category: "Nails", imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80" },
  { id: "gallery-3", title: "Luminous skin ritual", category: "Facials", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80" },
];

export const clientReviews: ClientReview[] = [
  { id: "review-1", customer: "Amelia Taylor", service: "Signature Radiance Facial", quote: "The whole appointment felt thoughtful and unhurried. My skin looked luminous before I even left.", rating: 5 },
  { id: "review-2", customer: "Nethmi Mandira", service: "Balayage & Gloss", quote: "The colour is exactly what I hoped for, and the consultation made me feel completely understood.", rating: 5 },
  { id: "review-3", customer: "Sophia Reynolds", service: "Luxury Gel Manicure", quote: "Beautiful work, lovely people, and an atmosphere that makes a busy week feel much softer.", rating: 5 },
];
