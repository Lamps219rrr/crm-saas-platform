'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'

const revenueData = [
  { month: 'Jan', revenue: 40000, target: 45000 },
  { month: 'Feb', revenue: 35000, target: 45000 },
  { month: 'Mar', revenue: 50000, target: 45000 },
  { month: 'Apr', revenue: 48000, target: 45000 },
  { month: 'May', revenue: 60000, target: 50000 },
  { month: 'Jun', revenue: 65000, target: 55000 },
]

const conversionData = [
  { name: 'Lead', value: 100, fill: '#3b82f6' },
  { name: 'Prospect', value: 60, fill: '#8b5cf6' },
  { name: 'Negotiation', value: 35, fill: '#f59e0b' },
  { name: 'Won', value: 20, fill: '#10b981' },
]

const teamData = [
  { name: 'John', deals: 12, revenue: 85000, conversion: 45 },
  { name: 'Sarah', deals: 18, revenue: 120000, conversion: 52 },
  { name: 'Mike', deals: 10, revenue: 72000, conversion: 38 },
  { name: 'Lisa', deals: 15, revenue: 95000, conversion: 48 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 space-y-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your sales performance and metrics</p>
            </div>

            {/* Revenue Chart */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue vs Target</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="target" stroke="#10b981" fill="none" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Conversion Funnel</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={conversionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-6 space-y-2">
                    {conversionData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: item.fill }}></div>
                          <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Team Performance */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Performers</h3>
                  <div className="space-y-4">
                    {teamData.map((member, i) => (
                      <div key={i} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{member.conversion}% Conversion</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Deals Closed</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{member.deals}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Revenue</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">${(member.revenue / 1000).toFixed(0)}K</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
