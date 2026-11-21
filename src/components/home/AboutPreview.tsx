"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Asterisk, MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          {/* ==========================================
              LEFT — HEADING
          ========================================== */}

          <div>
            {/* SECTION LABEL */}
            <div className="mb-7 flex items-center gap-3">
              <Asterisk size={18} className="text-pink" />

              <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
                // 002 — About
              </span>
            </div>

            {/* HEADING */}
            <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] font-bold tracking-[-0.07em]">
              MORE
              <br />
              THAN{" "}
              <span className="font-serif font-normal italic text-cyan">
                code.
              </span>
            </h2>

            {/* LOCATION */}
            <div className="mt-8 flex items-center gap-2 text-sm text-white/40">
              <MapPin
                size={15}
                className="shrink-0 text-pink"
              />

              <span>
                US Citizen - Based in Sarandë, Albania
              </span>
            </div>
          </div>

          {/* ==========================================
              RIGHT — INTRODUCTION
          ========================================== */}

          <div className="relative">
            {/* DECORATIVE ACCENT */}
            <div
              aria-hidden="true"
              className="absolute -top-8 -left-8 hidden h-24 w-24 rounded-full border border-violet/20 lg:block"
            />

            <div className="relative border-l-2 border-cyan/40 pl-7 md:pl-10">
              {/* INTRODUCTION WITH NEON NAME */}
              <p className="font-display text-2xl leading-[1.5] font-medium tracking-tight md:text-3xl">
                Hi, I&apos;m{" "}
                <span className="text-[#A855F7] [text-shadow:0_0_18px_#A855F744]">
                  Angelica.
                </span>

                <span className="text-white/55">
                  {" "}
                  I build websites, applications, and digital experiences
                  that solve real problems.
                </span>
              </p>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-xl text-base leading-[1.9] text-white/50">
                I&apos;m a full-stack developer with a creative streak and
                an inconvenient amount of curiosity. I love turning
                complicated ideas into intuitive, useful experiences —
                preferably with a little personality along the way.
              </p>

              <p className="mt-5 max-w-xl text-base leading-[1.9] text-white/50">
                Sometimes that means building tools that make someone&apos;s
                job easier. Sometimes it means creating an entire website
                because I thought, &quot;I could make that better.&quot;
              </p>

              {/* ==========================================
                  CTA — NEON LIME HOVER
              ========================================== */}

              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-4 rounded-full border border-white/20 px-7 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:border-[#B6FF3B] hover:text-[#B6FF3B] hover:shadow-[0_0_20px_#B6FF3B55] focus-visible:border-[#B6FF3B] focus-visible:text-[#B6FF3B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6FF3B]"
              >
                MORE ABOUT ME

                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}