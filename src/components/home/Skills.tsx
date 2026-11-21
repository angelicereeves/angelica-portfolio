"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

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

import Link from "next/link";

// ============================================
// SKILL GROUPS
// ============================================

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

// ============================================
// SKILL BADGE
// ============================================

function SkillBadge({
  skill,
  accent,
  index,
  reduceMotion,
}: {
  skill: string;
  accent: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 0.9 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        delay: reduceMotion ? 0 : index * 0.035,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-default rounded-lg border bg-white/5 px-4 py-2.5 font-mono text-xs transition-[color,border-color,background-color,box-shadow,text-shadow] duration-300"
      style={{
        borderColor: isHovered
          ? accent
          : "rgba(255,255,255,0.1)",

        color: isHovered
          ? accent
          : "rgba(255,255,255,0.75)",

        backgroundColor: isHovered
          ? `${accent}10`
          : "rgba(255,255,255,0.05)",

        boxShadow: isHovered
          ? `0 0 18px ${accent}45, inset 0 0 12px ${accent}10`
          : "none",

        textShadow: isHovered
          ? `0 0 10px ${accent}80`
          : "none",
      }}
    >
      {skill}
    </motion.span>
  );
}

// ============================================
// MAIN SKILLS COMPONENT
// ============================================

export default function Skills() {
  const [activeGroup, setActiveGroup] =
    useState("frontend");

  const reduceMotion = useReducedMotion();

  const active =
    skillGroups.find(
      (group) => group.id === activeGroup
    ) ?? skillGroups[0];

  const ActiveIcon = active.icon;

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col gap-8 md:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* LEFT — TITLE AND DESCRIPTION */}

          <div>
            <div className="mb-7 flex items-center gap-3">
              <Asterisk
                size={18}
                className="text-lime"
              />

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
              Different tools. Same goal: making things
              that work beautifully.
            </p>
          </div>

          {/* RIGHT — EXPLORE ALL SKILLS */}

          <Link
            href="/skills"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-white/20 px-7 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:border-[#A855F7] hover:text-[#A855F7] hover:shadow-[0_0_20px_#A855F755] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A855F7] lg:mb-1 lg:self-auto"
          >
            EXPLORE ALL SKILLS

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>

        {/* ==========================================
            INTERACTIVE SKILLS AREA
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">

          {/* LEFT — SKILL SELECTOR */}

          <div
            role="group"
            aria-label="Skill categories"
            className="flex flex-col gap-3"
          >
            {skillGroups.map((group) => {
              const Icon = group.icon;

              const isActive =
                activeGroup === group.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() =>
                    setActiveGroup(group.id)
                  }
                  aria-pressed={isActive}
                  className={`group flex w-full items-center gap-5 rounded-[20px] border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:p-6 ${
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
                  {/* CATEGORY ICON */}

                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                    style={{
                      color: isActive
                        ? group.accent
                        : "#9696A6",
                    }}
                  >
                    <Icon
                      size={23}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* CATEGORY LABEL */}

                  <div className="flex-1">
                    <span className="mb-1 block font-mono text-[10px] tracking-widest text-white/30">
                      {group.number} / 04
                    </span>

                    <span className="font-display text-lg font-semibold md:text-xl">
                      {group.title}
                    </span>
                  </div>

                  {/* CATEGORY ARROW */}

                  <ChevronRight
                    size={19}
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1"
                        : "text-white/30 group-hover:translate-x-1"
                    }`}
                    style={{
                      color: isActive
                        ? group.accent
                        : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* ==========================================
              RIGHT — TERMINAL PANEL
          ========================================== */}

          <div className="relative min-h-[490px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0D0D12]">

            {/* TERMINAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <div className="flex items-center gap-3">
                <Terminal
                  size={17}
                  className="text-white/40"
                />

                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                  angelica / skills
                </span>
              </div>

              {/* TERMINAL STATUS DOTS */}

              <div
                className="flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-pink" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
              </div>
            </div>

            {/* TERMINAL CONTENT */}

            <div className="p-7 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 15 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.25,
                  }}
                >

                  {/* CATEGORY ICON */}

                  <div
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                    style={{
                      color: active.accent,
                      boxShadow: `0 0 45px ${active.accent}15`,
                    }}
                  >
                    <ActiveIcon
                      size={30}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* CATEGORY LABEL */}

                  <p
                    className="mb-3 font-mono text-xs tracking-widest uppercase"
                    style={{
                      color: active.accent,
                    }}
                  >
                    // {active.shortTitle.toUpperCase()}_STACK
                  </p>

                  {/* CATEGORY TITLE */}

                  <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {active.title}
                  </h3>

                  {/* CATEGORY DESCRIPTION */}

                  <p className="mt-5 max-w-lg leading-[1.8] text-white/50">
                    {active.description}
                  </p>

                  {/* ==================================
                      INDIVIDUAL SKILLS
                  ================================== */}

                  <div className="mt-9 flex flex-wrap gap-3">
                    {active.skills.map(
                      (skill, index) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          accent={active.accent}
                          index={index}
                          reduceMotion={reduceMotion}
                        />
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DECORATIVE CORNER */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-tl-full opacity-[0.06]"
              style={{
                background: active.accent,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}