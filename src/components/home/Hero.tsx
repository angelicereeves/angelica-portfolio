"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Sparkles,
} from "lucide-react";

import ScratchCanvas from "@/components/interactive/ScratchCanvas";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background px-6 pt-40 pb-20 md:px-12 lg:px-20"
    >
      {/* Subtle background grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Intro */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_15px_#C7FF4D]" />

          <p className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
            Angelica Reeves // Creative Developer
          </p>

          <span className="ml-auto hidden font-mono text-xs text-cyan md:block">
            [ SYSTEM ONLINE ]
          </span>
        </motion.div>

        {/* Headline */}

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display max-w-6xl text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.95] font-bold tracking-[-0.075em]"
        >
          THERE'S MORE
          <br />

          <span className="font-serif font-normal italic text-cyan">
            beneath
          </span>{" "}
          THE
          <br />

          SURFACE<span className="text-pink">.</span>
        </motion.h1>

        {/* Description */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">
              I&apos;m Angelica — a full-stack developer and creative
              problem solver turning ideas, challenges, and the occasional
              &quot;what if?&quot; into digital experiences that actually work.
            </p>

            <p className="mt-4 font-mono text-xs text-white/35">
              CURRENT STATUS: FUNCTIONING AS INTENDED (MOSTLY)
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-all hover:bg-cyan"
            >
              Explore My Work
              <ArrowUpRight size={18} />
            </a>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-cyan hover:text-cyan"
            >
              Resume
              <Download size={18} />
            </a>
          </div>
        </motion.div>

        {/* Scratch Canvas */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-20"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-pink" />

              <p className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
                An invitation to explore
              </p>
            </div>

            <span className="hidden font-mono text-xs text-white/30 md:block">
              EXPERIMENT_001
            </span>
          </div>

          <ScratchCanvas />
        </motion.div>

        {/* Scroll */}

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6">
          <p className="font-mono text-xs text-white/30">
            DESIGN. DEVELOP. EXPERIMENT. REPEAT.
          </p>

          <a
            href="#work"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 uppercase transition-colors hover:text-cyan"
          >
            Scroll to explore
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}