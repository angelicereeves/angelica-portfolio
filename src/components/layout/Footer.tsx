"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowUp,
  Heart,
  Mail,
  GitBranch,
} from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08080B] px-6 pt-16 pb-8 md:px-12 md:pt-24 lg:px-20">
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-violet/5 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* TOP CONTENT */}
        <div className="grid gap-14 pb-16 md:grid-cols-[1.3fr_0.7fr_1fr] md:gap-10">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              aria-label="Angelica Reeves — Homepage"
              className="inline-block font-display text-6xl font-bold tracking-[-0.1em] transition-opacity hover:opacity-70 md:text-8xl"
            >
              AR<span className="text-cyan">.</span>
            </Link>

            <p className="mt-6 max-w-xs text-base leading-[1.9] text-white/45">
              Developer. Designer. Professional problem-solver.
              Occasionally the person who creates the problem
              just to see if she can solve it.
            </p>

            <div className="mt-7 flex items-center gap-2 font-mono text-xs tracking-wider text-white/30 uppercase">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Based in Sarandë, Albania
            </div>

            {/* CONTACT CTA */}
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-cyan/30 bg-cyan/10 px-6 py-3 text-sm font-semibold text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan hover:text-black"
            >
              Let&apos;s Talk

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-7 font-mono text-xs tracking-[0.2em] text-white/35 uppercase">
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col gap-4"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-cyan"
                >
                  {link.label}

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-7 font-mono text-xs tracking-[0.2em] text-white/35 uppercase">
              Say Hello
            </h3>

            <div className="space-y-7">
              {/* PERSONAL EMAIL */}
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  Work & Collaborations
                </p>

                <a
                  href="mailto:angelicareeves@proton.me"
                  className="group inline-flex items-center gap-2 break-all text-sm text-white/70 transition-colors hover:text-cyan"
                >
                  <Mail size={15} className="shrink-0" />
                  angelicareeves@proton.me
                </a>
              </div>

              {/* AGENCY EMAIL */}
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  Websites & Digital Projects
                </p>

                <a
                  href="mailto:ioniandigital@gmail.com"
                  className="group inline-flex items-center gap-2 break-all text-sm text-white/70 transition-colors hover:text-pink"
                >
                  <Mail size={15} className="shrink-0" />
                  ioniandigital@gmail.com
                </a>
              </div>

              {/* GITHUB */}
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  Find My Code
                </p>

                <a
                  href="https://github.com/angelicereeves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-cyan"
                >
                  <GitBranch size={15} />

                  github.com/angelicereeves

                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* NEON DIVIDER */}
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-white/30">
            © {new Date().getFullYear()} Angelica Reeves.
            All rights reserved.
          </p>

          <p className="flex items-center gap-2 font-mono text-xs text-white/30">
            Made with
            <Heart
              size={12}
              className="fill-pink text-pink"
              aria-hidden="true"
            />
            and a suspicious amount of curiosity.
          </p>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex w-fit items-center gap-3 font-mono text-xs tracking-wider text-white/50 uppercase transition-colors hover:text-cyan"
          >
            Back to Top

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:-translate-y-1 group-hover:border-cyan">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}