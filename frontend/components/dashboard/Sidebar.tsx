'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarChart3, Users, Briefcase, CheckSquare, Calendar, Settings, LogOut, Home } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { label: 'Overview', icon: Home, href: '/dashboard' },
  { label: 'Contacts', icon: Users, href: '/dashboard/contacts' },
  { label: 'Deals', icon: Briefcase, href: '/dashboard/deals' },
  { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
  { label: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  return (
    <motion.aside
      className={`bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          {!collapsed && <span>CRM SaaS</span>}
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
        >
          <span className="flex-shrink-0">☰</span>
          {!collapsed && <span>{collapsed ? 'Expand' : 'Collapse'}</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
