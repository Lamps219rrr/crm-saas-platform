'use client'

import { ReactNode } from 'react'

interface TableProps {
  columns: { key: string; label: string }[]
  data: any[]
  renderCell?: (key: string, value: any, row: any) => ReactNode
}

export function Table({ columns, data, renderCell }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {renderCell ? renderCell(col.key, row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
