'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface SplashScreenProps {
  onFinish?: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#44362A] via-[#44362A] to-[#525A40]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Ambient Glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-96 h-96 rounded-full bg-[#927557]/20 blur-3xl"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', damping: 12 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-[#525A40] to-[#927557] flex items-center justify-center p-1 shadow-2xl shadow-[#927557]/30"
            >
              <img
                src="/images/logo.jpg"
                alt="181 Lounge"
                className="w-full h-full rounded-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="block font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-[#927557] tracking-[0.3em] uppercase mt-2"
            >
              Lounge
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-white/50 text-sm sm:text-base tracking-widest uppercase"
          >
            Coffee · Books · Boardgames
          </motion.p>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#525A40] via-[#927557] to-[#525A40]"
          />

          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-[#927557]/60 to-transparent" />
          <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-[#927557]/60 to-transparent" />
          <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-[#927557]/60 to-transparent" />
          <div className="absolute top-8 right-8 w-px h-16 bg-gradient-to-b from-[#927557]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-[#927557]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 w-px h-16 bg-gradient-to-t from-[#927557]/60 to-transparent" />
          <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-[#927557]/60 to-transparent" />
          <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-[#927557]/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
