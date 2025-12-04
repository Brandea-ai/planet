import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarCenter Landshut | Auto Ankauf, Verkauf & Service",
  description: "Bayern's Nr. 1 Auto Service - Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf, Reifenwechsel und Fahrzeugaufbereitung in Landshut.",
  keywords: "Auto Ankauf, Auto Verkauf, Reifenwechsel, Fahrzeugaufbereitung, Landshut, Bayern, Autohaus, Gebrauchtwagen",
  authors: [{ name: "CarCenter Landshut" }],
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
    title: "CarCenter Landshut | Auto Ankauf, Verkauf & Service",
    description: "Bayern's Nr. 1 Auto Service - Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf und Service in Landshut.",
    type: "website",
    locale: "de_DE",
    siteName: "CarCenter Landshut",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarCenter Landshut | Auto Ankauf, Verkauf & Service",
    description: "Bayern's Nr. 1 Auto Service in Landshut",
  },
  alternates: {
    canonical: "https://carcenter-landshut.de",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6cb036",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://formsubmit.co" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased bg-black text-white selection:bg-[#6cb036]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
