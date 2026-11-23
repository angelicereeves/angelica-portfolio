"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Download,
  Sparkles,
} from "lucide-react";

import ScratchCanvas from "@/components/interactive/ScratchCanvas";

const neonColors = [
  "#00E5FF",
  "#A855F7",
  "#B6FF3B",
  "#FF3CAC",
  "#4D7CFF",
];

const systemMessage = "[ SYSTEM ONLINE ]";

// ============================================
// ANIMATED SYSTEM STATUS
// ============================================

function SystemStatus() {
  const reduceMotion = useReducedMotion();

  const [displayText, setDisplayText] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    // SHORT PAUSE AFTER MESSAGE COMPLETES
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 650);

      return () => clearTimeout(timeout);
    }

    // TYPE MESSAGE CHARACTER BY CHARACTER
    if (!isDeleting && displayText.length < systemMessage.length) {
      timeout = setTimeout(() => {
        setDisplayText(
          systemMessage.slice(0, displayText.length + 1)
        );
      }, 90);
    }

    // BRIEF PAUSE BEFORE DELETING
    else if (!isDeleting) {
      timeout = setTimeout(() => {
        setIsPaused(true);
      }, 150);
    }

    // DELETE MESSAGE CHARACTER BY CHARACTER
    else if (displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 45);
    }

    // SWITCH COLOR AND RESTART
    else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setColorIndex(
          (prev) => (prev + 1) % neonColors.length
        );
      }, 150);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, reduceMotion]);

  return (
    <span
      className="ml-auto hidden min-w-[155px] font-mono text-xs tracking-wider md:inline-flex"
      style={{
        color: neonColors[colorIndex],
        textShadow: `0 0 10px ${neonColors[colorIndex]}80`,
      }}
      aria-label="System online"
    >
      <span aria-hidden="true">
        {reduceMotion ? systemMessage : displayText}
      </span>

      {/* TERMINAL CURSOR */}
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="ml-1 animate-pulse"
        >
          ▌
        </span>
      )}
    </span>
  );
}

// ============================================
// INTERACTIVE "BENEATH" EASTER EGG
// ============================================

function InteractiveBeneath() {
  const reduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    const timeout = setTimeout(() => {
      setIsRevealed(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [isRevealed]);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsRevealed(true)}
        aria-label="Beneath. Click to reveal a hidden message."
        aria-pressed={isRevealed}
        className="group relative inline-block cursor-pointer border-0 bg-transparent p-0 font-serif font-normal italic text-cyan outline-none"
      >
        {/* INTERACTIVE WORD */}
        <motion.span
          className="inline-block transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_12px_#00E5FF,0_0_30px_#00E5FF88] group-focus-visible:[text-shadow:0_0_12px_#00E5FF,0_0_30px_#00E5FF88]"
          animate={{
            y: isRevealed && !reduceMotion ? 65 : 0,
            opacity: isRevealed ? 0 : 1,
          }}
          whileHover={
            reduceMotion || isRevealed
              ? undefined
              : { y: 5 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          beneath
        </motion.span>
      </button>

      {/* HIDDEN MESSAGE */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap font-mono text-[clamp(0.6rem,1.2vw,0.9rem)] font-medium tracking-wider text-[#B6FF3B]"
        initial={false}
        animate={{
          opacity: isRevealed ? 1 : 0,
          y: isRevealed && !reduceMotion ? 0 : -10,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.4,
          delay: isRevealed && !reduceMotion ? 0.35 : 0,
        }}
      >
        so nosy.
      </motion.span>

      {/* ACCESSIBLE ANNOUNCEMENT */}
      <span className="sr-only" aria-live="polite">
        {isRevealed ? "Curiosity looks good on you." : ""}
      </span>
    </span>
  );
}

// ============================================
// HERO COMPONENT
// ============================================

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background px-6 pt-40 pb-20 md:px-12 lg:px-20"
    >
      {/* SUBTLE BACKGROUND GRID */}
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
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          {/* STATUS DOT */}
          <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_15px_#C7FF4D]" />

          {/* NAME & TITLE */}
          <p className="font-mono text-sm tracking-[0.15em] text-white/65 uppercase md:text-base">
            Angelica Reeves // Creative Developer
          </p>

          {/* ANIMATED TERMINAL */}
          <SystemStatus />
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display max-w-6xl text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.95] font-bold tracking-[-0.075em]"
        >
          THERE&apos;S MORE
          <br />

          <InteractiveBeneath />{" "}
          THE
          <br />

          SURFACE<span className="text-pink">.</span>
        </motion.h1>

        {/* DESCRIPTION */}
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

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-3">
            {/* EXPLORE WORK — NEON LIME */}
            <a
              href="#work"
              className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-[#B6FF3B] hover:shadow-[0_0_20px_#B6FF3B66] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6FF3B]"
            >
              Explore My Work

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* RESUME — NEON PINK */}
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#FF3CAC] hover:text-[#FF3CAC] hover:shadow-[0_0_20px_#FF3CAC55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3CAC]"
            >
              Resume

              <Download
                size={18}
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#FF3CAC]"
              />
            </a>
          </div>
        </motion.div>

        {/* SCRATCH CANVAS */}
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

        
      </div>
    </section>
  );
}