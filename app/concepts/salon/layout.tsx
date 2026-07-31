import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NAGI Hair Atelier — Osaka",
  description: "NAGI Hair Atelier has moved to its complete demonstration website.",
  alternates: { canonical: "/nagi" },
  robots: { index: false, follow: true },
};

export default function SalonConceptLayout({ children }: { children: ReactNode }) {
  return children;
}
