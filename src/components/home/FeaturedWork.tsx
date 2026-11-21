"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";

import ProjectCard from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedWork() {
  const projects = getFeaturedProjects(5);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-white/10 bg-background px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 md:mb-24"
        >
          {/* Section Label */}
          <div className="mb-7 flex items-center gap-3">
            <Asterisk size={18} className="text-cyan" />

            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
              // 001 — Selected Work
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-[-0.07em]">
            THINGS
            <br />
            I&apos;VE{" "}
            <span className="font-serif font-normal italic text-violet">
              built.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/50">
            Real problems. Real solutions. A few questionable amounts of
            caffeine.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-5 overflow-hidden rounded-full border border-white/20 px-9 py-5 font-display text-sm font-bold tracking-wide transition-colors hover:border-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          >
            <span className="relative z-10 transition-colors group-hover:text-black">
              EXPLORE ALL PROJECTS
            </span>

            <ArrowUpRight
              size={20}
              className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
            />

            {/* Hover Background */}
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}