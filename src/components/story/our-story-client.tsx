'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Heart, Award, Users, Coffee, Globe } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const timeline = [
  {
    year: '2018',
    title: 'The Beginning',
    description: '181 Lounge opens its first store in Manila, with a mission to bring premium coffee and lounge experiences to everyone.',
  },
  {
    year: '2020',
    title: 'Rapid Growth',
    description: 'Expanding to 20 stores across Metro Manila, becoming a favorite spot for coffee lovers.',
  },
  {
    year: '2022',
    title: 'Menu Innovation',
    description: 'Launch of our signature blends and expanded food menu, redefining the coffee lounge experience.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    description: 'Launch of our mobile app and online ordering system for a seamless customer experience.',
  },
  {
    year: '2026',
    title: '100+ Stores',
    description: 'Milestone achievement of 100 stores nationwide, continuing our mission to serve great coffee to every Filipino.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To deliver exceptional coffee experiences that inspire and energize our customers every day.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Quality, authenticity, and community lie at the heart of everything we do.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We source only the finest Arabica beans and train our baristas to perfection.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Creating welcoming spaces where connections are made and memories are shared.',
  },
];

export function OurStoryClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-[#8B0000] via-[#D72D1D] to-[#C79A5D] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              Since 2018
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              OUR STORY
            </h1>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
              From a single lounge in Manila to one of the most beloved coffee brands 
              in the Philippines, our journey has been fueled by passion, quality, and 
              the warm embrace of our customers.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F8F8" />
          </svg>
        </div>
      </section>

      {/* Story Content */}
      <section className="section bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#222222] mb-6">
                A Legacy of
                <span className="text-[#8B0000]"> Premium Coffee</span>
              </h2>
              <div className="space-y-4 text-[#666666] text-lg leading-relaxed">
                <p>
                  181 Lounge was founded with a simple yet powerful vision: 
                  to create a space where premium coffee meets genuine warmth. Our founders believed that 
                  great coffee shouldn&apos;t be a luxury—it should be a daily pleasure.
                </p>
                <p>
                  From our first lounge, we didn&apos;t just serve coffee—we cultivated a culture. 
                  A culture of warmth, community, and the pursuit of the perfect cup.
                </p>
                <p>
                  Today, with over 100 stores nationwide, we continue to honor our commitment 
                  while embracing the unique Filipino spirit of hospitality and togetherness.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                  alt="Coffee shop atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C79A5D] rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#8B0000] rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#222222] mb-4">
              WHAT DRIVES US
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Our commitment to excellence extends beyond our coffee to every aspect of our business.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="bg-[#F8F8F8] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#222222] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#666666]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-[#1A1A1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              OUR JOURNEY
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From our humble beginnings to becoming a national favorite, here are the milestones that shaped us.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-[#C79A5D] transform sm:-translate-x-1/2" />

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                animate: { transition: { staggerChildren: 0.2 } },
              }}
              className="space-y-12"
            >
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} pl-8 sm:pl-0`}>
                    <span className="inline-block px-3 py-1 bg-[#C79A5D] text-white text-sm font-bold rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 sm:left-1/2 top-0 w-4 h-4 bg-[#F6B042] rounded-full transform sm:-translate-x-1/2 -translate-x-1/2 border-4 border-[#1A1A1A]" />

                  {/* Empty space for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#8B0000] to-[#D72D1D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: Coffee, value: '100+', label: 'Stores Nationwide' },
              { icon: Globe, value: '8+', label: 'Years of Excellence' },
              { icon: Users, value: '1M+', label: 'Happy Customers' },
              { icon: Award, value: '50+', label: 'Menu Items' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-white"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="font-heading text-4xl sm:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
