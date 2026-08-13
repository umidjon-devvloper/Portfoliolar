"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function SnakeConnector({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 45%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const dash = useTransform(progress, [0, 1], [1, 0]);

  const path = flip
    ? "M 160 0 C 160 40, 20 50, 20 96 C 20 142, 160 152, 160 192"
    : "M 20 0 C 20 40, 160 50, 160 96 C 160 142, 20 152, 20 192";

  return (
    <div ref={ref} className="pointer-events-none flex justify-center py-2">
      <svg
        width="180"
        height="192"
        viewBox="0 0 180 192"
        fill="none"
        aria-hidden
        className="overflow-visible"
      >
        <path
          d={path}
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          stroke="url(#snake-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          style={
            shouldReduceMotion
              ? { pathLength: 1 }
              : { pathLength: progress, strokeDashoffset: dash }
          }
        />
        <defs>
          <linearGradient id="snake-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
