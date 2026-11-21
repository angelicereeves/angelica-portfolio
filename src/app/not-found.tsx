"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  Terminal,
  Bug,
  RefreshCw,
  Sparkles,
  Home,
  AlertTriangle,
} from "lucide-react";

/* ---------------------------------------------
   DEVELOPER EXCUSES
--------------------------------------------- */

const excuses = [
  "The developer has been notified. She's pretending she hasn't seen it.",
  "Have you tried turning the entire internet off and back on?",
  "This page is currently on a very important coffee break.",
  "The code was working five minutes ago. I swear.",
  "A semicolon has gone missing. We're organizing a search party.",
  "The page has decided to pursue other opportunities.",
  "It's not a bug. It's an unexpected adventure.",
  "The developer is now questioning every decision she's ever made.",
  "404: Motivation not found. Please supply snacks.",
  "Okay, fine. You caught me. I have no idea where this page went.",
];

/* ---------------------------------------------
   FAKE TERMINAL MESSAGES
--------------------------------------------- */

const terminalMessages = [
  {
    prefix: ">",
    text: "locating_requested_page...",
    color: "text-white/60",
  },
  {
    prefix: "✓",
    text: "checking_navigation_routes",
    color: "text-cyan",
  },
  {
    prefix: "✓",
    text: "searching_everywhere",
    color: "text-cyan",
  },
  {
    prefix: "!",
    text: "page_not_found",
    color: "text-pink",
  },
  {
    prefix: ">",
    text: "initiating_plan_b...",
    color: "text-lime",
  },
];

/* ---------------------------------------------
   ANIMATED BACKGROUND PARTICLES
--------------------------------------------- */

const particles = [
  { left: "8%", top: "18%", size: 4, delay: 0 },
  { left: "18%", top: "72%", size: 3, delay: 1.2 },
  { left: "82%", top: "20%", size: 5, delay: 0.8 },
  { left: "91%", top: "65%", size: 3, delay: 1.8 },
  { left: "65%", top: "12%", size: 4, delay: 2.2 },
  { left: "30%", top: "85%", size: 3, delay: 1.5 },
  { left: "73%", top: "83%", size: 4, delay: 0.5 },
];

/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  const [excuseIndex, setExcuseIndex] = useState(-1);
  const [visibleLines, setVisibleLines] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  /* ---------------------------------------------
     TERMINAL ANIMATION
  --------------------------------------------- */

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= terminalMessages.length) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 550);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  /* ---------------------------------------------
     EXCUSE GENERATOR
  --------------------------------------------- */

  const generateExcuse = () => {
    setExcuseIndex((current) => (current + 1) % excuses.length);
    setClickCount((current) => current + 1);
  };

  const resetTerminal = () => {
    setVisibleLines(0);

    if (reduceMotion) {
      return;
    }

    // Restart the terminal sequence without reloading the page.
    setTerminalRun((current) => current + 1);
  };

  const [terminalRun, setTerminalRun] = useState(0);

  useEffect(() => {
    if (reduceMotion || terminalRun === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= terminalMessages.length) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 350);

    return () => window.clearInterval(interval);
  }, [terminalRun, reduceMotion]);

  const displayedLines = reduceMotion
    ? terminalMessages.length
    : visibleLines;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-6 pb-24 pt-40 text-[#F5F5F7] md:px-12 md:pt-48">
      {/* ---------------------------------------------
          BACKGROUND
      --------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Cyan glow */}
        <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[150px]" />

        {/* Violet glow */}
        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-violet/10 blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Floating particles */}
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-cyan"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.2, 0.8, 0.2],
                    y: [0, -20, 0],
                  }
            }
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ---------------------------------------------
          MAIN CONTENT
      --------------------------------------------- */}

      <div className="relative mx-auto max-w-6xl">
        {/* EYEBROW */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink" />

          <span className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
            Error 404 — Something went sideways
          </span>
        </motion.div>

        {/* 404 NUMBER */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <h1 className="select-none font-display text-[clamp(9rem,28vw,25rem)] font-bold leading-[0.75] tracking-[-0.12em] text-white">
            4
            <span className="relative inline-block text-cyan">
              0

              {/* Orbiting decoration */}
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/30"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: 360 }
                }
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-lime" />
              </motion.span>
            </span>
            4
            <span className="text-pink">.</span>
          </h1>
        </motion.div>

        {/* HEADING */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 max-w-3xl"
        >
          <h2 className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.065em] sm:text-6xl md:text-7xl">
            WELL, THIS IS
            <br />

            <span className="font-serif font-normal italic text-cyan">
              awkward.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-[1.9] text-white/50 md:text-lg">
            Looks like this page wandered off somewhere.
            I&apos;ve checked the code, questioned my life
            choices, and even tried turning it off and on
            again.
            <span className="text-white/80"> Nothing.</span>
          </p>
        </motion.div>

        {/* ---------------------------------------------
            ACTION BUTTONS
        --------------------------------------------- */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* HOME */}

          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-cyan"
          >
            <Home size={17} />

            Take Me Home

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

          {/* BLAME THE DEVELOPER */}

          <button
            type="button"
            onClick={generateExcuse}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-pink/50 hover:bg-pink/10"
          >
            <Bug
              size={17}
              className="text-pink transition-transform group-hover:rotate-12"
            />

            Blame the Developer

            <Sparkles size={15} className="text-pink" />
          </button>
        </motion.div>

        {/* ---------------------------------------------
            EXCUSE GENERATOR
        --------------------------------------------- */}

        <div
          className="mt-8 min-h-[100px] max-w-2xl"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            {excuseIndex >= 0 && (
              <motion.div
                key={clickCount}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 12, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -12 }
                }
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-pink/20 bg-pink/5 px-6 py-5"
              >
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-pink uppercase">
                  <AlertTriangle size={13} />

                  Official Developer Statement #{clickCount}
                </div>

                <p className="text-sm leading-relaxed text-white/75">
                  {excuses[excuseIndex]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------------------------------------
            TERMINAL
        --------------------------------------------- */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111116]"
        >
          {/* Terminal header */}

          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-pink/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan/80" />
              </div>

              <div className="ml-3 flex items-center gap-2 font-mono text-[11px] text-white/40">
                <Terminal size={13} />

                page_recovery.exe
              </div>
            </div>

            <button
              type="button"
              onClick={resetTerminal}
              aria-label="Restart terminal animation"
              className="rounded-lg p-2 text-white/35 transition-colors hover:bg-white/5 hover:text-cyan"
            >
              <RefreshCw size={15} />
            </button>
          </div>

          {/* Terminal body */}

          <div className="min-h-[235px] space-y-3 px-6 py-6 font-mono text-xs sm:text-sm">
            {terminalMessages
              .slice(0, displayedLines)
              .map((line, index) => (
                <motion.div
                  key={`${terminalRun}-${index}`}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: -8 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-3"
                >
                  <span className={line.color}>
                    {line.prefix}
                  </span>

                  <span className="text-white/60">
                    {line.text}
                  </span>
                </motion.div>
              ))}

            {displayedLines >= terminalMessages.length && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 pt-3 text-lime"
              >
                <span className="text-white/40">&gt;</span>

                suggestion: go_home_and_pretend_this_never_happened

                <span className="inline-block h-4 w-1.5 animate-pulse bg-lime" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ---------------------------------------------
            BOTTOM MESSAGE
        --------------------------------------------- */}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="font-mono text-xs tracking-wider text-white/30 uppercase">
            Lost in the internet since approximately 0.4 seconds ago.
          </p>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />

            Or explore my work instead
          </Link>
        </div>
      </div>
    </main>
  );
}