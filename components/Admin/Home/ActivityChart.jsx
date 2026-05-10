'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { LayoutGrid, ChevronDown } from 'lucide-react'

const data = [
  { date: 'Mar 26', active: 1600, consult: 1200 },
  { date: 'Mar 27', active: 1900, consult: 1500 },
  { date: 'Mar 28', active: 1400, consult: 1100 },
  { date: 'Mar 29', active: 1750, consult: 1400 },
  { date: 'Mar 30', active: 1300, consult: 1050 },
  { date: 'Mar 31', active: 1500, consult: 1300 },
  { date: 'Apr 1',  active: 1800, consult: 1550 },
  { date: 'Apr 2',  active: 1200, consult:  950 },
  { date: 'Apr 3',  active: 1650, consult: 1400 },
  { date: 'Apr 4',  active: 1500, consult: 1250 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name === 'active' ? 'Active Cases' : 'Consultations'}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function CaseActivityChart() {
  const [range, setRange] = useState('Last 90 Days')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-gray-400" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">Case Activity Overview</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              See insights on how your{' '}
              <span className="text-yellow-500 underline underline-offset-1 cursor-pointer">
                Case Activity Overview
              </span>{' '}
              has grown and changed over time
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 bg-white hover:bg-gray-50 transition self-start">
          {range}
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-900 inline-block" />
          <span className="text-xs text-gray-600 font-medium">Active Cases</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="text-xs text-gray-600 font-medium">Consultations</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 500, 1000, 1500, 2000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#111827"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#111827' }}
          />
          <Line
            type="monotone"
            dataKey="consult"
            stroke="#facc15"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#facc15' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
