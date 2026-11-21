import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import AboutPreview from "@/components/home/AboutPreview";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="bg-background text-foreground">

      <Hero />
      <FeaturedWork />
      <AboutPreview />
      <Skills />
      <Contact />

    </main>
  );
}