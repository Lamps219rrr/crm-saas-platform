'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star, Users, TrendingUp, BarChart3 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">CRM SaaS</div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              FAQ
            </a>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            {...fadeInUp}
          >
            The CRM That Grows With Your Business
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            Manage sales, customer relationships, and team productivity in one powerful platform. Like HubSpot and
            Salesforce, but built for modern teams.
          </motion.p>
          <motion.div className="flex gap-4 justify-center mb-12" {...fadeInUp}>
            <Link href="/auth/signup">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-2 transition shadow-lg">
                Start Free Trial <ArrowRight size={20} />
              </button>
            </Link>
            <button className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 aspect-video"
          style={{ y: scrollY * 0.1 }}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-600 dark:text-gray-400">
            <div className="text-center">
              <BarChart3 size={64} className="mx-auto mb-4 opacity-50" />
              <p>Dashboard Preview Coming Soon</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Trusted Companies */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-8">TRUSTED BY LEADING COMPANIES</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {['TechCorp', 'FinanceFlow', 'RetailMax', 'CloudSync', 'DataHub'].map((company) => (
              <div key={company} className="text-gray-400 dark:text-gray-600 text-lg font-semibold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features for Modern Sales Teams</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to manage your entire customer lifecycle</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Sales Pipeline',
              description: 'Track deals through stages with visual Kanban boards',
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Contact Management',
              description: 'Centralize all customer information in one place',
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: 'Analytics',
              description: 'Real-time insights into your sales performance',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Choose the perfect plan for your business</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', features: ['Up to 5 users', 'Basic features', 'Email support'] },
              {
                name: 'Professional',
                price: '$79',
                features: ['Up to 25 users', 'All features', 'Priority support', 'API access'],
                highlighted: true,
              },
              { name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Advanced features', '24/7 support', 'Custom integrations'] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-2xl ${
                  plan.highlighted ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 font-semibold rounded-lg transition ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 max-w-3xl mx-auto">
        <motion.h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center" {...fadeInUp}>
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-6">
          {[
            { q: 'Is there a free trial?', a: 'Yes, enjoy 14 days free with full access to all features.' },
            { q: 'Can I cancel anytime?', a: 'Absolutely! Cancel your subscription anytime with no penalties.' },
            { q: 'Do you offer support?', a: 'Yes, we provide email support for all plans and 24/7 for Enterprise.' },
            { q: 'Can I integrate with other tools?', a: 'Yes, we support integrations with Slack, Zapier, and more.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Sales?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of teams using CRM SaaS to close more deals and grow faster.</p>
          <Link href="/auth/signup">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2">
              Start Your Free Trial <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">CRM SaaS</h3>
            <p>The modern CRM platform for growing businesses.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 CRM SaaS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
