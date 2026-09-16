import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Bridge Kit for Japanese Salons",
  description:
    "A ¥45,000 bilingual mobile booking guide that connects international guests to the LINE, Hot Pepper, app or form your salon already uses.",
  alternates: { canonical: "/booking-bridge" },
  openGraph: {
    type: "website",
    url: "/booking-bridge",
    title: "Keep your salon website. Add one clearer way to book.",
    description:
      "Booking Bridge is a fixed-scope bilingual booking guide for independent Japanese salons.",
    images: [
      {
        url: "/concepts/booking-bridge-campaign-v1.png",
        width: 1378,
        height: 1722,
        alt: "Bilingual mobile booking screens for an independent Japanese salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Bridge Kit for Japanese Salons",
    description: "A clearer bilingual path into the booking system your salon already uses.",
    images: ["/concepts/booking-bridge-campaign-v1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingBridgeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
