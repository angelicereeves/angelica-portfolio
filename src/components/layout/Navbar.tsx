"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
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
          {/* LOGO — ALWAYS RETURNS HOME */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Angelica Reeves — Back to homepage"
            className="font-display text-2xl font-bold tracking-[-0.08em] transition-opacity hover:opacity-70"
          >
            AR<span className="text-cyan">.</span>
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
                  className={`group relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-cyan transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* RESUME */}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              Resume
              <Download size={15} />
            </a>

            {/* CONTACT */}
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-cyan"
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
            className="lg:hidden"
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
                  className={`font-display text-4xl font-bold transition-colors ${
                    isActive
                      ? "text-cyan"
                      : "hover:text-cyan"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* MOBILE RESUME */}
            <a
              href="/resume.pdf"
              download
              onClick={closeMenu}
              className="flex items-center gap-2 text-xl text-cyan"
            >
              Download Resume
              <Download size={18} />
            </a>

            {/* MOBILE CONTACT */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-full bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-cyan"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}