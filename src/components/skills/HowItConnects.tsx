"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Lightbulb,
  Palette,
  Code2,
  Database,
  Rocket,
  ArrowRight,
  Asterisk,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

type ProcessStep = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  description: string;
};

// ============================================================
// PROCESS STEPS
// ============================================================

const steps: ProcessStep[] = [
  {
    id: "idea",
    number: "01",
    title: "The Idea",
    subtitle: "Understand the problem",
    icon: Lightbulb,
    color: "#C7FF4D",
    description:
      "I start by asking questions, understanding what someone actually needs, and figuring out what a successful solution should look like.",
  },
  {
    id: "design",
    number: "02",
    title: "The Design",
    subtitle: "Give it direction",
    icon: Palette,
    color: "#FF3CAC",
    description:
      "I explore layouts, user flows, and visual direction, thinking about how people will experience the product before I start building it.",
  },
  {
    id: "interface",
    number: "03",
    title: "The Interface",
    subtitle: "Bring it to life",
    icon: Code2,
    color: "#00E5FF",
    description:
      "I turn ideas into responsive, interactive interfaces, focusing on clean structure, accessibility, and the little details that make a website feel right.",
  },
  {
    id: "logic",
    number: "04",
    title: "The Logic",
    subtitle: "Make it functional",
    icon: Database,
    color: "#A855F7",
    description:
      "When a project needs more than a frontend, I connect the APIs, databases, and application logic that make everything work behind the scenes.",
  },
  {
    id: "launch",
    number: "05",
    title: "The Launch",
    subtitle: "Ship and improve",
    icon: Rocket,
    color: "#C7FF4D",
    description:
      "I test, troubleshoot, deploy, and refine. Getting something live matters, but so does making sure it continues to work for the people using it.",
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function HowItConnects() {
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = !!useReducedMotion();

  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  const selectStep = (index: number) => {
    setActiveStep(index);
  };

  const nextStep = () => {
    setActiveStep((previous) => (previous + 1) % steps.length);
  };

  return (
    <section
      id="process"
      className="relative border-t border-white/10 px-6 py-20 md:px-12 md:py-24 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-6 flex items-center gap-3">
            <Asterisk
              size={18}
              className="text-[#00E5FF]"
            />

            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
              // My Development Process
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[1] font-bold tracking-[-0.06em]">
            FROM IDEA
            <br />

            <span className="font-serif font-normal italic text-[#00E5FF]">
              to impact.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-[1.9] text-white/50 md:text-base">
            I like being involved in the entire process, from
            understanding a problem to building something people
            can actually use.
          </p>
        </motion.div>

        {/* ================================================== */}
        {/* DESKTOP TIMELINE */}
        {/* ================================================== */}

        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}

            <div
              aria-hidden="true"
              className="absolute top-[30px] right-[10%] left-[10%] h-px bg-white/10"
            />

            {/* Active progress line */}

            <motion.div
              aria-hidden="true"
              className="absolute top-[30px] left-[10%] h-px bg-[#00E5FF]"
              initial={false}
              animate={{
                width: `${(activeStep / (steps.length - 1)) * 80}%`,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 grid grid-cols-5 gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isComplete = index < activeStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-pressed={isActive}
                    className="group flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
                  >
                    {/* Number */}

                    <span
                      className="mb-4 font-mono text-[10px] tracking-widest"
                      style={{
                        color: isActive
                          ? step.color
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {step.number}
                    </span>

                    {/* Timeline node */}

                    <motion.div
                      animate={{
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.25,
                      }}
                      className="relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300"
                      style={{
                        color: isActive
                          ? step.color
                          : isComplete
                            ? "#F5F5F7"
                            : "#9696A6",
                        borderColor: isActive
                          ? step.color
                          : isComplete
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(255,255,255,0.15)",
                        background: isActive
                          ? `${step.color}18`
                          : "#111116",
                        boxShadow: isActive
                          ? `0 0 24px ${step.color}20`
                          : "none",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.6} />

                      {isActive && (
                        <motion.span
                          layoutId="active-process-ring"
                          className="pointer-events-none absolute -inset-2 rounded-full border"
                          style={{
                            borderColor: `${step.color}35`,
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.3,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Title */}

                    <span
                      className="mt-7 font-display text-base font-semibold transition-colors lg:text-lg"
                      style={{
                        color: isActive
                          ? "#FFFFFF"
                          : "rgba(255,255,255,0.65)",
                      }}
                    >
                      {step.title}
                    </span>

                    {/* Subtitle */}

                    <span className="mt-2 max-w-[150px] text-xs leading-relaxed text-white/35">
                      {step.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* MOBILE TIMELINE */}
        {/* ================================================== */}

        <div className="md:hidden">
          <div className="relative space-y-1">
            {/* Vertical connection line */}

            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[23px] w-px bg-white/10"
            />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-pressed={isActive}
                  className="relative z-10 flex min-h-[72px] w-full items-center gap-5 rounded-xl px-1 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {/* Node */}

                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
                    style={{
                      color: isActive
                        ? step.color
                        : "#9696A6",
                      borderColor: isActive
                        ? step.color
                        : "rgba(255,255,255,0.15)",
                      background: isActive
                        ? `${step.color}18`
                        : "#111116",
                      boxShadow: isActive
                        ? `0 0 20px ${step.color}20`
                        : "none",
                    }}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </div>

                  {/* Label */}

                  <div className="flex-1">
                    <span className="mb-1 block font-mono text-[10px] text-white/30">
                      {step.number}
                    </span>

                    <span
                      className="block font-display text-base font-semibold"
                      style={{
                        color: isActive
                          ? "#FFFFFF"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {step.title}
                    </span>

                    <span className="mt-1 block text-xs text-white/35">
                      {step.subtitle}
                    </span>
                  </div>

                  <ArrowRight
                    size={15}
                    className="shrink-0"
                    style={{
                      color: isActive
                        ? step.color
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* ACTIVE STEP DETAILS */}
        {/* ================================================== */}

        <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-[#111116] md:mt-12">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 md:px-8">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: active.color,
                }}
              />

              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                Step {active.number} / 05
              </span>
            </div>

            <span className="font-mono text-[10px] text-white/25">
              The Process
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.2,
              }}
              className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
            >
              <div className="flex min-w-0 items-start gap-4">
                <div
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border sm:flex"
                  style={{
                    color: active.color,
                    borderColor: `${active.color}35`,
                    background: `${active.color}10`,
                  }}
                >
                  <ActiveIcon size={22} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold md:text-2xl">
                    {active.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-[1.8] text-white/55">
                    {active.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] font-semibold tracking-wide text-white/65 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:self-center"
              >
                {activeStep === steps.length - 1
                  ? "START AGAIN"
                  : "NEXT STEP"}

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================== */}
        {/* FOOTNOTE */}
        {/* ================================================== */}

        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF4D]" />

          <p className="font-mono text-[10px] text-white/30">
            Every project is different. The goal stays the same:
            build something useful.
          </p>
        </div>
      </div>
    </section>
  );
}