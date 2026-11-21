import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About | Angelica Reeves",
  description:
    "Get to know Angelica Reeves — a full-stack developer, creative problem-solver, and founder of Ionian Digital.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <AboutContent />
  
    </main>
  );
}