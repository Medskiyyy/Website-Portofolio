"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function AmbientSpotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const opacity = useMotionValue(0);

  // Smooth organic spring physics for natural trailing inertia
  const springConfig = { damping: 26, stiffness: 190, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 120 });

  const background = useMotionTemplate`radial-gradient(750px circle at ${smoothX}px ${smoothY}px, color-mix(in oklch, var(--primary) 18%, transparent) 0%, color-mix(in oklch, var(--primary) 6%, transparent) 45%, transparent 75%)`;

  useEffect(() => {
    // Only enable on devices that support hover / fine pointers
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    const handleMouseEnter = () => {
      opacity.set(1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{
        background,
        opacity: smoothOpacity,
      }}
    />
  );
}
