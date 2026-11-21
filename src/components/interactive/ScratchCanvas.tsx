"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  RotateCcw,
  Eye,
  Sparkles,
} from "lucide-react";

import type { PointerEvent as ReactPointerEvent } from "react";

// ============================================
// COLOR PALETTE
// ============================================

const COLORS = {
  cyan: "#00E5FF",
  violet: "#A855F7",
  lime: "#B6FF3B",
  pink: "#FF3CAC",
  blue: "#4D7CFF",
  white: "#F5F5F7",
  muted: "#85859A",
  background: "#08080D",
};

// ============================================
// DRAWING HELPERS
// ============================================

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
  options?: {
    font?: string;
    align?: CanvasTextAlign;
    rotation?: number;
    glow?: boolean;
    weight?: string;
  }
) {
  ctx.save();

  ctx.translate(x, y);

  if (options?.rotation) {
    ctx.rotate(options.rotation);
  }

  ctx.font = `${options?.weight || "400"} ${size}px ${
    options?.font || "monospace"
  }`;

  ctx.textAlign = options?.align || "left";
  ctx.textBaseline = "middle";

  ctx.fillStyle = color;

  if (options?.glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
  }

  ctx.fillText(text, 0, 0);

  ctx.restore();
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  color: string,
  width = 2,
  glow = false
) {
  if (points.length < 2) return;

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }

  ctx.stroke();
  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  ctx.beginPath();

  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);

  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);

  ctx.stroke();

  ctx.restore();
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  fill = false
) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  ctx.shadowColor = color;
  ctx.shadowBlur = 8;

  if (fill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }

  ctx.restore();
}

// ============================================
// MINI TERMINAL
// ============================================

function drawTerminal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(-0.045);

  const width = 260;
  const height = 125;

  ctx.fillStyle = "#101018";
  ctx.strokeStyle = COLORS.lime;
  ctx.lineWidth = 1.5;

  ctx.shadowColor = COLORS.lime;
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 10);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Window controls
  [COLORS.pink, COLORS.lime, COLORS.cyan].forEach(
    (color, index) => {
      drawCircle(
        ctx,
        17 + index * 15,
        16,
        4,
        color,
        true
      );
    }
  );

  drawLine(
    ctx,
    [
      [0, 32],
      [width, 32],
    ],
    COLORS.lime,
    1
  );

  drawText(
    ctx,
    "> initializing creativity...",
    14,
    51,
    11,
    COLORS.lime
  );

  drawText(
    ctx,
    "> loading weird ideas...",
    14,
    71,
    11,
    COLORS.cyan
  );

  drawText(
    ctx,
    "> curiosity.exe",
    14,
    91,
    11,
    COLORS.pink
  );

  drawText(
    ctx,
    "  status: unstoppable_",
    14,
    110,
    11,
    COLORS.white
  );

  ctx.restore();
}

// ============================================
// DOODLED BRAIN
// ============================================

function drawBrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 1
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.strokeStyle = COLORS.violet;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.shadowColor = COLORS.violet;
  ctx.shadowBlur = 12;

  ctx.beginPath();

  ctx.moveTo(0, 38);

  ctx.bezierCurveTo(-45, 40, -55, 5, -35, -10);
  ctx.bezierCurveTo(-50, -35, -20, -55, 0, -42);

  ctx.bezierCurveTo(20, -55, 50, -35, 35, -10);
  ctx.bezierCurveTo(55, 5, 45, 40, 0, 38);

  ctx.stroke();

  ctx.shadowBlur = 0;

  drawLine(
    ctx,
    [
      [0, -42],
      [0, 38],
    ],
    COLORS.cyan,
    2
  );

  // Brain folds
  ctx.beginPath();

  ctx.moveTo(-24, -22);
  ctx.bezierCurveTo(-5, -30, -25, -5, -8, 0);

  ctx.moveTo(-32, 12);
  ctx.bezierCurveTo(-10, 5, -28, 30, -5, 25);

  ctx.moveTo(24, -22);
  ctx.bezierCurveTo(5, -30, 25, -5, 8, 0);

  ctx.moveTo(32, 12);
  ctx.bezierCurveTo(10, 5, 28, 30, 5, 25);

  ctx.strokeStyle = COLORS.pink;
  ctx.lineWidth = 2;
  ctx.stroke();

  drawStar(ctx, -55, -38, 7, COLORS.lime);
  drawStar(ctx, 55, 28, 6, COLORS.cyan);

  ctx.restore();
}

