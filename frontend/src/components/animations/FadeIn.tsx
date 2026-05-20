import { motion } from "framer-motion";
import React from "react";

// Ini bagian TypeScript-nya (mendefinisikan apa saja yang boleh masuk ke komponen ini)
export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  // Mapping arah animasi ke nilai koordinat x dan y
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}