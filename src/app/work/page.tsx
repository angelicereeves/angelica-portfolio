"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Code2,
  CodeXml,
  ExternalLink,
  Layers3,
  Sparkles,
} from "lucide-react";

import {
  getAllProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

// ============================================================
// CONFIG
// ============================================================

type FilterId = ProjectCategory | "all";

const ALL_PROJECTS = getAllProjects();

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

// ============================================================
// UTILITIES
// ============================================================

function hexToRgb(hex: string) {
  const normalized = hex.replace("#");

  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const value = parseInt(full, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getCategoryLabel(category: ProjectCategory) {
  switch (category) {
    case "business":
      return "Website";
    case "application":
      return "Application";
    case "concept":
      return "Concept";
  }
}

function getProjectLink(project: Project) {
  return project.liveUrl || project.githubUrl || null;
}

function getProjectLinkLabel(project: Project) {
  return project.liveUrl ? "Visit live project" : "View source code";
}

// ============================================================
// ANIMATED NUMBER
// ============================================================

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;

    const duration = 900;

    function animate(timestamp: number) {
      if (start === null) start = timestamp;

      const progress = Math.min(
        (timestamp - start) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span>{String(display).padStart(2, "0")}</span>;
}

// ============================================================
// HERO DECORATION
// ============================================================

function HeroDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Atmospheric glows */}
      <div
        className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{
          background: "rgba(168,85,247,0.09)",
        }}
      />

      <div
        className="absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full blur-[140px]"
        style={{
          background: "rgba(0,229,255,0.045)",
        }}
      />

      {/* Decorative star */}
      <motion.div
        className="absolute right-[8%] top-[18%] hidden text-[#C7FF4D] lg:block"
        animate={{
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Asterisk
          size={62}
          strokeWidth={0.8}
          className="opacity-70"
        />
      </motion.div>

      <div className="absolute bottom-[16%] right-[20%] hidden text-[#A855F7]/50 md:block">
        <Sparkles size={18} strokeWidth={1} />
      </div>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function WorkHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08]">
      <HeroDecoration />

      <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-36">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mb-9 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-[#C7FF4D] shadow-[0_0_14px_rgba(199,255,77,0.65)]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50 sm:text-xs">
            Selected & assorted creations
          </span>
        </motion.div>

        {/* Heading */}
        <div className="relative">
          <motion.h1
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.1,
            }}
            className="max-w-[1150px] text-[clamp(5rem,14vw,13rem)] font-black leading-[0.78] tracking-[-0.095em] text-white"
          >
            THE
            <br />
            <span className="relative inline-block">
              WORK
              <span className="absolute -right-5 top-1 text-[0.18em] font-light tracking-normal text-[#C7FF4D] sm:-right-9">
                *
              </span>
            </span>
            <span className="text-white/20">.</span>
          </motion.h1>

          {/* Side annotation */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
            className="absolute bottom-3 right-0 hidden items-center gap-3 xl:flex"
          >
            <span className="h-px w-12 bg-white/20" />

            <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
              A collection of
              <br />
              happy accidents
              <br />
              & deliberate decisions
            </span>
          </motion.div>
        </div>

        {/* Bottom content */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            className="max-w-[610px]"
          >
            <p className="text-lg leading-relaxed text-white/65 sm:text-xl lg:text-[23px]">
              Websites, applications, experiments, and the
              occasional{" "}
              <span className="font-medium text-white">
                “what if I built that?”
              </span>
            </p>

            <p className="mt-4 max-w-[510px] text-sm leading-7 text-white/40 sm:text-[15px]">
              A collection of real-world solutions and
              self-initiated ideas. Different problems, different
              approaches, one mildly obsessive attention to detail.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="flex items-end gap-5 md:justify-end"
          >
            <div>
              <div className="text-[clamp(4rem,8vw,7rem)] font-light leading-none tracking-[-0.09em] text-white">
                <AnimatedNumber value={ALL_PROJECTS.length} />
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                Projects & counting
              </div>
            </div>

            <ArrowDownRight
              size={30}
              strokeWidth={1}
              className="mb-8 text-[#C7FF4D]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FILTERS
// ============================================================

interface ProjectFiltersProps {
  active: FilterId;
  onChange: (filter: FilterId) => void;
}

function ProjectFilters({
  active,
  onChange,
}: ProjectFiltersProps) {
  const counts = useMemo(
    () => ({
      all: ALL_PROJECTS.length,
      business: ALL_PROJECTS.filter(
        (project) => project.category === "business"
      ).length,
      application: ALL_PROJECTS.filter(
        (project) => project.category === "application"
      ).length,
      concept: ALL_PROJECTS.filter(
        (project) => project.category === "concept"
      ).length,
    }),
    []
  );

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {projectCategories.map((category) => {
        const id = category.id as FilterId;
        const selected = active === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={`
              group relative inline-flex min-h-11 items-center
              gap-2 overflow-hidden rounded-full border
              px-4 py-2.5 text-xs font-medium
              transition-all duration-300
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C7FF4D]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#09090B]
              sm:px-5 sm:text-sm
              ${
                selected
                  ? "border-[#C7FF4D] bg-[#C7FF4D] text-[#09090B]"
                  : "border-white/[0.12] bg-white/[0.025] text-white/55 hover:border-[#C7FF4D]/70 hover:bg-[#C7FF4D]/[0.08] hover:text-[#C7FF4D]"
              }
            `}
          >
            <span className="relative z-10">
              {category.label}
            </span>

            <span
              className={`
                relative z-10 text-[10px]
                ${
                  selected
                    ? "text-black/55"
                    : "text-white/25 group-hover:text-[#C7FF4D]/60"
                }
              `}
            >
              {String(counts[id]).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// PROJECT PLACEHOLDER
// ============================================================

interface ProjectVisualProps {
  project: Project;
  index: number;
  hovered: boolean;
}

function ProjectVisual({
  project,
  index,
  hovered,
}: ProjectVisualProps) {
  const accent = project.accent;

  return (
    <div
      className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden sm:min-h-[280px]"
      style={{
        background: `
          radial-gradient(
            ellipse at 70% 30%,
            ${rgba(accent, 0.16)},
            transparent 55%
          ),
          linear-gradient(
            135deg,
            #151519 0%,
            #0D0D10 100%
          )
        `,
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Large abstract rings */}
      <motion.div
        className="absolute -right-[12%] -top-[28%] aspect-square w-[75%] rounded-full border"
        style={{
          borderColor: rgba(accent, 0.18),
        }}
        animate={{
          rotate: hovered ? 35 : 0,
          scale: hovered ? 1.08 : 1,
        }}
        transition={{
          duration: 0.9,
          ease: EASE,
        }}
      />

      <motion.div
        className="absolute -right-[3%] -top-[15%] aspect-square w-[55%] rounded-full border"
        style={{
          borderColor: rgba(accent, 0.13),
        }}
        animate={{
          rotate: hovered ? -25 : 0,
          scale: hovered ? 1.12 : 1,
        }}
        transition={{
          duration: 1.1,
          ease: EASE,
        }}
      />

      {/* Diagonal accent */}
      <div
        className="absolute -left-24 bottom-[12%] h-px w-[85%] -rotate-[25deg]"
        style={{
          background: `linear-gradient(to right, transparent, ${rgba(
            accent,
            0.45
          )}, transparent)`,
        }}
      />

      {/* Main visual */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-5"
        animate={{
          y: hovered ? -6 : 0,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: EASE,
        }}
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-[24px] border sm:h-24 sm:w-24"
          style={{
            borderColor: rgba(accent, 0.35),
            background: rgba(accent, 0.055),
            boxShadow: hovered
              ? `0 0 70px ${rgba(accent, 0.13)}`
              : `0 0 35px ${rgba(accent, 0.045)}`,
          }}
        >
          {project.category === "application" ? (
            <Code2
              size={36}
              strokeWidth={1.2}
              style={{ color: accent }}
            />
          ) : project.category === "concept" ? (
            <Sparkles
              size={36}
              strokeWidth={1.2}
              style={{ color: accent }}
            />
          ) : (
            <Layers3
              size={36}
              strokeWidth={1.2}
              style={{ color: accent }}
            />
          )}
        </div>

        <div className="text-center">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.35em]"
            style={{
              color: rgba(accent, 0.8),
            }}
          >
            {project.category === "concept"
              ? "Concept Study"
              : project.category === "application"
                ? "Digital Experience"
                : "Web Experience"}
          </span>
        </div>
      </motion.div>

      {/* Top corner metadata */}
      <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: accent,
            boxShadow: `0 0 10px ${rgba(accent, 0.7)}`,
          }}
        />

        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
          {getCategoryLabel(project.category)}
        </span>
      </div>

      <span className="absolute right-5 top-5 font-mono text-[10px] text-white/25 sm:right-7 sm:top-7">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(ALL_PROJECTS.length).padStart(2, "0")}
      </span>

      {/* Bottom annotation — year removed */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          Designed & developed
        </span>
      </div>

      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        style={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            ${rgba(accent, 0.07)},
            transparent 65%
          )`,
        }}
      />
    </div>
  );
}

// ============================================================
// PROJECT CARD
// ============================================================

interface ProjectCardProps {
  project: Project;
  index: number;
  large?: boolean;
}

function ProjectCard({
  project,
  index,
  large = false,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const cardRef = useRef<HTMLElement>(null);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const accent = project.accent;
  const primaryLink = getProjectLink(project);

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
  }, [project.thumbnail]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setMouse({ x, y });
  }

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-[22px] border bg-[#101013]
        transition-[border-color,box-shadow] duration-500
        sm:rounded-[26px]
        ${large ? "lg:col-span-2" : "lg:col-span-1"}
      `}
      style={{
        borderColor: hovered
          ? rgba(accent, 0.42)
          : "rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? `0 15px 80px ${rgba(accent, 0.075)}`
          : "none",
      }}
    >
      {/* Cursor-following glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            450px circle at ${mouse.x}% ${mouse.y}%,
            ${rgba(accent, 0.07)},
            transparent 60%
          )`,
        }}
      />

      {/* ================================================== */}
      {/* PREVIEW */}
      {/* ================================================== */}

      <div
        className={`
          relative overflow-hidden border-b border-white/[0.06]
          ${
            large
              ? "h-[260px] sm:h-[340px] lg:h-[430px]"
              : "h-[240px] sm:h-[300px] lg:h-[320px]"
          }
        `}
      >
        {/* Abstract placeholder */}
        <div className="absolute inset-0">
          <ProjectVisual
            project={project}
            index={index}
            hovered={hovered}
          />
        </div>

        {/* Screenshot */}
        {!imageFailed && project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={`${project.title} website preview`}
            fill
            sizes={
              large
                ? "(max-width: 1024px) 100vw, 90vw"
                : "(max-width: 1024px) 100vw, 45vw"
            }
            className={`
              relative z-10 object-cover object-top
              transition-all duration-700
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              ${hovered ? "scale-[1.035]" : "scale-100"}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        )}

        {imageLoaded && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute bottom-5 left-5 z-20 sm:bottom-6 sm:left-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-xl"
              style={{
                color: accent,
                borderColor: rgba(accent, 0.3),
                background: "rgba(10,10,12,0.8)",
              }}
            >
              <Asterisk size={12} />
              Featured
            </span>
          </div>
        )}

        {/* External preview action */}
        {primaryLink && (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${getProjectLinkLabel(project)}: ${project.title}`}
            className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#101013]/90 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 sm:bottom-6 sm:right-6"
            style={{
              borderColor: hovered
                ? accent
                : "rgba(255,255,255,0.2)",
              color: hovered ? accent : "#ffffff",
            }}
          >
            {project.liveUrl ? (
              <ArrowUpRight size={19} strokeWidth={1.5} />
            ) : (
              <CodeXml size={18} strokeWidth={1.5} />
            )}
          </a>
        )}
      </div>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div
        className={`
          relative z-10 flex flex-1 flex-col
          ${large ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-7"}
        `}
      >
        {/* Metadata — year removed */}
        <div className="mb-5 flex items-center gap-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {getCategoryLabel(project.category)}
          </span>

          {project.category === "concept" && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                Self-initiated
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          className={`
            font-semibold tracking-[-0.055em]
            transition-colors duration-300
            ${
              large
                ? "text-[clamp(2rem,4vw,3.5rem)]"
                : "text-[clamp(1.65rem,2.5vw,2.3rem)]"
            }
          `}
          style={{
            color: hovered ? accent : "#ffffff",
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.13em] text-white/35">
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          className={`
            mt-5 max-w-[680px] leading-relaxed text-white/55
            ${large ? "text-[15px] sm:text-base" : "text-sm sm:text-[15px]"}
          `}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, large ? 5 : 4)
            .map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[10px] text-white/45 transition-colors duration-300 group-hover:border-white/[0.14] group-hover:text-white/65"
              >
                {technology}
              </span>
            ))}

          {project.technologies.length >
            (large ? 5 : 4) && (
            <span className="rounded-full border border-white/[0.06] px-3 py-1.5 text-[10px] text-white/30">
              +
              {project.technologies.length -
                (large ? 5 : 4)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
            <Link
              href={`/work/${project.slug}`}
              className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-white/75 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4D]"
            >
              Explore project

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
                style={{ color: accent }}
              />
            </Link>

            {primaryLink && (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/35 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4D]"
              >
                {project.liveUrl ? (
                  <>
                    Live site
                    <ExternalLink size={13} />
                  </>
                ) : (
                  <>
                    GitHub
                    <CodeXml size={14} />
                  </>
                )}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 z-20 h-[2px]"
        style={{
          background: accent,
          boxShadow: `0 0 18px ${rgba(accent, 0.5)}`,
        }}
        animate={{
          width: hovered ? "100%" : "0%",
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
      />
    </motion.article>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/[0.12] px-6 text-center">
      <Sparkles
        size={28}
        strokeWidth={1}
        className="mb-5 text-[#C7FF4D]"
      />

      <h3 className="text-2xl font-semibold tracking-tight text-white">
        Nothing here. Yet.
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
        This corner of the collection is waiting for its next
        big idea.
      </p>
    </div>
  );
}

// ============================================================
// PROJECT GALLERY
// ============================================================

function ProjectGallery() {
  const [activeFilter, setActiveFilter] =
    useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return ALL_PROJECTS;
    }

    return ALL_PROJECTS.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-80px",
        }}
        variants={reveal}
        className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C7FF4D]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7FF4D]">
              The collection
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-white">
            Made with
            <br />
            <span className="text-white/30">
              intention.
            </span>
          </h2>
        </div>

        <p className="max-w-[350px] text-sm leading-7 text-white/45">
          Some were built for businesses. Some started as
          personal curiosities. All of them taught me
          something.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        <ProjectFilters
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF4D]" />

          Showing{" "}
          {String(filteredProjects.length).padStart(2, "0")}{" "}
          projects
        </div>
      </div>

      {/* Gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.35,
            ease: EASE,
          }}
        >
          {filteredProjects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-7 lg:grid-cols-2">
              {filteredProjects.map((project, index) => {
                // Only Ionian Digital gets a full-width card.
                const large =
                  activeFilter === "all" &&
                  project.slug === "ionian-digital";

                return (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    large={large}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gallery footer */}
      <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Asterisk
            size={17}
            strokeWidth={1.2}
            className="text-[#C7FF4D]"
          />

          <span className="text-xs text-white/40">
            End of the collection. Not the end of the ideas.
          </span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          More in progress ↗
        </span>
      </div>
    </section>
  );
}

// ============================================================
// BOTTOM CTA
// ============================================================

function WorkCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#0E0E11]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -right-20 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{
          background: "rgba(199,255,77,0.065)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          variants={reveal}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C7FF4D]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Your turn
            </span>
          </div>

          <h2 className="max-w-[1000px] text-[clamp(3.5rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
            HAVE A
            <br />
            <span className="text-white/25">
              GOOD IDEA
            </span>
            <span className="text-[#C7FF4D]">?</span>
          </h2>

          <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[420px] text-base leading-7 text-white/50">
              I like interesting problems, ambitious ideas,
              and people who care about the details.
              <br />
              <span className="text-white/75">
                Let&apos;s make something worth clicking.
              </span>
            </p>

            <Link
              href="/contact"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group inline-flex w-fit min-h-14 items-center gap-5 rounded-full border border-[#C7FF4D] bg-[#C7FF4D] px-7 py-4 text-sm font-semibold text-[#09090B] transition-all duration-300 hover:bg-transparent hover:text-[#C7FF4D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E0E11]"
            >
              Let&apos;s talk

              <motion.span
                animate={{
                  x: hovered ? 4 : 0,
                  y: hovered ? -4 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <ArrowUpRight
                  size={19}
                  strokeWidth={1.7}
                />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function WorkPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <WorkHero />
      <ProjectGallery />
      <WorkCTA />
    </main>
  );
}