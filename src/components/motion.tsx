"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* shared easing curves — smooth, slightly-overshooting feel */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

const offset = 36;
function variantsFor(direction: Direction): Variants {
  switch (direction) {
    case "up":
      return { hidden: { opacity: 0, y: offset }, show: { opacity: 1, y: 0 } };
    case "down":
      return { hidden: { opacity: 0, y: -offset }, show: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { opacity: 0, x: offset }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: -offset }, show: { opacity: 1, x: 0 } };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1 },
      };
    case "fade":
    default:
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

/* Scroll-triggered reveal. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variantsFor(direction)}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
};

/* Parent that staggers its <StaggerItem> children when scrolled into view. */
export function StaggerGroup({
  children,
  className,
  delay = 0,
  stagger = 0.09,
  once = true,
  amount = 0.2,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
};

export function StaggerItem({
  children,
  className,
  direction = "up",
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={variantsFor(direction)}
      transition={{ duration: 0.65, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

type TextRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
};

/* Splits a string into words and reveals each with a staggered rise. */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
  amount = 0.3,
}: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn("inline-block", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: EASE_OUT },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

type CounterProps = {
  value: number;
  className?: string;
  duration?: number;
  format?: (n: number) => string;
  suffix?: string;
  prefix?: string;
  once?: boolean;
};

/* Animated count-up that triggers when scrolled into view. */
export function Counter({
  value,
  className,
  duration = 1.6,
  format,
  suffix = "",
  prefix = "",
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, bounce: 0 });
  const display = useTransform(spring, (latest) => {
    const n = Math.round(latest);
    return `${prefix}${format ? format(n) : n}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
      spring.set(value);
    }
  }, [inView, value, motionValue, spring]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/* Wraps a child so it drifts toward the cursor while hovered. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
