import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import Script from "next/script";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const body = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Global UPVC Windows & Prefab Homes | Lalitpur",
  description: "UPVC windows, doors, glass work, hardware and prefab steel-frame homes made and installed in Nepal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}<WhatsAppLink />{process.env.NEXT_PUBLIC_GA_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />}{process.env.NEXT_PUBLIC_GA_ID && <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}; gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });`}</Script>}</body>
    </html>
  );
}
