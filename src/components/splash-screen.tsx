'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;
    hasShown.current = true;

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#2A1A1A] to-[#8B0000]"
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
            className="absolute w-96 h-96 rounded-full bg-[#C79A5D]/20 blur-3xl"
          />

          {/* Coffee Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', damping: 12 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C79A5D] flex items-center justify-center shadow-2xl shadow-[#C79A5D]/30">
              <Coffee className="w-12 h-12 text-white" />
            </div>
            {/* Steam Animation */}
            <motion.div
              animate={{ y: [-20, -40], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-[#C79A5D]/40 to-transparent rounded-full"
            />
            <motion.div
              animate={{ y: [-15, -35], opacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
              className="absolute -top-6 -left-4 w-0.5 h-6 bg-gradient-to-t from-[#C79A5D]/30 to-transparent rounded-full"
            />
            <motion.div
              animate={{ y: [-15, -35], opacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              className="absolute -top-6 -right-4 w-0.5 h-6 bg-gradient-to-t from-[#C79A5D]/30 to-transparent rounded-full"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              181
            </h1>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="block font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-[#C79A5D] tracking-[0.3em] uppercase mt-2"
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
            Premium Coffee Experience
          </motion.p>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#C79A5D] to-[#F6B042]"
          />

          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-[#C79A5D]/60 to-transparent" />
          <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-[#C79A5D]/60 to-transparent" />
          <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-[#C79A5D]/60 to-transparent" />
          <div className="absolute top-8 right-8 w-px h-16 bg-gradient-to-b from-[#C79A5D]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-[#C79A5D]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 w-px h-16 bg-gradient-to-t from-[#C79A5D]/60 to-transparent" />
          <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-[#C79A5D]/60 to-transparent" />
          <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-[#C79A5D]/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
