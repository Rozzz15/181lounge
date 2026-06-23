'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Hash, MessageSquare, Loader2, CheckCircle2, AlertCircle, Store, Package, CreditCard } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart, updateSpecialRequest } = useCart();
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'ewallet'>('cash');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const dineInItems = items.filter((i) => i.orderType === 'dine-in');
  const takeOutItems = items.filter((i) => i.orderType === 'take-out');
  const dineInTotal = dineInItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const takeOutTotal = takeOutItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tableNumber.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName: name.trim(),
          tableNumber: tableNumber.trim(),
          customerPhone: phone.trim() || undefined,
          customerEmail: email.trim() || undefined,
          paymentMethod,
          total,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send order');
      }

      setStatus('success');
      clearCart();

      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleClose = () => {
    setName('');
    setTableNumber('');
    setPhone('');
    setEmail('');
    setPaymentMethod('cash');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {status === 'success' ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#525A40] mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold text-[#44362A] mb-2">
                    Order Sent!
                  </h3>
                  <p className="text-sm text-[#948D82]">
                    Your order has been sent to 181 Lounge. We&apos;ll prepare it shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-[#e8e2da]">
                    <div>
                      <h2 className="font-heading text-lg font-bold text-[#44362A]">
                        Checkout
                      </h2>
                      <p className="text-xs text-[#948D82]">
                        {items.length} {items.length === 1 ? 'item' : 'items'} — {formatPrice(total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[#948D82] hover:bg-[#F3F0E8] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Order Summary with per-item requests */}
                    <div className="space-y-3">
                      {dineInItems.length > 0 && (
                        <div className="bg-[#F3F0E8]/50 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Store className="w-4 h-4 text-[#525A40]" />
                            <span className="font-heading text-xs font-bold text-[#44362A] uppercase tracking-wider">
                              Dine In
                            </span>
                          </div>
                          {dineInItems.map((item) => (
                            <div key={`${item.id}-dine-in`} className="py-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#44362A]">
                                  {item.name} <span className="text-[#948D82]">x{item.quantity}</span>
                                </span>
                                <span className="font-semibold text-[#525A40]">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                              <div className="relative mt-1.5">
                                <MessageSquare className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#c5beb5]" />
                                <input
                                  type="text"
                                  placeholder="Special request..."
                                  value={item.specialRequest || ''}
                                  onChange={(e) => updateSpecialRequest(item.id, item.orderType, e.target.value)}
                                  className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-white/70 border border-[#e8e2da] text-xs text-[#44362A] placeholder-[#c5beb5] focus:outline-none focus:ring-1 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all"
                                />
                              </div>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-[#e8e2da] flex justify-between text-sm">
                            <span className="text-[#948D82]">Subtotal</span>
                            <span className="font-bold text-[#525A40]">{formatPrice(dineInTotal)}</span>
                          </div>
                        </div>
                      )}

                      {takeOutItems.length > 0 && (
                        <div className="bg-[#F3F0E8]/50 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="w-4 h-4 text-[#927557]" />
                            <span className="font-heading text-xs font-bold text-[#44362A] uppercase tracking-wider">
                              Pick Up
                            </span>
                          </div>
                          {takeOutItems.map((item) => (
                            <div key={`${item.id}-take-out`} className="py-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#44362A]">
                                  {item.name} <span className="text-[#948D82]">x{item.quantity}</span>
                                </span>
                                <span className="font-semibold text-[#525A40]">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                              <div className="relative mt-1.5">
                                <MessageSquare className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#c5beb5]" />
                                <input
                                  type="text"
                                  placeholder="Special request..."
                                  value={item.specialRequest || ''}
                                  onChange={(e) => updateSpecialRequest(item.id, item.orderType, e.target.value)}
                                  className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-white/70 border border-[#e8e2da] text-xs text-[#44362A] placeholder-[#c5beb5] focus:outline-none focus:ring-1 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all"
                                />
                              </div>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-[#e8e2da] flex justify-between text-sm">
                            <span className="text-[#948D82]">Subtotal</span>
                            <span className="font-bold text-[#525A40]">{formatPrice(takeOutTotal)}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-[#e8e2da]">
                        <span className="font-heading text-base font-bold text-[#44362A]">Total</span>
                        <span className="font-heading text-lg font-bold text-[#525A40]">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider">
                        Order Details
                      </h4>

                      {/* Table Number + Name row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#948D82]" />
                          <select
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F3F0E8]/50 border border-[#e8e2da] text-sm text-[#44362A] focus:outline-none focus:ring-2 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all appearance-none"
                          >
                            <option value="" disabled>Table #</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1)}>Table {i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#948D82]" />
                          <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F3F0E8]/50 border border-[#e8e2da] text-sm text-[#44362A] placeholder-[#c5beb5] focus:outline-none focus:ring-2 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone + Email row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#948D82]" />
                          <input
                            type="tel"
                            placeholder="Phone (optional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F3F0E8]/50 border border-[#e8e2da] text-sm text-[#44362A] placeholder-[#c5beb5] focus:outline-none focus:ring-2 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#948D82]" />
                          <input
                            type="email"
                            placeholder="Email (optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F3F0E8]/50 border border-[#e8e2da] text-sm text-[#44362A] placeholder-[#c5beb5] focus:outline-none focus:ring-2 focus:ring-[#525A40]/30 focus:border-[#525A40] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider">
                        Payment Method
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cash')}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                            paymentMethod === 'cash'
                              ? 'border-[#525A40] bg-[#525A40]/5'
                              : 'border-[#e8e2da] bg-transparent hover:border-[#c5beb5]'
                          }`}
                        >
                          <span className="text-lg">💵</span>
                          <span className={`text-sm font-semibold ${paymentMethod === 'cash' ? 'text-[#525A40]' : 'text-[#948D82]'}`}>
                            Cash
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('ewallet')}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                            paymentMethod === 'ewallet'
                              ? 'border-[#525A40] bg-[#525A40]/5'
                              : 'border-[#e8e2da] bg-transparent hover:border-[#c5beb5]'
                          }`}
                        >
                          <span className="text-lg">📱</span>
                          <span className={`text-sm font-semibold ${paymentMethod === 'ewallet' ? 'text-[#525A40]' : 'text-[#948D82]'}`}>
                            E-Wallet
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-[#948D82]">
                        {paymentMethod === 'cash'
                          ? 'Pay with cash when you pick up your order.'
                          : 'Pay via GCash, Maya, or other e-wallets at the counter.'}
                      </p>
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading' || !name.trim() || !tableNumber.trim()}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:scale-[1.02] active:scale-[0.98] h-11 px-6 text-base w-full bg-[#525A40] hover:bg-[#44362A] disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Order...
                        </span>
                      ) : (
                        'Place Order'
                      )}
                    </button>

                    <p className="text-xs text-center text-[#948D82]">
                      Pickup at 35 Mamatid, Cabuyao, Philippines
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
