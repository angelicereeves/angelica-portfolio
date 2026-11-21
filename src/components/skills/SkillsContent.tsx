"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  Asterisk,
  Sparkles,
} from "lucide-react";

import SkillsConstellation from "@/components/skills/SkillsConstellation";
import HowItConnects from "@/components/skills/HowItConnects";

// ============================================================
// MAIN SKILLS PAGE
// ============================================================

export default function SkillsContent() {
  const reduceMotion = !!useReducedMotion();

  return (
    <div className="overflow-hidden">
      {/* ==================================================== */}
      {/* HERO + SKILLS CONSTELLATION */}
      {/* ==================================================== */}

      <section className="relative px-6 pt-36 pb-20 md:px-12 md:pt-44 md:pb-24 lg:px-20">
        {/* Ambient background glow */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-0 h-[400px] w-[400px] rounded-full bg-[#00E5FF]/5 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* HERO */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
            }}
          >
            {/* Eyebrow */}

            <div className="mb-7 flex items-center gap-3">
              <Asterisk
                size={18}
                className="text-[#C7FF4D]"
              />

              <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
                // Skills & Capabilities
              </span>
            </div>

            {/* Heading */}

            <h1 className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.95] font-bold tracking-[-0.07em]">
              THE WAY
              <br />

              <span className="font-serif font-normal italic text-[#C7FF4D]">
                I build.
              </span>
            </h1>

            {/* Introduction */}

            <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-base leading-[1.9] text-white/55 md:text-xl">
                Part engineering, part design, part figuring
                things out until they work. Here&apos;s what
                I bring to the table — and what I like
                doing with it.
              </p>

              <span className="shrink-0 font-mono text-[11px] tracking-widest text-white/25 uppercase">
                Scroll to explore ↓
              </span>
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* SKILLS CONSTELLATION */}
          {/* ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.2,
            }}
            className="mt-12 md:mt-16"
          >
            {/* Existing component remains unchanged */}

            <SkillsConstellation />
          </motion.div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* DEVELOPMENT JOURNEY */}
      {/* ==================================================== */}

      <HowItConnects />

      {/* ==================================================== */}
      {/* FINAL CTA */}
      {/* ==================================================== */}

      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] p-8 md:p-12 lg:p-14"
          >
            {/* Background glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#C7FF4D]/5 blur-[90px]"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              {/* Copy */}

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-[#C7FF4D]"
                  />

                  <span className="font-mono text-[11px] tracking-widest text-[#C7FF4D] uppercase">
                    Enough about the tools
                  </span>
                </div>

                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  Want to see what I&apos;ve built?
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-[1.8] text-white/50 md:text-base">
                  The best way to understand my work is to
                  explore the projects themselves.
                </p>
              </div>

              {/* CTA Button */}

              <Link
                href="/#work"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-colors hover:bg-[#C7FF4D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                EXPLORE MY WORK

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}