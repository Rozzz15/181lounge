'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '35 Mamatid, Cabuyao',
    subvalue: 'Philippines, 4025',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Sun',
    subvalue: '7:00 AM – 10:00 PM',
  },
  {
    icon: Phone,
    label: 'Contact',
    value: '+63 912 345 6789',
    subvalue: 'Call or text us',
  },
];

export function BranchSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F3F0E8] overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #44362A 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
            <span className="w-8 h-px bg-[#927557]" />
            Visit Us
            <span className="w-8 h-px bg-[#927557]" />
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#44362A] mb-4">
            Find Our <span className="text-[#525A40]">Branch</span>
          </h2>
          <p className="text-[#7a756d] text-base sm:text-lg max-w-2xl mx-auto">
            Come visit us at 181 Lounge. We're located in the heart of Cabuyao, ready to serve you exceptional coffee and good vibes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-[#927557]/10"
          >
            <div className="aspect-[4/3] sm:aspect-[16/10] w-full bg-[#e8e4dc]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.1234567890123!2d121.12345678901234!3d14.234567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d12345678901%3A0x1234567890abcdef!2s35%20Mamatid%2C%20Cabuyao%2C%20Laguna!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="181 Lounge Location"
              />
            </div>
            {/* Map overlay gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F3F0E8] to-transparent pointer-events-none" />
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Contact cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#927557]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#525A40]/10 shrink-0">
                    <info.icon className="w-5 h-5 text-[#525A40]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#927557] mb-1">
                      {info.label}
                    </p>
                    <p className="text-[#44362A] font-semibold text-[15px]">
                      {info.value}
                    </p>
                    <p className="text-[#7a756d] text-sm">
                      {info.subvalue}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Get Directions Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#525A40] hover:bg-[#44362A] text-white h-14 text-[15px] font-semibold tracking-wide rounded-xl gap-2 group"
                >
                  <Navigation className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Get Directions
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </Button>
              </a>
            </motion.div>

            {/* Additional note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs text-[#948D82] mt-4"
            >
              Located near academic institutions in Mamatid, Cabuyao
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
