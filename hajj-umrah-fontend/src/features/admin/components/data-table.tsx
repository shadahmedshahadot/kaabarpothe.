'use client'

import { motion } from 'framer-motion'
import { Search, Filter, Download } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  render: (row: T) => React.ReactNode
  className?: string
}

interface Props<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  emptyText?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function DataTable<T extends { id: string }>({ data, columns, searchPlaceholder = 'অনুসন্ধান…', emptyText = 'কোনো ডেটা নেই', filters, actions }: Props<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="search" placeholder={searchPlaceholder} className="w-full h-9 pl-10 pr-3 rounded-lg bg-muted/40 border border-transparent focus:border-primary focus:bg-card focus:outline-none text-sm transition-colors" />
        </div>
        <div className="flex gap-2 items-center">
          {filters}
          {actions ?? (
            <>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted inline-flex items-center gap-2">
                <Filter className="w-4 h-4" /> ফিল্টার
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted inline-flex items-center gap-2">
                <Download className="w-4 h-4" /> এক্সপোর্ট
              </motion.button>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map(c => (
                <th key={c.key} className={`px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground ${c.className ?? ''}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-12 text-muted-foreground">{emptyText}</td></tr>
            ) : (
              data.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6), ease: 'easeOut' }}
                  className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                >
                  {columns.map(c => (
                    <td key={c.key} className={`px-4 py-4 ${c.className ?? ''}`}>{c.render(row)}</td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex items-center justify-between border-t border-border text-xs text-muted-foreground">
        <span>দেখানো হচ্ছে {data.length} এর {data.length}</span>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-3 py-1 rounded border border-border hover:bg-muted">পূর্ববর্তী</motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-3 py-1 rounded border border-border hover:bg-muted">পরবর্তী</motion.button>
        </div>
      </div>
    </motion.div>
  )
}
