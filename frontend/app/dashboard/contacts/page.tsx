'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Table } from '@/components/ui/Table'
import { Plus, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const sampleContacts = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@techcorp.com', company: 'TechCorp', status: 'Lead', phone: '+1-555-0123' },
  { id: 2, name: 'John Smith', email: 'john@financeflow.com', company: 'FinanceFlow', status: 'Customer', phone: '+1-555-0456' },
  { id: 3, name: 'Emily Davis', email: 'emily@retailmax.com', company: 'RetailMax', status: 'Prospect', phone: '+1-555-0789' },
  { id: 4, name: 'Michael Chen', email: 'michael@cloudsync.com', company: 'CloudSync', status: 'Lead', phone: '+1-555-0321' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa@datahub.com', company: 'DataHub', status: 'Customer', phone: '+1-555-0654' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'status', label: 'Status' },
  { key: 'phone', label: 'Phone' },
]

export default function ContactsPage() {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredContacts = sampleContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your customer relationships</p>
              </div>
              <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                <Plus size={20} /> Add Contact
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="secondary" className="flex items-center gap-2">
                <Filter size={20} /> Filter
              </Button>
            </div>

            {/* Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {contact.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{contact.email}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{contact.company}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              contact.status === 'Customer'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : contact.status === 'Prospect'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            }`}
                          >
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
