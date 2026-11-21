"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Asterisk,
  Check,
  Copy,
  Mail,
  BriefcaseBusiness,
  Code2,
  MessageSquare,
} from "lucide-react";

const contactMethods = [
  {
    id: "personal",
    label: "WORK & COLLABORATIONS",
    title: "Let's work together.",
    description:
      "Job opportunities, interesting collaborations, or just something you think I'd be great at.",
    email: "angelicareeves@proton.me",
    accent: "#00E5FF",
    icon: BriefcaseBusiness,
  },
  {
    id: "agency",
    label: "WEBSITES & DIGITAL PROJECTS",
    title: "Let's build something.",
    description:
      "Need a website, application, or creative digital solution? That's kind of my thing.",
    email: "ioniandigital@gmail.com",
    accent: "#FF3CAC",
    icon: Code2,
  },
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);

      setCopiedEmail(email);

      setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy email:", error);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 pt-28 pb-20 md:px-12 md:pt-40 md:pb-28 lg:px-20"
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-violet/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-7 flex items-center gap-3">
            <Asterisk size={18} className="text-cyan" />

            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
              // 004 — Contact
            </span>
          </div>

          <h2 className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.95] font-bold tracking-[-0.07em]">
            LET&apos;S MAKE
            <br />

            <span className="font-serif font-normal italic text-cyan">
              something.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
            Have an idea, an opportunity, or a problem that needs solving?
            I&apos;m all ears. Well, technically eyes. This is a website.
          </p>

          {/* AVAILABILITY */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-lime/20 bg-lime/5 px-4 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
            </span>

            <span className="font-mono text-xs tracking-wide text-lime uppercase">
              Open to opportunities
            </span>
          </div>

          {/* CONTACT FORM CTA */}
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-cyan px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_35px_rgba(0,229,255,0.2)]"
            >
              <MessageSquare size={18} />

              Send Me a Message

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <p className="mt-4 font-mono text-xs text-white/35">
              Prefer a form? I&apos;ve got one of those, too.
            </p>
          </div>
        </motion.div>

        {/* CONTACT CARDS */}
        <div className="grid gap-6 md:grid-cols-2">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isCopied = copiedEmail === method.email;

            return (
              <motion.div
                key={method.id}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 35 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] p-7 transition-colors duration-500 hover:border-white/25 md:p-10"
              >
                {/* DECORATIVE ACCENT */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.14]"
                  style={{ background: method.accent }}
                />

                <div className="relative z-10">
                  {/* CARD HEADER */}
                  <div className="mb-12 flex items-center justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                      style={{ color: method.accent }}
                    >
                      <Icon size={26} strokeWidth={1.5} />
                    </div>

                    <span className="font-mono text-xs tracking-widest text-white/30">
                      0{index + 1}
                    </span>
                  </div>

                  {/* CARD CONTENT */}
                  <p
                    className="mb-3 font-mono text-xs tracking-widest uppercase"
                    style={{ color: method.accent }}
                  >
                    {method.label}
                  </p>

                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {method.title}
                  </h3>

                  <p className="mt-4 min-h-[70px] max-w-md text-sm leading-[1.9] text-white/50">
                    {method.description}
                  </p>

                  {/* EMAIL */}
                  <a
                    href={`mailto:${method.email}`}
                    className="mt-8 inline-flex max-w-full items-center gap-3 break-all font-display text-base font-semibold transition-opacity hover:opacity-70 sm:text-lg"
                    style={{ color: method.accent }}
                  >
                    <Mail size={18} className="shrink-0" />

                    {method.email}

                    <ArrowUpRight
                      size={17}
                      className="shrink-0"
                    />
                  </a>

                  {/* ACTIONS */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${method.email}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-cyan"
                    >
                      Send Email

                      <ArrowUpRight size={16} />
                    </a>

                    <button
                      type="button"
                      onClick={() => copyEmail(method.email)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
                    >
                      {isCopied ? (
                        <>
                          <Check
                            size={16}
                            className="text-lime"
                          />

                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />

                          Copy Email
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* BOTTOM ACCENT */}
                <div
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: method.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CLOSING MESSAGE */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-display text-xl text-white/60 md:text-2xl">
            Good ideas deserve to exist.
            <span className="text-white">
              {" "}Let&apos;s make one happen.
            </span>
          </p>

          {/* CONTACT PAGE LINK */}
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan hover:text-cyan"
          >
            Let&apos;s Talk About It

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}