// ============================================
// TWO TINY DOGS
// ============================================

function drawDog(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  color: string,
  earStyle: "floppy" | "pointy" = "floppy"
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.shadowColor = color;
  ctx.shadowBlur = 8;

  // Head
  ctx.beginPath();
  ctx.ellipse(0, 0, 28, 25, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Ears
  ctx.beginPath();

  if (earStyle === "floppy") {
    ctx.moveTo(-22, -14);
    ctx.quadraticCurveTo(-43, -20, -35, 18);
    ctx.quadraticCurveTo(-24, 25, -22, 8);

    ctx.moveTo(22, -14);
    ctx.quadraticCurveTo(43, -20, 35, 18);
    ctx.quadraticCurveTo(24, 25, 22, 8);
  } else {
    ctx.moveTo(-20, -15);
    ctx.lineTo(-28, -37);
    ctx.lineTo(-7, -23);

    ctx.moveTo(20, -15);
    ctx.lineTo(28, -37);
    ctx.lineTo(7, -23);
  }

  ctx.stroke();

  ctx.shadowBlur = 0;

  // Eyes
  drawCircle(ctx, -10, -3, 2.5, COLORS.white, true);
  drawCircle(ctx, 10, -3, 2.5, COLORS.white, true);

  // Nose
  drawCircle(ctx, 0, 8, 3.5, COLORS.pink, true);

  // Mouth
  ctx.beginPath();
  ctx.moveTo(0, 11);
  ctx.lineTo(0, 15);

  ctx.quadraticCurveTo(-7, 22, -11, 15);

  ctx.moveTo(0, 15);
  ctx.quadraticCurveTo(7, 22, 11, 15);

  ctx.strokeStyle = COLORS.white;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

// ============================================
// GUITAR DOODLE
// ============================================

function drawGuitar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(0.3);

  ctx.strokeStyle = COLORS.pink;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.shadowColor = COLORS.pink;
  ctx.shadowBlur = 10;

  // Guitar body
  ctx.beginPath();

  ctx.moveTo(-12, 15);
  ctx.bezierCurveTo(-45, 5, -45, 55, -20, 65);
  ctx.bezierCurveTo(0, 78, 25, 65, 20, 45);
  ctx.bezierCurveTo(18, 30, 8, 28, 12, 15);

  ctx.closePath();
  ctx.stroke();

  // Neck
  ctx.beginPath();
  ctx.moveTo(-7, 20);
  ctx.lineTo(-7, -55);
  ctx.lineTo(7, -55);
  ctx.lineTo(7, 20);
  ctx.stroke();

  // Headstock
  ctx.strokeRect(-9, -75, 18, 20);

  // Sound hole
  drawCircle(ctx, 0, 43, 9, COLORS.cyan);

  // Strings
  for (let i = -3; i <= 3; i += 3) {
    drawLine(
      ctx,
      [
        [i, -70],
        [i, 59],
      ],
      COLORS.white,
      0.7
    );
  }

  ctx.restore();
}

// ============================================
// PAPER AIRPLANE
// ============================================

function drawPlane(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(-0.2);

  drawLine(
    ctx,
    [
      [-35, 0],
      [40, -25],
      [12, 35],
      [0, 10],
      [-35, 0],
      [40, -25],
      [0, 10],
    ],
    COLORS.cyan,
    2.5,
    true
  );

  ctx.restore();
}

// ============================================
// BACKGROUND DETAILS
// ============================================

function drawBackgroundDetails(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Deterministic positions so artwork stays consistent
  // across redraws.

  for (let i = 0; i < 65; i++) {
    const x =
      ((i * 137.508 + 43) % width);

    const y =
      ((i * 89.723 + 71) % height);

    const color =
      Object.values(COLORS)[i % 5];

    ctx.save();

    ctx.globalAlpha = 0.15 + (i % 4) * 0.06;

    drawCircle(
      ctx,
      x,
      y,
      i % 3 === 0 ? 2 : 1,
      color,
      true
    );

    ctx.restore();
  }

  // Decorative orbit lines
  ctx.save();

  ctx.strokeStyle = COLORS.violet;
  ctx.globalAlpha = 0.12;
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    height / 2,
    width * 0.42,
    height * 0.35,
    -0.15,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.restore();
}

// ============================================
// DESKTOP ARTWORK
// ============================================

function drawDesktopArtwork(
  ctx: CanvasRenderingContext2D
) {
  // Virtual coordinate system: 1000 x 420

  drawBackgroundDetails(ctx, 1000, 420);

  // TOP LEFT: TERMINAL
  drawTerminal(ctx, 35, 35);

  // TOP CENTER: BRAIN
  drawBrain(ctx, 500, 72, 0.85);

  drawText(
    ctx,
    "47 TABS OPEN",
    500,
    130,
    12,
    COLORS.violet,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "3 PLAYING MUSIC",
    500,
    146,
    10,
    COLORS.muted,
    {
      align: "center",
    }
  );

  // TOP RIGHT: DOGS
  drawDog(
    ctx,
    820,
    80,
    0.85,
    COLORS.pink,
    "floppy"
  );

  drawDog(
    ctx,
    885,
    85,
    0.75,
    COLORS.lime,
    "pointy"
  );

  drawText(
    ctx,
    "SENIOR MANAGEMENT",
    850,
    125,
    11,
    COLORS.pink,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "paid in snacks",
    850,
    143,
    10,
    COLORS.muted,
    {
      align: "center",
    }
  );

  // CENTER MESSAGE
  drawText(
    ctx,
    "HELLO, I'M THE HUMAN",
    500,
    207,
    35,
    COLORS.white,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "BEHIND THE CODE.",
    500,
    250,
    39,
    COLORS.cyan,
    {
      align: "center",
      weight: "bold",
      glow: true,
    }
  );

  drawText(
    ctx,
    "Surprisingly, I have other interests.",
    500,
    283,
    14,
    COLORS.pink,
    {
      align: "center",
      font: "cursive",
    }
  );

  // BOTTOM LEFT: GUITAR
  drawGuitar(ctx, 115, 330);

  drawText(
    ctx,
    "OFFLINE MODE:",
    190,
    336,
    12,
    COLORS.pink,
    {
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "probably playing guitar",
    190,
    354,
    11,
    COLORS.muted
  );

  // BOTTOM CENTER: PHILOSOPHY
  drawText(
    ctx,
    "I BUILD THINGS BECAUSE",
    520,
    337,
    14,
    COLORS.lime,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "I CAN'T LEAVE WELL ENOUGH ALONE.",
    520,
    359,
    13,
    COLORS.white,
    {
      align: "center",
    }
  );

  // BOTTOM RIGHT: TRAVEL
  drawPlane(ctx, 855, 325);

  drawText(
    ctx,
    "CURRENTLY EXPLORING",
    850,
    375,
    11,
    COLORS.cyan,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "the world & the web",
    850,
    392,
    10,
    COLORS.muted,
    {
      align: "center",
    }
  );

  // DECORATIVE CODE SYMBOLS
  drawText(
    ctx,
    "{ }",
    340,
    95,
    30,
    COLORS.blue,
    {
      rotation: -0.2,
      glow: true,
    }
  );

  drawText(
    ctx,
    "</>",
    690,
    75,
    25,
    COLORS.lime,
    {
      rotation: 0.15,
      glow: true,
    }
  );

  // STARS
  drawStar(ctx, 340, 170, 8, COLORS.pink);
  drawStar(ctx, 685, 175, 9, COLORS.lime);
  drawStar(ctx, 305, 310, 6, COLORS.cyan);
  drawStar(ctx, 730, 315, 7, COLORS.violet);
}

// ============================================
// MOBILE ARTWORK
// ============================================

function drawMobileArtwork(
  ctx: CanvasRenderingContext2D
) {
  // Virtual coordinate system: 600 x 420

  drawBackgroundDetails(ctx, 600, 420);

  // Main message
  drawText(
    ctx,
    "THE HUMAN",
    300,
    70,
    45,
    COLORS.white,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "BEHIND THE CODE.",
    300,
    120,
    39,
    COLORS.cyan,
    {
      align: "center",
      weight: "bold",
      glow: true,
    }
  );

  drawText(
    ctx,
    "Surprisingly, I have other interests.",
    300,
    155,
    17,
    COLORS.pink,
    {
      align: "center",
      font: "cursive",
    }
  );

  // Brain
  drawBrain(ctx, 115, 235, 0.75);

  drawText(
    ctx,
    "47 TABS",
    115,
    285,
    15,
    COLORS.violet,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "OPEN",
    115,
    303,
    13,
    COLORS.muted,
    {
      align: "center",
    }
  );

  // Dogs
  drawDog(
    ctx,
    380,
    225,
    0.9,
    COLORS.pink,
    "floppy"
  );

  drawDog(
    ctx,
    460,
    230,
    0.8,
    COLORS.lime,
    "pointy"
  );

  drawText(
    ctx,
    "SENIOR MANAGEMENT",
    420,
    285,
    13,
    COLORS.pink,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "paid in snacks",
    420,
    305,
    12,
    COLORS.muted,
    {
      align: "center",
    }
  );

  // Bottom philosophy
  drawText(
    ctx,
    "I BUILD THINGS BECAUSE",
    300,
    365,
    20,
    COLORS.lime,
    {
      align: "center",
      weight: "bold",
    }
  );

  drawText(
    ctx,
    "I CAN'T LEAVE WELL ENOUGH ALONE.",
    300,
    390,
    16,
    COLORS.white,
    {
      align: "center",
    }
  );

  drawStar(ctx, 45, 75, 9, COLORS.pink);
  drawStar(ctx, 550, 90, 9, COLORS.lime);
  drawStar(ctx, 280, 220, 8, COLORS.cyan);
}

// ============================================
// SCRATCH CANVAS COMPONENT
// ============================================

export default function ScratchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artworkRef = useRef<HTMLCanvasElement>(null);

  const isDrawing = useRef(false);

  const lastPoint = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const [hasScratched, setHasScratched] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // ==========================================
  // CREATE HIDDEN ARTWORK
  // ==========================================

  const createArtwork = useCallback(
    (
      context: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      context.clearRect(0, 0, width, height);

      context.fillStyle = COLORS.background;
      context.fillRect(0, 0, width, height);

      const isMobile = width < 700;

      const virtualWidth = isMobile ? 600 : 1000;
      const virtualHeight = 420;

      context.save();

      context.scale(
        width / virtualWidth,
        height / virtualHeight
      );

      if (isMobile) {
        drawMobileArtwork(context);
      } else {
        drawDesktopArtwork(context);
      }

      context.restore();
    },
    []
  );

  // ==========================================
  // INITIALIZE / RESET
  // ==========================================

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const artwork = artworkRef.current;

    if (!canvas || !artwork) return;

    const container = canvas.parentElement;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;

    artwork.width = width;
    artwork.height = height;

    const context = canvas.getContext("2d");
    const artworkContext = artwork.getContext("2d");

    if (!context || !artworkContext) return;

    // Draw hidden collage
    createArtwork(
      artworkContext,
      width,
      height
    );

    // Restore scratch surface
    context.globalCompositeOperation = "source-over";

    context.fillStyle = "#111116";
    context.fillRect(0, 0, width, height);

    // Subtle scratch-surface texture
    for (let i = 0; i < 1500; i++) {
      context.fillStyle = `rgba(255,255,255,${
        Math.random() * 0.045
      })`;

      context.fillRect(
        Math.random() * width,
        Math.random() * height,
        1,
        1
      );
    }

    isDrawing.current = false;
    lastPoint.current = null;

    setHasScratched(false);
    setIsRevealed(false);
  }, [createArtwork]);

  // ==========================================
  // RESPONSIVE CANVAS
  // ==========================================

  useEffect(() => {
    initializeCanvas();

    const observer = new ResizeObserver(() => {
      initializeCanvas();
    });

    if (canvasRef.current?.parentElement) {
      observer.observe(
        canvasRef.current.parentElement
      );
    }

    return () => observer.disconnect();
  }, [initializeCanvas]);

  // ==========================================
  // POINTER COORDINATES
  // ==========================================

  const getPoint = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;

    const rect = canvas.getBoundingClientRect();

    return {
      x:
        ((event.clientX - rect.left) / rect.width) *
        canvas.width,

      y:
        ((event.clientY - rect.top) / rect.height) *
        canvas.height,
    };
  };

  // ==========================================
  // SCRATCH FUNCTION
  // ==========================================

  const scratch = (
    point: {
      x: number;
      y: number;
    }
  ) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.globalCompositeOperation = "destination-out";

    context.lineWidth = 40;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();

    if (lastPoint.current) {
      context.moveTo(
        lastPoint.current.x,
        lastPoint.current.y
      );
    } else {
      context.moveTo(point.x, point.y);
    }

    context.lineTo(point.x, point.y);
    context.stroke();

    // Erase circle for taps/clicks
    context.beginPath();

    context.arc(
      point.x,
      point.y,
      20,
      0,
      Math.PI * 2
    );

    context.fill();

    lastPoint.current = point;

    setHasScratched(true);
  };

  // ==========================================
  // POINTER HANDLERS
  // ==========================================

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    if (isRevealed) return;

    isDrawing.current = true;
    lastPoint.current = null;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    scratch(getPoint(event));
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing.current) return;

    scratch(getPoint(event));
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  // ==========================================
  // REVEAL ALL
  // ==========================================

  const revealAll = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    isDrawing.current = false;
    lastPoint.current = null;

    setHasScratched(true);
    setIsRevealed(true);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="relative w-full">
      {/* MAIN CANVAS */}
      <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-surface md:h-[420px]">
        {/* HIDDEN ARTWORK */}
        <canvas
          ref={artworkRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* SCRATCHABLE SURFACE */}
        <canvas
          ref={canvasRef}
          aria-label="Interactive scratch art featuring a personal neon collage with developer jokes, two dogs, a guitar, travel, and creative illustrations. Drag to reveal it, or use the Reveal All button."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 h-full w-full touch-none ${
            isRevealed
              ? "pointer-events-none"
              : "cursor-crosshair"
          }`}
        />

        {/* INITIAL INSTRUCTION */}
        {!hasScratched && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="px-6 text-center">
              <p className="font-display text-2xl font-bold text-white md:text-4xl">
                SCRATCH THE SURFACE
              </p>

              <p className="mt-3 text-sm text-white/50">
                Drag your mouse or finger to reveal
                what&apos;s underneath.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <Sparkles
                  size={14}
                  className="text-pink"
                />

                <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  There&apos;s more than code in here
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* STATUS */}
        <p
          className="font-mono text-xs tracking-widest text-muted uppercase"
          aria-live="polite"
        >
          {isRevealed
            ? "The human behind the code."
            : hasScratched
            ? "Keep going. There's more."
            : "An interactive experiment"}
        </p>

        {/* BUTTONS */}
        <div className="flex items-center gap-5">
          {/* REVEAL ALL */}
          {!isRevealed && (
            <button
              type="button"
              onClick={revealAll}
              className="group flex items-center gap-2 text-xs font-semibold text-white/60 transition-all duration-300 hover:text-[#B6FF3B] hover:[text-shadow:0_0_8px_#B6FF3B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6FF3B]"
            >
              <Eye
                size={15}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              Reveal All
            </button>
          )}

          {/* RESET */}
          <button
            type="button"
            onClick={initializeCanvas}
            className="group flex items-center gap-2 text-xs font-semibold text-white/60 transition-all duration-300 hover:text-cyan hover:[text-shadow:0_0_8px_#00E5FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          >
            <RotateCcw
              size={14}
              className="transition-transform duration-500 group-hover:-rotate-45"
            />

            Reset Canvas
          </button>
        </div>
      </div>

      {/* SCREEN READER DESCRIPTION */}
      <p className="sr-only">
        The hidden illustration is a personal neon
        sketchbook collage. It features a developer
        terminal, a creative brain with 47 open tabs,
        two dogs described as senior management,
        a guitar, travel imagery, and the message:
        Hello, I&apos;m the human behind the code.
        Surprisingly, I have other interests.
        I build things because I can&apos;t leave
        well enough alone.
      </p>
    </div>
  );
}