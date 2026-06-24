'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MagnetButton } from '@/components/ui/magnet-button';
import { SideDrawer } from '@/components/ui/side-drawer';
import { WaveText } from '@/components/ui/wave-text';
import { formatPrice } from '@/lib/utils';

const products = [
  {
    id: 1,
    name: 'Ham & Cheese Panini',
    category: 'Sandwiches',
    description: 'Warm, toasted panini with premium ham and melted cheese',
    price: 185,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
    rating: 4.8,
    popular: true,
  },
  {
    id: 2,
    name: 'White Chocolate Mocha',
    category: 'Coffee',
    description: 'Rich espresso with creamy white chocolate and steamed milk',
    price: 165,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&q=80',
    rating: 4.9,
    popular: true,
  },
  {
    id: 3,
    name: 'Big Breakfast',
    category: 'Breakfast',
    description: 'Complete breakfast with eggs, bacon, sausage, and toast',
    price: 285,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80',
    rating: 4.7,
    popular: false,
  },
  {
    id: 4,
    name: 'Java Chip Frappe',
    category: 'Frappe',
    description: 'Blended coffee with chocolate chips and whipped cream',
    price: 175,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
    rating: 4.6,
    popular: true,
  },
  {
    id: 5,
    name: 'Caramel Frappe',
    category: 'Frappe',
    description: 'Creamy caramel blended with coffee and topped with whipped cream',
    price: 180,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
    rating: 4.5,
    popular: false,
  },
  {
    id: 6,
    name: 'Chocolate Croissant',
    category: 'Bakery',
    description: 'Flaky butter croissant filled with rich chocolate',
    price: 120,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038028a?w=400&q=80',
    rating: 4.7,
    popular: false,
  },
  {
    id: 7,
    name: 'Chicken Pesto Pasta',
    category: 'Lunch',
    description: 'Grilled chicken with basil pesto and cherry tomatoes',
    price: 245,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
    rating: 4.6,
    popular: false,
  },
  {
    id: 8,
    name: 'Mango Milkshake',
    category: 'Cold Drinks',
    description: 'Fresh mango blended with creamy vanilla ice cream',
    price: 155,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
    rating: 4.4,
    popular: false,
  },
];

export function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const itemsPerView = 4;
  const totalSlides = Math.ceil(products.length / itemsPerView);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const visibleProducts = products.slice(
    current * itemsPerView,
    current * itemsPerView + itemsPerView
  );

  return (
    <section className="section bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#525A40]/20 text-[#525A40] rounded-full text-sm font-semibold mb-4">
            Customer Favorites
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#44362A]">
            <WaveText text="OUR BEST SELLERS" />
          </h2>
          <p className="mt-4 text-[#948D82] text-lg max-w-2xl mx-auto">
            Discover why our customers keep coming back for more. These customer favorites
            are just the beginning of your 181 Lounge journey.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleProducts.map((product) => (
                <Card key={product.id} hover className="h-full overflow-hidden group cursor-pointer">
                  <Link to="/menu" className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.popular && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#927557] text-white text-xs font-semibold rounded-full">
                            <Star className="w-3 h-3 fill-current" />
                            Popular
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{product.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-[#927557]">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#44362A] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#948D82] mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-2xl font-bold text-[#525A40]">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#927557] hover:gap-2 transition-all"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#44362A] hover:text-[#927557] hover:shadow-xl transition-all z-10 hidden lg:flex"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#44362A] hover:text-[#927557] hover:shadow-xl transition-all z-10 hidden lg:flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-[#525A40]'
                    : 'w-2 bg-[#525A40]/30 hover:bg-[#525A40]/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
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

      <SideDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0] pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[50px] sm:h-[60px] block">
          <path
            d="M0,20 C360,70 720,0 1080,50 C1260,70 1380,40 1440,30 L1440,80 L0,80 Z"
            fill="#44362A"
          />
        </svg>
      </div>
    </section>
  );
}
