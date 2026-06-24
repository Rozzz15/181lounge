'use client';

import { motion } from 'framer-motion';

export function SteamAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* DEBUG: remove this red box after testing */}
      <div className="absolute top-0 left-0 w-10 h-10 bg-red-500 z-50" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48">
        <motion.div
          className="w-20 h-56 mx-auto rounded-full"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.25), transparent)',
            filter: 'blur(10px)',
          }}
          animate={{
            y: [0, -20, -50],
            x: [0, 6, -4],
            scaleX: [1, 1.1, 0.95],
            opacity: [0.9, 0.5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="w-14 h-48 mx-auto rounded-full -mt-8"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent)',
            filter: 'blur(14px)',
          }}
          animate={{
            y: [0, -25, -55],
            x: [0, -8, 5],
            scaleX: [1, 0.9, 1.05],
            opacity: [0.7, 0.4, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
        />
        <motion.div
          className="w-12 h-40 mx-auto rounded-full -mt-6"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.45), rgba(255,255,255,0.15), transparent)',
            filter: 'blur(8px)',
          }}
          animate={{
            y: [0, -30, -60],
            x: [0, 10, -6],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
        />
      </div>
    </div>
  );
}
