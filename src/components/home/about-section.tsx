'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AboutSection() {
  return (
    <section className="section bg-[#F8F8F8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] to-[#C79A5D] rounded-full transform scale-105 opacity-20" />
              
              {/* Main image */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                  alt="181 Lounge barista serving a customer"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#F6B042] flex items-center justify-center text-2xl"
              >
                ☕
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center text-xl text-white"
              >
                🌿
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1 bg-[#C79A5D]/20 text-[#8B0000] rounded-full text-sm font-semibold mb-4"
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222] mb-6"
            >
              ABOUT US
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-[#666666] text-lg leading-relaxed"
            >
              <p>
                Since opening our doors, 181 Lounge has been serving premium coffee 
                crafted from carefully selected beans sourced from the world&apos;s finest 
                coffee-growing regions.
              </p>
              <p>
                Our commitment to quality goes beyond our beverages. We believe in 
                creating warm, welcoming spaces where friends and families gather, 
                moments are shared, and memories are made over every cup.
              </p>
              <p>
                From our signature House Blend to our indulgent specialty drinks, 
                every cup is prepared by passionate baristas dedicated to delivering 
                the perfect coffee experience.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { number: '8+', label: 'Years' },
                { number: '100+', label: 'Stores' },
                { number: '1M+', label: 'Customers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[#8B0000]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#666666]">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex gap-4 justify-center lg:justify-start mt-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
