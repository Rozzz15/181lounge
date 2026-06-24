'use client';

import { motion } from 'framer-motion';

interface AnimatedWaveProps {
  fill: string;
  className?: string;
}

export function AnimatedWave({ fill, className = '' }: AnimatedWaveProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 leading-[0] overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-[200%]"
      >
        <svg
          viewBox="0 0 2880 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 C1680,80 1920,0 2160,40 C2400,80 2640,0 2880,40 L2880,80 L0,80 Z"
            fill={fill}
          />
        </svg>
      </motion.div>
    </div>
  );
}
