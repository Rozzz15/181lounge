'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative h-[500px] sm:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
          alt="Coffee beans"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-[#8B0000]/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="flex items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Decorative element */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">☕</span>
              <span className="h-px w-12 bg-[#C79A5D]" />
              <span className="text-[#C79A5D] text-sm font-medium uppercase tracking-wider">
                Limited Time Offer
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              ENJOY SMOOTH
              <br />
              <span className="text-[#F6B042]">TASTE TODAY</span>
            </h2>

            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Experience the perfect balance of flavor and aroma with our signature 
              House Blend. Crafted from premium Arabica beans, every sip is a journey 
              to coffee heaven.
            </p>

            <Link href="/menu">
              <Button variant="accent" size="lg">
                View Our Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: '100%', label: 'Arabica' },
                { value: 'Premium', label: 'Quality' },
                { value: 'Fresh', label: 'Roasted' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F6B042]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parallax decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-10 top-1/4 w-20 h-20 rounded-full bg-[#C79A5D]/30 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-1/4 bottom-1/4 w-32 h-32 rounded-full bg-[#F6B042]/20 blur-xl"
      />
    </section>
  );
}
