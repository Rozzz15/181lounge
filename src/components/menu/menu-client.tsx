'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All', icon: '☕' },
  { id: 'coffee', name: 'Coffee', icon: '🫘' },
  { id: 'cold-drinks', name: 'Cold Drinks', icon: '🥤' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'bakery', name: 'Bakery', icon: '🥐' },
  { id: 'lunch', name: 'Lunch', icon: '🍝' },
];

const products = [
  // Coffee
  { id: 1, name: 'Espresso', category: 'coffee', description: 'Rich, bold espresso shot', price: 95, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80', featured: true },
  { id: 2, name: 'Americano', category: 'coffee', description: 'Espresso with hot water', price: 115, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80', featured: true },
  { id: 3, name: 'Cappuccino', category: 'coffee', description: 'Espresso with steamed milk foam', price: 135, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', featured: false },
  { id: 4, name: 'Latte', category: 'coffee', description: 'Espresso with steamed milk', price: 135, image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&q=80', featured: false },
  { id: 5, name: 'Mocha', category: 'coffee', description: 'Espresso with chocolate and milk', price: 145, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&q=80', featured: true },
  { id: 6, name: 'White Chocolate Mocha', category: 'coffee', description: 'Espresso with white chocolate', price: 165, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&q=80', featured: true },
  // Cold Drinks
  { id: 7, name: 'Iced Coffee', category: 'cold-drinks', description: 'Chilled coffee over ice', price: 125, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80', featured: false },
  { id: 8, name: 'Iced Latte', category: 'cold-drinks', description: 'Espresso with cold milk over ice', price: 135, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', featured: false },
  { id: 9, name: 'Java Chip Frappe', category: 'cold-drinks', description: 'Blended coffee with chocolate chips', price: 165, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', featured: true },
  { id: 10, name: 'Caramel Frappe', category: 'cold-drinks', description: 'Blended coffee with caramel', price: 165, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', featured: false },
  { id: 11, name: 'Mango Milkshake', category: 'cold-drinks', description: 'Creamy mango shake with real mango', price: 155, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80', featured: true },
  { id: 12, name: 'Coconut Milkshake', category: 'cold-drinks', description: 'Tropical coconut shake', price: 155, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80', featured: false },
  // Breakfast
  { id: 13, name: 'Big Breakfast', category: 'breakfast', description: 'Eggs, bacon, sausage, beans, toast', price: 285, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80', featured: true },
  { id: 14, name: 'Pancakes', category: 'breakfast', description: 'Fluffy pancakes with maple syrup', price: 185, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', featured: false },
  { id: 15, name: 'Breakfast Platter', category: 'breakfast', description: 'Rice, eggs, bacon, and coffee', price: 245, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80', featured: false },
  { id: 16, name: 'Eggs Benedict', category: 'breakfast', description: 'Poached eggs with hollandaise on muffin', price: 225, image: 'https://images.unsplash.com/photo-1608039829572-9b6d02a0e3a5?w=400&q=80', featured: false },
  // Bakery
  { id: 17, name: 'Blueberry Muffin', category: 'bakery', description: 'Freshly baked with real blueberries', price: 95, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80', featured: false },
  { id: 18, name: 'Chocolate Croissant', category: 'bakery', description: 'Buttery croissant with chocolate', price: 110, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', featured: true },
  { id: 19, name: 'Chocolate Chip Cookie', category: 'bakery', description: 'Classic with chunks of chocolate', price: 75, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80', featured: false },
  { id: 20, name: 'Almond Croissant', category: 'bakery', description: 'Croissant filled with almond cream', price: 125, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', featured: false },
  // Lunch
  { id: 21, name: 'Ham & Cheese Panini', category: 'lunch', description: 'Grilled sandwich with ham and cheese', price: 185, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80', featured: true },
  { id: 22, name: 'Chicken Pesto Pasta', category: 'lunch', description: 'Penne with grilled chicken and pesto', price: 225, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', featured: false },
  { id: 23, name: 'Beef Burger Meal', category: 'lunch', description: 'Angus beef with fries and drink', price: 265, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', featured: false },
  { id: 24, name: 'Fish & Chips', category: 'lunch', description: 'Crispy fish with seasoned fries', price: 245, image: 'https://images.unsplash.com/photo-1579208030886-b1a5ed917e74?w=400&q=80', featured: false },
];

export function MenuClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-br from-[#8B0000] via-[#D72D1D] to-[#C79A5D]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              OUR MENU
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover our carefully crafted selection of premium coffees, 
              refreshing cold drinks, and delicious food items.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="section -mt-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-4 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="gap-2"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[#666666]">
              Showing <span className="font-semibold text-[#222222]">{filteredProducts.length}</span> items
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.05 } },
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
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <Card hover className={viewMode === 'list' ? 'flex flex-row' : 'h-full'}>
                    {/* Image */}
                    <div className={viewMode === 'list' ? 'w-48 h-32 relative flex-shrink-0' : 'relative h-48'}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-xl lg:rounded-xl"
                      />
                      {product.featured && (
                        <Badge variant="accent" className="absolute top-3 left-3">
                          Popular
                        </Badge>
                      )}
                    </div>

                    <CardContent className={viewMode === 'list' ? 'flex-1 p-4' : 'p-5'}>
                      <Badge variant="secondary" className="mb-2">
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </Badge>
                      <h3 className="font-heading text-xl font-bold text-[#222222] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-2xl font-bold text-[#8B0000]">
                          {formatPrice(product.price)}
                        </span>
                        <Button variant="primary" size="sm">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-2">
                No items found
              </h3>
              <p className="text-[#666666]">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
