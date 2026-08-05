import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Bridge Kit | Kettles Studio",
  description:
    "A bilingual booking entrance for salons that keeps their existing reservation system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingBridgeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
