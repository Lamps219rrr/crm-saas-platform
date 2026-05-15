'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Plus, MoreHorizontal, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

const pipelineStages = [
  { name: 'Lead', color: 'bg-blue-500', deals: 15 },
  { name: 'Proposal', color: 'bg-purple-500', deals: 8 },
  { name: 'Negotiation', color: 'bg-orange-500', deals: 5 },
  { name: 'Closed Won', color: 'bg-green-500', deals: 12 },
]

const sampleDeals = [
  { id: 1, name: 'Enterprise Package', value: 50000, client: 'TechCorp', stage: 'Lead', probability: 30 },
  { id: 2, name: 'Annual Contract', value: 35000, client: 'FinanceFlow', stage: 'Proposal', probability: 60 },
  { id: 3, name: 'Implementation', value: 25000, client: 'RetailMax', stage: 'Negotiation', probability: 80 },
  { id: 4, name: 'Support Package', value: 15000, client: 'CloudSync', stage: 'Closed Won', probability: 100 },
]

export default function DealsPage() {
  const [selectedStage, setSelectedStage] = useState('Lead')

  const stageDealss = sampleDeals.filter((d) => d.stage === selectedStage)

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Pipeline</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your deals and opportunities</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={20} /> New Deal
              </Button>
            </div>

            {/* Pipeline Overview */}
            <div className="grid grid-cols-4 gap-4">
              {pipelineStages.map((stage) => (
                <motion.div
                  key={stage.name}
                  onClick={() => setSelectedStage(stage.name)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedStage === stage.name
                      ? 'bg-white dark:bg-slate-800 ring-2 ring-blue-500'
                      : 'bg-white dark:bg-slate-800 hover:shadow-md'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{stage.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stage.deals}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">deals</p>
                </motion.div>
              ))}
            </div>

            {/* Deals List */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{selectedStage} Deals</h3>
                <div className="space-y-4">
                  {stageDealss.map((deal) => (
                    <motion.div
                      key={deal.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{deal.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{deal.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                          <DollarSign size={16} />
                          {deal.value.toLocaleString()}
                        </p>
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${deal.probability}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{deal.probability}%</p>
                      </div>
                      <button className="ml-4 p-2 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-lg">
                        <MoreHorizontal size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
