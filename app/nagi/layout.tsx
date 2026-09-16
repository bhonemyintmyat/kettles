import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NAGI Booking Bridge — Interactive Salon Demo",
  description:
    "Try a floating bilingual booking guide that connects an existing salon website to its current LINE, Hot Pepper or booking form.",
  alternates: { canonical: "/nagi" },
  openGraph: {
    title: "NAGI Booking Bridge — Interactive Salon Demo",
    description:
      "Existing website. Clear booking path. Try the floating bilingual booking guide.",
    url: "/nagi",
    type: "website",
    images: [
      {
        url: "/concepts/nagi-booking-bridge-og.png",
        width: 2048,
        height: 1152,
        alt: "NAGI Booking Bridge floating bilingual salon booking widget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAGI Booking Bridge — Interactive Salon Demo",
    description: "Existing website. Clear booking path.",
    images: ["/concepts/nagi-booking-bridge-og.png"],
  },
  robots: { index: true, follow: true },
};

export default function NagiLayout({ children }: { children: ReactNode }) {
  return children;
}
