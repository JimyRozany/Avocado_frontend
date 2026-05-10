'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, SlidersHorizontal, Upload, MoreHorizontal, Check, Eye, Trash2, X } from 'lucide-react'

const ALL_TRANSACTIONS = [
  { id: '67HJUB89844', lawyer: 'Bahr',    plan: 'PLAN112', amount: '250.000EG', method: 'Vodafone Cash', date: 'Wed, 25 June 2025', status: 'COMPLETED' },
  { id: '67HJUB89845', lawyer: 'Ahmed',   plan: 'PLAN200', amount: '400.000EG', method: 'Credit Card',   date: 'Thu, 26 June 2025', status: 'PENDING'   },
  { id: '67HJUB89846', lawyer: 'Sara',    plan: 'PLAN050', amount: '120.000EG', method: 'Vodafone Cash', date: 'Fri, 27 June 2025', status: 'FAILED'    },
  { id: '67HJUB89847', lawyer: 'Mohamed', plan: 'PLAN112', amount: '250.000EG', method: 'Bank Transfer', date: 'Sat, 28 June 2025', status: 'COMPLETED' },
  { id: '67HJUB89848', lawyer: 'Layla',   plan: 'PLAN300', amount: '550.000EG', method: 'Credit Card',   date: 'Sun, 29 June 2025', status: 'PENDING'   },
  { id: '67HJUB89849', lawyer: 'Omar',    plan: 'PLAN050', amount: '120.000EG', method: 'Vodafone Cash', date: 'Mon, 30 June 2025', status: 'COMPLETED' },
]

const STATUS_FILTERS = ['ALL', 'COMPLETED', 'PENDING', 'FAILED']

const statusConfig = {
  COMPLETED: 'bg-green-50 text-green-600 border border-green-200',
  PENDING:   'bg-yellow-50 text-yellow-600 border border-yellow-200',
  FAILED:    'bg-red-50 text-red-500 border border-red-200',
}

const columns = ['ID Transaction', 'Lawyer Name', 'Plan', 'Amount', 'Payment Method', 'Date', 'Status', 'Action']

function ActionMenu({ onClose, onView, onDelete }) {
  const ref = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -4 }}
      transition={{ duration: 0.12 }}
      className="absolute right-0 top-8 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      <button
        onClick={onView}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Eye size={13} className="text-gray-400" /> View Details
      </button>
      <button
        onClick={onDelete}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
      >
        <Trash2 size={13} /> Delete
      </button>
    </motion.div>
  )
}

export default function SubscriptionTransactions() {
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [filterOpen, setFilterOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [rows, setRows] = useState(ALL_TRANSACTIONS)
  const [exported, setExported] = useState(false)
  const filterRef = useRef(null)

  // Close filter dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayed = statusFilter === 'ALL'
    ? rows
    : rows.filter((r) => r.status === statusFilter)

  const handleExport = () => {
    const csv = [
      columns.slice(0, -1).join(','),
      ...displayed.map((r) =>
        [r.id, r.lawyer, r.plan, r.amount, r.method, r.date, r.status].join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'transactions.csv'; a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id || prev.indexOf(r) !== prev.findIndex((x) => x.id === id)))
    setOpenMenu(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <LayoutGrid size={15} className="text-gray-400" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">Subscription Transactions</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              See insights on how your{' '}
              <span className="text-yellow-500 underline underline-offset-1 cursor-pointer">
                Subscription Transactions
              </span>{' '}
              has grown and changed over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((p) => !p)}
              className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs transition-colors ${
                filterOpen
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={13} />
              Filter
              {statusFilter !== 'ALL' && (
                <span className="ml-0.5 bg-yellow-400 text-gray-900 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">
                  1
                </span>
              )}
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Status</span>
                    {statusFilter !== 'ALL' && (
                      <button
                        onClick={() => setStatusFilter('ALL')}
                        className="text-[10px] text-red-400 hover:text-red-600 font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {STATUS_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => { setStatusFilter(f); setFilterOpen(false) }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors ${
                        statusFilter === f
                          ? 'bg-gray-50 text-gray-900 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{f === 'ALL' ? 'All Statuses' : f}</span>
                      {statusFilter === f && <Check size={12} className="text-gray-900" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs transition-all ${
              exported
                ? 'border-green-300 bg-green-50 text-green-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {exported ? <Check size={13} /> : <Upload size={13} />}
            {exported ? 'Exported!' : 'Export'}
          </button>
        </div>
      </div>

      {/* Active filter chip */}
      <AnimatePresence>
        {statusFilter !== 'ALL' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter('ALL')} className="text-gray-400 hover:text-gray-700">
                <X size={11} />
              </button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-160 text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left text-[11px] font-semibold text-gray-400 py-2 px-2 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-xs text-gray-300">
                    No transactions match the current filter.
                  </td>
                </tr>
              ) : (
                displayed.map((tx, i) => (
                  <motion.tr
                    key={tx.id + i}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.22, delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-gray-700">{tx.id}</td>
                    <td className="py-3 px-2 text-gray-700">{tx.lawyer}</td>
                    <td className="py-3 px-2 text-gray-500">{tx.plan}</td>
                    <td className="py-3 px-2 text-gray-700 font-medium">{tx.amount}</td>
                    <td className="py-3 px-2 text-gray-500">{tx.method}</td>
                    <td className="py-3 px-2 text-gray-500 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${statusConfig[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === i ? null : i)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            openMenu === i
                              ? 'border-gray-300 bg-gray-100'
                              : 'border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>
                        <AnimatePresence>
                          {openMenu === i && (
                            <ActionMenu
                              onClose={() => setOpenMenu(null)}
                              onView={() => setOpenMenu(null)}
                              onDelete={() => handleDelete(tx.id)}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <p className="text-[11px] text-gray-300 mt-3">
        Showing {displayed.length} of {rows.length} transactions
      </p>
    </motion.div>
  )
}