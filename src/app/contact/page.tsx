import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Angelica Reeves",
  description: "Get in touch with Angelica Reeves about software engineering roles, website projects, or collaborations.",
};

export default function ContactPage() {
  return <ContactContent />;
}
