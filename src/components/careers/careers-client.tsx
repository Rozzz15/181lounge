'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ChevronRight, Users, Heart, Coffee, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';

const jobListings = [
  {
    id: 1,
    title: 'Store Manager',
    department: 'Operations',
    location: 'Makati City',
    type: 'full_time',
    description: 'Lead and inspire a team of baristas and crew members to deliver exceptional customer experiences.',
    requirements: '3+ years management experience, leadership skills, availability to work shifts',
    salary: '₱35,000 - ₱45,000',
  },
  {
    id: 2,
    title: 'Barista Trainer',
    department: 'Training',
    location: 'Quezon City',
    type: 'full_time',
    description: 'Conduct training programs for new baristas and ongoing development for existing staff.',
    requirements: '2+ years barista experience, excellent communication skills, coffee knowledge',
    salary: '₱25,000 - ₱32,000',
  },
  {
    id: 3,
    title: 'Assistant Manager',
    department: 'Operations',
    location: 'Pasay City',
    type: 'full_time',
    description: 'Support the store manager in daily operations, inventory management, and team supervision.',
    requirements: '1+ years supervisory experience, strong organizational skills',
    salary: '₱28,000 - ₱35,000',
  },
  {
    id: 4,
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'Makati City',
    type: 'full_time',
    description: 'Plan and execute marketing campaigns, promotions, and brand initiatives.',
    requirements: 'Marketing degree, creative mindset, social media proficiency',
    salary: '₱30,000 - ₱40,000',
  },
  {
    id: 5,
    title: 'Part-time Barista',
    department: 'Operations',
    location: 'Manila',
    type: 'part_time',
    description: 'Prepare and serve coffee and other beverages while providing excellent customer service.',
    requirements: '18+ years old, available to work weekends, friendly personality',
    salary: '₱180 - ₱220/hour',
  },
  {
    id: 6,
    title: 'Finance Analyst',
    department: 'Finance',
    location: 'Makati City',
    type: 'full_time',
    description: 'Analyze financial data, prepare reports, and support budgeting and forecasting activities.',
    requirements: 'Finance/Accounting degree, Excel proficiency, analytical skills',
    salary: '₱40,000 - ₱55,000',
  },
];

const benefits = [
  { icon: Coffee, title: 'Free Coffee Daily', description: 'Unlimited coffee and 50% off for friends & family' },
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive HMO coverage for you and dependents' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Clear advancement path and training programs' },
  { icon: Users, title: 'Team Culture', description: 'Dynamic, supportive team environment' },
];

const jobTypes: Record<string, { label: string; variant: 'default' | 'secondary' | 'accent' | 'outline' }> = {
  full_time: { label: 'Full-time', variant: 'default' },
  part_time: { label: 'Part-time', variant: 'secondary' },
  contract: { label: 'Contract', variant: 'accent' },
  internship: { label: 'Internship', variant: 'outline' },
};

export function CareersClient() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof jobListings[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (job: typeof jobListings[0]) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-[#8B0000] via-[#D72D1D] to-[#C79A5D] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              Join Our Family
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              CAREERS
            </h1>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
              Be part of something special. Join our team of passionate coffee lovers 
              and build a rewarding career with 181 Lounge.
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

      {/* Benefits Section */}
      <section className="section bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#222222] mb-4">
              WHY JOIN US?
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              We believe in taking care of our team members as well as they take care of our customers.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#222222] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#666666] text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#222222] mb-4">
              OPEN POSITIONS
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Find your perfect role and start your journey with us.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {jobListings.map((job) => (
              <motion.div
                key={job.id}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-[#8B0000]" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[#222222]">
                            {job.title}
                          </h3>
                          <p className="text-sm text-[#666666]">{job.department}</p>
                        </div>
                      </div>
                      <Badge variant={jobTypes[job.type]?.variant || 'default'}>
                        {jobTypes[job.type]?.label || job.type}
                      </Badge>
                    </div>

                    <p className="text-[#666666] mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#666666]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#C79A5D]" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#C79A5D]" />
                        {job.salary}
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowApplicationForm(false);
              setSubmitted(false);
              setSelectedJob(null);
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {!submitted ? (
              <>
                <div className="sticky top-0 bg-white p-6 border-b border-gray-100">
                  <h3 className="font-heading text-2xl font-bold text-[#222222]">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-[#666666] text-sm mt-1">
                    {selectedJob.location} • {selectedJob.department}
                  </p>
                  <button
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan dela Cruz"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@email.com"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+63 912 345 6789"
                  />
                  <Textarea
                    label="Cover Letter / Message"
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Tell us why you'd be a great fit for this role..."
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full"
                      loading={isSubmitting}
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-[#222222] mb-2">
                  Application Submitted!
                </h3>
                <p className="text-[#666666] mb-6">
                  Thank you for your interest in joining our team. We&apos;ll review your application and get back to you soon.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSubmitted(false);
                    setSelectedJob(null);
                    setFormData({ name: '', email: '', phone: '', coverLetter: '' });
                  }}
                >
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
