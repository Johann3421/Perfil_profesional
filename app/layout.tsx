import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SEO, PERSONAL } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tudominio.com";

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | ${PERSONAL.nombre}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: PERSONAL.nombre }],
  creator: PERSONAL.nombre,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    title: SEO.title,
    description: SEO.description,
    siteName: PERSONAL.nombre,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SEO.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
