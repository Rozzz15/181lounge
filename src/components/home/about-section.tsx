'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Facebook, Instagram, ArrowRight } from 'lucide-react';
import { WaveText } from '@/components/ui/wave-text';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#F3F0E8] overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[#927557]/40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Large background accent */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#525A40]/8 to-[#927557]/10 rounded-2xl" />

              {/* Interactive image container */}
              <motion.div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1000,
                }}
                className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] cursor-pointer"
              >
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                  alt="Premium coffee being carefully prepared by a skilled barista"
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#44362A]/30 flex items-center justify-center"
                >
                  <span className="text-white text-sm font-semibold tracking-widest uppercase px-6 py-3 border border-white/50 rounded-full backdrop-blur-sm">
                    Discover More
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 text-[#927557] text-sm font-medium tracking-widest uppercase">
                <span className="w-8 h-px bg-[#927557]" />
                Our Story
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl font-bold text-[#44362A] leading-tight mb-6"
            >
              <WaveText text="Crafting Moments," /><br />
              <span className="text-[#525A40]"><WaveText text="One Cup at a Time" /></span>
            </motion.h2>

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-[#7a756d] text-base leading-relaxed mb-10"
            >
              <p>
                Since opening our doors, 181 Lounge has been serving premium coffee
                crafted from carefully selected beans sourced from the world&apos;s finest
                coffee-growing regions.
              </p>
              <p>
                More than a coffee shop, we are a space for connection and discovery.
                Browse our curated collection of books, challenge friends to a boardgame,
                or simply unwind with a warm cup — every visit is a new experience.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 sm:gap-12 mb-10"
            >
              {[
                { number: '100+', label: 'Menu Items' },
                { number: '1M+', label: 'Happy Customers' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                  {i > 0 && <div className="w-px h-10 bg-[#927557]/20" />}
                  <div>
                    <div className="font-heading text-2xl sm:text-3xl font-bold text-[#525A40]">
                      {stat.number}
                    </div>
                    <div className="text-xs text-[#948D82] tracking-wide uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61564700682320"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#d4cfc7] flex items-center justify-center text-[#525A40] hover:border-[#927557] hover:text-[#927557] hover:bg-[#927557]/5 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#d4cfc7] flex items-center justify-center text-[#525A40] hover:border-[#927557] hover:text-[#927557] hover:bg-[#927557]/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link to="/menu">
                <Button variant="primary" size="lg" className="gap-2">
                  View Our Menu
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider - transitions into Featured Carousel */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-auto"
          style={{ height: 'clamp(40px, 8vw, 120px)' }}
        >
          <path
            d="M0 32C200 70 400 90 600 72C800 54 1000 18 1200 10C1333.33 4.67 1400 12 1440 24V120H0V32Z"
            fill="white"
            opacity="0.5"
          />
          <path
            d="M0 48C180 82 380 98 580 80C780 62 980 28 1180 18C1313.33 13.33 1400 20 1440 36V120H0V48Z"
            fill="white"
            opacity="0.75"
          />
          <path
            d="M0 64C160 90 360 104 560 88C760 72 960 40 1160 28C1293.33 22.67 1386.67 28 1440 48V120H0V64Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
