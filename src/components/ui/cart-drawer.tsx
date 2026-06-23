'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Store, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import { CheckoutModal } from '@/components/ui/checkout-modal';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, setIsOpen]);

  // Group items by order type
  const dineInItems = items.filter((item) => item.orderType === 'dine-in');
  const takeOutItems = items.filter((item) => item.orderType === 'take-out');

  const dineInTotal = dineInItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const takeOutTotal = takeOutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 400 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-[#e8e2da]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#525A40]/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-[#525A40]" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#44362A]">Your Cart</h2>
                    <p className="text-xs text-[#948D82]">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#948D82] hover:bg-[#F3F0E8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#F3F0E8] flex items-center justify-center mb-4">
                      <ShoppingBag className="w-10 h-10 text-[#c5beb5]" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#44362A] mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-[#948D82] mb-6">
                      Add some delicious items from our menu
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/menu');
                      }}
                      className="bg-[#525A40] hover:bg-[#44362A]"
                    >
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Dine In Items */}
                    {dineInItems.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Store className="w-4 h-4 text-[#525A40]" />
                          <h3 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider">
                            Dine In
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {dineInItems.map((item) => (
                            <CartItemCard
                              key={`${item.id}-dine-in`}
                              item={item}
                              onUpdateQuantity={updateQuantity}
                              onRemove={removeItem}
                            />
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#e8e2da] flex justify-between items-center">
                          <span className="text-sm text-[#948D82]">Dine In Subtotal</span>
                          <span className="font-heading font-bold text-[#525A40]">
                            {formatPrice(dineInTotal)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Take Out Items */}
                    {takeOutItems.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-4 h-4 text-[#927557]" />
                          <h3 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider">
                            Pick Up
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {takeOutItems.map((item) => (
                            <CartItemCard
                              key={`${item.id}-take-out`}
                              item={item}
                              onUpdateQuantity={updateQuantity}
                              onRemove={removeItem}
                            />
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#e8e2da] flex justify-between items-center">
                          <span className="text-sm text-[#948D82]">Pick Up Subtotal</span>
                          <span className="font-heading font-bold text-[#525A40]">
                            {formatPrice(takeOutTotal)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="shrink-0 p-6 border-t border-[#e8e2da] bg-white space-y-4">
                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-lg font-bold text-[#44362A]">Total</span>
                    <span className="font-heading text-2xl font-bold text-[#525A40]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="flex-1 border-[#e8e2da] text-[#948D82] hover:bg-[#F3F0E8] hover:text-[#44362A]"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1 bg-[#525A40] hover:bg-[#44362A]"
                      onClick={() => {
                        setIsOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                    >
                      Checkout
                    </Button>
                  </div>

                  <p className="text-xs text-center text-[#948D82]">
                    Pickup at 35 Mamatid, Cabuyao, Philippines
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { id: number; name: string; price: number; image: string; quantity: number; orderType: 'dine-in' | 'take-out' };
  onUpdateQuantity: (id: number, orderType: 'dine-in' | 'take-out', quantity: number) => void;
  onRemove: (id: number, orderType: 'dine-in' | 'take-out') => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 p-3 rounded-xl bg-[#F3F0E8]/50"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-sm font-bold text-[#44362A] truncate">{item.name}</h4>
        <p className="text-xs text-[#948D82]">{formatPrice(item.price)}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-white rounded-full">
            <button
              onClick={() => onUpdateQuantity(item.id, item.orderType, item.quantity - 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#44362A] hover:bg-[#e8e2da] transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-semibold text-[#44362A]">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.orderType, item.quantity + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#44362A] hover:bg-[#e8e2da] transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id, item.orderType)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#948D82] hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="font-heading text-sm font-bold text-[#525A40]">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </motion.div>
  );
}
