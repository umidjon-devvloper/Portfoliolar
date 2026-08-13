"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number };

const LINK_DISTANCE = 150;
const CURSOR_RADIUS = 260;
const MAX_PARTICLES = 120;

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

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
    let accent = "108, 99, 255";
    let accent2 = "34, 211, 238";

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      const a = styles.getPropertyValue("--accent-rgb").trim();
      const b = styles.getPropertyValue("--accent-2-rgb").trim();
      if (a) accent = a.replaceAll(" ", ", ");
      if (b) accent2 = b.replaceAll(" ", ", ");
    }

    function resize() {
      const rect = element.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      element.width = width * ratio;
      element.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const target = Math.min(
        MAX_PARTICLES,
        Math.max(28, Math.round((width * height) / 13000)),
      );

      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -20) particle.x = width + 20;
          else if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          else if (particle.y > height + 20) particle.y = -20;
        }

        const dxp = particle.x - pointer.x;
        const dyp = particle.y - pointer.y;
        const near =
          pointer.active &&
          dxp * dxp + dyp * dyp < CURSOR_RADIUS * CURSOR_RADIUS;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, near ? 2.6 : 1.9, 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(${accent2}, 0.95)`
          : `rgba(${accent}, 0.6)`;
        ctx.fill();
      }

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
          ctx.strokeStyle = `rgba(${accent}, ${strength * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (!pointer.active) continue;

        const dxp = a.x - pointer.x;
        const dyp = a.y - pointer.y;
        const squaredPointer = dxp * dxp + dyp * dyp;
        if (squaredPointer > CURSOR_RADIUS * CURSOR_RADIUS) continue;

        const strength = 1 - Math.sqrt(squaredPointer) / CURSOR_RADIUS;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = `rgba(${accent2}, ${strength * 0.85})`;
        ctx.lineWidth = strength * 1.6;
        ctx.stroke();

        if (!reduceMotion) {
          a.x -= dxp * 0.004;
          a.y -= dyp * 0.004;
        }
      }

      if (pointer.active) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent2}, 0.9)`;
        ctx.fill();
      }

      if (running) frame = requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = element.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x > -60 &&
        pointer.y > -60 &&
        pointer.x < width + 60 &&
        pointer.y < height + 60;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibilityChange() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    }

    readColors();
    resize();
    draw();

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
