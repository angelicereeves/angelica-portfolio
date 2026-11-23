"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Asterisk,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, KeyboardEvent } from "react";

import FeaturedProjectSlide from "@/components/projects/FeaturedProjectSlide";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedWork() {
  const projects = getFeaturedProjects(5);
  const reduceMotion = useReducedMotion();

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];
  const accent = activeProject?.accent ?? "#00E5FF";

  /* ==========================================
      SCROLL TO PROJECT
  ========================================== */

  const scrollToProject = useCallback(
    (index: number) => {
      const carousel = carouselRef.current;

      if (!carousel) return;

      const slides = carousel.querySelectorAll<HTMLElement>(
        "[data-project-slide]"
      );

      const target = slides[index];

      if (!target) return;

      carousel.scrollTo({
        left: target.offsetLeft - carousel.offsetLeft,
        behavior: reduceMotion ? "instant" : "smooth",
      });

      setActiveIndex(index);
    },
    [reduceMotion]
  );

  /* ==========================================
      PREVIOUS / NEXT
  ========================================== */

  const previousProject = () => {
    scrollToProject(Math.max(activeIndex - 1, 0));
  };

  const nextProject = () => {
    scrollToProject(
      Math.min(activeIndex + 1, projects.length - 1)
    );
  };

  /* ==========================================
      TRACK ACTIVE SLIDE
  ========================================== */

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    let frame = 0;

    const updateActiveSlide = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const slides = Array.from(
          carousel.querySelectorAll<HTMLElement>(
            "[data-project-slide]"
          )
        );

        if (!slides.length) return;

        const carouselCenter =
          carousel.scrollLeft + carousel.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideCenter =
            slide.offsetLeft -
            carousel.offsetLeft +
            slide.clientWidth / 2;

          const distance = Math.abs(
            carouselCenter - slideCenter
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      });
    };

    carousel.addEventListener("scroll", updateActiveSlide, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSlide);

    updateActiveSlide();

    return () => {
      cancelAnimationFrame(frame);

      carousel.removeEventListener(
        "scroll",
        updateActiveSlide
      );

      window.removeEventListener(
        "resize",
        updateActiveSlide
      );
    };
  }, []);

  /* ==========================================
      KEYBOARD NAVIGATION
  ========================================== */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextProject();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousProject();
    }
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 py-28 md:px-12 md:py-40 lg:px-20"
      style={
        {
          "--active-accent": accent,
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 flex flex-col gap-8 md:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-7 flex items-center gap-3">
              <Asterisk size={18} className="text-cyan" />

              <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
                // 001 — Selected Work
              </span>
            </div>

            <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-[-0.07em]">
              THINGS
              <br />
              I&apos;VE{" "}
              <span className="font-serif font-normal italic text-violet">
                built.
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/50">
              Real problems. Real solutions. A few questionable amounts of
              caffeine.
            </p>
          </div>

          <Link
            href="/work"
            className="group relative inline-flex shrink-0 items-center gap-5 self-start overflow-hidden rounded-full border border-white/20 px-9 py-5 font-display text-sm font-bold tracking-wide transition-colors duration-300 hover:border-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan lg:mb-1 lg:self-auto"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              EXPLORE ALL PROJECTS
            </span>

            <ArrowUpRight
              size={20}
              className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
            />

            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100"
            />
          </Link>
        </motion.div>

        {/* ==========================================
            CAROUSEL
        ========================================== */}

        <div className="relative">
          <div
            ref={carouselRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            onKeyDown={handleKeyDown}
            className="
              flex gap-5 overflow-x-auto
              scroll-smooth snap-x snap-mandatory
              pb-6
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--active-accent)]
              md:gap-7
              [&::-webkit-scrollbar]:hidden
              [scrollbar-width:none]
            "
          >
            {projects.map((project, index) => (
              <div
                key={project.slug}
                data-project-slide
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                className="
                  w-[85%] shrink-0 snap-start
                  sm:w-[65%]
                  lg:w-[52%]
                "
              >
                <FeaturedProjectSlide
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* ==========================================
              CAROUSEL NAVIGATION
          ========================================== */}

          <div className="mt-7 flex flex-col gap-7 md:mt-9">

            {/* COUNTER / PROGRESS / ARROWS */}

            <div className="flex items-center gap-5 md:gap-8">
              <div className="shrink-0 font-mono text-sm tracking-widest">
                <span
                  style={{ color: accent }}
                  className="font-bold"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span className="mx-2 text-white/30">/</span>

                <span className="text-white/45">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* PROGRESS BAR */}

              <div className="relative h-[2px] flex-1 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  animate={{
                    width: `${
                      ((activeIndex + 1) / projects.length) * 100
                    }%`,
                    backgroundColor: accent,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                />
              </div>

              {/* ARROWS */}

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={previousProject}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-[var(--active-accent)] hover:text-[var(--active-accent)] disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--active-accent)]"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextProject}
                  disabled={activeIndex === projects.length - 1}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-[var(--active-accent)] hover:text-[var(--active-accent)] disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--active-accent)]"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* ==========================================
                PROJECT QUICK NAVIGATION
            ========================================== */}

            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-7">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => scrollToProject(index)}
                    aria-label={`Go to ${project.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative pb-2 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                    style={{
                      color: isActive
                        ? project.accent
                        : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {project.title}

                    <span
                      aria-hidden="true"
                      className={`absolute right-0 bottom-0 left-0 h-[2px] origin-left transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ background: project.accent }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}