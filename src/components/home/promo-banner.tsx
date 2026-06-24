'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagnetButton } from '@/components/ui/magnet-button';
import { ArrowRight, Coffee, Leaf, Flame } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 min-h-full">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
          alt="Coffee beans"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Premium multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a241d]/90 via-[#2a241d]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a241d]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#927557]/5" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="flex items-center h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[650px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 text-[#d4a574] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase">
                <span className="w-10 h-px bg-[#d4a574]" />
                Limited Time Offer
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05]"
            >
              The Art of
              <br />
              <span className="text-[#d4a574]">Smooth Taste</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed max-w-lg"
            >
              Experience the perfect balance of flavor and aroma with our signature
              House Blend. Crafted from premium Arabica beans, every sip is a journey
              to coffee heaven.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link to="/menu">
                <MagnetButton>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-[#d4a574] text-[#2a241d] hover:bg-[#c49564] px-8 gap-2 text-sm font-semibold tracking-wide uppercase"
                  >
                    View Our Menu
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </MagnetButton>
              </Link>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-12"
            >
              {[
                { icon: Coffee, label: '100% Arabica', color: '#d4a574' },
                { icon: Leaf, label: 'Premium Quality', color: '#525A40' },
                { icon: Flame, label: 'Fresh Roasted', color: '#927557' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-white/80 text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle floating accents */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-16 top-1/3 w-24 h-24 rounded-full bg-[#d4a574]/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-1/3 bottom-1/4 w-32 h-32 rounded-full bg-[#927557]/10 blur-2xl"
      />
    </section>
  );
}
