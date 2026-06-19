'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

const bestSellers = [
  {
    id: 1,
    name: 'Ham & Cheese Panini',
    category: 'Sandwiches',
    description: 'Warm, toasted panini with premium ham and melted cheese',
    price: 185,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
  },
  {
    id: 2,
    name: 'White Chocolate Mocha',
    category: 'Coffee',
    description: 'Rich espresso with creamy white chocolate and steamed milk',
    price: 165,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&q=80',
  },
  {
    id: 3,
    name: 'Big Breakfast',
    category: 'Breakfast',
    description: 'Complete breakfast with eggs, bacon, sausage, and toast',
    price: 285,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80',
  },
  {
    id: 4,
    name: 'Java Chip Frappe',
    category: 'Frappe',
    description: 'Blended coffee with chocolate chips and whipped cream',
    price: 175,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#F6B042]/20 text-[#8B0000] rounded-full text-sm font-semibold mb-4">
            Customer Favorites
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222]">
            OUR BEST SELLERS
          </h2>
          <p className="mt-4 text-[#666666] text-lg max-w-2xl mx-auto">
            Discover why our customers keep coming back for more. These customer favorites 
            are just the beginning of your 181 Lounge journey.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {bestSellers.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <Card hover className="h-full overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-5">
                  {/* Category Badge */}
                  <Badge variant="secondary" className="mb-3">
                    {product.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-[#222222] mb-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-[#8B0000]">
                      {formatPrice(product.price)}
                    </span>
                    <Link href="/menu">
                      <Button variant="ghost" size="sm" className="group">
                        View
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/menu">
            <Button variant="primary" size="lg">
              View Full Menu
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
