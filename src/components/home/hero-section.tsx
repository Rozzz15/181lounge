'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const heroProducts = [
  { name: 'Espresso', color: '#3C1A00' },
  { name: 'Latte', color: '#D4A574' },
  { name: 'Mocha', color: '#5C3317' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#D72D1D] to-[#FFB347]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
            >
              ☕ Premium Coffee Since 2018
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6"
            >
              PREMIUM
              <br />
              <span className="text-[#FFB347]">COFFEE</span>
              <br />
              EXPERIENCE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/90 text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Discover the perfect cup at 181 Lounge. From rich espressos to creamy lattes, 
              every sip is crafted with passion from the finest Arabica beans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/menu">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-lg">
                  View Menu
                </Button>
              </Link>
              <Link href="/stores">
                <Button variant="outline" size="lg" className="border-2 border-white/80 bg-white/10 text-white hover:bg-white hover:text-[#8B0000] backdrop-blur-sm w-full sm:w-auto text-lg">
                  Find a Store
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            {/* Main Product Circle */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[280px] lg:h-[280px] rounded-full bg-gradient-to-br from-[#FFB347] to-[#D72D1D] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl lg:text-6xl">☕</span>
                  <p className="text-white font-bold text-lg sm:text-xl mt-2">SIGNATURE</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Product Badges */}
            {heroProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 50 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                className={`absolute animate-float`}
                style={{
                  top: index === 0 ? '10%' : index === 1 ? '70%' : '10%',
                  left: index === 0 ? '0%' : index === 2 ? '70%' : '50%',
                  right: index === 2 ? '0%' : undefined,
                }}
              >
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg"
                  style={{ backgroundColor: product.color }}
                >
                  {index === 0 ? '☕' : index === 1 ? '🥛' : '🍫'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F8F8F8"
          />
        </svg>
      </div>
    </section>
  );
}
