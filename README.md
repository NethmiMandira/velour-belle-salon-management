# Salon Management

Velour Belle is a salon management dashboard and public salon experience built with Next.js, React, TypeScript, Tailwind CSS, and Lucide icons. It provides operational screens for appointments, customers, services, staff, gallery content, invoices, reports, and reviews, plus a client-facing home page with booking, services, team, gallery, reviews, and contact sections.

## Requirements

- Node.js 20 or newer
- npm

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Start the production server
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/dashboard` | Revenue, appointment, quick access, and upcoming appointment overview |
| `/appointments` | Search, filter, create, edit, and delete appointments |
| `/appointmentCalender` | Month, week, and day calendar views |
| `/customers` | Create, edit, and delete customer records |
| `/salonServices` | Manage salon services and service categories |
| `/teamMembers` | Manage stylists and staff roles |
| `/gallery` | Manage gallery items, categories, and publish state |
| `/invoiceGenerating` | Build, discount, settle, and print invoices |
| `/reportGenerating` | Generate appointment, revenue, service, employee, and customer reports |
| `/reviews` | Search, sort, publish, unpublish, and delete reviews |

The public home page uses anchored tabs for `Home`, `About`, `Services`, `Team`, `Gallery`, `Reviews`, and `Contact`. The `Book now` action opens the appointment request section on the same page.

The admin pages share the `Navbar`, `PageTitle`, `Container`, form controls, buttons, cards, and the Velour Belle rose, burgundy, gold, and ivory design system.

## Project Structure

```text
src/
  app/
    (admin)/             Admin dashboard routes
    (client)/            Client route group and shared client layout
    page.tsx              Public salon experience
    globals.css          Global Tailwind and brand tokens
    layout.tsx           Root fonts, metadata, and document shell
  components/
    admin/               Shared admin navigation and UI controls
    client/              Client-facing cards, navigation, footer, and booking form
    ui/                  Generic UI primitives
  data/
    client-content.ts     Public services, team, gallery, and review data
  types/
    admin.ts              Shared admin domain models
    client.ts             Shared public client models
  public/images/         Background and static image assets
```

## Current Data Model

The current screens use local mock data and React state. Changes are session-local and reset when the page is refreshed. Public content is stored in `src/data/client-content.ts`, while shared models are stored in `src/types/admin.ts` and `src/types/client.ts`. There is no database, authentication, API layer, or persistence layer connected yet.

The invoice screen includes:

- Appointment and customer selection
- Add/remove services
- Per-service discounts
- Additional percentage discount
- Payment method and paid amount validation
- Automatic balance calculation using `paid amount - net payable`
- Printable A4 invoice output

The report screen includes local report previews and CSV export based on its sample data.

The public client experience includes:

- Service menu with prices, durations, and categories
- Team member profiles
- Gallery showcase cards using image assets and Unsplash imagery
- Customer review cards with ratings
- Appointment request form with client-side confirmation state
- Contact details and salon information

## Styling and Components

- Fonts are loaded in `src/app/layout.tsx` using `next/font`.
- Brand color aliases are defined in `src/app/globals.css`.
- Shared admin controls live under `src/components/admin`.
- Use existing shared components before creating new controls or page-level styling.
- Keep route pages client components when they need local state or browser interactions.

## Known Limitations

- Data is sample data only and is not persisted.
- Generate, export, and print actions are client-side demonstrations.
- Real authentication, permissions, database storage, and server-side report generation still need to be connected.
- Some team and gallery images use Unsplash URLs and require network access; local assets should be preferred for production.

## Next Development Steps

1. Add a database and API layer for customers, services, appointments, payments, invoices, and reports.
2. Replace page-local sample arrays with server-backed data fetching and mutations.
3. Add authentication and role-based access for salon staff.
4. Add automated tests for invoice calculations, report filters, and appointment workflows.
