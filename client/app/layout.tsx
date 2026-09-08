import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const body = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Global UPVC Windows & Prefab Homes | Lalitpur",
  description: "UPVC windows, doors, glass work, hardware and prefab steel-frame homes made and installed in Nepal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}<WhatsAppLink /></body>
    </html>
  );
}
