'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Briefcase, CheckSquare, DollarSign, Activity } from 'lucide-react'

const dashboardData = [
  { month: 'Jan', revenue: 4000, deals: 240, contacts: 120 },
  { month: 'Feb', revenue: 3000, deals: 221, contacts: 130 },
  { month: 'Mar', revenue: 2000, deals: 229, contacts: 140 },
  { month: 'Apr', revenue: 2780, deals: 200, contacts: 150 },
  { month: 'May', revenue: 1890, deals: 229, contacts: 160 },
  { month: 'Jun', revenue: 2390, deals: 200, contacts: 170 },
]

const StatCard = ({ icon: Icon, label, value, change }: any) => (
  <motion.div
    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
        <Icon size={24} />
      </div>
      <span className="text-green-600 text-sm font-semibold">{change}%</span>
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </motion.div>
)

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, John! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your sales today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Total Revenue" value="$45,231" change="+12" />
        <StatCard icon={Briefcase} label="Active Deals" value="24" change="+8" />
        <StatCard icon={Users} label="New Contacts" value="156" change="+15" />
        <StatCard icon={CheckSquare} label="Tasks Complete" value="89%" change="+5" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trend</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Deals Chart */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Deals by Stage</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Current pipeline</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="deals" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'Deal Won', description: 'Enterprise Package - $50,000', time: '2 hours ago' },
            { type: 'New Contact', description: 'Sarah Johnson from TechCorp', time: '4 hours ago' },
            { type: 'Meeting Scheduled', description: 'Demo call with Acme Inc.', time: '1 day ago' },
            { type: 'Task Completed', description: 'Follow-up email sent to leads', time: '2 days ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
