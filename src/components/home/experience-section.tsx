'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Dice5, ArrowRight, Users, Clock, Star, ChevronRight } from 'lucide-react';
import { MagnetButton } from '@/components/ui/magnet-button';
import { Button } from '@/components/ui/button';
import { AnimatedWave } from '@/components/ui/animated-wave';

const bookSamples = [
  { name: 'The Coffee Guide', author: 'James Hoffmann', price: 350, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&q=80' },
  { name: 'Atomic Habits', author: 'James Clear', price: 450, image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=200&q=80' },
  { name: 'Quiet', author: 'Susan Cain', price: 420, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80' },
  { name: 'The Alchemist', author: 'Paulo Coelho', price: 320, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&q=80' },
];

const boardgameSamples = [
  { name: 'Catan', players: '3-4 players', price: 1200, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=200&q=80' },
  { name: 'Cards Against Humanity', players: '4-20 players', price: 850, image: 'https://images.unsplash.com/photo-1529480780007-52f8a14f3a7b?w=200&q=80' },
  { name: 'Scrabble', players: '2-4 players', price: 950, image: 'https://images.unsplash.com/photo-1586165368502-1bad06082d90?w=200&q=80' },
  { name: 'Exploding Kittens', players: '2-5 players', price: 650, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=200&q=80' },
];

const steps = [
  { number: '01', title: 'Grab a Seat', description: 'Find your perfect spot — cozy corners for readers, big tables for boardgame nights.' },
  { number: '02', title: 'Pick Your Activity', description: 'Browse our shelf of books or choose from 20+ boardgames available at the counter.' },
  { number: '03', title: 'Order & Enjoy', description: 'Pair your game or book with your favorite drink. Stay as long as you like.' },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'books' | 'boardgames'>('books');
  const items = activeTab === 'books' ? bookSamples : boardgameSamples;

  return (
    <section className="py-24 sm:py-32 bg-[#44362A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23927557' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#d4a574] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
            <span className="w-8 h-px bg-[#d4a574]" />
            More Than Coffee
            <span className="w-8 h-px bg-[#d4a574]" />
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Stay, Play, Read
          </h2>
          <p className="text-[#C5BEB3] text-lg max-w-xl mx-auto">
            181 Lounge is more than a coffee shop — it&apos;s a space to unwind,
            connect, and discover something new.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: BookOpen, value: '50+', label: 'Books Available' },
            { icon: Dice5, value: '20+', label: 'Boardgames' },
            { icon: Users, value: 'Free', label: 'No Rental Fee' },
            { icon: Clock, value: 'Open', label: 'All Day Access' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="text-center p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <stat.icon className="w-5 h-5 text-[#d4a574] mx-auto mb-2" />
              <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[#C5BEB3] mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Tabs + Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { id: 'books' as const, icon: BookOpen, label: 'Books' },
              { id: 'boardgames' as const, icon: Dice5, label: 'Boardgames' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#d4a574] text-[#44362A] shadow-lg shadow-[#d4a574]/25'
                    : 'bg-white/10 text-[#C5BEB3] hover:bg-white/15 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Featured Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-heading font-bold text-base sm:text-lg leading-tight mb-1">
                      {item.name}
                    </h4>
                    <p className="text-white/60 text-xs mb-2">
                      {'author' in item ? item.author : ('players' in item ? item.players : '')}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#d4a574] font-heading font-bold text-sm">
                        ₱{item.price.toLocaleString()}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-3 h-3 text-[#d4a574] fill-[#d4a574]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-8">
            <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-[#d4a574] hover:text-white transition-colors">
              View all in Menu
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            How It Works
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#d4a574]/30 transition-all duration-500"
              >
                <span className="font-heading text-5xl font-bold text-[#d4a574]/15 absolute top-4 right-6">
                  {step.number}
                </span>
                <h4 className="font-heading text-lg font-bold text-white mb-2 relative z-10">
                  {step.title}
                </h4>
                <p className="text-[#C5BEB3] text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/menu">
            <MagnetButton>
              <Button
                variant="primary"
                size="lg"
                className="bg-[#d4a574] text-[#44362A] hover:bg-[#c49564] px-8 gap-2 text-sm font-semibold tracking-wide uppercase"
              >
                Explore Books & Boardgames
                <ArrowRight className="w-4 h-4" />
              </Button>
            </MagnetButton>
          </Link>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <AnimatedWave fill="#F3F0E8" />
    </section>
  );
}
