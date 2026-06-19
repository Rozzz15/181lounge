'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const featuredStores = [
  {
    id: 1,
    name: 'SM Mall of Asia',
    address: 'Unit 123, Ground Floor, Main Mall Building',
    city: 'Pasay City',
    phone: '+63 (2) 8555-0123',
    hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
  },
  {
    id: 2,
    name: 'Greenbelt 3',
    address: 'L2 Space 2013, Greenbelt 3 Complex',
    city: 'Makati City',
    phone: '+63 (2) 8555-0234',
    hours: 'Mon-Sun: 8:00 AM - 11:00 PM',
  },
  {
    id: 3,
    name: 'SM North EDSA',
    address: 'Unit 456, Upper Ground Floor, Block A',
    city: 'Quezon City',
    phone: '+63 (2) 8555-0345',
    hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
  },
];

export function StoreLocatorPreview() {
  return (
    <section className="section bg-[#F8F8F8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#8B0000]/10 text-[#8B0000] rounded-full text-sm font-semibold mb-4">
            Visit Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222] mb-4">
            FIND A STORE NEAR YOU
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            With over 100 stores across the Philippines, there&apos;s always an 181 Lounge near you.
          </p>
        </motion.div>

        {/* Store Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {featuredStores.map((store) => (
            <motion.div key={store.id} variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}>
              <Card hover className="h-full">
                <CardContent className="p-6">
                  {/* Store Name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#8B0000]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#222222]">
                        {store.name}
                      </h3>
                      <p className="text-sm text-[#666666]">{store.city}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C79A5D] mt-1 flex-shrink-0" />
                      <span className="text-sm text-[#666666]">
                        {store.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#C79A5D] flex-shrink-0" />
                      <span className="text-sm text-[#666666]">{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#C79A5D] flex-shrink-0" />
                      <span className="text-sm text-[#666666]">{store.hours}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Directions
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/stores">
            <Button variant="primary" size="lg">
              Find All Stores
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
