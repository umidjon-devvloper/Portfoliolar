"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 190;
const MAX_PARTICLES = 110;

/**
 * Ambient constellation behind the page: slow-drifting points that link to
 * their neighbours, and link harder to the cursor. Reads its colours from
 * the CSS custom properties so it follows the light/dark theme.
 *
 * Kept cheap on purpose — squared-distance comparisons, a particle count
 * derived from viewport area, no work while the tab is hidden, and nothing
 * at all when the visitor prefers reduced motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    // Narrowed once here so the closures below don't re-check nullability.
    const element: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };

    // Accent colour, read live so a theme switch is picked up.
    let accent = "108, 99, 255";

    function readAccent() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim();
      if (raw) accent = raw.replaceAll(" ", ", ");
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      element.width = width * ratio;
      element.height = height * ratio;
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const target = Math.min(
        MAX_PARTICLES,
        Math.round((width * height) / 17000),
      );

      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = width;
          else if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          else if (particle.y > height) particle.y = 0;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, 0.42)`;
        ctx.fill();
      }

      // Neighbour links.
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        if (!a) continue;

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          if (!b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const squared = dx * dx + dy * dy;
          if (squared > LINK_DISTANCE * LINK_DISTANCE) continue;

          const strength = 1 - Math.sqrt(squared) / LINK_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${accent}, ${strength * 0.16})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Cursor links — brighter, so the field feels attached to the pointer.
        if (!pointer.active) continue;

        const dxp = a.x - pointer.x;
        const dyp = a.y - pointer.y;
        const squaredPointer = dxp * dxp + dyp * dyp;
        if (squaredPointer > CURSOR_RADIUS * CURSOR_RADIUS) continue;

        const strength = 1 - Math.sqrt(squaredPointer) / CURSOR_RADIUS;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = `rgba(${accent}, ${strength * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Gentle pull toward the cursor.
        if (!reduceMotion) {
          a.x -= dxp * 0.0016;
          a.y -= dyp * 0.0016;
        }
      }

      if (running && !reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    }

    function onPointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibilityChange() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!reduceMotion) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    }

    readAccent();
    resize();
    draw();

    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
