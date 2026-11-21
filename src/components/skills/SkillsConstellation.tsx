"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  MousePointer2,
  Orbit,
  Sparkles,
} from "lucide-react";
import {
  galaxies,
  galaxyColors,
  technologies,
  type Galaxy,
  type Technology,
} from "@/data/technologies";

// ============================================================
// TYPES
// ============================================================

type GalaxyFilter = Galaxy | "all";

type Point = {
  x: number;
  y: number;
};

type BubbleSize = {
  width: number;
  height: number;
};

type Layout = {
  positions: Record<string, Point>;
  height: number;
};

type Project = {
  name: string;
  href: string;
};

// ============================================================
// PROJECTS
// ============================================================

const PROJECTS: Record<string, Project> = {
  "ionian-digital": {
    name: "Ionian Digital",
    href: "/#work",
  },
  "wine-of-albania": {
    name: "Wine of Albania",
    href: "/#work",
  },
};

// ============================================================
// HELPERS
// ============================================================

function getColor(galaxy: Galaxy) {
  return galaxyColors[galaxy];
}

function getLabel(galaxy: Galaxy) {
  return galaxies.find((item) => item.id === galaxy)?.label ?? galaxy;
}

function hash(value: string) {
  let result = 2166136261;

  for (let i = 0; i < value.length; i++) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 16777619);
  }

  return result >>> 0;
}

function random(seed: number) {
  let value = seed >>> 0;

  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;

  return (value >>> 0) / 4294967296;
}

function between(seed: number, minimum: number, maximum: number) {
  return minimum + random(seed) * (maximum - minimum);
}

function getSize(
  tech: Technology,
  sizes: Record<string, BubbleSize>
): BubbleSize {
  return (
    sizes[tech.id] ?? {
      width: Math.max(100, tech.name.length * 8 + 54),
      height: 44,
    }
  );
}

// ============================================================
// COMPACT CONSTELLATION LAYOUT
// ============================================================

function createCompactLayout(
  items: Technology[],
  width: number,
  sizes: Record<string, BubbleSize>
): Layout {
  if (width <= 0 || items.length === 0) {
    return {
      positions: {},
      height: 300,
    };
  }

  const mobile = width < 640;
  const paddingX = mobile ? 12 : 24;
  const paddingY = mobile ? 26 : 34;
  const gapX = mobile ? 16 : 26;
  const gapY = mobile ? 26 : 34;

  const availableWidth = Math.max(1, width - paddingX * 2);

  const ordered = [...items].sort(
    (a, b) => hash(a.id) - hash(b.id)
  );

  const rows: Technology[][] = [];
  let currentRow: Technology[] = [];
  let currentWidth = 0;

  for (const tech of ordered) {
    const size = getSize(tech, sizes);

    const nextWidth =
      currentWidth +
      (currentRow.length ? gapX : 0) +
      size.width;

    if (currentRow.length > 0 && nextWidth > availableWidth) {
      rows.push(currentRow);
      currentRow = [];
      currentWidth = 0;
    }

    currentWidth +=
      (currentRow.length ? gapX : 0) + size.width;

    currentRow.push(tech);
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  const positions: Record<string, Point> = {};
  let currentY = paddingY;

  rows.forEach((row, rowIndex) => {
    const rowHeight = Math.max(
      ...row.map((tech) => getSize(tech, sizes).height)
    );

    const totalWidth =
      row.reduce(
        (sum, tech) => sum + getSize(tech, sizes).width,
        0
      ) +
      gapX * (row.length - 1);

    const extraSpace = Math.max(
      0,
      availableWidth - totalWidth
    );

    const rowShift =
      (random(rowIndex * 91 + 17) - 0.5) *
      Math.min(extraSpace * 0.65, mobile ? 12 : 64);

    let x = paddingX + extraSpace / 2 + rowShift;

    row.forEach((tech) => {
      const size = getSize(tech, sizes);

      const verticalOffset =
        (random(hash(tech.id) + 11) - 0.5) *
        (mobile ? 8 : 12);

      positions[tech.id] = {
        x: x + size.width / 2,
        y: currentY + rowHeight / 2 + verticalOffset,
      };

      x += size.width + gapX;
    });

    currentY += rowHeight + gapY;
  });

  return {
    positions,
    height: Math.max(
      mobile ? 260 : 300,
      currentY + paddingY
    ),
  };
}

// ============================================================
// SCATTERED LAYOUT FOR INDIVIDUAL CATEGORIES
// ============================================================

function createScatteredLayout(
  items: Technology[],
  width: number,
  sizes: Record<string, BubbleSize>
): Layout {
  if (width <= 0 || items.length === 0) {
    return { positions: {}, height: 300 };
  }

  const padding = 12;
  const gapX = width < 640 ? 18 : 36;
  const gapY = width < 640 ? 48 : 58;

  const maxBubbleWidth = Math.max(
    ...items.map((tech) => getSize(tech, sizes).width)
  );

  const twoColumns =
    width >= maxBubbleWidth * 2 + gapX + padding * 2;

  const columns = twoColumns ? 2 : 1;

  const rowHeight = Math.max(
    44,
    ...items.map((tech) => getSize(tech, sizes).height)
  );

  const rows = Math.ceil(items.length / columns);
  const paddingY = width < 640 ? 38 : 48;

  const positions: Record<string, Point> = {};

  items.forEach((tech, index) => {
    const size = getSize(tech, sizes);
    const row = Math.floor(index / columns);
    const column = index % columns;

    const xBase = twoColumns
      ? width * (column === 0 ? 0.26 : 0.74)
      : width * (row % 2 === 0 ? 0.43 : 0.57);

    const xJitter = twoColumns
      ? between(
          hash(tech.id) + 5,
          -width * 0.035,
          width * 0.035
        )
      : 0;

    const minX = size.width / 2 + padding;
    const maxX = width - size.width / 2 - padding;

    positions[tech.id] = {
      x: Math.max(minX, Math.min(maxX, xBase + xJitter)),
      y:
        paddingY +
        row * (rowHeight + gapY) +
        rowHeight / 2 +
        (twoColumns && column === 1 ? 13 : 0),
    };
  });

  return {
    positions,
    height: Math.max(
      width < 640 ? 300 : 330,
      paddingY * 2 +
        rows * rowHeight +
        (rows - 1) * gapY +
        (twoColumns ? 13 : 0)
    ),
  };
}

// ============================================================
// BACKGROUND STARS
// ============================================================

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const seed = index * 137 + 29;

        return {
          id: index,
          x: between(seed, 4, 96),
          y: between(seed + 10, 4, 96),
          size: between(seed + 20, 1, 2),
          opacity: between(seed + 30, 0.1, 0.35),
        };
      }),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// CONNECTION LINES
