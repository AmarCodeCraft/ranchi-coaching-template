import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Newton Tutorials – JEE & NEET Coaching in Lalpur, Ranchi",
  description:
    "Crack JEE & NEET with personal mentorship in Ranchi. Batches of max 30, weekly DPPs, daily doubt sessions, 100% offline classes at Lalpur, Circular Road. Book a 2-day free demo class on WhatsApp.",
  keywords: [
    "JEE coaching Ranchi",
    "NEET coaching Ranchi",
    "coaching institute Lalpur",
    "Newton Tutorials Ranchi",
    "IIT JEE coaching Lalpur",
    "foundation classes Ranchi",
  ],
  openGraph: {
    title: "Newton Tutorials – JEE & NEET Coaching in Lalpur, Ranchi",
    description:
      "Personal mentorship, small batches, weekly tests. Book a 2-day free demo class on WhatsApp.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50">{children}</body>
    </html>
  );
}