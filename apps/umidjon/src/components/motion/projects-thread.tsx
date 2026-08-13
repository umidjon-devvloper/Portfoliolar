"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

function buildPath(width: number, height: number, count: number) {
  if (count < 2 || height <= 0) return "";

  const left = width * 0.06;
  const right = width * 0.94;
  const step = height / count;
  const commands: string[] = [`M ${right} 0`];

  for (let i = 0; i < count; i += 1) {
    const yStart = step * i;
    const yEnd = step * (i + 1);
    const goingLeft = i % 2 === 0;
    const from = goingLeft ? right : left;
    const to = goingLeft ? left : right;
    const mid = (yStart + yEnd) / 2;

    commands.push(
      `C ${from} ${mid - step * 0.1}, ${to} ${mid + step * 0.1}, ${to} ${yEnd}`,
    );
  }

  return commands.join(" ");
}

export function ProjectsThread({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [box, setBox] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setBox({ width: element.offsetWidth, height: element.offsetHeight });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const path = buildPath(box.width, box.height, count);

  return (
    <div ref={ref} className="relative">
      {box.width > 0 && path ? (
        <svg
          aria-hidden
          width={box.width}
          height={box.height}
          viewBox={`0 0 ${box.width} ${box.height}`}
          fill="none"
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        >
          <path
            d={path}
            stroke="var(--border)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <motion.path
            d={path}
            stroke="url(#thread-gradient)"
            strokeWidth="1.75"
            strokeLinecap="round"
            style={
              shouldReduceMotion ? { pathLength: 1 } : { pathLength: progress }
            }
          />
          <defs>
            <linearGradient id="thread-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-2)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}

      {children}
    </div>
  );
}
