"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Card = { top: number; bottom: number; left: number; right: number };

const GAP = 18;
const R = 22;
const SAMPLES = 320;
const HORIZONTAL_COST = 0.3;

function buildPath(cards: Card[]) {
  if (cards.length === 0) return "";

  const laneLeft = Math.min(...cards.map((card) => card.left)) - GAP;
  const laneRight = Math.max(...cards.map((card) => card.right)) + GAP;

  let d = `M ${laneLeft} ${cards[0]!.top - GAP - R}`;

  cards.forEach((card, index) => {
    const top = card.top - GAP;
    const bottom = card.bottom + GAP;

    d += ` L ${laneLeft} ${top - R}`;
    d += ` Q ${laneLeft} ${top}, ${laneLeft + R} ${top}`;
    d += ` L ${laneRight - R} ${top}`;
    d += ` Q ${laneRight} ${top}, ${laneRight} ${top + R}`;
    d += ` L ${laneRight} ${bottom - R}`;
    d += ` Q ${laneRight} ${bottom}, ${laneRight - R} ${bottom}`;
    d += ` L ${laneLeft + R} ${bottom}`;
    d += ` Q ${laneLeft} ${bottom}, ${laneLeft} ${bottom + R}`;

    const next = cards[index + 1];
    d += ` L ${laneLeft} ${next ? next.top - GAP - R : bottom + R + 16}`;
  });

  return d;
}

function RocketMark() {
  return (
    <svg width="30" height="30" viewBox="-15 -15 30 30" fill="none" aria-hidden>
      <path
        d="M-4.6 0 L -8.6 7 L -4.6 5.4 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M4.6 0 L 8.6 7 L 4.6 5.4 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M0 -11 C 4.2 -6, 5.4 0, 4.6 5.4 L -4.6 5.4 C -5.4 0, -4.2 -6, 0 -11 Z"
        fill="var(--background)"
        stroke="var(--accent-2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-2.6" r="2.1" fill="var(--accent-2)" />
    </svg>
  );
}

export function ProjectsSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [box, setBox] = useState({ width: 0, height: 0 });
  const [cards, setCards] = useState<Card[]>([]);
  const [stops, setStops] = useState<{ time: number[]; length: number[] }>({
    time: [0, 1],
    length: [0, 0],
  });
  const [passed, setPassed] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(180);
  const boost = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 58%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 66,
    damping: 22,
    restDelta: 0.0004,
  });
  const distance = useTransform(progress, stops.time, stops.length);
  const drawn = useTransform(
    distance,
    [0, Math.max(stops.length[stops.length.length - 1] ?? 1, 1)],
    [0, 1],
  );

  const measure = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const found = Array.from(
      element.querySelectorAll<HTMLElement>("[data-project-card]"),
    ).map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        top: rect.top - bounds.top,
        bottom: rect.bottom - bounds.top,
        left: rect.left - bounds.left,
        right: rect.right - bounds.left,
      };
    });

    setBox({ width: element.offsetWidth, height: element.offsetHeight });
    setCards(found);
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

  const path = buildPath(cards);

  useEffect(() => {
    const node = pathRef.current;
    if (!node || !path) return;

    const total = node.getTotalLength();
    if (!Number.isFinite(total) || total <= 0) return;

    const time: number[] = [0];
    const length: number[] = [0];
    let cost = 0;
    let previous = node.getPointAtLength(0);

    for (let i = 1; i <= SAMPLES; i += 1) {
      const at = (total * i) / SAMPLES;
      const point = node.getPointAtLength(at);
      const dx = Math.abs(point.x - previous.x);
      const dy = Math.abs(point.y - previous.y);
      const span = Math.hypot(dx, dy) || 0.0001;
      const horizontal = dx / span;

      cost += span * (1 - horizontal * (1 - HORIZONTAL_COST));
      time.push(cost);
      length.push(at);
      previous = point;
    }

    const normalised = time.map((value) => value / cost);
    normalised[normalised.length - 1] = 1;
    setStops({ time: normalised, length });
  }, [path]);

  useMotionValueEvent(distance, "change", (value) => {
    const node = pathRef.current;
    if (!node) return;

    const total = node.getTotalLength();
    const at = Math.max(0, Math.min(value, total));
    const point = node.getPointAtLength(at);
    const ahead = node.getPointAtLength(Math.min(at + 6, total));

    const dx = ahead.x - point.x;
    const dy = ahead.y - point.y;

    x.set(point.x);
    y.set(point.y);

    if (dx !== 0 || dy !== 0) {
      rotate.set((Math.atan2(dy, dx) * 180) / Math.PI + 90);
      boost.set(Math.abs(dx) / (Math.hypot(dx, dy) || 1));
    }

    const count = cards.filter((card) => card.top + 24 <= point.y).length;
    setPassed((current) => (current === count ? current : count));
  });

  const flameScale = useTransform(boost, [0, 1], [1, 2.6]);
  const flameOpacity = useTransform(boost, [0, 1], [0.75, 1]);

  if (cards.length === 0) {
    return (
      <div ref={ref} className="relative">
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <svg
        aria-hidden
        width={box.width}
        height={box.height}
        viewBox={`0 0 ${box.width} ${box.height}`}
        fill="none"
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      >
        <path
          ref={pathRef}
          d={path}
          stroke="var(--border)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={path}
          stroke="url(#spine-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={shouldReduceMotion ? { pathLength: 1 } : { pathLength: drawn }}
        />

        {cards.map((card, index) => {
          const lit = index < passed;
          const midpoint = (card.top + card.bottom) / 2;

          return (
            <circle
              key={`${card.top}-${index}`}
              cx={card.left - GAP}
              cy={midpoint}
              r={lit ? 5.5 : 4}
              fill="var(--background)"
              stroke={lit ? "var(--accent-2)" : "var(--border-strong)"}
              strokeWidth="2"
              className="transition-all duration-500"
            />
          );
        })}

        <defs>
          <linearGradient id="spine-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>

      {shouldReduceMotion ? null : (
        <motion.div
          aria-hidden
          style={{ x, y, rotate }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <motion.span
            style={{ scaleY: flameScale, opacity: flameOpacity }}
            className="absolute left-1/2 top-[19px] block h-3 w-1.5 origin-top -translate-x-1/2 rounded-full bg-accent blur-[0.5px]"
          />
          <RocketMark />
        </motion.div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
