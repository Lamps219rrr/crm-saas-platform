'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Sun, Moon, Settings, User } from 'lucide-react'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Decode token to get user info
      const decoded = JSON.parse(atob(token.split('.')[1]))
      setUser(decoded)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <motion.nav
      className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex items-center justify-between"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg px-4 py-2">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none w-32"
          />
        </div>

        {/* Icons */}
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
          <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
          <Settings size={20} className="text-gray-600 dark:text-gray-400" />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-blue-700 transition">
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </motion.nav>
  )
}
