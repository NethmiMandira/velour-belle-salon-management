export interface Service {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  duration: number;
  category?: string;
  featured?: boolean;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ClientReview {
  id: string;
  customer: string;
  service: string;
  quote: string;
  rating: number;
}
