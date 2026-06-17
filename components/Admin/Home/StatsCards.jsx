'use client'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'


import React from 'react'

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const isNeg = stat?.change?.startsWith("-");
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`relative rounded-2xl p-5 flex flex-col justify-between min-h-32.5 shadow-sm border ${
              stat.dark ? "bg-gray-900 text-white border-gray-800" : "bg-white text-gray-900 border-gray-100"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-xl ${stat.dark ? "bg-white/10" : "bg-gray-100"}`}>
                <Icon size={18} className={stat.dark ? "text-white" : "text-gray-600"} />
              </div>
            </div>
            <div className="mt-3">
              <p className={`text-xs font-medium mb-1 ${stat.dark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${
                  stat.dark ? "text-yellow-400" : isNeg ? "text-red-400" : "text-green-500"
                }`}>
                  {isNeg ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StatsCards
