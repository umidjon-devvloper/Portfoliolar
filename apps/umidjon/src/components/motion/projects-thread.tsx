"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Box = { top: number; height: number };

const LANE = 20;
const GAP = 20;
const RADIUS = 24;

function buildPath(width: number, height: number, cards: Box[]) {
  if (width <= 0 || cards.length === 0) return "";

  const xLeft = LANE;
  const xRight = width - LANE;

  let lane = xRight;
  let commands = `M ${lane} 0`;

  cards.forEach((card, index) => {
    const wrapLeft = index % 2 === 0;
    const side = wrapLeft ? xLeft : xRight;
    const entry = wrapLeft ? xRight : xLeft;

    const top = card.top - GAP;
    const bottom = card.top + card.height + GAP;

    if (lane !== entry) {
      const midpoint = (lane + entry) / 2;
      const yFrom = index === 0 ? 0 : cards[index - 1]!.top + cards[index - 1]!.height + GAP + RADIUS;
      const yTo = top - RADIUS;
      const control = yFrom + (yTo - yFrom) / 2;
      commands += ` C ${lane} ${control}, ${entry} ${control}, ${entry} ${yTo}`;
      void midpoint;
    } else {
      commands += ` L ${entry} ${top - RADIUS}`;
    }

    const toSide = wrapLeft ? -1 : 1;

    commands += ` Q ${entry} ${top}, ${entry + toSide * RADIUS} ${top}`;
    commands += ` L ${side - toSide * RADIUS} ${top}`;
    commands += ` Q ${side} ${top}, ${side} ${top + RADIUS}`;
    commands += ` L ${side} ${bottom - RADIUS}`;
    commands += ` Q ${side} ${bottom}, ${side - toSide * RADIUS} ${bottom}`;
    commands += ` L ${entry + toSide * RADIUS} ${bottom}`;
    commands += ` Q ${entry} ${bottom}, ${entry} ${bottom + RADIUS}`;

    lane = entry;
  });

  commands += ` L ${lane} ${height}`;

  return commands;
}

export function ProjectsThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [cards, setCards] = useState<Box[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const measure = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const next: Box[] = Array.from(
      element.querySelectorAll<HTMLElement>("[data-project-card]"),
    ).map((node) => {
      const rect = node.getBoundingClientRect();
      return { top: rect.top - bounds.top, height: rect.height };
    });

    setBox({ width: element.offsetWidth, height: element.offsetHeight });
    setCards(next);
  }, []);

  useEffect(() => {
    measure();
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element
      .querySelectorAll<HTMLElement>("[data-project-card]")
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [measure, children]);

  const path = buildPath(box.width, box.height, cards);

  return (
    <div ref={ref} className="relative">
      {path ? (
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
            strokeLinejoin="round"
          />
          <motion.path
            d={path}
            stroke="url(#thread-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
