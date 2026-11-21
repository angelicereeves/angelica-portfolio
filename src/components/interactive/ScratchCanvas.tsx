"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const COLORS = [
  "#A855F7",
  "#00E5FF",
  "#C7FF4D",
  "#FF3CAC",
  "#5454FF",
];

export default function ScratchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artworkRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const [hasScratched, setHasScratched] = useState(false);

  const createArtwork = useCallback(
    (context: CanvasRenderingContext2D, width: number, height: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      // Neon color bands

      const bandWidth = width / COLORS.length;

      COLORS.forEach((color, index) => {
        const gradient = context.createLinearGradient(
          index * bandWidth,
          0,
          (index + 1) * bandWidth,
          height
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, COLORS[(index + 2) % COLORS.length]);

        context.fillStyle = gradient;
        context.fillRect(index * bandWidth, 0, bandWidth + 2, height);
      });

      // Abstract scratch-art lines

      for (let i = 0; i < 45; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        context.beginPath();
        context.moveTo(x, y);

        context.bezierCurveTo(
          x + Math.random() * 200 - 100,
          y - 100,
          x + Math.random() * 200 - 100,
          y + 100,
          x + Math.random() * 200 - 100,
          y + Math.random() * 200 - 100
        );

        context.strokeStyle = COLORS[i % COLORS.length];
        context.lineWidth = Math.random() * 8 + 2;
        context.stroke();
      }

      // Hidden message

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#050505";
      context.font = `bold ${Math.min(width * 0.065, 60)}px sans-serif`;

      context.fillText("STAY CURIOUS.", width / 2, height / 2);

      context.font = `bold ${Math.min(width * 0.025, 20)}px sans-serif`;
      context.fillText(
        "THERE'S ALWAYS MORE TO DISCOVER",
        width / 2,
        height / 2 + 60
      );
    },
    []
  );

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const artwork = artworkRef.current;

    if (!canvas || !artwork) return;

    const container = canvas.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    artwork.width = width;
    artwork.height = height;

    const context = canvas.getContext("2d");
    const artworkContext = artwork.getContext("2d");

    if (!context || !artworkContext) return;

    createArtwork(artworkContext, width, height);

    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#111116";
    context.fillRect(0, 0, width, height);

    // Subtle texture on the black scratch surface

    for (let i = 0; i < 1500; i++) {
      context.fillStyle = `rgba(255,255,255,${Math.random() * 0.045})`;

      context.fillRect(
        Math.random() * width,
        Math.random() * height,
        1,
        1
      );
    }

    setHasScratched(false);
  }, [createArtwork]);

  useEffect(() => {
    initializeCanvas();

    const observer = new ResizeObserver(initializeCanvas);

    if (canvasRef.current?.parentElement) {
      observer.observe(canvasRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, [initializeCanvas]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const scratch = (point: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.globalCompositeOperation = "destination-out";
    context.lineWidth = 36;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();

    if (lastPoint.current) {
      context.moveTo(lastPoint.current.x, lastPoint.current.y);
    } else {
      context.moveTo(point.x, point.y);
    }

    context.lineTo(point.x, point.y);
    context.stroke();

    // Also erase a circle for single clicks

    context.beginPath();
    context.arc(point.x, point.y, 18, 0, Math.PI * 2);
    context.fill();

    lastPoint.current = point;
    setHasScratched(true);
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    isDrawing.current = true;
    lastPoint.current = null;

    event.currentTarget.setPointerCapture(event.pointerId);

    scratch(getPoint(event));
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing.current) return;

    scratch(getPoint(event));
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-surface md:h-[420px]">
        {/* Artwork underneath */}

        <canvas
          ref={artworkRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Scratchable black coating */}

        <canvas
          ref={canvasRef}
          aria-label="Interactive scratch art. Drag to reveal hidden neon artwork."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
        />

        {/* Initial instruction */}

        {!hasScratched && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-white md:text-4xl">
                SCRATCH THE SURFACE
              </p>

              <p className="mt-3 text-sm text-white/50">
                Drag your mouse or finger to reveal what's underneath.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          {hasScratched
            ? "Keep going. There's more."
            : "An interactive experiment"}
        </p>

        <button
          onClick={initializeCanvas}
          className="flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-cyan"
        >
          <RotateCcw size={14} />
          Reset canvas
        </button>
      </div>
    </div>
  );
}