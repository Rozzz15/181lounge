'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagnetButton } from '@/components/ui/magnet-button';

export function BestSellersSection() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#525A40]/20 text-[#525A40] rounded-full text-sm font-semibold mb-4">
            Just Landed
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#44362A]">
            OUR NEW PRODUCTS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#948D82] max-w-2xl mx-auto">
            Fresh off the menu — meet our newest drinks. The Einspanner (Soft Cream)
            series comes in Oreo, Biscoff, Ube, Matcha, Strawberry, and Choco. There's
            something new to love at 181 Lounge.
          </p>
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/menu"
            className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl border border-[#44362A]/10 shadow-xl shadow-[#44362A]/10"
          >
            <img
              src="/images/Newprod.jpg"
              alt="181 Lounge Einspanner (Soft Cream) Series — Oreo, Biscoff, Ube, Matcha, Strawberry, and Choco Einspanner"
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#44362A]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F3F0E8]/95 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#44362A] shadow-sm opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100">
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link to="/menu">
            <MagnetButton>
              <Button variant="primary" size="lg">
                View Full Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </MagnetButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
