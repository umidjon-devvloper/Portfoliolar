"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Node = { y: number; left: number };

const LANE = 26;
const PAD = 10;
const DWELL = 0.07;

function buildStops(nodes: Node[]) {
  const count = nodes.length;
  if (count < 2) return { input: [0, 1], output: [0, 0] };

  const travel = (1 - count * DWELL) / (count - 1);
  const input: number[] = [];
  const output: number[] = [];
  let cursor = 0;

  nodes.forEach((node, index) => {
    input.push(cursor);
    output.push(node.y);
    cursor += DWELL;
    input.push(cursor);
    output.push(node.y);
    if (index < count - 1) cursor += travel;
  });

  input[input.length - 1] = 1;
  return { input, output };
}

function RocketMark() {
  return (
    <svg width="26" height="42" viewBox="-13 -14 26 42" fill="none" aria-hidden>
      <path
        d="M0 6 C 3 14, 1.6 21, 0 27 C -1.6 21, -3 14, 0 6 Z"
        fill="var(--accent)"
        className="origin-[0px_6px] animate-[flame_0.4s_ease-in-out_infinite]"
      />
      <path
        d="M-4.8 1 L -8.8 8 L -4.8 6.4 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M4.8 1 L 8.8 8 L 4.8 6.4 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M0 -12 C 4.4 -6.5, 5.6 0.5, 4.8 6.4 L -4.8 6.4 C -5.6 0.5, -4.4 -6.5, 0 -12 Z"
        fill="var(--background)"
        stroke="var(--accent-2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-3" r="2.3" fill="var(--accent-2)" />
    </svg>
  );
}

export function ProjectsSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [passed, setPassed] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 24,
    restDelta: 0.0005,
  });

  const first = nodes[0]?.y ?? 0;
  const last = nodes[nodes.length - 1]?.y ?? 0;
  const stops = buildStops(nodes);

  const rocketY = useTransform(progress, stops.input, stops.output);
  const fill = useTransform(rocketY, [first, Math.max(last, first + 1)], [0, 1]);

  useMotionValueEvent(rocketY, "change", (value) => {
    const count = nodes.filter((node) => node.y <= value + 4).length;
    setPassed((current) => (current === count ? current : count));
  });

  const measure = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const found = Array.from(
      element.querySelectorAll<HTMLElement>("[data-project-card]"),
    ).map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        y: rect.top - bounds.top + rect.height / 2,
        left: rect.left - bounds.left,
      };
    });

    setBox({ width: element.offsetWidth, height: element.offsetHeight });
    setNodes(found);
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

  const active = nodes.length > 1;

  return (
    <div ref={ref} className="relative">
      {active ? (
        <>
          <svg
            aria-hidden
            width={box.width}
            height={box.height}
            viewBox={`0 0 ${box.width} ${box.height}`}
            fill="none"
            className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
          >
            <line
              x1={LANE}
              y1={first - PAD}
              x2={LANE}
              y2={last + PAD}
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <motion.line
              x1={LANE}
              y1={first}
              x2={LANE}
              y2={last}
              stroke="url(#spine-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={shouldReduceMotion ? { pathLength: 1 } : { pathLength: fill }}
            />

            {nodes.map((node, index) => {
              const lit = index < passed;

              return (
                <g key={`${node.y}-${index}`}>
                  <line
                    x1={LANE}
                    y1={node.y}
                    x2={node.left - 4}
                    y2={node.y}
                    stroke={lit ? "var(--accent)" : "var(--border)"}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    className="transition-[stroke] duration-500"
                  />
                  <circle
                    cx={LANE}
                    cy={node.y}
                    r={lit ? 7 : 5}
                    fill="var(--background)"
                    stroke={lit ? "var(--accent-2)" : "var(--border-strong)"}
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                  {lit ? (
                    <circle cx={LANE} cy={node.y} r="2.5" fill="var(--accent-2)" />
                  ) : null}
                </g>
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
              style={{ y: rocketY, left: LANE }}
              className="pointer-events-none absolute top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            >
              <RocketMark />
            </motion.div>
          )}
        </>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
