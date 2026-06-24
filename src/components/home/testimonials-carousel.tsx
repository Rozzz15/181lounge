'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';
import { WaveText } from '@/components/ui/wave-text';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    content: 'Ang sarap ng coffee nila! Perfect yung ambiance for work or catch up with friends. Yung White Chocolate Mocha nila, sobrang sarap — worth it every single sip!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Juan Dela Cruz',
    role: 'Food Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content: 'Dito na ako lagi tuwing weekend para sa Big Breakfast. Consistent yung quality and ang babait ng staff — laging naka-smile kahit sobrang busy.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anna Reyes',
    role: 'Remote Worker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    content: 'Go-to place ko for remote work. Libre WiFi, maraming power outlets, and yung Java Chip Frappe nila keeps me energized buong maghapon. Sana nga lang dumami pa yung menu options!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Carlos Mendoza',
    role: 'Coffee Connoisseur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    content: 'Sa wakas, may coffee shop na seryoso sa kape. Yung espresso nila perfectly extracted at alam ng mga barista yung ginagawa nila. Highly recommended sa mga tunay na mahilig sa kape!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Tan',
    role: 'Loyal Customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    content: 'Simula pa nung nag-open sila, dito na ako lagi. Ang galing na consistent yung quality and service nila hanggang ngayon. Yung Ham & Cheese Panini paired with Latte — ultimate comfort combo ko yan!',
    rating: 4,
  },
  {
    id: 6,
    name: 'Mike Fernandez',
    role: 'Business Owner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    content: 'Perfect venue for client meetings. Ang sophisticated ng atmosphere at laging napapahanga yung clients ko sa premium coffee nila. Yung catering service nila, sobrang ganda rin — no hassle!',
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section className="section bg-[#F3F0E8] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#927557]/20 text-[#927557] rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#44362A]">
            <WaveText text="WHAT OUR CUSTOMERS SAY" />
          </h2>
          <p className="mt-4 text-[#948D82] text-lg max-w-2xl mx-auto">
            Hear from our community about their 181 Lounge experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[#927557]/30 mx-auto mb-6" />

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < t.rating ? 'text-[#927557] fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-[#44362A] text-lg sm:text-xl leading-relaxed mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#927557]/20"
                  />
                  <div className="text-left">
                    <h4 className="font-heading font-bold text-[#44362A]">{t.name}</h4>
                    <p className="text-sm text-[#948D82]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#44362A] hover:text-[#927557] hover:shadow-lg transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#44362A] hover:text-[#927557] hover:shadow-lg transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-[#927557]'
                    : 'w-2 bg-[#927557]/30 hover:bg-[#927557]/50'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/contact">
              <Button variant="outline" className="gap-2 border-[#927557] text-[#927557] hover:bg-[#927557] hover:text-white text-sm px-6 h-11">
                <MessageCircle className="w-4 h-4" />
                Share Your Experience
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
