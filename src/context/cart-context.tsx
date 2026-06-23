'use client';

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

export type OrderType = 'dine-in' | 'take-out';

export interface CartItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  orderType: OrderType;
  specialRequest?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity' | 'orderType'>, quantity: number, orderType: OrderType) => void;
  removeItem: (id: number, orderType: OrderType) => void;
  updateQuantity: (id: number, orderType: OrderType, quantity: number) => void;
  updateSpecialRequest: (id: number, orderType: OrderType, specialRequest: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity' | 'orderType'>, quantity: number, orderType: OrderType) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id && i.orderType === orderType);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id && i.orderType === orderType
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity, orderType }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: number, orderType: OrderType) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.orderType === orderType)));
  }, []);

  const updateQuantity = useCallback((id: number, orderType: OrderType, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.id === id && i.orderType === orderType)));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.orderType === orderType ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const updateSpecialRequest = useCallback((id: number, orderType: OrderType, specialRequest: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.orderType === orderType ? { ...i, specialRequest } : i))
    );
  }, []);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, updateSpecialRequest, clearCart, total, itemCount, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
