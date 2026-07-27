import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://kettles.studio";
const defaultGaMeasurementId = "G-J3TMTM3T56";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kettles — Online Presence Studio",
    template: "%s | Kettles",
  },
  description:
    "Kettles helps founders and service businesses launch clear websites, create useful content, and build practical online presence systems.",
  applicationName: "Kettles",
  keywords: [
    "online presence studio",
    "business website",
    "social content writing",
    "short video scripts",
    "Burmese localization",
    "AI workflow",
  ],
  authors: [{ name: "Kettles" }],
  creator: "Kettles",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kettles",
    title: "Kettles — Online Presence Studio",
    description:
      "Websites, content systems, localization, and practical digital tools for founders and growing businesses.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kettles Online Presence Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kettles — Online Presence Studio",
    description:
      "Websites, content systems, localization, and practical digital tools for founders and growing businesses.",
    images: ["/opengraph-image"],
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kettles",
  url: siteUrl,
  logo: `${siteUrl}/brand/kettles-orange.png`,
  email: "mailto:khaingkhantjp@gmail.com",
  description:
    "Kettles is an online presence studio offering websites, content systems, Burmese localization, and practical digital tools.",
  sameAs: [
    "https://www.linkedin.com/company/kettles/",
    "https://t.me/normanozbornissick",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "khaingkhantjp@gmail.com",
    availableLanguage: ["English", "Burmese"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? defaultGaMeasurementId;

  return (
    <html lang="en" suppressHydrationWarning>
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
        <Script
          id="kettles-organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
