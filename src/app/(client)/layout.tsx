import type { ReactNode } from "react";
import Footer from "@/components/client/footer";
import Navbar from "@/components/client/navbar";

/**
 * Route group layout: every page inside `src/app/(client)/` renders with the
 * shared client-facing navbar and footer. The parentheses keep `(client)` out
 * of the URL, so `(client)/services/page.tsx` still serves `/services`.
 */
export default function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-ivory font-sans text-brand-charcoal">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
