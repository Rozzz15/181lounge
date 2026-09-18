'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, Star, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SideDrawer } from '@/components/ui/side-drawer';
import { formatPrice } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'frappe', name: 'Frappe' },
  { id: 'ice-coffee', name: 'Ice Coffee' },
  { id: 'hot-coffee', name: 'Hot Coffee Drinks' },
  { id: 'matcha', name: 'Matcha' },
  { id: 'signature', name: 'Signature Drinks' },
  { id: 'rice-meal', name: 'Rice Meal' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'sandwich-snack', name: 'Sandwich & Snack' },
  { id: 'books', name: 'Books' },
];

const products = [
  // Frappe
  { id: 1, name: 'Matcha Frappe', category: 'frappe', description: 'Creamy blended matcha frappe', price: 190, image: '/images/matchafrappe.jpg', featured: false, rating: 4.8, popular: false },
  { id: 2, name: 'Oreo Frappe', category: 'frappe', description: 'Blended frappe with crushed Oreo cookies', price: 190, image: '/images/oreofrappe.jpg', featured: false, rating: 4.9, popular: false },
  { id: 3, name: 'Salted Caramel Frappe', category: 'frappe', description: 'Rich frappe with salted caramel swirl', price: 190, image: '/images/saltedcaramelfrappe.jpg', featured: false, rating: 4.8, popular: false },
  { id: 4, name: 'Dark Mocha Frappe', category: 'frappe', description: 'Bold dark chocolate mocha frappe', price: 190, image: '/images/darkmochafrappe.jpg', featured: false, rating: 4.9, popular: false },
  { id: 5, name: 'White Mocha', category: 'frappe', description: 'Smooth white chocolate mocha frappe', price: 190, image: '/images/whitemocha.jpg', featured: false, rating: 4.8, popular: false },
  { id: 6, name: 'Choco Chip Frappe', category: 'frappe', description: 'Blended frappe with chocolate chips', price: 190, image: '/images/chocochipfrappe.jpg', featured: false, rating: 4.9, popular: false },
  { id: 7, name: 'Strawberry Frappe', category: 'frappe', description: 'Refreshing strawberry blended frappe', price: 190, image: '/images/strawberryfrappe.jpg', featured: false, rating: 4.8, popular: false },
  // Ice Coffee
  { id: 8, name: 'Americano', category: 'ice-coffee', description: 'Bold espresso with cold water over ice', price: 120, image: '/images/americano.jpg', featured: false, rating: 5, popular: true },
  { id: 9, name: 'Hazelnut Latte', category: 'ice-coffee', description: 'Espresso with hazelnut syrup and cold milk', price: 165, image: '/images/hazelnutlatte.jpg', featured: false, rating: 4.8, popular: false },
  { id: 10, name: 'Cafe Latte', category: 'ice-coffee', description: 'Classic espresso with smooth cold milk', price: 150, image: '/images/cafelatte.jpg', featured: true, rating: 4.9, popular: true },
  { id: 11, name: 'Spanish Latte', category: 'ice-coffee', description: 'Espresso with condensed milk over ice', price: 165, image: '/images/spanishlatte.jpg', featured: false, rating: 5, popular: false },
  { id: 12, name: 'Caramel Latte', category: 'ice-coffee', description: 'Espresso with caramel syrup and cold milk', price: 165, image: '/images/caramellatte.jpg', featured: true, rating: 4.9, popular: true },
  // Hot Coffee Drinks
  { id: 35, name: 'Americano', category: 'hot-coffee', description: 'Bold espresso blended with hot water for a smooth, clean taste', price: 150, image: '/images/hotamericano.jpg', featured: true, rating: 5, popular: true },
  { id: 36, name: 'Hazelnut Latte', category: 'hot-coffee', description: 'Smooth coffee with a rich hazelnut flavor and a warm, nutty finish', price: 180, image: '/images/hothazelnutlatte.jpg', featured: true, rating: 5, popular: true },
  { id: 37, name: 'Caffè Latte', category: 'hot-coffee', description: 'Espresso blended with steamed milk for a smooth, creamy taste', price: 180, image: '/images/hotcaffelatte.jpg', featured: true, rating: 4.9, popular: true },
  { id: 38, name: 'Cappuccino', category: 'hot-coffee', description: 'Espresso with steamed milk and a thick layer of foam for a rich, creamy finish', price: 180, image: '/images/hotcappuccino.jpg', featured: false, rating: 5, popular: false },
  { id: 39, name: 'Dark Mocha', category: 'hot-coffee', description: 'Rich espresso blended with dark chocolate for a bold, smooth, and indulgent taste', price: 180, image: '/images/hotdarkmocha.jpg', featured: true, rating: 4.9, popular: true },
  { id: 40, name: 'White Mocha', category: 'hot-coffee', description: 'Creamy espresso blended with smooth white chocolate for a rich, sweet finish', price: 180, image: '/images/hotwhitemocha.jpg', featured: false, rating: 5, popular: false },
  { id: 41, name: 'Caramel Latte', category: 'hot-coffee', description: 'Espresso blended with steamed milk and rich caramel for a smooth, sweet finish', price: 180, image: '/images/hotcaramellatte.jpg', featured: true, rating: 5, popular: true },
  // Matcha
  { id: 13, name: 'Strawberry Matcha', category: 'matcha', description: 'Layered matcha with fresh strawberry puree', price: 180, image: '/images/strawberrymatcha.jpg', featured: true, rating: 5, popular: true, sizes: [{ name: 'Medium', price: 180 }, { name: 'Large', price: 195 }] },
  { id: 14, name: 'Matcha Latte', category: 'matcha', description: 'Premium matcha whisked with steamed milk', price: 180, image: '/images/machalatte.jpg', featured: false, rating: 4.8, popular: false, sizes: [{ name: 'Medium', price: 180 }, { name: 'Large', price: 195 }] },
  { id: 34, name: 'Dirty Matcha', category: 'matcha', description: 'Matcha with a shot of espresso', price: 180, image: '/images/dirtymatcha.jpg', featured: true, rating: 5, popular: true },
  // Signature Drinks
  { id: 30, name: 'Offwhite Latte', category: 'signature', description: 'Our signature offwhite latte blend', price: 210, image: '/images/offwhitelatte.jpg', featured: true, rating: 5, popular: true },
  { id: 31, name: 'Salted Mocha', category: 'signature', description: 'Rich mocha with a hint of salt', price: 210, image: '/images/saltedmocha.jpg', featured: true, rating: 5, popular: true },
  { id: 32, name: '181 Signature', category: 'signature', description: 'Our iconic 181 signature drink', price: 210, image: '/images/181signature.jpg', featured: true, rating: 5, popular: true },
  { id: 33, name: 'Sea Salt Spanish Latte', category: 'signature', description: 'Spanish latte with a sea salt twist', price: 210, image: '/images/seasalt.jpg', featured: true, rating: 5, popular: true },
  // Rice Meal
  { id: 21, name: 'Chicken Souvlaki', category: 'rice-meal', description: 'Grilled chicken souvlaki served with rice', price: 190, image: '/images/chickensouvlaki.jpg', featured: true, rating: 5, popular: true },
  { id: 22, name: 'Hickory Pork', category: 'rice-meal', description: 'Hickory-smoked pork served with rice', price: 190, image: '/images/hickorypork.jpg', featured: true, rating: 4.9, popular: true },
  { id: 23, name: 'Chicken Tenders', category: 'rice-meal', description: 'Crispy chicken tenders served with rice', price: 190, image: '/images/chickentenders.jpg', featured: false, rating: 4.8, popular: false },
  { id: 24, name: 'Adobo Flakes', category: 'rice-meal', description: 'Classic Filipino adobo flakes served with rice', price: 190, image: '/images/adoboflakes.jpg', featured: true, rating: 5, popular: true },
  // Pasta
  { id: 25, name: 'Mushroom White', category: 'pasta', description: 'Creamy white sauce pasta with mushrooms', price: 189, image: '/images/mushroom.jpg', featured: true, rating: 5, popular: true },
  { id: 26, name: 'Charlie Chan', category: 'pasta', description: 'Signature pasta with savory sauce and toppings', price: 189, image: '/images/charliechan.jpg', featured: true, rating: 4.9, popular: true },
  { id: 27, name: 'Aglio Olio', category: 'pasta', description: 'Classic garlic and olive oil pasta', price: 189, image: '/images/aglio.jpg', featured: false, rating: 4.8, popular: false },
  // Sandwich & Snack
  { id: 28, name: 'Truffle Cheese', category: 'sandwich-snack', description: 'Grilled sandwich with truffle and cheese', price: 210, image: '/images/truffle.jpg', featured: true, rating: 5, popular: true },
  { id: 29, name: 'Nachos', category: 'sandwich-snack', description: 'Crispy nachos with cheese dip', price: 150, image: '/images/nachos.jpg', featured: true, rating: 4.9, popular: true },
  // Books
  { id: 15, name: 'The Coffee Guide', category: 'books', description: 'A beginner-friendly guide to brewing the perfect cup', price: 0, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', featured: true, rating: 4.9, popular: true },
  { id: 16, name: 'Kintugi: Embracing Imperfection', category: 'books', description: 'A local Filipino author\'s take on resilience and beauty', price: 0, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80', featured: false, rating: 4.8, popular: false },
  { id: 17, name: 'Quiet: The Power of Introverts', category: 'books', description: 'Bestseller on the strength of quiet people', price: 0, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80', featured: true, rating: 5, popular: true },
  { id: 18, name: 'Manila After Dark', category: 'books', description: 'A collection of short stories set in the city', price: 0, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80', featured: false, rating: 4.8, popular: false },
  { id: 19, name: 'Atomic Habits', category: 'books', description: 'Build good habits and break bad ones', price: 0, image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600&q=80', featured: true, rating: 5, popular: true },
  { id: 20, name: 'The Alchemist', category: 'books', description: 'A timeless fable about following your dreams', price: 0, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', featured: false, rating: 4.9, popular: false },
];

export function MenuClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F3F0E8]">
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat scale-105"
          style={{ backgroundImage: 'url(/images/menu.jpg)' }}
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
                          <span className="font-heading text-lg font-bold text-[#525A40]">{product.category === 'books' ? 'Ask at Cashier Desk' : formatPrice(product.price)}</span>
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
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F3F0E8] text-[#525A40] font-semibold text-sm hover:bg-[#525A40] hover:text-white transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                            {product.category === 'books' ? 'Add to Cart' : 'Add to Cart'}
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
                          <span className="font-heading text-base font-bold text-[#525A40]">{product.category === 'books' ? 'Ask at Cashier Desk' : formatPrice(product.price)}</span>
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
                            <span className="text-xs text-[#948D82] block mb-0.5">{product.category === 'books' ? '' : 'Price'}</span>
                            <span className="font-heading text-2xl font-bold text-[#525A40] group-hover:text-[#44362A] transition-colors duration-300">{product.category === 'books' ? 'Ask at Cashier Desk' : formatPrice(product.price)}</span>
                          </motion.div>
                          <motion.button
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#525A40] text-white font-semibold text-sm hover:bg-[#44362A] transition-all duration-300 shadow-lg shadow-[#525A40]/20 hover:shadow-xl hover:shadow-[#525A40]/30"
                          >
                            <Plus className="w-4 h-4" />
                          {product.category === 'books' ? 'Add to Cart' : 'Add to Cart'}
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
    </div>
  );
}
