'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  Store, 
  TrendingUp, 
  Users, 
  Coffee, 
  ArrowRight,
  Phone,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Heart
} from 'lucide-react';

const PesoSign = ({ className }: { className?: string }) => (
  <span className={className} style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1 }}>₱</span>
);
import { Button } from '@/components/ui/button';
import { IdentityCardBody, RevealCardContainer } from '@/components/ui/animated-profile-card';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { number: '100+', label: 'Menu Items' },
  { number: '3', label: 'Revenue Streams' },
  { number: '24/7', label: 'Support System' },
  { number: '100%', label: 'Brand Support' },
];

const benefits = [
  {
    icon: Store,
    title: 'Proven Business Model',
    description: 'Join a growing brand with a successful track record in the coffee shop industry.',
  },
  {
    icon: TrendingUp,
    title: 'High ROI Potential',
    description: 'Benefit from our established supply chain, marketing support, and operational systems.',
  },
  {
    icon: Users,
    title: 'Full Training & Support',
    description: 'We provide comprehensive training, ongoing assistance, and business guidance.',
  },
  {
    icon: Coffee,
    title: 'Unique Concept',
    description: 'Offer coffee, books, and boardgames — a triple-revenue stream that keeps customers coming back.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Inquiry',
    description: 'Submit your interest through our form or contact us directly.',
    icon: Phone,
  },
  {
    number: '02',
    title: 'Evaluation',
    description: 'We review your application and schedule an initial meeting.',
    icon: CheckCircle2,
  },
  {
    number: '03',
    title: 'Discovery Day',
    description: 'Visit our flagship store and meet the team.',
    icon: MapPin,
  },
  {
    number: '04',
    title: 'Agreement',
    description: 'Review and sign the franchise agreement.',
    icon: CheckCircle2,
  },
  {
    number: '05',
    title: 'Training',
    description: 'Complete our comprehensive training program.',
    icon: Users,
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Open your very own 181 Lounge branch!',
    icon: Store,
  },
];

const investmentBreakdown = [
  { item: 'Store Build-Out', range: '₱500K - ₱800K', percentage: 35 },
  { item: 'Equipment & Fixtures', range: '₱400K - ₱600K', percentage: 25 },
  { item: 'Initial Inventory', range: '₱200K - ₱300K', percentage: 15 },
  { item: 'Franchise Fee', range: '₱250K - ₱400K', percentage: 15 },
  { item: 'Working Capital', range: '₱150K - ₱300K', percentage: 10 },
];

function useCountUp(end: number, duration: number = 1500, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView || !isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
}

