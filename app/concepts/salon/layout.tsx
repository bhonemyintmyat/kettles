import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Nagi Hair Atelier — Salon Booking Concept",
  description:
    "A self-initiated, mobile-first salon booking concept created by Kettles Studio for independent salons serving local and international guests.",
  alternates: { canonical: "/concepts/salon" },
  openGraph: {
    title: "Nagi Hair Atelier — Salon Booking Concept",
    description:
      "A fictional salon concept showing a calmer, clearer mobile booking experience.",
    url: "/concepts/salon",
    type: "website",
    images: [
      {
        url: "/concepts/nagi-salon-og.png",
        width: 1200,
        height: 630,
        alt: "Nagi Hair Atelier mobile-first salon booking concept by Kettles Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagi Hair Atelier — Salon Booking Concept",
    description: "A fictional mobile-first salon concept created by Kettles Studio.",
    images: ["/concepts/nagi-salon-og.png"],
  },
  robots: { index: true, follow: true },
};

export default function SalonConceptLayout({ children }: { children: ReactNode }) {
  return children;
}
