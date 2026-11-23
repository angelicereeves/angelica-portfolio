"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

import type { Project } from "@/data/projects";

// ============================================================
// TYPES
// ============================================================

interface FeaturedProjectSlideProps {
  project: Project;
  index: number;
}

// ============================================================
// FEATURED PROJECT SLIDE
// ============================================================

export default function FeaturedProjectSlide({
  project,
  index,
}: FeaturedProjectSlideProps) {
  const [imageError, setImageError] = useState(false);

  const accentStyles = {
    "--project-accent": project.accent,
    "--project-border": `color-mix(in srgb, ${project.accent} 25%, transparent)`,
    "--project-glow": `color-mix(in srgb, ${project.accent} 12%, transparent)`,
  } as CSSProperties;

  const showImage = Boolean(project.thumbnail) && !imageError;

  return (
    <article className="group h-full" style={accentStyles}>
      <Link
        href={`/work/${project.slug}`}
        className="
          relative flex h-full flex-col overflow-hidden
          rounded-[22px]
          border border-[var(--project-border)]
          bg-surface
          transition-[border-color,box-shadow] duration-500
          hover:border-[var(--project-accent)]
          hover:shadow-[0_0_24px_var(--project-glow)]
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[var(--project-accent)]
        "
      >
        {/* ====================================================
            PROJECT SCREENSHOT
        ==================================================== */}

        <div
          className="
            relative h-[220px] shrink-0 overflow-hidden
            border-b border-white/10
            bg-[#0B0B10]
            sm:h-[250px]
            md:h-[280px]
            lg:h-[310px]
          "
        >
          {/* ACTUAL PROJECT SCREENSHOT */}

          {showImage ? (
            <Image
              src={project.thumbnail}
              alt={`${project.title} website preview`}
              fill
              sizes="
                (max-width: 640px) 85vw,
                (max-width: 1024px) 65vw,
                52vw
              "
              loading="lazy"
              className="
                object-cover object-top
                transition-transform duration-700
                ease-out
                group-hover:scale-[1.04]
              "
              onError={() => setImageError(true)}
            />
          ) : (
            /* FALLBACK VISUAL */

            <div className="absolute inset-0 flex items-center justify-center">
              {/* BACKGROUND GRID */}

              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, white 1px, transparent 1px),
                    linear-gradient(to bottom, white 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* ACCENT GLOW */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20 blur-[80px]"
                style={{
                  background: `radial-gradient(
                    circle at center,
                    ${project.accent}55,
                    transparent 65%
                  )`,
                }}
              />

              {/* PLACEHOLDER ICON */}

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className="
                    flex h-14 w-14 items-center justify-center
                    rounded-xl border border-white/10 bg-white/5
                  "
                  style={{
                    boxShadow: `0 0 35px ${project.accent}15`,
                  }}
                >
                  <Code2
                    size={27}
                    strokeWidth={1.4}
                    style={{ color: project.accent }}
                  />
                </div>

                <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">
                  Project Preview
                </span>
              </div>
            </div>
          )}

          {/* ==================================================
              IMAGE OVERLAYS
          ================================================== */}

          {showImage && (
            <>
              {/* TOP GRADIENT FOR BADGE READABILITY */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-x-0 top-0 z-10
                  h-24
                  bg-gradient-to-b from-black/45 to-transparent
                "
              />

              {/* BOTTOM GRADIENT */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-x-0 bottom-0 z-10
                  h-20
                  bg-gradient-to-t from-black/30 to-transparent
                "
              />

              {/* SUBTLE ACCENT OVERLAY ON HOVER */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0 z-10
                  opacity-0 transition-opacity duration-500
                  group-hover:opacity-100
                "
                style={{
                  background: `linear-gradient(
                    135deg,
                    ${project.accent}08,
                    transparent 55%
                  )`,
                }}
              />
            </>
          )}

          {/* ==================================================
              SCRATCH-INSPIRED NEON STREAKS
          ================================================== */}

          <svg
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 z-10
              h-full w-full
              opacity-0
              transition-opacity duration-500
              group-hover:opacity-70
            "
            preserveAspectRatio="none"
            viewBox="0 0 800 300"
          >
            <path
              d="M -20 230 Q 150 160 300 250 T 830 130"
              fill="none"
              stroke={project.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="10 8 3 15"
            />

            <path
              d="M -20 250 Q 190 190 350 270 T 830 160"
              fill="none"
              stroke={project.accent}
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3 12"
            />
          </svg>

          {/* ==================================================
              PROJECT NUMBER + STATUS
          ================================================== */}

          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span
              className="
                rounded-full border border-white/15
                bg-black/70 px-3 py-1.5
                font-mono text-[10px] tracking-widest
                text-white/80 backdrop-blur-md
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {project.status === "development" && (
              <span
                className="
                  rounded-full border border-white/15
                  bg-black/70 px-3 py-1.5
                  font-mono text-[9px] tracking-widest
                  text-white/75 uppercase backdrop-blur-md
                "
              >
                In Development
              </span>
            )}
          </div>

          {/* ==================================================
              PROJECT ARROW
          ================================================== */}

          <div
            className="
              absolute top-4 right-4 z-20
              flex h-9 w-9 items-center justify-center
              rounded-full border border-white/15
              bg-black/70 text-white backdrop-blur-md
              transition-all duration-300
              group-hover:rotate-45
              group-hover:bg-white
              group-hover:text-black
            "
          >
            <ArrowUpRight size={17} />
          </div>
        </div>

        {/* ====================================================
            PROJECT INFORMATION
        ==================================================== */}

        <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
          {/* PROJECT SUBTITLE */}

          <p className="mb-2 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
            {project.subtitle}
          </p>

          {/* PROJECT TITLE */}

          <h3 className="mb-2 font-display text-xl font-bold tracking-tight md:text-2xl">
            {project.title}
          </h3>

          {/* SHORT DESCRIPTION */}

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
            {project.description}
          </p>

          {/* TECHNOLOGY TAGS */}

          <div className="mt-auto flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full border border-white/10
                  px-3 py-1 font-mono text-[10px]
                  text-white/45
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ====================================================
            BOTTOM ACCENT LINE
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute right-0 bottom-0 left-0
            h-[2px] origin-left scale-x-0
            transition-transform duration-500
            group-hover:scale-x-100
          "
          style={{
            background: project.accent,
          }}
        />
      </Link>
    </article>
  );
}