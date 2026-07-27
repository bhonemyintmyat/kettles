import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Aung Khaing Khant — Full-Stack Engineer & Founder of Kettles",
  description:
    "The founder profile of Aung Khaing Khant: full-stack engineering, creative technology, practical systems, and the story behind Kettles.",
  alternates: {
    canonical: "/founder",
  },
  openGraph: {
    type: "profile",
    url: "/founder",
    title: "Aung Khaing Khant — Full-Stack Engineer & Founder of Kettles",
    description:
      "Product engineering, creative technology, and practical systems — built across borders, now from Japan.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aung Khaing Khant, Full-Stack Engineer and Founder of Kettles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Khaing Khant — Full-Stack Engineer & Founder of Kettles",
    description:
      "Product engineering, creative technology, and practical systems — built across borders, now from Japan.",
    images: ["/og.png"],
  },
};

export default function FounderLayout({ children }: { children: ReactNode }) {
  return children;
}
