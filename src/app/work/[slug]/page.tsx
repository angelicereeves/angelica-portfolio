// src/app/work/[slug]/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ExternalLink,
  Layers3,
} from "lucide-react";

import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  type Project,
} from "@/data/projects";

// ============================================================
// HELPERS
// ============================================================

function rgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getCategoryLabel(category: Project["category"]) {
  switch (category) {
    case "business":
      return "Website";
    case "application":
      return "Application";
    case "concept":
      return "Concept";
  }
}

function getProjectDomain(project: Project) {
  if (!project.liveUrl) {
    return "project-preview";
  }

  try {
    const url = new URL(project.liveUrl);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "project-preview";
  }
}

function getAccentHoverStyles(accent: string): CSSProperties {
  return {
    "--project-accent": accent,
    "--project-glow": rgba(accent, 0.55),
  } as CSSProperties;
}

// ============================================================
// STATIC GENERATION
// ============================================================

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Angelica Reeves`,
    description: project.description,
  };
}

// ============================================================
// PROJECT SHOWCASE
// ============================================================

function ProjectShowcase({ project }: { project: Project }) {
  const accent = project.accent;
  const domain = getProjectDomain(project);

  return (
    <div
      className="
        relative overflow-hidden rounded-[26px]
        border px-4 py-12
        sm:px-8 sm:py-16
        lg:px-16 lg:py-20
      "
      style={{
        borderColor: rgba(accent, 0.22),
        background: `
          radial-gradient(
            ellipse at 50% 45%,
            ${rgba(accent, 0.13)},
            transparent 65%
          ),
          linear-gradient(135deg, #16161B, #0D0D10)
        `,
      }}
    >
      {/* ==================================================
          BACKGROUND GRID
      ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* ==================================================
          DECORATIVE RINGS
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-[15%] -top-[40%]
          aspect-square w-[75%] rounded-full border
        "
        style={{
          borderColor: rgba(accent, 0.14),
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-[5%] -top-[25%]
          aspect-square w-[55%] rounded-full border
        "
        style={{
          borderColor: rgba(accent, 0.09),
        }}
      />

      {/* ==================================================
          AMBIENT GLOW
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[65%] w-[75%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full blur-[110px]
        "
        style={{
          background: rgba(accent, 0.11),
        }}
      />

      {/* ==================================================
          TOP LABEL
      ================================================== */}

      <div className="relative z-10 mb-8 flex items-center justify-between gap-4 sm:mb-10">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 12px ${rgba(accent, 0.6)}`,
            }}
          />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            Project preview
          </span>
        </div>

        <span
          className="hidden font-mono text-[10px] uppercase tracking-[0.15em] sm:block"
          style={{
            color: rgba(accent, 0.65),
          }}
        >
          {getCategoryLabel(project.category)}
        </span>
      </div>

      {/* ==================================================
          BROWSER WINDOW
      ================================================== */}

      <div
        className="
          group/browser relative z-10
          mx-auto max-w-[1150px]
          overflow-hidden rounded-xl
          border bg-[#0A0A0D]
          transition-[border-color,box-shadow,transform]
          duration-500
          hover:-translate-y-1
          sm:rounded-2xl
        "
        style={{
          borderColor: rgba(accent, 0.3),
          boxShadow: `
            0 30px 90px rgba(0, 0, 0, 0.45),
            0 0 65px ${rgba(accent, 0.09)}
          `,
        }}
      >
        {/* ================================================
            BROWSER TOOLBAR
        ================================================ */}

        <div
          className="
            relative flex h-11 items-center
            justify-between border-b
            border-white/[0.08]
            bg-[#17171B]
            px-3
            sm:h-12 sm:px-5
          "
        >
          {/* WINDOW CONTROLS */}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>

          {/* ADDRESS BAR */}

          <div
            className="
              absolute left-1/2
              flex max-w-[50%]
              -translate-x-1/2
              items-center justify-center
              rounded-md border
              border-white/[0.06]
              bg-white/[0.035]
              px-3 py-1.5
              sm:max-w-[60%] sm:px-8
            "
          >
            <span className="truncate font-mono text-[9px] tracking-wide text-white/40 sm:text-[11px]">
              {domain}
            </span>
          </div>

          {/* BROWSER LABEL */}

          <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
            <span className="hidden sm:inline">Preview</span>
          </span>
        </div>

        {/* ================================================
            SCREENSHOT
        ================================================ */}

        <div
          className="
            group/image relative block
            aspect-[16/10]
            w-full overflow-hidden
            bg-[#0B0B10]
          "
        >
          <Image
            src={project.thumbnail}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 90vw,
              1150px
            "
            className="
              object-cover object-top
              transition-transform duration-700
              ease-out
              group-hover/image:scale-[1.025]
            "
          />

          {/* SUBTLE BOTTOM GRADIENT */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-x-0 bottom-0
              h-24
              bg-gradient-to-t
              from-black/25 to-transparent
            "
          />
        </div>
      </div>

      {/* ==================================================
          BOTTOM ANNOTATION
      ================================================== */}

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
          Designed & developed by Angelica Reeves
        </span>

        <span
          className="font-mono text-[10px] uppercase tracking-[0.15em]"
          style={{
            color: rgba(accent, 0.65),
          }}
        >
          {project.title}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  number,
  label,
  accent,
}: {
  number: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span className="font-mono text-xs" style={{ color: accent }}>
        {number}
      </span>

      <span className="h-px w-8 bg-white/20" />

      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">
        {label}
      </span>
    </div>
  );
}

// ============================================================
// PROJECT NAVIGATION
// ============================================================

function ProjectNavigation({ project }: { project: Project }) {
  const all = getAllProjects();

  const index = all.findIndex((item) => item.slug === project.slug);

  const previous = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <section className="border-t border-white/[0.08]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 md:grid-cols-2">
        {/* PREVIOUS PROJECT */}

        <Link
          href={`/work/${previous.slug}`}
          className="
            group border-b border-white/[0.08]
            px-6 py-12
            transition-colors
            hover:bg-white/[0.025]
            sm:px-10
            md:border-b-0 md:border-r
            lg:px-14 lg:py-16
          "
        >
          <span className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
            <ArrowLeft size={14} />
            Previous project
          </span>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {previous.title}
            </span>

            <ArrowUpRight
              size={20}
              style={{ color: previous.accent }}
              className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </Link>

        {/* NEXT PROJECT */}

        <Link
          href={`/work/${next.slug}`}
          className="
            group px-6 py-12
            transition-colors
            hover:bg-white/[0.025]
            sm:px-10
            lg:px-14 lg:py-16
          "
        >
          <span className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
            Next project
            <ArrowRight size={14} />
          </span>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {next.title}
            </span>

            <ArrowUpRight
              size={20}
              style={{ color: next.accent }}
              className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const accent = project.accent;
  const study = project.caseStudy;
  const accentHoverStyles = getAccentHoverStyles(accent);

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090B] text-white">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden border-b border-white/[0.08]">
        {/* BACKGROUND GLOW */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{
            background: rgba(accent, 0.1),
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-40">
          {/* ==================================================
              BACK LINK — ACCENT GLOW ON HOVER
          ================================================== */}

          <Link
            href="/work"
            className="
              group mb-14 inline-flex items-center gap-3
              text-xs font-medium uppercase tracking-[0.15em]
              text-white/45
              transition-all duration-300
              hover:[color:var(--project-accent)]
              hover:[text-shadow:0_0_10px_var(--project-glow),0_0_22px_var(--project-glow)]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white
            "
            style={accentHoverStyles}
          >
            <ArrowLeft
              size={16}
              className="
                transition-transform duration-300
                group-hover:-translate-x-1
              "
            />

            Back to all projects
          </Link>

          {/* PROJECT CATEGORY */}

          <div className="mb-7 flex flex-wrap items-center gap-4">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 14px ${rgba(accent, 0.7)}`,
              }}
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              {getCategoryLabel(project.category)}
            </span>
          </div>

          {/* PROJECT TITLE */}

          <h1 className="max-w-[1200px] text-[clamp(3.8rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
            {project.title}
            <span style={{ color: accent }}>.</span>
          </h1>

          {/* DESCRIPTION AND LINKS */}

          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[700px] text-lg leading-relaxed text-white/60 sm:text-xl">
              {project.description}
            </p>

            <div className="flex shrink-0 flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  style={{
                    background: accent,
                  }}
                >
                  Visit live project
                  <ArrowUpRight size={17} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View source
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          VISUAL SHOWCASE
      ================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <ProjectShowcase project={project} />
      </section>

      {/* ==================================================
          OVERVIEW
      ================================================== */}

      <section className="mx-auto grid max-w-[1500px] gap-14 px-5 pb-24 pt-8 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:px-12 lg:pb-32">
        {/* PROJECT DETAILS */}

        <div>
          <SectionHeading
            number="01"
            label="Project details"
            accent={accent}
          />

          <div className="space-y-8">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                Category
              </p>

              <p className="text-sm text-white/75">
                {getCategoryLabel(project.category)}
              </p>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
                Technologies
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs text-white/55"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OVERVIEW */}

        <div>
          <SectionHeading
            number="02"
            label="The overview"
            accent={accent}
          />

          <h2 className="mb-8 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.065em]">
            More than
            <br />
            <span style={{ color: accent }}>
              pixels & code.
            </span>
          </h2>

          <p className="max-w-[750px] text-base leading-8 text-white/60 sm:text-lg">
            {study?.overview || project.description}
          </p>
        </div>
      </section>

      {/* ==================================================
          CHALLENGE + SOLUTION
      ================================================== */}

      {study && (
        <section className="border-y border-white/[0.08] bg-[#0E0E11]">
          <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
            {/* CHALLENGE */}

            <div>
              <SectionHeading
                number="03"
                label="The challenge"
                accent={accent}
              />

              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                The problem.
              </h2>

              <p className="max-w-[600px] text-base leading-8 text-white/55">
                {study.challenge}
              </p>
            </div>

            {/* SOLUTION */}

            <div>
              <SectionHeading
                number="04"
                label="The solution"
                accent={accent}
              />

              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                The approach
                <span style={{ color: accent }}>.</span>
              </h2>

              <p className="max-w-[600px] text-base leading-8 text-white/55">
                {study.solution}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          HIGHLIGHTS
      ================================================== */}

      {study?.highlights && study.highlights.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionHeading
            number="05"
            label="What went into it"
            accent={accent}
          />

          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.07em]">
              The little things
              <br />
              <span className="text-white/30">
                are the big things.
              </span>
            </h2>

            <Asterisk
              size={42}
              strokeWidth={0.8}
              style={{ color: accent }}
            />
          </div>

          {/* HIGHLIGHT CARDS */}

          <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {study.highlights.map((highlight, index) => (
              <div
                key={`${highlight}-${index}`}
                className="min-h-[150px] bg-[#101013] p-7 transition-colors hover:bg-[#17171B] sm:p-8"
              >
                {/* NUMBER ONLY — NO LINK-STYLE ARROW */}

                <div className="mb-8">
                  <span
                    className="font-mono text-xs"
                    style={{
                      color: rgba(accent, 0.7),
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="max-w-[280px] text-base font-medium leading-6 text-white/75">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          OUTCOME
      ================================================== */}

      {study?.outcome && (
        <section className="border-t border-white/[0.08] bg-[#0E0E11]">
          <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <SectionHeading
              number="06"
              label="The outcome"
              accent={accent}
            />

            <p className="max-w-[1000px] text-[clamp(1.6rem,3.5vw,3.2rem)] font-medium leading-[1.3] tracking-[-0.045em] text-white/80">
              {study.outcome}
            </p>
          </div>
        </section>
      )}

      {/* ==================================================
          EXPLORE ALL PROJECTS — ACCENT GLOW ON HOVER
      ================================================== */}

      <div className="border-t border-white/[0.08] py-10 text-center">
        <Link
          href="/work"
          className="
            group inline-flex items-center gap-3
            text-xs font-semibold uppercase tracking-[0.2em]
            text-white/45
            transition-all duration-300
            hover:[color:var(--project-accent)]
            hover:[text-shadow:0_0_10px_var(--project-glow),0_0_22px_var(--project-glow)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-white
          "
          style={accentHoverStyles}
        >
          <Layers3
            size={16}
            className="
              transition-transform duration-300
              group-hover:scale-110
            "
          />

          Explore all projects

          <ArrowUpRight
            size={15}
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>
      </div>

      {/* ==================================================
          PREVIOUS / NEXT
      ================================================== */}

      <ProjectNavigation project={project} />
    </main>
  );
}