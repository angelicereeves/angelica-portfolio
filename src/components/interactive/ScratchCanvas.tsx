"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import Image from "next/image";
import { RotateCcw, Eye, Sparkles } from "lucide-react";

// ============================================================
// SCRATCH CANVAS COMPONENT
// ============================================================

export default function ScratchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDrawing = useRef(false);

  const lastPoint = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const [hasScratched, setHasScratched] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // ==========================================================
  // INITIALIZE / RESET CANVAS
  // ==========================================================

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const container = canvas.parentElement;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.globalCompositeOperation = "source-over";

    // Dark scratchable surface
    context.fillStyle = "#111116";
    context.fillRect(0, 0, width, height);

    // Subtle scratch-surface texture
    // Runs only in the browser, preventing hydration mismatches.

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
  }, []);

  // ==========================================================
  // RESPONSIVE CANVAS
  // ==========================================================

  useEffect(() => {
    initializeCanvas();

    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!container) return;

    const observer = new ResizeObserver(() => {
      initializeCanvas();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [initializeCanvas]);

  // ==========================================================
  // POINTER COORDINATES
  // ==========================================================

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

  // ==========================================================
  // SCRATCH FUNCTION
  // ==========================================================

  const scratch = (point: {
    x: number;
    y: number;
  }) => {
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

    // Erase a circle for taps and clicks

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

    if (!hasScratched) {
      setHasScratched(true);
    }
  };

  // ==========================================================
  // POINTER HANDLERS
  // ==========================================================

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

  // ==========================================================
  // REVEAL ALL
  // ==========================================================

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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="relative mx-auto w-full max-w-[950px]">
      {/* ====================================================
          MAIN SCRATCH AREA
      ==================================================== */}

      <div
        className="
          relative
          aspect-[16/9]
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#08080D]
        "
      >
        {/* ==================================================
            HIDDEN CAMEL IMAGE
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            overflow-hidden
          "
          aria-hidden="true"
        >
          <Image
            src="/images/camel.png"
            alt=""
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 950px"
            className="
              object-fill
              select-none
            "
            draggable={false}
          />
        </div>

        {/* ==================================================
            SCRATCHABLE SURFACE
        ================================================== */}

        <canvas
          ref={canvasRef}
          aria-label="Interactive scratch art hiding a colorful 1970s-style camel eating an ice cream sundae. Scratch to reveal the illustration or use the Reveal All button."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`
            absolute
            inset-0
            z-20
            h-full
            w-full
            touch-none
            ${
              isRevealed
                ? "pointer-events-none"
                : "cursor-crosshair"
            }
          `}
        />

        {/* ==================================================
            INITIAL INSTRUCTIONS
        ================================================== */}

        {!hasScratched && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-30
              flex
              items-center
              justify-center
            "
          >
            <div className="px-6 text-center">
              <p
                className="
                  font-display
                  text-2xl
                  font-bold
                  text-white
                  md:text-4xl
                "
              >
                SCRATCH THE SURFACE
              </p>

              <p className="mt-3 text-sm text-white/50">
                Drag your mouse or finger to reveal
                what&apos;s underneath.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <Sparkles
                  size={14}
                  className="text-[#FF3CAC]"
                />

                <span
                  className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-widest
                    text-white/30
                  "
                >
                  There&apos;s more than code in here
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================
          BOTTOM CONTROLS
      ==================================================== */}

      <div
        className="
          mt-4
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >
        {/* STATUS MESSAGE */}

        <p
          className="
            font-mono
            text-xs
            uppercase
            tracking-widest
            text-muted
          "
          aria-live="polite"
        >
          {isRevealed
            ? "The camel appreciates your service."
            : hasScratched
            ? "Keep going. The camel is counting on you."
            : "An interactive experiment"}
        </p>

        {/* BUTTONS */}

        <div className="flex items-center gap-5">
          {/* REVEAL ALL */}

          {!isRevealed && (
            <button
              type="button"
              onClick={revealAll}
              className="
                group
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-white/60
                transition-all
                duration-300
                hover:text-[#B6FF3B]
                hover:[text-shadow:0_0_8px_#B6FF3B]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B6FF3B]
              "
            >
              <Eye
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              Reveal All
            </button>
          )}

          {/* RESET CANVAS */}

          <button
            type="button"
            onClick={initializeCanvas}
            className="
              group
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-white/60
              transition-all
              duration-300
              hover:text-[#00E5FF]
              hover:[text-shadow:0_0_8px_#00E5FF]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#00E5FF]
            "
          >
            <RotateCcw
              size={14}
              className="
                transition-transform
                duration-500
                group-hover:-rotate-45
              "
            />

            Reset Canvas
          </button>
        </div>
      </div>

      {/* ====================================================
          SCREEN READER DESCRIPTION
      ==================================================== */}

      <p className="sr-only">
        The hidden illustration features a groovy,
        1970s-inspired camel enjoying an ice cream sundae
        against a vibrant psychedelic background filled
        with neon colors, flowers, and cosmic details.
        The illustration includes the message:
        &quot;i was so itchy, thank you for scratching me&quot;.
        You can scratch the surface with your mouse or
        finger, or select Reveal All to uncover the
        entire illustration.
      </p>
    </div>
  );
}