"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";

const links = [
  { label: "Work", href: "/work", color: "#00E5FF" },
  { label: "About", href: "/about", color: "#A855F7" },
  { label: "Skills", href: "/skills", color: "#B6FF3B" },
  { label: "Contact", href: "/contact", color: "#4D7CFF" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2"
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between rounded-full border border-white/10 bg-black/80 px-6 py-4 shadow-2xl backdrop-blur-xl"
        >
          {/* MULTICOLOR NEON LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Angelica Reeves — Back to homepage"
            className="group font-display text-2xl font-bold tracking-[-0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            <span className="inline-block transition-all duration-300 group-hover:text-[#00E5FF] group-hover:[text-shadow:0_0_8px_#00E5FF,0_0_20px_#00E5FF] group-focus-visible:text-[#00E5FF] group-focus-visible:[text-shadow:0_0_8px_#00E5FF]">
              A
            </span>
            <span className="inline-block transition-all duration-300 group-hover:text-[#A855F7] group-hover:[text-shadow:0_0_8px_#A855F7,0_0_20px_#A855F7] group-focus-visible:text-[#A855F7] group-focus-visible:[text-shadow:0_0_8px_#A855F7]">
              R
            </span>
            <span className="inline-block text-cyan transition-all duration-300 group-hover:text-[#FF3CAC] group-hover:[text-shadow:0_0_8px_#FF3CAC,0_0_20px_#FF3CAC] group-focus-visible:text-[#FF3CAC] group-focus-visible:[text-shadow:0_0_8px_#FF3CAC]">
              .
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white focus-visible:text-white"
                  }`}
                  style={
                    {
                      "--accent": link.color,
                      outlineColor: link.color,
                    } as React.CSSProperties
                  }
                >
                  {link.label}

                  {/* ANIMATED NEON UNDERLINE */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* NEON PINK RESUME */}
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/60 transition-all duration-300 hover:text-[#FF3CAC] hover:[text-shadow:0_0_8px_#FF3CAC,0_0_18px_#FF3CAC] focus-visible:text-[#FF3CAC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3CAC] focus-visible:[text-shadow:0_0_8px_#FF3CAC]"
            >
              Resume
              <Download
                size={15}
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_#FF3CAC]"
              />
            </a>

            {/* CONTACT */}
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              Let&apos;s Talk
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 lg:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            {/* MOBILE LINKS */}
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative font-display text-4xl font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={
                    {
                      "--accent": link.color,
                      color: isActive ? link.color : undefined,
                      outlineColor: link.color,
                    } as React.CSSProperties
                  }
                >
                  <span className="transition-colors duration-300 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
                    {link.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}

            {/* MOBILE RESUME */}
            <a
              href="/resume.pdf"
              download
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xl text-[#FF3CAC] transition-all duration-300 hover:[text-shadow:0_0_8px_#FF3CAC,0_0_18px_#FF3CAC] focus-visible:outline-2 focus-visible:outline-[#FF3CAC]"
            >
              Download Resume
              <Download size={18} />
            </a>

            {/* MOBILE CONTACT */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-full bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}