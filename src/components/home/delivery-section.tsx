'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, ShoppingBag, ChevronRight, ArrowUpRight } from 'lucide-react';
import { MagnetButton } from '@/components/ui/magnet-button';
import { Button } from '@/components/ui/button';

const partners = [
  {
    name: 'GrabFood',
    description: 'Order via Grab',
    color: '#00B14F',
    image: '/images/grab.jpg',
    href: 'https://food.grab.com/ph/en/restaurants/181-lounge-delivery',
  },
  {
    name: 'Foodpanda',
    description: 'Order via foodpanda',
    color: '#D70F64',
    image: '/images/panda.jpg',
    href: 'https://www.foodpanda.ph/restaurant/181-lounge',
  },
];

const features = [
  { icon: Truck, title: 'Free Delivery', description: 'On orders over ₱300' },
  { icon: Clock, title: 'Fast Service', description: '30 mins or less' },
  { icon: ShoppingBag, title: 'Easy Ordering', description: 'Via app or website' },
];

export function DeliverySection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#2a241d] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/deliver.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2a241d]/80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[#d4a574] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-6">
              <span className="w-8 h-px bg-[#d4a574]" />
              Delivery Partners
            </span>

            {/* Heading */}
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Coffee & More
              <br />
              <span className="text-[#d4a574]">Delivered</span>
            </h2>

            {/* Description */}
            <p className="text-[#C5BEB3] text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              Enjoy your favorite 181 Lounge drinks and meals from the comfort of your home or office.
              Quick delivery, same great taste.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <f.icon className="w-5 h-5 text-[#d4a574] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm mb-0.5">{f.title}</div>
                  <div className="text-[#C5BEB3]/60 text-xs">{f.description}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <MagnetButton>
              <Button
                variant="primary"
                size="lg"
                className="bg-[#d4a574] text-[#2a241d] hover:bg-[#c49564] px-8 gap-2 text-sm font-semibold tracking-wide uppercase"
              >
                View Our Menu
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </MagnetButton>
          </motion.div>

          {/* Right - Partner Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {partners.map((partner, i) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="group block relative rounded-2xl overflow-hidden h-40 sm:h-48"
              >
                {/* Partner image background */}
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${partner.color}dd 0%, ${partner.color}88 50%, transparent 100%)`,
                  }}
                />
                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
                      Order Now
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-white/70 text-sm">{partner.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
