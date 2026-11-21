"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Asterisk,
  Code2,
  Database,
  Palette,
  Wrench,
  Terminal,
  ChevronRight,
} from "lucide-react";

const skillGroups = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    shortTitle: "Frontend",
    icon: Code2,
    accent: "#00E5FF",
    description:
      "The part you see, touch, and interact with. I build responsive, accessible interfaces that look good and make sense to use.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & Databases",
    shortTitle: "Backend",
    icon: Database,
    accent: "#A855F7",
    description:
      "The systems doing the heavy lifting behind the scenes. APIs, databases, authentication, and the logic that makes everything work.",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "MySQL",
      "SQLAlchemy",
      "Firebase",
      "REST APIs",
    ],
  },
  {
    id: "design",
    number: "03",
    title: "Design & Creative Technology",
    shortTitle: "Design",
    icon: Palette,
    accent: "#FF3CAC",
    description:
      "Where functionality meets personality. I enjoy creating visual identities, thoughtful interfaces, and digital experiences that feel different.",
    skills: [
      "Figma",
      "UI/UX Design",
      "Visual Design",
      "AI Image Generation",
      "Branding",
      "Motion Design",
      "Accessibility",
      "Prototyping",
    ],
  },
  {
    id: "workflow",
    number: "04",
    title: "Tools & Workflow",
    shortTitle: "Workflow",
    icon: Wrench,
    accent: "#C7FF4D",
    description:
      "The tools and practices that help me turn ideas into finished products, collaborate effectively, and keep improving what I build.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "API Integration",
      "Debugging",
      "AI-Assisted Development",
    ],
  },
];

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState("frontend");
  const reduceMotion = useReducedMotion();

  const active =
    skillGroups.find((group) => group.id === activeGroup) ??
    skillGroups[0];

  const ActiveIcon = active.icon;

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-7 flex items-center gap-3">
            <Asterisk size={18} className="text-lime" />

            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
              // 003 — Skills
            </span>
          </div>

          <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-[-0.07em]">
            THE
            <br />
            <span className="font-serif font-normal italic text-lime">
              toolkit.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
            Different tools. Same goal: making things that work beautifully.
          </p>
        </motion.div>

        {/* INTERACTIVE SKILLS AREA */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* LEFT — SKILL SELECTOR */}
          <div
            role="group"
            aria-label="Skill categories"
            className="flex flex-col gap-3"
          >
            {skillGroups.map((group) => {
              const Icon = group.icon;
              const isActive = activeGroup === group.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroup(group.id)}
                  aria-pressed={isActive}
                  className={`group flex w-full items-center gap-5 rounded-[20px] border p-5 text-left transition-all duration-300 md:p-6 ${
                    isActive
                      ? "border-white/20 bg-[#17171D]"
                      : "border-white/10 bg-[#111116] hover:border-white/20"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? `inset 3px 0 0 ${group.accent}`
                      : "none",
                  }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                    style={{
                      color: isActive ? group.accent : "#9696A6",
                    }}
                  >
                    <Icon size={23} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1">
                    <span className="mb-1 block font-mono text-[10px] tracking-widest text-white/30">
                      {group.number} / 04
                    </span>

                    <span className="font-display text-lg font-semibold md:text-xl">
                      {group.title}
                    </span>
                  </div>

                  <ChevronRight
                    size={19}
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1"
                        : "text-white/30 group-hover:translate-x-1"
                    }`}
                    style={{
                      color: isActive ? group.accent : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT — TERMINAL PANEL */}
          <div className="relative min-h-[490px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0D0D12]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <Terminal size={17} className="text-white/40" />

                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                  angelica / skills
                </span>
              </div>

              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-pink" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-7 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                  {/* Category Icon */}
                  <div
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                    style={{
                      color: active.accent,
                      boxShadow: `0 0 45px ${active.accent}15`,
                    }}
                  >
                    <ActiveIcon size={30} strokeWidth={1.5} />
                  </div>

                  <p
                    className="mb-3 font-mono text-xs tracking-widest uppercase"
                    style={{ color: active.accent }}
                  >
                    // {active.shortTitle.toUpperCase()}_STACK
                  </p>

                  <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {active.title}
                  </h3>

                  <p className="mt-5 max-w-lg leading-[1.8] text-white/50">
                    {active.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-9 flex flex-wrap gap-3">
                    {active.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, scale: 0.9 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: reduceMotion ? 0 : index * 0.035,
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-white/75 transition-colors hover:border-white/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative Corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-tl-full opacity-[0.06]"
              style={{ background: active.accent }}
            />
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-2xl font-display text-xl leading-relaxed text-white/60 md:text-2xl">
            The tools change.
            <span className="text-white">
              {" "}The curiosity doesn&apos;t.
            </span>
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-white/20 px-7 py-4 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
          >
            HAVE A PROJECT IN MIND?

            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}