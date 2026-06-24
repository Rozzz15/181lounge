"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLabelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const containerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "inherit",
  },
  hover: {
    y: "-120%",
    color: "var(--color-zinc-400)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const letterVariantsBottom = {
  initial: {
    y: "120%",
    color: "var(--color-zinc-400)",
  },
  hover: {
    y: 0,
    color: "inherit",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const AnimatedLabelButton = ({
  label,
  className = "",
  ...props
}: AnimatedLabelButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        `relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-none 
        border border-white/60 bg-transparent 
        px-6 h-9 text-xs tracking-[0.15em] uppercase font-semibold text-white transition-all duration-500
        before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-white before:transition-transform before:duration-1000 before:content-[""]
        hover:scale-105 hover:text-[#44362A] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: isHovered ? "none" : "beat 1.5s ease-in-out infinite",
      }}
      {...(props as any)}
    >
      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
      
      <motion.div
        className="relative overflow-hidden h-5 flex items-center"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        {label.split("").map((char, index) => (
          <div key={index} className="relative overflow-hidden h-5">
            <motion.span
              className="absolute inline-block"
              variants={letterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              className="absolute inline-block"
              variants={letterVariantsBottom}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </motion.button>
  );
};