// ============================================================

function Connections({
  items,
  positions,
  selectedId,
  width,
  height,
  reduceMotion,
}: {
  items: Technology[];
  positions: Record<string, Point>;
  selectedId: string;
  width: number;
  height: number;
  reduceMotion: boolean;
}) {
  const connections = useMemo(() => {
    const visibleIds = new Set(
      items.map((item) => item.id)
    );

    const used = new Set<string>();

    const result: {
      id: string;
      from: Point;
      to: Point;
      color: string;
      active: boolean;
    }[] = [];

    for (const tech of items) {
      for (const relatedId of tech.related) {
        if (!visibleIds.has(relatedId)) continue;

        const from = positions[tech.id];
        const to = positions[relatedId];

        if (!from || !to) continue;

        const key = [tech.id, relatedId].sort().join(":");

        if (used.has(key)) continue;

        used.add(key);

        result.push({
          id: key,
          from,
          to,
          color: getColor(tech.galaxy),
          active:
            tech.id === selectedId ||
            relatedId === selectedId,
        });
      }
    }

    return result;
  }, [items, positions, selectedId]);

  if (width <= 0 || height <= 0) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {connections.map((connection) => (
        <motion.line
          key={connection.id}
          initial={false}
          animate={{
            x1: connection.from.x,
            y1: connection.from.y,
            x2: connection.to.x,
            y2: connection.to.y,
            opacity: connection.active ? 0.5 : 0.08,
            strokeWidth: connection.active ? 1.5 : 0.75,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
          }}
          stroke={
            connection.active
              ? connection.color
              : "#FFFFFF"
          }
          strokeDasharray={
            connection.active ? "none" : "3 7"
          }
        />
      ))}
    </svg>
  );
}

// ============================================================
// FLOATING SKILL BUBBLE
// ============================================================

