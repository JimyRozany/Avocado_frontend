"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { LayoutGrid, ChevronDown } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name === "active" ? "Active Cases" : "Consultations"}:{" "}
            {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CaseActivityChart({ CaseChatData = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const data = CaseChatData?.map((item) => ({
    date: new Date(`${item.month}-01`).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
    active: item.active_cases,
    consult: item.pending_cases,
  }));
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
            <h2 className="text-sm font-bold text-gray-900">
              Case Activity Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              See insights on how your{" "}
              <span className="text-yellow-500 underline underline-offset-1 cursor-pointer">
                Case Activity Overview
              </span>{" "}
              has grown and changed over time
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-900 inline-block" />
          <span className="text-xs text-gray-600 font-medium">
            Active Cases
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="text-xs text-gray-600 font-medium">
            Pending Cases
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 5, 10, 15, 20]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#111827"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "#111827" }}
          />
          <Line
            type="monotone"
            dataKey="consult"
            stroke="#facc15"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "#facc15" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
