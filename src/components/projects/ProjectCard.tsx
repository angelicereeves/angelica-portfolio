"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  const isLarge = index === 0;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index % 2 === 0 ? 0 : 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${
        isLarge ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={
        {
          "--project-accent": project.accent,
          "--project-border": `color-mix(in srgb, ${project.accent} 25%, transparent)`,
          "--project-glow": `color-mix(in srgb, ${project.accent} 18%, transparent)`,
        } as CSSProperties
      }
    >
      {/* ==========================================
          PROJECT CARD
      ========================================== */}

      <Link
        href={`/work/${project.slug}`}
        className="relative block h-full overflow-hidden rounded-[28px] border border-[var(--project-border)] bg-surface transition-[border-color,box-shadow] duration-500 hover:border-[var(--project-accent)] hover:shadow-[0_0_22px_var(--project-glow)] focus-visible:border-[var(--project-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--project-accent)]"
      >
        {/* INNER NEON GLOW */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-20 opacity-[0.06] blur-[100px] transition-opacity duration-700 group-hover:opacity-20"
          style={{
            background: project.accent,
          }}
        />

        {/* ==========================================
            IMAGE / PREVIEW AREA
        ========================================== */}

        <div
          className={`relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-[#0B0B10] ${
            isLarge
              ? "aspect-[16/9]"
              : "aspect-[4/5] md:aspect-auto md:h-[420px]"
          }`}
        >
          {/* BACKGROUND GRID */}

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* ==================================
              PLACEHOLDER ARTWORK
          ================================== */}

          <div className="relative z-10 flex flex-col items-center gap-6 text-center transition-transform duration-700 group-hover:scale-105">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl"
              style={{
                boxShadow: `0 0 60px ${project.accent}20`,
              }}
            >
              <Code2
                size={36}
                style={{ color: project.accent }}
                strokeWidth={1.5}
              />
            </div>

            <div>
              <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/30 uppercase">
                Project Preview
              </p>

              <h3
                className="font-display max-w-sm px-6 text-3xl font-bold tracking-tight md:text-4xl"
                style={{ color: project.accent }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* ==================================
              SCRATCH-INSPIRED NEON STREAKS
          ================================== */}

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            preserveAspectRatio="none"
            viewBox="0 0 800 500"
          >
            <path
              d="M -30 400 Q 170 350 300 430 T 830 280"
              fill="none"
              stroke={project.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="10 8 3 15"
              className="scratch-line"
            />

            <path
              d="M -20 430 Q 220 380 360 450 T 850 310"
              fill="none"
              stroke={project.accent}
              strokeWidth="1"
              strokeOpacity="0.5"
              strokeDasharray="3 12"
            />
          </svg>

          {/* ==================================
              TOP LABELS
          ================================== */}

          <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/70 uppercase backdrop-blur-md">
              {String(project.order).padStart(2, "0")}
            </span>

            {project.status === "development" && (
              <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/70 uppercase backdrop-blur-md">
                In Development
              </span>
            )}
          </div>

          {/* ==================================
              ARROW
          ================================== */}

          <div className="absolute top-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={20} />
          </div>

          {/* BOTTOM GRADIENT */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* ==========================================
            PROJECT INFORMATION
        ========================================== */}

        <div className="relative z-10 p-7 md:p-9">
          {/* PROJECT SUBTITLE & TITLE */}

          <div className="mb-4">
            <p className="mb-2 font-mono text-xs tracking-widest text-white/40 uppercase">
              {project.subtitle}
            </p>

            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {project.title}
            </h3>
          </div>

          {/* PROJECT DESCRIPTION */}

          <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            {project.description}
          </p>

          {/* ==================================
              TECHNOLOGY TAGS
          ================================== */}

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/50"
              >
                {tech}
              </span>
            ))}

            {project.technologies.length > 4 && (
              <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* ==========================================
            BOTTOM ACCENT LINE
        ========================================== */}

        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background: project.accent,
          }}
        />
      </Link>
    </motion.article>
  );
}