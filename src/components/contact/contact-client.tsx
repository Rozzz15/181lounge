'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Users, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Coffee Street', 'Manila, Philippines 1000'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+63 (2) 8888-8888', 'Mon-Sun: 8AM - 10PM'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@181lounge.ph', 'careers@181lounge.ph'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Sunday', '8:00 AM - 10:00 PM'],
  },
];

const quickActions = [
  { icon: MessageCircle, title: 'Live Chat', description: 'Chat with our team', color: 'bg-[#1877F2]' },
  { icon: Users, title: 'Careers', description: 'Join our team', color: 'bg-[#22C55E]' },
  { icon: Headphones, title: 'Support', description: 'Get help', color: 'bg-[#8B0000]' },
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
              CONTACT US
            </h1>
            <p className="text-white/80 text-lg">
              We&apos;d love to hear from you
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

      {/* Main Content */}
      <section className="section bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="font-heading text-3xl font-bold text-[#222222] mb-2">
                  Send us a message
                </h2>
                <p className="text-[#666666] mb-8">
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
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#222222]">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-base focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="feedback">Feedback</option>
                          <option value="complaint">Complaint</option>
                          <option value="franchise">Franchise Inquiry</option>
                          <option value="careers">Careers</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                        )}
                      </div>
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
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#222222] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#666666] mb-6">
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
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#222222]">
                        {info.title}
                      </h3>
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-[#666666] text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#8B0000] to-[#D72D1D] rounded-2xl shadow-lg p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <button
                      key={action.title}
                      className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">{action.title}</div>
                        <div className="text-white/70 text-sm">{action.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5!2d120.9849!3d14.5794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM0JzQ2LjAiTiAxMjDCsDU5JzA2LjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="181 Lounge Location"
                  />
                </div>
                <div className="p-4">
                  <Button variant="primary" size="sm" className="w-full">
                    Get Directions
                  </Button>
                </div>
              </div>
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
            <h2 className="font-heading text-4xl font-bold text-[#222222] mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What are your store hours?', a: 'Most of our stores are open from 8:00 AM to 10:00 PM, seven days a week. Some locations may have different hours.' },
              { q: 'Do you offer delivery?', a: 'Yes! You can order through our website, mobile app, or third-party delivery platforms like GrabFood and Foodpanda.' },
              { q: 'How can I apply for a job?', a: 'Visit our Careers page to see current openings and apply online. You can also submit your resume through our contact form.' },
              { q: 'Do you offer franchise opportunities?', a: 'Yes, we offer franchise opportunities. Please contact our franchise team through the form above for more information.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F8F8F8] rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold text-[#222222] mb-2">
                  {faq.q}
                </h3>
                <p className="text-[#666666]">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
