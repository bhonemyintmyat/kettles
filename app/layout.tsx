import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://kettles.studio";
const defaultGaMeasurementId = "G-J3TMTM3T56";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aung Khaing Khant — Full-Stack Engineer & Founder of Kettles",
    template: "%s | Aung Khaing Khant",
  },
  description:
    "Full-stack engineer and founder of Kettles, building robust digital products, expressive web experiences, and practical business systems from Japan.",
  applicationName: "Aung Khaing Khant",
  keywords: [
    "Aung Khaing Khant",
    "full-stack engineer Japan",
    "Kettles founder",
    "React developer",
    "Java developer",
    "creative developer",
    "product engineer",
  ],
  authors: [{ name: "Aung Khaing Khant" }],
  creator: "Aung Khaing Khant",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Aung Khaing Khant",
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
  icons: {
    icon: "/menu/kettles-mark.svg",
    apple: "/brand/kettles-orange.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aung Khaing Khant",
  alternateName: "Khaing Khant",
  url: siteUrl,
  image: `${siteUrl}/aung-khaing-khant.jpg`,
  jobTitle: "Full-Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Kettles",
    url: siteUrl,
  },
  email: "mailto:khaingkhantjp@gmail.com",
  description:
    "Full-stack engineer and founder of Kettles, building digital products, expressive web experiences, and practical business systems.",
  sameAs: [
    "https://www.linkedin.com/in/khaing-khant-b5ab67188",
    "https://t.me/normanozbornissick",
  ],
  knowsLanguage: ["English", "Burmese", "Japanese"],
  knowsAbout: [
    "Full-stack development",
    "React",
    "Next.js",
    "Java",
    "Node.js",
    "Creative technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? defaultGaMeasurementId;

  return (
    <html lang="en">
      <head>
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              id="kettles-google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
        <script
          id="aung-khaing-khant-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
