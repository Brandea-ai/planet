import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarCenter Landshut | Auto Ankauf, Verkauf & Service",
  description: "Bayern's Nr. 1 Auto Service - Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf, Reifenwechsel und Fahrzeugaufbereitung in Landshut.",
  keywords: "Auto Ankauf, Auto Verkauf, Reifenwechsel, Fahrzeugaufbereitung, Landshut, Bayern, Autohaus, Gebrauchtwagen",
  authors: [{ name: "CarCenter Landshut" }],
  openGraph: {
    title: "CarCenter Landshut | Auto Ankauf, Verkauf & Service",
    description: "Bayern's Nr. 1 Auto Service - Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf und Service in Landshut.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
