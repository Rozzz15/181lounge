'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { Target, Eye, Users, Coffee } from 'lucide-react';
import { WaveText } from '@/components/ui/wave-text';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value.includes('+')) {
      const num = parseInt(value.replace('+', ''));
      return Math.round(latest) + '+';
    }
    if (value.includes('%')) {
      const num = parseInt(value.replace('%', ''));
      return Math.round(latest) + '%';
    }
    if (value.includes('.')) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const targetValue = parseFloat(value.replace(/[+%]/g, ''));
      const controls = animate(count, targetValue, {
        duration,
        ease: 'easeOut',
      });
      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, duration]);

  return <div ref={ref}>{displayValue}</div>;
}

function StatCard({ stat, index }: { stat: { icon: any; value: string; label: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="text-white relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
        transition={{ duration: 0.4 }}
      />

      {/* Pulse rings on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-white/30 rounded-full"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-white/20 rounded-full"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      {/* Icon */}
      <motion.div
        className="relative z-10 mb-4"
        animate={{
          rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <stat.icon className="w-10 h-10 mx-auto opacity-80 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Value */}
      <motion.div
        className="font-heading text-4xl sm:text-5xl font-bold mb-2 relative z-10"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {stat.value}
      </motion.div>

      {/* Label */}
      <div className="text-white/70 group-hover:text-white/90 transition-colors relative z-10">{stat.label}</div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-white/50 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '60%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function OurStoryClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[65vh] min-h-[500px] bg-gradient-to-br from-[#525A40] via-[#525A40] to-[#927557] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/story.png" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              Family-Founded Specialty Café
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              <WaveText text="OUR STORY" />
            </h1>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
              Built on family, intention, and meaningful beginnings—181 Lounge is more than a café, 
              it's a curated social space where connection is encouraged and experiences are intentionally crafted.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F3F0E8" />
          </svg>
        </div>
      </section>

      {/* Story Content */}
      <section className="section bg-[#F3F0E8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#44362A] mb-8">
                <WaveText text="The Story of" />
                <span className="text-[#525A40]"><WaveText text=" 181 Lounge" /></span>
              </h2>
              <div className="space-y-6 text-[#948D82] text-lg leading-relaxed">
                <p>
                  181 Lounge is a family-founded specialty café brand established by siblings Alison Joy Darato and Alvin Jay Pring. The name "181" carries a personal significance, inspired by the birthdays of their children—reflecting the brand's core values of family, intention, and meaningful beginnings.
                </p>
                <p>
                  The first branch was opened beneath the Darato family residence in Mamatid, Cabuyao. What began as a modest entrepreneurial endeavor gradually evolved into a recognized community café, with strong support from students and nearby residents due to its strategic location close to several academic institutions.
                </p>
                <p>
                  Leveraging existing coffee shop equipment from a previous family venture, the Pring family chose to transform available resources into a new concept rather than let them go unused. This marked the foundation of 181 Lounge as a purpose-driven café—built on resourcefulness, continuity, and vision.
                </p>
                <p>
                  Over time, 181 Lounge gained recognition for offering accessible pricing without compromising on quality, creating a distinct balance that resonates with its community. This commitment to value and consistency has become a defining characteristic of the brand.
                </p>
                <p>
                  More than a café, 181 Lounge is designed as a curated social space—offering board games and books available for reading, playing, and purchasing. It is a place where connection is encouraged, conversations are unhurried, and experiences are intentionally crafted.
                </p>
                <p>
                  From its humble beginnings, the brand has steadily expanded through consistency, community trust, and a dedication to elevated coffee experiences. Today, 181 Lounge continues to grow with purpose, refining its identity while staying true to its roots.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#44362A] mb-4">
              <WaveText text="WHAT DRIVES US" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[#F3F0E8] rounded-2xl p-8 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #525A40, #927557)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full bg-[#F3F0E8] rounded-2xl" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full bg-[#525A40]/10 group-hover:bg-[#525A40] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#525A40]/25">
                  <Target className="w-8 h-8 text-[#525A40] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#44362A] mb-4 group-hover:text-[#525A40] transition-colors duration-300">
                  Mission
                </h3>
                <p className="text-[#948D82] group-hover:text-[#7a756d] transition-colors duration-300 leading-relaxed">
                  To craft specialty coffee and intentional café experiences that blend quality, comfort, and community—offering thoughtfully designed spaces where people can slow down, connect, and create meaningful moments.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[#F3F0E8] rounded-2xl p-8 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #525A40, #927557)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full bg-[#F3F0E8] rounded-2xl" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full bg-[#525A40]/10 group-hover:bg-[#525A40] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#525A40]/25">
                  <Eye className="w-8 h-8 text-[#525A40] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#44362A] mb-4 group-hover:text-[#525A40] transition-colors duration-300">
                  Vision
                </h3>
                <p className="text-[#948D82] group-hover:text-[#7a756d] transition-colors duration-300 leading-relaxed">
                  To become a leading specialty café brand in the Philippines, recognized for its elevated coffee craftsmanship, immersive social spaces, and consistent excellence—while remaining grounded in family heritage, authenticity, and sustainable growth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#525A40] to-[#525A40] relative overflow-hidden">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Coffee, value: 'Family', label: 'Founded' },
              { icon: Users, value: 'Community', label: 'Driven' },
              { icon: Target, value: 'Purpose', label: 'Built' },
              { icon: Eye, value: 'Vision', label: 'Focused' },
            ].map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
