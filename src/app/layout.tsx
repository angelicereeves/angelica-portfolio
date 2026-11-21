import type { Metadata } from "next";
import {
  Space_Grotesk,
  DM_Sans,
  Instrument_Serif,
} from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angelica Reeves | Creative Developer",
  description:
    "Full-stack developer and creative problem solver building thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
      >
        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main id="main-content">{children}</main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}