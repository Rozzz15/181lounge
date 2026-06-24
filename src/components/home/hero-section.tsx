'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagnetButton } from '@/components/ui/magnet-button';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AnimatedWave } from '@/components/ui/animated-wave';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero.png)' }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2a241d]/65" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[#d4a574] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase">
                <span className="w-8 h-px bg-[#d4a574]" />
                Est. 2026
                <span className="w-8 h-px bg-[#d4a574]" />
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-white text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] leading-[0.95] tracking-[-0.03em] mb-6"
            >
              The Art of
              <br />
              <span className="text-[#d4a574]">Premium Coffee</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              Handcrafted from the world's finest beans. Every cup is a journey through
              rich flavors, bold aromas, and moments worth savoring. Stay for a book
              or a boardgame — there's always something to enjoy.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-16"
            >
              <Link to="/menu">
                <MagnetButton>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-[#d4a574] text-[#2a241d] hover:bg-[#c49564] px-8 gap-2 text-sm font-semibold tracking-wide uppercase"
                  >
                    Explore Our Menu
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </MagnetButton>
              </Link>
              <Link to="/story">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white/90 hover:border-white hover:text-white hover:bg-white/10 px-8 text-sm font-medium tracking-wide uppercase rounded-none"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Image with Steam */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <img src="/images/coffee.png" alt="" className="w-full object-contain" />
            {/* Steam rising from cup */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2">
                <motion.div
                  className="w-12 h-40 -ml-6 rounded-full"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent)',
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    y: [0, -40, -80],
                    x: [0, 8, -4],
                    scaleX: [1, 1.15, 0.9],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="w-10 h-36 -ml-5 -mt-6 rounded-full"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,0.4), rgba(255,255,255,0.15), transparent)',
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    y: [0, -35, -75],
                    x: [0, -8, 6],
                    scaleX: [1, 0.9, 1.1],
                    opacity: [0.6, 0.3, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                />
                <motion.div
                  className="w-8 h-32 -ml-4 -mt-4 rounded-full"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,0.35), rgba(255,255,255,0.1), transparent)',
                    filter: 'blur(6px)',
                  }}
                  animate={{
                    y: [0, -45, -85],
                    x: [0, 12, -6],
                    opacity: [0.5, 0.25, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Wave Divider */}
      <AnimatedWave fill="#F3F0E8" />
    </section>
  );
}
