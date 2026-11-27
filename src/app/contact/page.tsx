import type { Metadata } from "next";
import { Suspense } from "react";

import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: "Talk to the GELD team in Lower Parel, Mumbai about investing, loans or insurance. Book a free call or visit our office.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Get in Touch | GELD Wealth", description: "Talk to the GELD team in Lower Parel, Mumbai about investing, loans or insurance. Book a free call or visit our office.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageClient />
    </Suspense>
  );
}