function SkillBubble({
  tech,
  selected,
  connected,
  onSelect,
  reduceMotion,
}: {
  tech: Technology;
  selected: boolean;
  connected: boolean;
  onSelect: () => void;
  reduceMotion: boolean;
}) {
  const color = getColor(tech.galaxy);
  const seed = hash(tech.id);

  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, between(seed + 1, -4, 4), 0],
              y: [0, between(seed + 2, -4, 4), 0],
            }
      }
      transition={{
        duration: between(seed + 3, 4, 6.5),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`Explore ${tech.name}`}
        whileHover={
          reduceMotion ? undefined : { scale: 1.07 }
        }
        whileTap={{ scale: 0.97 }}
        className="relative flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] font-medium whitespace-nowrap outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white md:px-5 md:text-xs"
        style={{
          color,
          borderColor: selected
            ? color
            : connected
              ? `${color}90`
              : `${color}45`,
          background: selected
            ? `${color}20`
            : connected
              ? `${color}10`
              : "#111116",
          boxShadow: selected
            ? `0 0 24px ${color}35`
            : connected
              ? `0 0 12px ${color}12`
              : "none",
        }}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: color }}
        />

        {tech.name}
      </motion.button>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function SkillsConstellation() {
  const [activeGalaxy, setActiveGalaxy] =
    useState<GalaxyFilter>("all");

  const [selectedId, setSelectedId] = useState("react");

  const [containerWidth, setContainerWidth] =
    useState(800);

  const [hasMeasured, setHasMeasured] = useState(false);

  const [bubbleSizes, setBubbleSizes] = useState<
    Record<string, BubbleSize>
  >({});

  const widthRef = useRef<HTMLDivElement>(null);

  const measurementRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const reduceMotion = !!useReducedMotion();

  // ==========================================================
  // FILTERED SKILLS
  // ==========================================================

  const visibleTechnologies = useMemo(() => {
    return activeGalaxy === "all"
      ? technologies
      : technologies.filter(
          (tech) => tech.galaxy === activeGalaxy
        );
  }, [activeGalaxy]);

  const selectedTechnology =
    technologies.find(
      (tech) => tech.id === selectedId
    ) ?? technologies[0];

  const selectedColor = getColor(
    selectedTechnology.galaxy
  );

  const connectedIds = useMemo(() => {
    return new Set([
      selectedTechnology.id,
      ...selectedTechnology.related,
    ]);
  }, [selectedTechnology]);

  // ==========================================================
  // MEASURE CONTAINER WIDTH
  // ==========================================================

  useLayoutEffect(() => {
    const element = widthRef.current;

    if (!element) return;

    const updateWidth = () => {
      const width = element.getBoundingClientRect().width;

      if (width > 0) {
        setContainerWidth(Math.round(width));
        setHasMeasured(true);
      }
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(element);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // ==========================================================
  // MEASURE BUBBLE DIMENSIONS
  // ==========================================================

  useEffect(() => {
    const measure = () => {
      const next: Record<string, BubbleSize> = {};

      for (const tech of technologies) {
        const element = measurementRefs.current[tech.id];

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        next[tech.id] = {
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
        };
      }

      setBubbleSizes((previous) => {
        const unchanged = technologies.every((tech) => {
          const oldSize = previous[tech.id];
          const newSize = next[tech.id];

          return (
            oldSize &&
            newSize &&
            oldSize.width === newSize.width &&
            oldSize.height === newSize.height
          );
        });

        return unchanged ? previous : next;
      });
    };

    measure();

    const observer = new ResizeObserver(measure);

    Object.values(measurementRefs.current).forEach(
      (element) => {
        if (element) observer.observe(element);
      }
    );

    return () => observer.disconnect();
  }, []);

  // ==========================================================
  // CALCULATE POSITIONS
  // ==========================================================

  const layout = useMemo(() => {
    if (activeGalaxy === "all") {
      return createCompactLayout(
        visibleTechnologies,
        containerWidth,
        bubbleSizes
      );
    }

    return createScatteredLayout(
      visibleTechnologies,
      containerWidth,
      bubbleSizes
    );
  }, [
    activeGalaxy,
    visibleTechnologies,
    containerWidth,
    bubbleSizes,
  ]);

  // ==========================================================
  // RELATED SKILLS
  // ==========================================================

  const relatedTechnologies = selectedTechnology.related
    .map((id) =>
      technologies.find((tech) => tech.id === id)
    )
    .filter(
      (tech): tech is Technology => tech !== undefined
    );

  // ==========================================================
  // ASSOCIATED PROJECTS
  // ==========================================================

  const associatedProjects = selectedTechnology.projectIds
    .map((id) => PROJECTS[id])
    .filter(
      (project): project is Project => project !== undefined
    );

  // ==========================================================
  // INTERACTIONS
  // ==========================================================

  const selectGalaxy = (galaxy: GalaxyFilter) => {
    setActiveGalaxy(galaxy);

    if (galaxy === "all") return;

    if (selectedTechnology.galaxy !== galaxy) {
      const first = technologies.find(
        (tech) => tech.galaxy === galaxy
      );

      if (first) setSelectedId(first.id);
    }
  };

  const selectTechnology = (id: string) => {
    const tech = technologies.find(
      (item) => item.id === id
    );

    if (!tech) return;

    setSelectedId(id);

    if (
      activeGalaxy !== "all" &&
      activeGalaxy !== tech.galaxy
    ) {
      setActiveGalaxy(tech.galaxy);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="relative w-full">
      {/* ====================================================
          INVISIBLE BUBBLE MEASUREMENTS
      ==================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 -z-10"
      >
        {technologies.map((tech) => (
          <div
            key={tech.id}
            ref={(element) => {
              measurementRefs.current[tech.id] = element;
            }}
            className="flex min-h-11 w-fit items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] font-medium whitespace-nowrap md:px-5 md:text-xs"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" />
            {tech.name}
          </div>
        ))}
      </div>

      {/* ====================================================
          GALAXY FILTERS
      ==================================================== */}

      <div className="mb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Orbit size={15} className="text-white/40" />

            <span className="font-mono text-[11px] tracking-widest text-white/40 uppercase">
              Explore my toolkit
            </span>
          </div>

          <span className="font-mono text-[11px] text-white/25">
            {technologies.length} selected skills
          </span>
        </div>

        {/* CATEGORY BUTTONS WITH NEON HOVER EFFECTS */}

        <div
          role="group"
          aria-label="Filter technologies"
          className="flex flex-wrap gap-2"
        >
          {galaxies.map((galaxy) => {
            const active = activeGalaxy === galaxy.id;

            // All Systems gets neon yellow.
            const color =
              galaxy.id === "all"
                ? "#F9FF4D"
                : galaxy.color;

            return (
              <button
                key={galaxy.id}
                type="button"
                onClick={() => selectGalaxy(galaxy.id)}
                aria-pressed={active}
                className={`
                  group flex min-h-11 items-center gap-2
                  rounded-full border px-4 py-2.5
                  font-mono text-[11px]
                  transition-all duration-300
                  hover:border-[var(--galaxy-color)]
                  hover:bg-[var(--galaxy-bg)]
                  hover:text-[var(--galaxy-color)]
                  hover:shadow-[0_0_18px_var(--galaxy-glow)]
                  focus-visible:border-[var(--galaxy-color)]
                  focus-visible:bg-[var(--galaxy-bg)]
                  focus-visible:text-[var(--galaxy-color)]
                  focus-visible:shadow-[0_0_18px_var(--galaxy-glow)]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[var(--galaxy-color)]
                  ${
                    active
                      ? "border-[var(--galaxy-active-border)] bg-[var(--galaxy-active-bg)] text-[var(--galaxy-color)]"
                      : "border-white/10 bg-white/[0.025] text-[#9696A6]"
                  }
                `}
                style={
                  {
                    "--galaxy-color": color,
                    "--galaxy-bg": `${color}18`,
                    "--galaxy-glow": `${color}30`,
                    "--galaxy-active-border": `${color}75`,
                    "--galaxy-active-bg": `${color}12`,
                  } as CSSProperties
                }
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_10px_var(--galaxy-color)]"
                  style={{
                    background: color,
                  }}
                />

                {galaxy.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          CONSTELLATION
      ==================================================== */}

      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#08080D] px-4 py-6 md:px-8 md:py-8">
        {/* Grid */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Ambient glow */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[80px]"
          style={{
            background: selectedColor,
          }}
        />

        {/* Header */}

        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">
            // Technology Universe
          </span>

          <span className="font-mono text-[10px] text-white/25">
            {visibleTechnologies.length} visible
          </span>
        </div>

        {/* Stable width measurement wrapper */}

        <div
          ref={widthRef}
          className="relative z-10 mx-auto w-full max-w-5xl"
        >
          {!hasMeasured ? (
            <div className="flex min-h-64 flex-wrap items-center justify-center gap-4 py-10">
              {visibleTechnologies.map((tech) => (
                <SkillBubble
                  key={tech.id}
                  tech={tech}
                  selected={selectedId === tech.id}
                  connected={connectedIds.has(tech.id)}
                  onSelect={() => selectTechnology(tech.id)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={false}
              animate={{
                height: layout.height,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full"
            >
              <Stars />

              <Connections
                items={visibleTechnologies}
                positions={layout.positions}
                selectedId={selectedId}
                width={containerWidth}
                height={layout.height}
                reduceMotion={reduceMotion}
              />

              <AnimatePresence>
                {visibleTechnologies.map((tech) => {
                  const position = layout.positions[tech.id];

                  if (!position) return null;

                  return (
                    <motion.div
                      key={tech.id}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 0.75,
                            }
                      }
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.75,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                      }}
                      style={{
                        left: position.x,
                        top: position.y,
                        translate: "-50% -50%",
                      }}
                      className="absolute z-10"
                    >
                      <SkillBubble
                        tech={tech}
                        selected={selectedId === tech.id}
                        connected={connectedIds.has(tech.id)}
                        onSelect={() =>
                          selectTechnology(tech.id)
                        }
                        reduceMotion={reduceMotion}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Interaction hint */}

        <div className="relative z-10 flex items-center justify-center gap-2">
          <MousePointer2
            size={13}
            className="text-white/30"
          />

          <span className="font-mono text-[10px] text-white/35">
            Select a skill to explore
          </span>
        </div>
      </div>

      {/* ====================================================
          COMPACT DETAILS PANEL
      ==================================================== */}

      <div className="mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-[#111116]">
        {/* Terminal header */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <CircleDot
              size={13}
              style={{
                color: selectedColor,
              }}
            />

            <span className="truncate font-mono text-[10px] tracking-wide text-white/40">
              explorer / {selectedTechnology.galaxy} /{" "}
              {selectedTechnology.id}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="flex gap-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-[#FF3CAC]" />
            <span className="h-2 w-2 rounded-full bg-[#C7FF4D]" />
            <span className="h-2 w-2 rounded-full bg-[#00E5FF]" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTechnology.id}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            className="p-5 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
              {/* LEFT: DESCRIPTION */}

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: selectedColor,
                      boxShadow: `0 0 10px ${selectedColor}`,
                    }}
                  />

                  <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    {getLabel(selectedTechnology.galaxy)}
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold tracking-[-0.05em] break-words md:text-5xl">
                  {selectedTechnology.name}

                  <span
                    style={{
                      color: selectedColor,
                    }}
                  >
                    .
                  </span>
                </h3>

                <p
                  className="mt-3 font-serif text-lg italic md:text-xl"
                  style={{
                    color: selectedColor,
                  }}
                >
                  {selectedTechnology.headline}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-[1.8] text-white/55">
                  {selectedTechnology.description}
                </p>
              </div>

              {/* RIGHT: CAPABILITIES + PROJECTS */}

              <div className="space-y-6">
                {/* CAPABILITIES */}

                <div>
                  <p className="mb-3 font-mono text-[10px] tracking-widest text-white/35 uppercase">
                    What I work with
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedTechnology.capabilities.map(
                      (capability) => (
                        <span
                          key={capability}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/65"
                        >
                          {capability}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* ASSOCIATED PROJECTS */}

                {associatedProjects.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-widest text-white/35 uppercase">
                      In practice
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {associatedProjects.map((project) => (
                        <Link
                          key={project.name}
                          href={project.href}
                          className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white"
                        >
                          {project.name}

                          <ArrowUpRight
                            size={13}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* RELATED TECHNOLOGIES */}

                {relatedTechnologies.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-widest text-white/35 uppercase">
                      Connected to
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {relatedTechnologies.map((tech) => (
                        <button
                          key={tech.id}
                          type="button"
                          onClick={() =>
                            selectTechnology(tech.id)
                          }
                          className="group inline-flex min-h-8 items-center gap-1 font-mono text-[11px] text-white/45 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <span
                            className="mr-1 h-1.5 w-1.5 rounded-full"
                            style={{
                              background: getColor(tech.galaxy),
                            }}
                          />

                          {tech.name}

                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ====================================================
          FOOTNOTE
      ==================================================== */}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="font-mono text-[10px] text-white/30">
          Built with curiosity. Powered by caffeine.
        </p>

        <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/25">
          <Sparkles size={12} />
          Keep exploring
        </span>
      </div>
    </div>
  );
}