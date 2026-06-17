"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const cases = [
  {
    name: "Active Cases",
    value: 85,
    color: "#16A34A",
    radius: [80, 88],
  },
  {
    name: "Closed Cases",
    value: 65,
    color: "#F97316",
    radius: [68, 76],
  },
  {
    name: "Pending Cases",
    value: 55,
    color: "#FACC15",
    radius: [56, 64],
  },
  {
    name: "Flagged Cases",
    value: 35,
    color: "#6B7280",
    radius: [44, 52],
  },
];

export default function CasesCreatedChart() {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            Cases Created per Month
          </h3>

          <div className="flex items-center gap-1 mt-2">
            <span className="text-red-500 text-xs">⬤</span>
            <span className="text-red-500 text-xs font-medium">
              4.3%
            </span>
          </div>
        </div>

        <button className="text-xs text-gray-500">
          This Week
        </button>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {cases.map((item, index) => (
              <>
                {/* Background Ring */}
                <Pie
                  key={`bg-${index}`}
                  data={[{ value: 100 }]}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={item.radius[0]}
                  outerRadius={item.radius[1]}
                  stroke="none"
                >
                  <Cell fill="#F1F5F9" />
                </Pie>

                {/* Progress Ring */}
                <Pie
                  key={`progress-${index}`}
                  data={[
                    { value: item.value },
                    { value: 100 - item.value },
                  ]}
                  dataKey="value"
                  startAngle={90}
                  endAngle={90 - (item.value / 100) * 360}
                  innerRadius={item.radius[0]}
                  outerRadius={item.radius[1]}
                  cornerRadius={20}
                  stroke="none"
                >
                  <Cell fill={item.color} />
                  <Cell fill="transparent" />
                </Pie>
              </>
            ))}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-3 mt-2 text-xs text-gray-600">
        {cases.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}