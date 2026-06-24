'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/input';
import { WaveText } from '@/components/ui/wave-text';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      { text: '35 Mamatid, Cabuyao', href: 'https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025' },
      { text: 'Philippines, 4025', href: 'https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025' },
    ],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      { text: '0948 751 0923', href: 'tel:+639487510923' },
      { text: 'Mon-Sun: 8AM - 10PM' },
    ],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      { text: 'hello@181lounge.ph', href: 'mailto:hello@181lounge.ph' },
      { text: 'careers@181lounge.ph', href: 'mailto:careers@181lounge.ph' },
    ],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: [
      { text: 'Monday - Sunday' },
      { text: '8:00 AM - 10:00 PM' },
    ],
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[400px] bg-gradient-to-br from-[#525A40] via-[#525A40] to-[#927557]">
        <div className="absolute inset-0">
          <img src="/images/contact.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              <WaveText text="CONTACT US" />
            </h1>
            <p className="text-white/80 text-lg">
              We&apos;d love to hear from you
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F3F0E8" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-[#F3F0E8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#44362A]">
              <WaveText text="Get in Touch" />
            </h2>
            <p className="text-[#948D82] mt-4 max-w-lg mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h3 className="font-heading text-2xl font-bold text-[#44362A] mb-2">
                  Send us a message
                </h3>
                <p className="text-[#948D82] text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Juan dela Cruz"
                      />
                      <Input
                        label="Email Address *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="juan@email.com"
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+63 912 345 6789"
                      />
                      <Select
                        label="Subject *"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        options={[
                          { value: '', label: 'Select a subject' },
                          { value: 'general', label: 'General Inquiry' },
                          { value: 'feedback', label: 'Feedback' },
                          { value: 'complaint', label: 'Complaint' },
                          { value: 'franchise', label: 'Franchise Inquiry' },
                          { value: 'careers', label: 'Careers' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </div>

                    <Textarea
                      label="Message *"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder="How can we help you today?"
                    />

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full sm:w-auto"
                      loading={isSubmitting}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#525A40]/10 flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-[#525A40]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#44362A] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#948D82] mb-8">
                      Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-10"
            >
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-heading text-lg font-bold text-[#44362A] mb-6 pb-4 border-b border-[#927557]/20">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#525A40] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <info.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-[#44362A] uppercase tracking-wider mb-1">
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          detail.href ? (
                            <a
                              key={i}
                              href={detail.href}
                              target={detail.href.startsWith('http') ? '_blank' : undefined}
                              rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-[#948D82] text-sm leading-relaxed hover:text-[#525A40] transition-colors"
                            >
                              {detail.text}
                            </a>
                          ) : (
                            <p key={i} className="text-[#948D82] text-sm leading-relaxed">
                              {detail.text}
                            </p>
                          )
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="h-52 bg-[#F3F0E8] relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1781956081798!6m8!1m7!1sWo4rzJ96KJcOFvC6x__X-g!2m2!1d14.23274339857088!2d121.1469768706495!3f333.64809728999063!4f-16.595971671633748!5f0.7820865974627469"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="181 Lounge Location"
                  />
                </div>
                <div className="p-5">
                  <a
                    href="https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="primary" size="md" className="w-full animate-pulse-ring">
                      Get Directions
                    </Button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[#927557] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
              <span className="w-8 h-px bg-[#927557]" />
              Help Center
              <span className="w-8 h-px bg-[#927557]" />
            </span>
            <h2 className="font-heading text-4xl font-bold text-[#44362A] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#948D82] text-lg max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: 'What are your operating hours?', a: 'We are open from 8:00 AM to 10:00 PM, seven days a week. Hours may vary during holidays.' },
              { q: 'Do you offer delivery?', a: 'Yes! You can order through our website, mobile app, or third-party delivery platforms like GrabFood and Foodpanda.' },
              { q: 'How can I apply for a job?', a: 'You can submit your resume through our contact form below and our team will reach out if there are relevant openings.' },
              { q: 'Do you offer franchise opportunities?', a: 'Yes, we offer franchise opportunities. Please contact our franchise team through the form above for more information.' },
              { q: 'Where are your stores located?', a: 'We are located at 35 Mamatid, Cabuyao, Philippines, 4025. You can find us easily using Google Maps.' },
              { q: 'Do you have books and boardgames?', a: 'Yes! We offer a curated collection of books and a variety of boardgames. Grab a seat, pick your activity, and enjoy.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className={`w-full text-left p-5 sm:p-6 rounded-xl transition-all duration-300 ${
                    faqOpen === index
                      ? 'bg-[#525A40] text-white shadow-lg shadow-[#525A40]/20'
                      : 'bg-[#F3F0E8] text-[#44362A] hover:bg-[#ebe6de]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-base sm:text-lg font-bold">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: faqOpen === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        faqOpen === index ? 'bg-white/20' : 'bg-[#525A40]/10'
                      }`}
                    >
                      <ChevronDown className={`w-4 h-4 ${faqOpen === index ? 'text-white' : 'text-[#525A40]'}`} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
