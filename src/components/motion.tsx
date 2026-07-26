"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/* shared easing curves */
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

/**
 * Scroll-triggered reveal — the single entrance primitive used across the site.
 * Hover and pointer-tracking effects are deliberately absent: one entrance
 * animation per element, nothing layered on top of it.
 */
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
