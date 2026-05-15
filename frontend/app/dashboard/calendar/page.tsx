'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/dashboard/Navbar'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { motion } from 'framer-motion'
from
import { Card } from '@/components/ui/Card'

const sampleEvents = [
  { id: 1, title: 'Demo Call - TechCorp', date: 'Mar 18', time: '10:00 AM', location: 'Video Call', attendees: 3 },
  { id: 2, title: 'Team Standup', date: 'Mar 18', time: '11:00 AM', location: 'Conference Room A', attendees: 5 },
  { id: 3, title: 'Sales Review', date: 'Mar 19', time: '2:00 PM', location: 'Video Call', attendees: 8 },
  { id: 4, title: 'Client Meeting - FinanceFlow', date: 'Mar 20', time: '3:00 PM', location: 'Office', attendees: 4 },
]

export default function CalendarPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
    }
  }, [router])

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your meetings and events</p>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
              {sampleEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: event.id * 0.1 }}
                >
                  <Card className="p-6 hover">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{event.title}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar size={16} />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock size={16} />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin size={16} />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Users size={16} />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Edit
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
