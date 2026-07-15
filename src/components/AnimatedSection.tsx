"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  /** play the entrance only once after first entering the viewport */
  once?: boolean;
  /** fraction of element visible before the entrance fires (0–1) */
  amount?: number;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const OFFSET = 36;

/**
 * Scroll-triggered reveal wrapper. Fires its entrance the first time the
 * element scrolls into view (configurable `amount`), then stays put.
 *
 * The default motion primitive across the About / Resume / Contact pages.
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: OFFSET }, show: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -OFFSET }, show: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: OFFSET }, show: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -OFFSET }, show: { opacity: 1, x: 0 } };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          show: { opacity: 1, scale: 1 },
        };
      case "fade":
      default:
        return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
