'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Store, Package, X, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SideDrawer } from '@/components/ui/side-drawer';
import { useCart, type OrderType } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'cold-drinks', name: 'Cold Drinks' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'books', name: 'Books' },
  { id: 'boardgames', name: 'Boardgames' },
];

const products = [
  // Coffee
  { id: 1, name: 'Espresso', category: 'coffee', description: 'Rich, bold espresso shot', price: 95, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 2, name: 'Americano', category: 'coffee', description: 'Espresso with hot water', price: 115, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&q=80', featured: true, rating: 4.7, popular: true },
  { id: 3, name: 'Cappuccino', category: 'coffee', description: 'Espresso with steamed milk foam', price: 135, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80', featured: false, rating: 4.6, popular: false },
  { id: 4, name: 'Latte', category: 'coffee', description: 'Espresso with steamed milk', price: 135, image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 5, name: 'Mocha', category: 'coffee', description: 'Espresso with chocolate and milk', price: 145, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 6, name: 'White Chocolate Mocha', category: 'coffee', description: 'Espresso with white chocolate', price: 165, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=600&q=80', featured: true, rating: 4.7, popular: true },
  // Cold Drinks
  { id: 7, name: 'Iced Coffee', category: 'cold-drinks', description: 'Chilled coffee over ice', price: 125, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80', featured: false, rating: 4.4, popular: false },
  { id: 8, name: 'Iced Latte', category: 'cold-drinks', description: 'Espresso with cold milk over ice', price: 135, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 9, name: 'Java Chip Frappe', category: 'cold-drinks', description: 'Blended coffee with chocolate chips', price: 165, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', featured: true, rating: 4.9, popular: true },
  { id: 10, name: 'Caramel Frappe', category: 'cold-drinks', description: 'Blended coffee with caramel', price: 165, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', featured: false, rating: 4.6, popular: false },
  { id: 11, name: 'Mango Milkshake', category: 'cold-drinks', description: 'Creamy mango shake with real mango', price: 155, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 12, name: 'Coconut Milkshake', category: 'cold-drinks', description: 'Tropical coconut shake', price: 155, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80', featured: false, rating: 4.5, popular: false },
  // Breakfast
  { id: 13, name: 'Big Breakfast', category: 'breakfast', description: 'Eggs, bacon, sausage, beans, toast', price: 285, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80', featured: true, rating: 4.9, popular: true },
  { id: 14, name: 'Pancakes', category: 'breakfast', description: 'Fluffy pancakes with maple syrup', price: 185, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', featured: false, rating: 4.6, popular: false },
  { id: 15, name: 'Breakfast Platter', category: 'breakfast', description: 'Rice, eggs, bacon, and coffee', price: 245, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 16, name: 'Eggs Benedict', category: 'breakfast', description: 'Poached eggs with hollandaise on muffin', price: 225, image: 'https://images.unsplash.com/photo-1608039829572-9b6d02a0e3a5?w=600&q=80', featured: false, rating: 4.7, popular: false },
  // Bakery
  { id: 17, name: 'Blueberry Muffin', category: 'bakery', description: 'Freshly baked with real blueberries', price: 95, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80', featured: false, rating: 4.4, popular: false },
  { id: 18, name: 'Chocolate Croissant', category: 'bakery', description: 'Buttery croissant with chocolate', price: 110, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 19, name: 'Chocolate Chip Cookie', category: 'bakery', description: 'Classic with chunks of chocolate', price: 75, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 20, name: 'Almond Croissant', category: 'bakery', description: 'Croissant filled with almond cream', price: 125, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80', featured: false, rating: 4.6, popular: false },
  // Lunch
  { id: 21, name: 'Ham & Cheese Panini', category: 'lunch', description: 'Grilled sandwich with ham and cheese', price: 185, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 22, name: 'Chicken Pesto Pasta', category: 'lunch', description: 'Penne with grilled chicken and pesto', price: 225, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80', featured: false, rating: 4.6, popular: false },
  { id: 23, name: 'Beef Burger Meal', category: 'lunch', description: 'Angus beef with fries and drink', price: 265, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', featured: false, rating: 4.7, popular: false },
  { id: 24, name: 'Fish & Chips', category: 'lunch', description: 'Crispy fish with seasoned fries', price: 245, image: 'https://images.unsplash.com/photo-1579208030886-b1a5ed917e74?w=600&q=80', featured: false, rating: 4.5, popular: false },
  // Books
  { id: 25, name: 'The Coffee Guide', category: 'books', description: 'A beginner-friendly guide to brewing the perfect cup', price: 350, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', featured: true, rating: 4.7, popular: true },
  { id: 26, name: 'Kintugi: Embracing Imperfection', category: 'books', description: 'A local Filipino author\'s take on resilience and beauty', price: 295, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 27, name: 'Quiet: The Power of Introverts', category: 'books', description: 'Bestseller on the strength of quiet people', price: 420, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 28, name: 'Manila After Dark', category: 'books', description: 'A collection of short stories set in the city', price: 275, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80', featured: false, rating: 4.4, popular: false },
  { id: 29, name: 'Atomic Habits', category: 'books', description: 'Build good habits and break bad ones', price: 450, image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600&q=80', featured: true, rating: 4.9, popular: true },
  { id: 30, name: 'The Alchemist', category: 'books', description: 'A timeless fable about following your dreams', price: 320, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', featured: false, rating: 4.6, popular: false },
  // Boardgames
  { id: 31, name: 'Catan', category: 'boardgames', description: 'Strategy game of settling and trading on an island', price: 1200, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&q=80', featured: true, rating: 4.9, popular: true },
  { id: 32, name: 'Cards Against Humanity', category: 'boardgames', description: 'A party game for horrible people', price: 850, image: 'https://images.unsplash.com/photo-1529480780007-52f8a14f3a7b?w=600&q=80', featured: true, rating: 4.8, popular: true },
  { id: 33, name: 'Scrabble', category: 'boardgames', description: 'Classic word game for 2-4 players', price: 950, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 34, name: 'Chess Set (Wooden)', category: 'boardgames', description: 'Handcrafted wooden chess set with storage', price: 1100, image: 'https://images.unsplash.com/photo-1586165368502-1bad06082d90?w=600&q=80', featured: false, rating: 4.6, popular: false },
  { id: 35, name: 'Monopoly', category: 'boardgames', description: 'The classic real estate trading game', price: 980, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&q=80', featured: false, rating: 4.5, popular: false },
  { id: 36, name: 'Exploding Kittens', category: 'boardgames', description: 'A hilarious card game for people who are into kittens and explosions', price: 650, image: 'https://images.unsplash.com/photo-1529480780007-52f8a14f3a7b?w=600&q=80', featured: true, rating: 4.7, popular: true },
];

export function MenuClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [orderTypeDialog, setOrderTypeDialog] = useState<{ product: typeof products[0] } | null>(null);
  const { addItem } = useCart();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = (() => {
      if (!query) return true;
      
      if (query.startsWith('under ') || query.startsWith('<')) {
        const num = parseInt(query.replace(/[^0-9]/g, ''));
        return !isNaN(num) && product.price < num;
      }
      if (query.startsWith('over ') || query.startsWith('>')) {
        const num = parseInt(query.replace(/[^0-9]/g, ''));
        return !isNaN(num) && product.price > num;
      }
      if (query.includes('-')) {
        const [min, max] = query.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
        if (!isNaN(min) && !isNaN(max)) {
          return product.price >= min && product.price <= max;
        }
      }
      
      const priceMatch = parseInt(query);
      if (!isNaN(priceMatch) && query.match(/^\d+$/)) {
        return product.price === priceMatch;
      }
      
      return product.name.toLowerCase().includes(query) ||
             product.description.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query);
    })();

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: typeof products[0], orderType: OrderType) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      1,
      orderType
    );
    setOrderTypeDialog(null);
  };

  return (
    <div className="min-h-screen bg-[#F3F0E8]">
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: 'url(/images/about.avif)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#44362A]/80 via-[#44362A]/60 to-[#44362A]/90" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[2px] bg-[#927557] mx-auto mb-6"
            />
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Our Menu
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto font-light">
              Discover our carefully crafted selection of premium coffees, 
              refreshing drinks, and artisanal food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[40px] sm:h-[50px] block">
          <path
            d="M0,30 C180,55 360,5 540,30 C720,55 900,5 1080,30 C1260,55 1380,20 1440,25 L1440,60 L0,60 Z"
            fill="#F3F0E8"
          />
        </svg>
      </div>

      {/* Menu Content */}
      <section className="section -mt-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-[#927557]/10 shadow-[0_8px_40px_-12px_rgba(68,54,42,0.12)] p-6 sm:p-8 mb-10 overflow-hidden"
          >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#927557]/40 to-transparent" />

            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search */}
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#948D82] group-focus-within:text-[#525A40] transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search menu, prices, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-[#F3F0E8]/60 border border-[#e8e2da] rounded-xl text-sm placeholder:text-[#b5aea4] focus:border-[#927557]/50 focus:ring-2 focus:ring-[#927557]/10 focus:bg-white transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#44362A]/10 flex items-center justify-center hover:bg-[#44362A]/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-[#44362A]" />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex gap-1.5 p-1 bg-[#F3F0E8]/80 rounded-xl border border-[#e8e2da]/60">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-[#44362A] text-white shadow-md shadow-[#44362A]/20'
                      : 'text-[#948D82] hover:text-[#44362A] hover:bg-white/60'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-[#44362A] text-white shadow-md shadow-[#44362A]/20'
                      : 'text-[#948D82] hover:text-[#44362A] hover:bg-white/60'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mt-5 pt-5 border-t border-[#e8e2da]/60">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all duration-500 ease-out ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-[#44362A] to-[#525A40] text-white shadow-[0_4px_20px_-4px_rgba(68,54,42,0.35)]'
                        : 'text-[#7a756d] hover:text-[#44362A] hover:bg-[#F3F0E8]'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[#948D82]">
              Showing <span className="font-semibold text-[#44362A]">{filteredProducts.length}</span> items
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery + viewMode}
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.06 } },
              }}
              className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    initial: { opacity: 0, y: 25 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  {viewMode === 'grid' ? (
                    /* ========== GRID CARD ========== */
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-[#44362A]/5 hover:shadow-2xl hover:shadow-[#44362A]/10 transition-all duration-500 cursor-pointer"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <span className="font-heading text-lg font-bold text-[#525A40]">{formatPrice(product.price)}</span>
                        </div>
                        {product.popular && (
                          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#927557] text-white px-3 py-1.5 rounded-full shadow-lg">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-semibold">Popular</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-[#44362A] font-semibold text-sm">View Details</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-[#927557] uppercase tracking-wider">
                            {categories.find(c => c.id === product.category)?.name}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#e8e2da]" />
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-[#927557] text-[#927557]" />
                            <span className="text-xs text-[#948D82]">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-[#44362A] mb-1 group-hover:text-[#525A40] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#948D82] line-clamp-2 mb-4">{product.description}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOrderTypeDialog({ product }); }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F3F0E8] text-[#525A40] font-semibold text-sm hover:bg-[#525A40] hover:text-white transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ========== LIST / RECTANGLE CARD ========== */
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="group flex bg-white rounded-2xl overflow-hidden shadow-lg shadow-[#44362A]/5 hover:shadow-2xl hover:shadow-[#44362A]/10 transition-all duration-500 cursor-pointer border border-[#e8e2da]/50"
                    >
                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-48 sm:w-60 h-48 sm:h-52 flex-shrink-0 overflow-hidden"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 transition-opacity duration-500 group-hover:opacity-80" />
                        
                        {/* Price Badge on Image */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        >
                          <span className="font-heading text-base font-bold text-[#525A40]">{formatPrice(product.price)}</span>
                        </motion.div>

                        {product.popular && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#927557] text-white px-3 py-1.5 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[11px] font-semibold">Popular</span>
                          </motion.div>
                        )}

                        {/* Hover View Details */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="bg-white/95 rounded-full px-6 py-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <span className="text-[#44362A] font-bold text-sm tracking-wide">View Details</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center px-2.5 py-1 bg-[#525A40]/8 text-[#525A40] text-[11px] font-semibold rounded-md uppercase tracking-wider"
                            >
                              {categories.find(c => c.id === product.category)?.name}
                            </motion.span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-[#927557] text-[#927557]" />
                              <span className="text-sm font-medium text-[#948D82]">{product.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#44362A] mb-2 group-hover:text-[#525A40] transition-colors duration-300 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-sm text-[#948D82] line-clamp-2 leading-relaxed group-hover:text-[#7a756d] transition-colors duration-300">{product.description}</p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-[#e8e2da] via-[#e8e2da]/50 to-transparent my-4 group-hover:from-[#927557]/30 group-hover:via-[#927557]/10 transition-all duration-500" />

                        <div className="flex items-center justify-between">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="cursor-default"
                          >
                            <span className="text-xs text-[#948D82] block mb-0.5">Price</span>
                            <span className="font-heading text-2xl font-bold text-[#525A40] group-hover:text-[#44362A] transition-colors duration-300">{formatPrice(product.price)}</span>
                          </motion.div>
                          <motion.button
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); setOrderTypeDialog({ product }); }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#525A40] text-white font-semibold text-sm hover:bg-[#44362A] transition-all duration-300 shadow-lg shadow-[#525A40]/20 hover:shadow-xl hover:shadow-[#525A40]/30"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#e8e2da] flex items-center justify-center">
                <Search className="w-10 h-10 text-[#948D82]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#44362A] mb-2">
                No items found
              </h3>
              <p className="text-[#948D82] max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      <SideDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Order Type Dialog */}
      <AnimatePresence>
        {orderTypeDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOrderTypeDialog(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Dialog Header */}
                <div className="relative p-6 pb-4">
                  <button
                    onClick={() => setOrderTypeDialog(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-[#948D82] hover:bg-[#F3F0E8] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={orderTypeDialog.product.image}
                      alt={orderTypeDialog.product.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[#44362A]">
                        {orderTypeDialog.product.name}
                      </h3>
                      <p className="text-sm text-[#948D82]">
                        {formatPrice(orderTypeDialog.product.price)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#948D82]">
                    How would you like to enjoy this?
                  </p>
                </div>

                {/* Order Type Options */}
                <div className="px-6 pb-6 space-y-3">
                  <button
                    onClick={() => handleAddToCart(orderTypeDialog.product, 'dine-in')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-[#e8e2da] hover:border-[#525A40] hover:bg-[#525A40]/5 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#525A40]/10 flex items-center justify-center group-hover:bg-[#525A40]/20 transition-colors">
                      <Store className="w-7 h-7 text-[#525A40]" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-lg font-bold text-[#44362A]">Dine In</div>
                      <div className="text-sm text-[#948D82]">Enjoy at our cozy cafe</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAddToCart(orderTypeDialog.product, 'take-out')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-[#e8e2da] hover:border-[#927557] hover:bg-[#927557]/5 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#927557]/10 flex items-center justify-center group-hover:bg-[#927557]/20 transition-colors">
                      <Package className="w-7 h-7 text-[#927557]" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-lg font-bold text-[#44362A]">Pick Up</div>
                      <div className="text-sm text-[#948D82]">Grab and go</div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
