"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Card = { top: number; bottom: number; left: number; right: number };
type Pose = { x: number; y: number; angle: number; boost: number };

const GAP = 20;
const R = 22;
const SAMPLES = 300;
const HORIZONTAL_COST = 0.32;

function buildPath(cards: Card[], width: number) {
  if (cards.length === 0 || width === 0) return "";

  const laneLeft = Math.min(...cards.map((card) => card.left)) - GAP;
  const laneRight = Math.max(...cards.map((card) => card.right)) + GAP;

  let lane = laneLeft;
  let d = `M ${lane} ${cards[0]!.top - GAP}`;

  cards.forEach((card, index) => {
    const turn = card.bottom + GAP;
    const isLast = index === cards.length - 1;

    if (isLast) {
      d += ` L ${lane} ${turn}`;
      return;
    }

    const next = lane === laneLeft ? laneRight : laneLeft;
    const direction = next > lane ? 1 : -1;

    d += ` L ${lane} ${turn - R}`;
    d += ` Q ${lane} ${turn}, ${lane + direction * R} ${turn}`;
    d += ` L ${next - direction * R} ${turn}`;
    d += ` Q ${next} ${turn}, ${next} ${turn + R}`;

    lane = next;
  });

  return d;
}

function lookup(times: number[], lengths: number[], t: number) {
  if (times.length < 2) return 0;
  const clamped = Math.max(0, Math.min(1, t));

  let low = 0;
  let high = times.length - 1;
  while (high - low > 1) {
    const mid = (low + high) >> 1;
    if (times[mid]! <= clamped) low = mid;
    else high = mid;
  }

  const span = times[high]! - times[low]! || 1;
  const ratio = (clamped - times[low]!) / span;
  return lengths[low]! + (lengths[high]! - lengths[low]!) * ratio;
}

export function ProjectsSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const framer = useRef<number>(0);
  const curve = useRef<{ times: number[]; lengths: number[]; total: number }>({
    times: [],
    lengths: [],
    total: 0,
  });

  const [box, setBox] = useState({ width: 0, height: 0 });
  const [cards, setCards] = useState<Card[]>([]);
  const [pose, setPose] = useState<Pose | null>(null);
  const [drawn, setDrawn] = useState(0);
  const [passed, setPassed] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

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

  const path = buildPath(cards, box.width);

  useEffect(() => {
    const node = pathRef.current;
    if (!node || !path) return;

    const total = node.getTotalLength();
    if (!Number.isFinite(total) || total <= 0) return;

    const times: number[] = [0];
    const lengths: number[] = [0];
    let cost = 0;
    let previous = node.getPointAtLength(0);

    for (let i = 1; i <= SAMPLES; i += 1) {
      const at = (total * i) / SAMPLES;
      const point = node.getPointAtLength(at);
      const dx = Math.abs(point.x - previous.x);
      const dy = Math.abs(point.y - previous.y);
      const span = Math.hypot(dx, dy) || 0.001;

      cost += span * (1 - (dx / span) * (1 - HORIZONTAL_COST));
      times.push(cost);
      lengths.push(at);
      previous = point;
    }

    curve.current = {
      times: times.map((value) => value / (cost || 1)),
      lengths,
      total,
    };
  }, [path]);

  useEffect(() => {
    const element = ref.current;
    const node = pathRef.current;
    if (!element || !node || !path) return;

    const update = () => {
      framer.current = 0;

      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.75;
      const end = viewport * 0.35;
      const span = rect.height + (start - end);
      const travelled = start - rect.top;
      const t = Math.max(0, Math.min(1, travelled / (span || 1)));

      const { times, lengths, total } = curve.current;
      if (total <= 0) return;

      const at = lookup(times, lengths, t);
      const point = node.getPointAtLength(at);
      const ahead = node.getPointAtLength(Math.min(at + 8, total));
      const dx = ahead.x - point.x;
      const dy = ahead.y - point.y;
      const magnitude = Math.hypot(dx, dy) || 1;

      setPose({
        x: point.x,
        y: point.y,
        angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
        boost: Math.abs(dx) / magnitude,
      });
      setDrawn(at / total);
      setPassed(cards.filter((card) => card.top + 32 <= point.y).length);
    };

    const schedule = () => {
      if (framer.current) return;
      framer.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (framer.current) cancelAnimationFrame(framer.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [path, cards]);

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
        <path
          d={path}
          stroke="url(#spine-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={reduced ? 0 : 1 - drawn}
        />

        {cards.map((card, index) => {
          const lit = index < passed;
          return (
            <circle
              key={`${card.top}-${index}`}
              cx={card.left - GAP}
              cy={(card.top + card.bottom) / 2}
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

      {pose && !reduced ? (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
          style={{
            transform: `translate(${pose.x}px, ${pose.y}px) translate(-50%, -50%) rotate(${pose.angle}deg)`,
          }}
        >
          <div
            className="absolute left-1/2 top-[14px] w-[5px] -translate-x-1/2 rounded-full bg-accent"
            style={{
              height: `${10 + pose.boost * 26}px`,
              opacity: 0.55 + pose.boost * 0.45,
            }}
          />
          <svg width="28" height="28" viewBox="-14 -14 28 28" fill="none">
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
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
