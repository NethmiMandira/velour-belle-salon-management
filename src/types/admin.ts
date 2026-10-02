export type AppointmentStatus =
  | "Booked"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Pending";

export type CalendarAppointmentStatus =
  | "Booked"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type CalendarView = "month" | "week" | "day";

export interface AppointmentRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  services: string[];
  stylist: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  price: string;
}

export interface CalendarAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: CalendarAppointmentStatus;
  price: string;
}

export interface CustomerRecord {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  contact: string;
  city: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isPublished: boolean;
}

export interface CategoryRecord {
  id: string;
  name: string;
}

export interface ServiceRecord {
  id: string;
  name: string;
  price: string;
  duration: string;
  category: string;
}

export interface StylistRecord {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface RoleRecord {
  id: string;
  title: string;
}

export interface Review {
  id: string;
  customerName: string;
  serviceName: string;
  comment: string;
  published: boolean;
  createdAt: string;
}

export type ReportType =
  | "Appointment"
  | "Revenue"
  | "ServicePerformance"
  | "EmployeePerformance"
  | "Customer";

export interface InvoiceService {
  id: string;
  name: string;
  stylist: string;
  price: number;
  discount: number;
}

export interface InvoiceAppointment {
  id: string;
  customer: string;
  date: string;
  services: InvoiceService[];
}
