import { motion, Variants } from "framer-motion";
import React from "react";

export interface StaggerListProps {
  children: React.ReactNode;
  delay?: number;
}

export function StaggerList({ children, delay = 0.1 }: StaggerListProps) {
  // 1. Tambahkan tipe data 'Variants' agar TypeScript mengenali ini sebagai animasi Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      {/* 2. Tambahkan parameter 'index' dan properti 'key' pada motion.div */}
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}