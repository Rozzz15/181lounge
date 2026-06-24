'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, ArrowRight, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface WelcomeModalProps {
  splashDone: boolean;
}

export function WelcomeModal({ splashDone }: WelcomeModalProps) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (splashDone) {
      const timer = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(timer);
    }
  }, [splashDone]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={() => setShow(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350, delay: 0.1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Animated Border Container */}
            <div className="relative w-full max-w-[340px] pointer-events-auto rounded-2xl p-[2px] bg-gradient-to-r from-[#525A40] via-[#927557] to-[#525A40] shadow-2xl animate-border-glow">
              <div className="relative overflow-hidden rounded-[14px] bg-[#F3F0E8]">
                {/* Close button */}
                <button
                  onClick={() => setShow(false)}
                  className="absolute top-3 right-3 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-[#44362A] hover:text-white text-[#7a756d]"
                  style={{ background: 'rgba(243, 240, 232, 0.9)' }}
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                {/* Top section with dark background */}
                <div
                  className="relative px-6 pt-8 pb-7 text-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(170deg, #44362A 0%, #3a2f24 100%)'
                  }}
                >
                  {/* Subtle pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Decorative line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-[#927557] to-transparent" />

                  {/* Logo */}
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative mb-3 inline-block"
                  >
                    <div className="absolute -inset-2 rounded-xl bg-[#927557]/20 blur-md" />
                    <div
                      className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg"
                      style={{ border: '2px solid rgba(146, 117, 87, 0.3)' }}
                    >
                      <img
                        alt="181 Lounge"
                        width={56}
                        height={56}
                        className="h-full w-full object-contain p-1"
                        src="/images/logo.jpg"
                      />
                    </div>
                  </motion.div>

                  {/* Welcome text */}
                  <div className="relative">
                    <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#927557] mb-1">
                      Welcome to
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-white tracking-tight leading-none">
                      181 Lounge
                    </h2>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div className="h-[1px] w-6 bg-[#927557]/40" />
                      <span className="text-[8px] font-medium tracking-[0.2em] uppercase text-white/40">
                        Est. 2024
                      </span>
                      <div className="h-[1px] w-6 bg-[#927557]/40" />
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="px-6 pb-6 pt-5">
                  {/* Tagline */}
                  <div className="text-center mb-4">
                    <p className="font-display text-[15px] italic text-[#44362A] leading-snug">
                      Coffee · Books · Boardgames
                    </p>
                    <p className="text-[12px] text-[#7a756d] mt-1.5 leading-relaxed">
                      A warm space for connection and great conversations.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#927557]/20" />
                    <div className="w-1 h-1 rounded-full bg-[#927557]/40" />
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#927557]/20" />
                  </div>

                  {/* Info cards */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/60 border border-[#927557]/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#525A40]/10 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-[#525A40]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium tracking-wider uppercase text-[#927557] mb-0.5">
                          Visit Us
                        </p>
                        <p className="text-[12px] text-[#44362A] font-medium truncate">
                          35 Mamatid, Cabuyao, PH, 4025
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/60 border border-[#927557]/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#525A40]/10 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#525A40]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium tracking-wider uppercase text-[#927557] mb-0.5">
                          Hours
                        </p>
                        <p className="text-[12px] text-[#44362A] font-medium">
                          Mon – Sun: 7 AM – 10 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full h-10 text-[13px] font-semibold rounded-lg bg-[#525A40] hover:bg-[#44362A] transition-all duration-300 group"
                      onClick={() => {
                        setShow(false);
                        navigate('/menu');
                      }}
                    >
                      <span>Explore Our Menu</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-10 text-[13px] font-semibold rounded-lg border-[#927557]/30 text-[#44362A] hover:bg-[#927557]/10 transition-all duration-300 group"
                      onClick={() => {
                        setShow(false);
                        navigate('/franchise');
                      }}
                    >
                      <Store className="w-3.5 h-3.5 mr-1.5" />
                      <span>Get a Branch</span>
                    </Button>
                    <button
                      onClick={() => setShow(false)}
                      className="w-full text-center text-[12px] text-[#948D82] hover:text-[#44362A] transition-colors duration-300 py-0.5"
                    >
                      Continue browsing
                    </button>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#525A40] via-[#927557] to-[#525A40]" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
