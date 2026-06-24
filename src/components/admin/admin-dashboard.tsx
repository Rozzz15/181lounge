'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Coffee, Briefcase, Megaphone, 
  Users, Settings, LogOut, Menu, X, Plus, Edit, Trash2, 
  Search, Eye, EyeOff, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Coffee },
  { id: 'jobs', label: 'Careers', icon: Briefcase },
  { id: 'promotions', label: 'Promotions', icon: Megaphone },
];

const mockProducts = [
  { id: 1, name: 'Espresso', category: 'Coffee', price: 95, featured: true, active: true },
  { id: 2, name: 'Latte', category: 'Coffee', price: 135, featured: false, active: true },
  { id: 3, name: 'Mango Milkshake', category: 'Cold Drinks', price: 155, featured: true, active: true },
  { id: 4, name: 'Ham & Cheese Panini', category: 'Lunch', price: 185, featured: false, active: true },
];

const mockJobs = [
  { id: 1, title: 'Store Manager', department: 'Operations', location: 'Makati City', type: 'full_time', status: 'active' },
  { id: 2, title: 'Barista', department: 'Operations', location: 'Pasay City', type: 'part_time', status: 'active' },
  { id: 3, title: 'Marketing Coordinator', department: 'Marketing', location: 'Makati City', type: 'full_time', status: 'active' },
];

const mockPromotions = [
  { id: 1, title: 'Summer Special', description: 'Buy 1 Get 1 Free on all milkshakes', active: true },
  { id: 2, title: 'Coffee Monday', description: '20% off on all hot coffees every Monday', active: true },
];

const stats = [
  { label: 'Total Products', value: '48', icon: Coffee, change: '+12%', color: 'text-[#525A40]' },
  { label: 'Open Positions', value: '8', icon: Briefcase, change: '+2', color: 'text-[#927557]' },
  { label: 'Active Promos', value: '4', icon: Megaphone, change: '-2', color: 'text-[#8B5CF6]' },
];

