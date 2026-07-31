import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NAGI Hair Atelier — Osaka",
  description:
    "An English-friendly Osaka hair atelier for thoughtful cuts, soft color and unhurried care.",
  alternates: { canonical: "/nagi" },
  openGraph: {
    title: "NAGI Hair Atelier — Osaka",
    description:
      "Thoughtful cuts, soft color and quiet care—explained clearly before we begin.",
    url: "/nagi",
    type: "website",
    images: [
      {
        url: "/concepts/nagi-salon-og-v2.png",
        width: 1200,
        height: 630,
        alt: "NAGI Hair Atelier in Osaka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAGI Hair Atelier — Osaka",
    description: "Hair that feels like you.",
    images: ["/concepts/nagi-salon-og-v2.png"],
  },
  robots: { index: true, follow: true },
};

export default function NagiLayout({ children }: { children: ReactNode }) {
  return children;
}
