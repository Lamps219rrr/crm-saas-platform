'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Plus, CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'

const taskCategories = [
  { name: 'Urgent', color: 'bg-red-100 dark:bg-red-900', count: 3 },
  { name: 'High', color: 'bg-orange-100 dark:bg-orange-900', count: 5 },
  { name: 'Medium', color: 'bg-yellow-100 dark:bg-yellow-900', count: 8 },
  { name: 'Low', color: 'bg-green-100 dark:bg-green-900', count: 12 },
]

const sampleTasks = [
  { id: 1, title: 'Follow up with TechCorp', dueDate: 'Today', priority: 'Urgent', completed: false },
  { id: 2, title: 'Send proposal to FinanceFlow', dueDate: 'Tomorrow', priority: 'High', completed: false },
  { id: 3, title: 'Schedule demo call', dueDate: 'Mar 20', priority: 'Medium', completed: false },
  { id: 4, title: 'Update contact info', dueDate: 'Mar 22', priority: 'Low', completed: true },
  { id: 5, title: 'Team meeting prep', dueDate: 'Mar 18', priority: 'High', completed: false },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(sampleTasks)
  const [filter, setFilter] = useState('all')

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const filteredTasks = filter === 'completed' ? tasks.filter((t) => t.completed) : filter === 'pending' ? tasks.filter((t) => !t.completed) : tasks

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-600 dark:text-red-400'
      case 'High':
        return 'text-orange-600 dark:text-orange-400'
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400'
      default:
        return 'text-green-600 dark:text-green-400'
    }
  }

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                <p className="text-gray-600 dark:text-gray-400">Stay on top of your work</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={20} /> New Task
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {taskCategories.map((cat) => (
                <Card key={cat.name}>
                  <div className={`p-6 ${cat.color} rounded-lg`}>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{cat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{cat.count}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              {['all', 'pending', 'completed'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'primary' : 'secondary'}
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f}
                </Button>
              ))}
            </div>

            {/* Tasks List */}
            <Card>
              <div className="p-6 space-y-4">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <button onClick={() => toggleTask(task.id)} className="focus:outline-none">
                        {task.completed ? (
                          <CheckCircle2 size={24} className="text-green-600 dark:text-green-400" />
                        ) : (
                          <Circle size={24} className="text-gray-400 dark:text-gray-500" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            task.completed
                              ? 'text-gray-500 dark:text-gray-400 line-through'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{task.dueDate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
