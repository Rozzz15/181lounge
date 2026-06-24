'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagnetButton } from '@/components/ui/magnet-button';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  popular: boolean;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#44362A] hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Hero Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Top Actions */}
                <div className="absolute top-5 left-5 flex gap-2">
                  {product.popular && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#927557] text-white text-xs font-semibold rounded-full shadow-lg"
                    >
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </motion.span>
                  )}
                </div>

                {/* Favorite Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="absolute top-5 right-16 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isFavorited ? 'fill-[#e74c3c] text-[#e74c3c]' : 'text-[#44362A]'
                    }`}
                  />
                </motion.button>

                {/* Price Badge on Image */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-5 left-5"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                    <div className="text-xs text-[#948D82] uppercase tracking-wider">Starting at</div>
                    <div className="font-heading text-3xl font-bold text-[#525A40] leading-none mt-0.5">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </motion.div>

                {/* Share Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#44362A] hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category & Rating Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-[#525A40]/8 text-[#525A40] text-xs font-semibold rounded-full tracking-wide uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-[#927557] text-[#927557]'
                              : 'fill-[#e0d9cf] text-[#e0d9cf]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#948D82] font-medium ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-heading text-2xl sm:text-3xl font-bold text-[#44362A] mb-3 leading-tight"
                >
                  {product.name}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#7a756d] leading-relaxed mb-6 text-sm sm:text-base"
                >
                  {product.description}
                </motion.p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#e8e2da] to-transparent mb-6" />

                {/* Quantity & Action Row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between"
                >
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#948D82] font-medium">Qty</span>
                    <div className="flex items-center bg-[#F3F0E8] rounded-full">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#44362A] hover:bg-[#e8e2da] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold text-[#44362A] text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#44362A] hover:bg-[#e8e2da] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <MagnetButton strength={0.2}>
                    <Button variant="primary" size="lg" className="gap-2 px-6">
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </MagnetButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
