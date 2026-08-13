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

type Node = { y: number };

const LANE = 26;
const TOP_PAD = 8;

function Rocket() {
  return (
    <g>
      <path
        d="M0 -11 C 4.2 -6, 5.4 1, 4.6 7 L -4.6 7 C -5.4 1, -4.2 -6, 0 -11 Z"
        fill="var(--background)"
        stroke="var(--accent-2)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M-4.6 2 L -8.4 8.5 L -4.6 7 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M4.6 2 L 8.4 8.5 L 4.6 7 Z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-3.2" r="2.2" fill="var(--accent-2)" />
    </g>
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
    offset: ["start 78%", "end 62%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 24,
    restDelta: 0.0005,
  });

  const first = nodes[0]?.y ?? 0;
  const last = nodes[nodes.length - 1]?.y ?? 0;

  const rocketY = useTransform(progress, [0, 1], [first, last]);
  const fillScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(rocketY, "change", (value) => {
    const count = nodes.filter((node) => node.y <= value + 6).length;
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
      return { y: rect.top - bounds.top + rect.height / 2 };
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

  return (
    <div ref={ref} className="relative">
      {nodes.length > 1 ? (
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
            y1={first - TOP_PAD}
            x2={LANE}
            y2={last + TOP_PAD}
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
            style={
              shouldReduceMotion
                ? { pathLength: 1 }
                : { pathLength: fillScale }
            }
          />

          {nodes.map((node, index) => {
            const lit = index < passed;
            const branchDown = index % 2 === 0;
            const stubY = node.y + (branchDown ? 26 : -26);

            return (
              <g key={node.y}>
                <path
                  d={`M ${LANE} ${node.y} C ${LANE} ${stubY}, ${LANE + 18} ${stubY}, ${LANE + 34} ${stubY}`}
                  stroke={lit ? "var(--accent)" : "var(--border)"}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  className="transition-[stroke] duration-500"
                />
                <circle
                  cx={LANE + 34}
                  cy={stubY}
                  r="2.5"
                  fill={lit ? "var(--accent)" : "var(--border-strong)"}
                  className="transition-[fill] duration-500"
                />
                <circle
                  cx={LANE}
                  cy={node.y}
                  r={lit ? 7 : 5.5}
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

          {shouldReduceMotion ? null : (
            <motion.g style={{ y: rocketY, x: LANE }}>
              <motion.path
                d="M0 8 C 2.6 15, 1.4 21, 0 26 C -1.4 21, -2.6 15, 0 8 Z"
                fill="var(--accent)"
                animate={{ opacity: [0.85, 0.3, 0.85], scaleY: [1, 0.62, 1] }}
                transition={{ duration: 0.45, repeat: Infinity }}
                style={{ transformOrigin: "0px 8px" }}
              />
              <Rocket />
            </motion.g>
          )}

          <defs>
            <linearGradient id="spine-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-2)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
