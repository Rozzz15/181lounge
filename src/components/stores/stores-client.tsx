'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Search, Navigation, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const stores = [
  { id: 1, name: 'SM Mall of Asia', address: 'Unit 123, Ground Floor, Main Mall Building', city: 'Pasay City', phone: '+63 (2) 8555-0123', hours: 'Mon-Sun: 9:00 AM - 10:00 PM', lat: 14.5350, lng: 120.9816 },
  { id: 2, name: 'Greenbelt 3', address: 'L2 Space 2013, Greenbelt 3 Complex', city: 'Makati City', phone: '+63 (2) 8555-0234', hours: 'Mon-Sun: 8:00 AM - 11:00 PM', lat: 14.5512, lng: 121.0238 },
  { id: 3, name: 'SM North EDSA', address: 'Unit 456, Upper Ground Floor, Block A', city: 'Quezon City', phone: '+63 (2) 8555-0345', hours: 'Mon-Sun: 9:00 AM - 10:00 PM', lat: 14.6561, lng: 121.0287 },
  { id: 4, name: 'Glorietta 4', address: 'G/F Glorietta 4, Ayala Center', city: 'Makati City', phone: '+63 (2) 8555-0456', hours: 'Mon-Sun: 10:00 AM - 9:00 PM', lat: 14.5520, lng: 121.0235 },
  { id: 5, name: 'Robinsons Place Manila', address: 'Level 1, Northwing', city: 'Manila', phone: '+63 (2) 8555-0567', hours: 'Mon-Sun: 10:00 AM - 9:00 PM', lat: 14.5794, lng: 120.9849 },
  { id: 6, name: 'Alabang Town Center', address: 'Unit 102, Ground Floor', city: 'Muntinlupa City', phone: '+63 (2) 8555-0678', hours: 'Mon-Sun: 10:00 AM - 9:00 PM', lat: 14.4081, lng: 121.0455 },
  { id: 7, name: 'SM Megamall', address: 'Building A, Level 2', city: 'Mandaluyong City', phone: '+63 (2) 8555-0789', hours: 'Mon-Sun: 10:00 AM - 10:00 PM', lat: 14.5839, lng: 121.0566 },
  { id: 8, name: 'Eastwood Mall', address: 'Level 2, Cyber & Fashion Mall', city: 'Quezon City', phone: '+63 (2) 8555-0890', hours: 'Mon-Sun: 11:00 AM - 11:00 PM', lat: 14.6067, lng: 121.0847 },
  { id: 9, name: 'SM Aura Premier', address: 'Level 3, Sky Park', city: 'Taguig City', phone: '+63 (2) 8555-0901', hours: 'Mon-Sun: 10:00 AM - 10:00 PM', lat: 14.5479, lng: 121.0563 },
  { id: 10, name: 'TriNoma', address: 'Level 1, Mall Entrance', city: 'Quezon City', phone: '+63 (2) 8555-1012', hours: 'Mon-Sun: 10:00 AM - 10:00 PM', lat: 14.6523, lng: 121.0356 },
  { id: 11, name: 'Power Plant Mall', address: 'Level 3, Rockwell Center', city: 'Makati City', phone: '+63 (2) 8555-1123', hours: 'Mon-Sun: 11:00 AM - 9:00 PM', lat: 14.5639, lng: 121.0323 },
  { id: 12, name: 'UP Town Center', address: 'Ground Floor, Katipunan Ave', city: 'Quezon City', phone: '+63 (2) 8555-1234', hours: 'Mon-Sun: 10:00 AM - 10:00 PM', lat: 14.6331, lng: 121.0711 },
];

const cities = [...new Set(stores.map(s => s.city))];

export function StoresClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [expandedStore, setExpandedStore] = useState<number | null>(null);

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const getDirections = (store: typeof stores[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero Banner */}
      <section className="relative h-[30vh] min-h-[250px] bg-gradient-to-br from-[#8B0000] via-[#D72D1D] to-[#C79A5D]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              FIND A STORE
            </h1>
            <p className="text-white/80 text-lg">
              Over 100 stores nationwide to serve you
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F8F8" />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="section -mt-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by store name or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-base appearance-none cursor-pointer focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20"
                >
                  <option value="All">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Store List */}
      <section className="section bg-[#F8F8F8] pt-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-[#666666]">
              Showing <span className="font-semibold text-[#222222]">{filteredStores.length}</span> stores
            </p>
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.05 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredStores.map((store) => (
              <motion.div
                key={store.id}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card 
                  hover 
                  className={`transition-all duration-300 ${expandedStore === store.id ? 'ring-2 ring-[#8B0000]' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 text-[#8B0000]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-xl font-bold text-[#222222] mb-1">
                          {store.name}
                        </h3>
                        <p className="text-[#666666] text-sm mb-3">{store.city}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-[#666666]">
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-[#C79A5D]" />
                            {store.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[#C79A5D]" />
                            {store.hours}
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedStore === store.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-gray-100"
                          >
                            <p className="text-sm text-[#666666] mb-4">
                              {store.address}
                            </p>
                          </motion.div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setExpandedStore(expandedStore === store.id ? null : store.id)}
                          >
                            {expandedStore === store.id ? 'Less Info' : 'More Info'}
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => getDirections(store)}
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredStores.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="font-heading text-2xl font-bold text-[#222222] mb-2">
                No stores found
              </h3>
              <p className="text-[#666666]">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#D72D1D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to open an 181 Lounge near you?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for opportunities to expand. Contact us for franchise inquiries.
          </p>
          <Button variant="accent" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