function InvestmentItem({ item, index }: { item: typeof investmentBreakdown[number]; index: number }) {
  const { count, ref } = useCountUp(item.percentage, 1200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center gap-4"
    >
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[#44362A] font-medium">{item.item}</span>
          <span className="text-[#927557] font-semibold text-sm tabular-nums">{item.range}</span>
        </div>
        <div className="relative h-2.5 bg-[#927557]/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${item.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full bg-gradient-to-r from-[#525A40] to-[#927557] rounded-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.15 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/90 tabular-nums"
          >
            {count}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    quote: "Opening my 181 Lounge branch was the best decision I ever made. The support from head office is incredible.",
    author: "Maria Santos",
    location: "Calamba Branch Owner",
    rating: 5,
  },
  {
    quote: "The triple-revenue concept (coffee, books, boardgames) keeps customers coming back. Sales exceeded my expectations!",
    author: "Juan Dela Cruz",
    location: "Biñan Branch Owner",
    rating: 5,
  },
];

const inclusions = [
  'Complete store design & build-out assistance',
  'Comprehensive training program (2-4 weeks)',
  'Supply chain & vendor connections',
  'Marketing & brand support',
  'Technology & POS system setup',
  'Ongoing operational support',
  'Exclusive territory rights',
  'National marketing campaigns',
];

export function BranchFranchiseClient() {
  return (
    <main className="min-h-screen bg-[#F3F0E8]">
      {/* Hero Section - Full Height */}
      <section className="relative min-h-[90vh] flex items-center overflow-visible">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/branch.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(68, 54, 42, 0.85) 0%, rgba(58, 47, 36, 0.8) 50%, rgba(42, 32, 25, 0.9) 100%)',
          }}
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#927557]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#525A40]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#927557]/20 border border-[#927557]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#927557] animate-pulse" />
                <span className="text-[#927557] text-xs font-medium tracking-wider uppercase">
                  Limited Franchise Slots Available
                </span>
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Own a <span className="text-[#927557]">181 Lounge</span> Branch
              </h1>
              
              <p className="text-[#C5BEB3] text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Join a growing coffee shop brand that combines great coffee, curated books, 
                and boardgames into one successful business model.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#apply">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-[#927557] hover:bg-[#7d6248] text-white px-8 h-14 rounded-xl group text-base"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="tel:09487510923">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 px-8 h-14 rounded-xl text-base"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Talk to Us
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-[#C5BEB3]/60 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#927557]" />
                  <span>No Experience Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#927557]" />
                  <span>Full Support Provided</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Stats Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[#927557] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[#C5BEB3] text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Divider - overlaps hero bottom */}
      <div className="relative -mt-24 sm:-mt-32 z-10 pointer-events-none">
        <svg
          className="block w-full h-24 sm:h-32 md:h-40"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-to-cream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="15%" stopColor="transparent" />
              <stop offset="30%" stopColor="#F3F0E8" />
              <stop offset="100%" stopColor="#F3F0E8" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C180,50 360,0 540,35 C720,70 900,5 1080,40 C1200,55 1320,15 1440,30 L1440,100 L0,100 Z"
            fill="url(#hero-to-cream)"
          />
        </svg>
      </div>

      {/* Investment Section */}
      <section className="pt-20 sm:pt-24 bg-[#F3F0E8] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Investment Breakdown */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
                <span className="w-8 h-px bg-[#927557]" />
                Investment
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#44362A] mb-4">
                Total Investment: <span className="text-[#525A40]">₱1.5M - ₱3M</span>
              </h2>
              <p className="text-[#7a756d] text-lg leading-relaxed mb-8">
                Your investment includes everything you need to launch a successful 181 Lounge branch. 
                We believe in transparency — here's exactly where your money goes.
              </p>

              <div className="space-y-4">
                {investmentBreakdown.map((item, i) => (
                  <InvestmentItem key={item.item} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Right - What's Included */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl bg-white border border-[#927557]/10 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#525A40]/10 flex items-center justify-center">
                  <PesoSign className="w-6 h-6 text-[#525A40]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#44362A]">What's Included</h3>
              </div>

              <div className="space-y-4">
                {inclusions.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#525A40] mt-0.5 shrink-0" />
                    <span className="text-[#44362A]">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-[#F3F0E8] border border-[#927557]/10">
                <p className="text-[#7a756d] text-sm text-center">
                  <span className="font-semibold text-[#44362A]">ROI Timeline:</span> Most franchisees break even within 12-18 months
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider - Cream to White */}
        <div className="relative w-full h-[50px] sm:h-[70px] overflow-hidden">
          <svg
            viewBox="0 0 2880 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 h-full"
            style={{ width: '200%', animation: 'wave-slide 8s ease-in-out infinite alternate' }}
            preserveAspectRatio="none"
          >
            <path
              d="M0 0H2880V40C2520 80 2160 0 1800 40C1440 80 1080 0 720 40C360 80 0 0 0 40V0Z"
              fill="#F3F0E8"
            />
            <path
              d="M0 40C360 80 720 0 1080 40C1440 80 1800 0 2160 40C2520 80 2880 0 2880 40V100H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-20 sm:pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
              <span className="w-8 h-px bg-[#927557]" />
              Why Franchise With Us
              <span className="w-8 h-px bg-[#927557]" />
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#44362A]">
              The 181 Advantage
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <RevealCardContainer
                  accent="#525A40"
                  textOnAccent="#ffffff"
                  mutedOnAccent="rgba(255,255,255,0.8)"
                  base={
                    <IdentityCardBody
                      fullName={benefit.title}
                      place="Benefit"
                      about={benefit.description}
                      avatarUrl=""
                      avatarText=""
                      icon={<benefit.icon className="w-7 h-7" />}
                      scheme="plain"
                      displayAvatar={true}
                    />
                  }
                  overlay={
                    <IdentityCardBody
                      fullName={benefit.title}
                      place="Benefit"
                      about={benefit.description}
                      avatarUrl=""
                      avatarText=""
                      icon={<benefit.icon className="w-7 h-7" />}
                      scheme="accented"
                      displayAvatar={true}
                      cardCss={{ backgroundColor: "var(--accent-color)" }}
                    />
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider - Transitions from white to cream */}
      <div className="relative w-full h-[50px] sm:h-[70px] bg-white">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M0 0H1440V40C1260 80 1080 0 900 40C720 80 540 0 360 40C180 80 0 0 0 40V0Z"
            fill="white"
          />
          <path
            d="M0 40C180 80 360 0 540 40C720 80 900 0 1080 40C1260 80 1440 0 1440 40V100H0V40Z"
            fill="#F3F0E8"
          />
        </svg>
      </div>

      {/* Steps Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
              <span className="w-8 h-px bg-[#927557]" />
              How It Works
              <span className="w-8 h-px bg-[#927557]" />
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#44362A]">
              6 Steps to Your Own Branch
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#927557]/20 via-[#927557]/40 to-[#927557]/20 hidden sm:block" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className={`inline-block p-6 rounded-2xl bg-white border border-[#927557]/10 shadow-sm hover:shadow-md transition-shadow max-w-md ${
                      i % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        {i % 2 === 0 && (
                          <step.icon className="w-5 h-5 text-[#927557]" />
                        )}
                        <span className="font-heading text-3xl font-bold text-[#927557]/30">
                          {step.number}
                        </span>
                        {i % 2 !== 0 && (
                          <step.icon className="w-5 h-5 text-[#927557]" />
                        )}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#44362A] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#7a756d] text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#F3F0E8] border-4 border-[#927557]/20 items-center justify-center shrink-0 z-10">
                    <span className="font-heading text-lg font-bold text-[#927557]">
                      {step.number}
                    </span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
              <span className="w-8 h-px bg-[#927557]" />
              Success Stories
              <span className="w-8 h-px bg-[#927557]" />
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#44362A]">
              Hear From Our Franchisees
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-[#F3F0E8] border border-[#927557]/10 relative"
              >
                <div className="absolute top-6 right-8 text-[#927557]/20 font-heading text-8xl leading-none">
                  &ldquo;
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#927557] text-[#927557]" />
                  ))}
                </div>
                
                <p className="text-[#44362A] text-lg leading-relaxed mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#525A40] flex items-center justify-center text-white font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#44362A]">{testimonial.author}</p>
                    <p className="text-[#7a756d] text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative w-full h-[50px] sm:h-[70px] bg-white">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M0 0H1440V40C1260 80 1080 0 900 40C720 80 540 0 360 40C180 80 0 0 0 40V0Z"
            fill="white"
          />
          <path
            d="M0 40C180 80 360 0 540 40C720 80 900 0 1080 40C1260 80 1440 0 1440 40V100H0V40Z"
            fill="#44362A"
          />
        </svg>
      </div>

      {/* CTA Section */}
      <section id="apply" className="py-20 sm:py-28 bg-[#44362A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#927557]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#525A40]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#927557]/20 border border-[#927557]/30 mb-6">
              <Heart className="w-4 h-4 text-[#927557]" />
              <span className="text-[#927557] text-xs font-medium tracking-wider uppercase">
                Join Our Growing Family
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Own Your <span className="text-[#927557]">181 Lounge</span>?
            </h2>
            
            <p className="text-[#C5BEB3] text-lg leading-relaxed mb-10">
              Take the first step towards owning a thriving coffee shop business. 
              Our team is ready to guide you through every step of the process.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#927557] hover:bg-[#7d6248] text-white px-10 h-14 rounded-xl group text-base"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="tel:09487510923">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-10 h-14 rounded-xl text-base"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0948 751 0923
                </Button>
              </a>
            </div>

            <p className="text-[#C5BEB3]/60 text-sm mt-8">
              Or visit us at 35 Mamatid, Cabuyao, Philippines, 4025
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
