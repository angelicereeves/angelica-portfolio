"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.18,
      y: y * 0.18,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={reduceMotion ? undefined : position}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 15,
      }}
      className={`
        inline-flex items-center justify-center gap-3
        rounded-full px-7 py-4
        text-sm font-semibold
        transition-colors duration-300
        ${
          variant === "primary"
            ? "bg-primary text-white hover:bg-midnight"
            : "border border-foreground/20 bg-white/50 text-foreground hover:bg-white"
        }
      `}
    >
      {children}
      <ArrowUpRight size={17} />
    </motion.a>
  );
}