export function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Demo mode
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email === 'admin@181lounge.ph' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin@181lounge.ph / admin123');
    }
  };

  // Modal Handlers
  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  // Not Logged In - Show Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#525A40] via-[#525A40] to-[#927557] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
        >
          <div className="text-center mb-8">
            <Coffee className="w-16 h-16 mx-auto text-[#525A40] mb-4" />
            <h1 className="font-heading text-3xl font-bold text-[#44362A]">Admin Login</h1>
            <p className="text-[#948D82] mt-2">Sign in to manage 181 Lounge</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="admin@181lounge.ph"
            />
            <Input
              label="Password"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="Enter your password"
            />
            
            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {loginError}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-[#948D82] mt-6">
            Demo: admin@181lounge.ph / admin123
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#44362A] text-white flex flex-col"
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-[#948D82]">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <Coffee className="w-8 h-8 text-[#927557]" />
              <div>
                <span className="font-heading text-lg font-bold">181 Lounge</span>
                <span className="block text-xs text-[#927557]">Admin Panel</span>
              </div>
            </div>
          ) : (
            <Coffee className="w-8 h-8 text-[#927557] mx-auto" />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#948D82] rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-[#525A40] text-white'
                  : 'text-gray-400 hover:bg-[#948D82] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#948D82]">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-[#948D82] hover:text-white rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#44362A] capitalize">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-[#525A40] focus:outline-none focus:ring-2 focus:ring-[#525A40]/20"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#525A40] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                      <Card key={stat.label}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-[#948D82]">{stat.label}</p>
                              <p className={`font-heading text-3xl font-bold mt-1 ${stat.color}`}>
                                {stat.value}
                              </p>
                              <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
                            </div>
                            <div className="w-14 h-14 rounded-xl bg-[#F3F0E8] flex items-center justify-center">
                              <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockProducts.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#525A40]/10 flex items-center justify-center">
                                  <Coffee className="w-5 h-5 text-[#525A40]" />
                                </div>
                                <div>
                                  <p className="font-medium text-[#44362A]">{product.name}</p>
                                  <p className="text-sm text-[#948D82]">{product.category}</p>
                                </div>
                              </div>
                              <Badge variant={product.active ? 'success' : 'error'}>
                                {product.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[#948D82]">Manage your menu products</p>
                    <Button variant="primary" onClick={() => openModal('product')}>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Product
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <table className="w-full">
                        <thead className="bg-[#F3F0E8]">
                          <tr>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Product</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Category</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Price</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Featured</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Status</th>
                            <th className="text-right px-6 py-4 font-medium text-[#948D82]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {mockProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-[#F3F0E8]/50">
                              <td className="px-6 py-4 font-medium text-[#44362A]">{product.name}</td>
                              <td className="px-6 py-4 text-[#948D82]">{product.category}</td>
                              <td className="px-6 py-4 font-medium text-[#525A40]">₱{product.price}</td>
                              <td className="px-6 py-4">
                                {product.featured ? (
                                  <Badge variant="accent">Featured</Badge>
                                ) : (
                                  <span className="text-[#948D82]">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant={product.active ? 'success' : 'error'}>
                                  {product.active ? 'Active' : 'Inactive'}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Jobs Tab */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[#948D82]">Manage career listings</p>
                    <Button variant="primary" onClick={() => openModal('job')}>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Job
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <table className="w-full">
                        <thead className="bg-[#F3F0E8]">
                          <tr>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Position</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Department</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Location</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Type</th>
                            <th className="text-left px-6 py-4 font-medium text-[#948D82]">Status</th>
                            <th className="text-right px-6 py-4 font-medium text-[#948D82]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {mockJobs.map((job) => (
                            <tr key={job.id} className="hover:bg-[#F3F0E8]/50">
                              <td className="px-6 py-4 font-medium text-[#44362A]">{job.title}</td>
                              <td className="px-6 py-4 text-[#948D82]">{job.department}</td>
                              <td className="px-6 py-4 text-[#948D82]">{job.location}</td>
                              <td className="px-6 py-4">
                                <Badge variant="secondary">{job.type.replace('_', ' ')}</Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant="success">{job.status}</Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Promotions Tab */}
              {activeTab === 'promotions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[#948D82]">Manage promotional campaigns</p>
                    <Button variant="primary" onClick={() => openModal('promo')}>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Promotion
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {mockPromotions.map((promo) => (
                      <Card key={promo.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#525A40] to-[#525A40] flex items-center justify-center">
                              <Megaphone className="w-7 h-7 text-white" />
                            </div>
                            <Badge variant={promo.active ? 'success' : 'error'}>
                              {promo.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <h3 className="font-heading text-xl font-bold text-[#44362A] mb-2">
                            {promo.title}
                          </h3>
                          <p className="text-[#948D82] text-sm mb-4">{promo.description}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-50"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-[#44362A]">
                    Add New {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form className="p-6 space-y-4">
                {modalType === 'product' && (
                  <>
                    <Input label="Product Name" placeholder="e.g. Cappuccino" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#44362A]">Category</label>
                        <select className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-[#525A40] focus:outline-none">
                          <option>Coffee</option>
                          <option>Cold Drinks</option>
                          <option>Breakfast</option>
                          <option>Bakery</option>
                          <option>Lunch</option>
                          <option>Books</option>
                          <option>Boardgames</option>
                        </select>
                      </div>
                      <Input label="Price" type="number" placeholder="0.00" />
                    </div>
                    <Textarea label="Description" placeholder="Product description..." />
                  </>
                )}

                {modalType === 'job' && (
                  <>
                    <Input label="Job Title" placeholder="e.g. Store Manager" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#44362A]">Department</label>
                        <select className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-[#525A40] focus:outline-none">
                          <option>Operations</option>
                          <option>Marketing</option>
                          <option>Finance</option>
                          <option>HR</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#44362A]">Type</label>
                        <select className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-[#525A40] focus:outline-none">
                          <option value="full_time">Full-time</option>
                          <option value="part_time">Part-time</option>
                          <option value="contract">Contract</option>
                        </select>
                      </div>
                    </div>
                    <Input label="Location" placeholder="e.g. Makati City" />
                    <Textarea label="Description" placeholder="Job description..." />
                  </>
                )}

                {modalType === 'promo' && (
                  <>
                    <Input label="Promotion Title" placeholder="e.g. Summer Special" />
                    <Textarea label="Description" placeholder="Promotion details..." />
                    <Input label="CTA Link" placeholder="https://..." />
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
