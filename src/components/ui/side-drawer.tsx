'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Minus, Plus, Heart, Share2, ChevronRight, Store, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, type OrderType } from '@/context/cart-context';
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

interface SideDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export function SideDrawer({ product, onClose }: SideDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const { addItem } = useCart();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setIsFavorited(false);
    setOrderType('dine-in');
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      quantity,
      orderType
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 400 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Hero Image */}
              <div className="relative h-64 sm:h-72 shrink-0">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#44362A] hover:bg-white hover:shadow-lg transition-all duration-300 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Actions */}
                <div className="absolute top-4 left-4 flex gap-2">
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
                  className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isFavorited ? 'fill-[#e74c3c] text-[#e74c3c]' : 'text-[#44362A]'
                    }`}
                  />
                </motion.button>

                {/* Price Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-4 left-4"
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
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#44362A] hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Category & Rating */}
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

                {/* Order Type Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <h4 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider mb-3">
                    Order Type
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setOrderType('dine-in')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                        orderType === 'dine-in'
                          ? 'border-[#525A40] bg-[#525A40]/8 text-[#525A40]'
                          : 'border-[#e8e2da] bg-white text-[#948D82] hover:border-[#c5beb5]'
                      }`}
                    >
                      <Store className="w-5 h-5" />
                      <span className="font-semibold text-sm">Dine In</span>
                    </button>
                    <button
                      onClick={() => setOrderType('take-out')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                        orderType === 'take-out'
                          ? 'border-[#525A40] bg-[#525A40]/8 text-[#525A40]'
                          : 'border-[#e8e2da] bg-white text-[#948D82] hover:border-[#c5beb5]'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                        <span className="font-semibold text-sm">Pick Up</span>
                    </button>
                  </div>
                </motion.div>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <h4 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider">Features</h4>
                  <div className="flex items-center gap-2 text-sm text-[#7a756d]">
                    <ChevronRight className="w-4 h-4 text-[#525A40]" />
                    <span>Freshly prepared daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7a756d]">
                    <ChevronRight className="w-4 h-4 text-[#525A40]" />
                    <span>Premium quality ingredients</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7a756d]">
                    <ChevronRight className="w-4 h-4 text-[#525A40]" />
                    <span>Available for dine-in and takeout</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Action Bar */}
              <div className="shrink-0 p-6 border-t border-[#e8e2da] bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
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
                    <div className="text-right">
                      <div className="text-xs text-[#948D82]">Subtotal</div>
                      <div className="font-heading text-lg font-bold text-[#525A40]">
                        {formatPrice(product.price * quantity)}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full gap-2 bg-[#525A40] hover:bg-[#44362A]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
