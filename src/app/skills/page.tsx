import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillsContent from "@/components/skills/SkillsContent";

export const metadata: Metadata = {
  title: "Skills | Angelica Reeves",
  description:
    "Explore Angelica Reeves' frontend development, backend engineering, design, and creative technology skills.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
 
      <SkillsContent />

    </main>
  );
}