'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowHoverButton } from '@/components/ui/flow-hover-button';
import { useCart } from '@/context/cart-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/story', label: 'Our Story' },
  { href: '/franchise', label: 'Get a Branch' },
  { href: '/contact', label: 'Contact Us' },
];

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden relative w-8 h-8 flex items-center justify-center"
      aria-label="Toggle menu"
    >
      <div className="relative w-6 h-5">
        <span
          className={cn(
            'absolute left-0 block h-[2px] w-full bg-[#927557] transition-all duration-300',
            open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
          )}
        />
        <span
          className={cn(
            'absolute left-0 block h-[2px] w-full bg-[#927557] transition-all duration-300',
            open ? 'opacity-0 top-1/2' : 'top-1/2 -translate-y-1/2'
          )}
        />
        <span
          className={cn(
            'absolute left-0 block h-[2px] w-full bg-[#927557] transition-all duration-300',
            open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
          )}
        />
      </div>
    </button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { itemCount, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#44362A]/95 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'bg-[#44362A]/80'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#927557]/20 blur-md group-hover:blur-xl group-hover:bg-[#C9A96E]/30 transition-all duration-500" />
                  <img
                    src="/images/logo.jpg"
                    alt="181 Lounge"
                    className="relative h-11 w-11 rounded-full object-cover ring-2 ring-[#927557]/40 group-hover:ring-[#C9A96E]/70 group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="inline-block font-heading text-xl font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:text-[#C9A96E] transition-colors duration-300">
                    181
                  </span>
                  <span className="inline-block font-heading text-xl font-semibold tracking-wide text-[#C9A96E] ml-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:text-white group-hover:tracking-[0.2em] transition-all duration-500">
                    Lounge
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'relative px-4 py-2 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 rounded-sm',
                    pathname === link.href
                      ? 'text-[#927557]'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-4 right-4 h-[2px] bg-[#927557]"
                    />
                  )}
                  <div className="absolute inset-0 rounded-sm bg-white/0 hover:bg-white/5 transition-colors duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#927557] text-white hover:bg-[#a88a67] shadow-lg shadow-[#927557]/30 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 bg-[#44362A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <Link to="/menu">
                <FlowHoverButton
                  className={cn(
                    isScrolled
                      ? 'border-white/70 text-white/90'
                      : 'border-white/60 text-white'
                  )}
                >
                  Order Now
                </FlowHoverButton>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Cart Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#927557] text-white hover:bg-[#a88a67] shadow-lg shadow-[#927557]/30 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 bg-[#44362A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <HamburgerButton
                open={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-[#44362A] border-l border-[#927557]/20 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
                <Link to="/" className="flex items-center gap-0.5 group/logo">
                  <span className="inline-block font-heading text-xl font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover/logo:text-[#C9A96E] transition-colors duration-300">
                    181
                  </span>
                  <span className="inline-block font-heading text-xl font-semibold tracking-wide text-[#C9A96E] ml-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover/logo:text-white group-hover/logo:tracking-[0.2em] transition-all duration-500">
                    Lounge
                  </span>
                </Link>
                <HamburgerButton
                  open={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          'group flex items-center gap-3 px-4 py-3.5 text-sm tracking-[0.1em] uppercase transition-all duration-300 rounded',
                          pathname === link.href
                            ? 'text-[#927557] bg-[#927557]/5'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className={cn(
                          'w-0 h-[1px] bg-[#927557] transition-all duration-300',
                          pathname === link.href ? 'w-6' : 'group-hover:w-6'
                        )} />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 py-8 border-t border-white/5">
                <Link to="/menu">
                  <FlowHoverButton className="w-full bg-[#525A40] text-white h-14 px-8">
                    Order Now
                  </FlowHoverButton>
                </Link>
                <p className="mt-4 text-center text-[10px] tracking-[0.2em] uppercase text-gray-600">
                  Coffee · Books · Boardgames
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
