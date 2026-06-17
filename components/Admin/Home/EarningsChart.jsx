"use client";

import { BadgeDollarSign, CakeSlice, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mo", value: 2200 },
  { day: "Tu", value: 3400 },
  { day: "We", value: 1900 },
  { day: "Th", value: 3600 },
  { day: "Fr", value: 4800 },
  { day: "Sa", value: 1700 },
  { day: "Su", value: 2300 },
];

const colors = [
  "#E9EDF2",
  "#F9C933",
  "#E9EDF2",
  "#FF6B57",
  "#DDE2E7",
  "#E9EDF2",
  "#E9EDF2",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white shadow-xl rounded-2xl px-4 py-3 border">
      <p className="text-xs text-gray-500">Earning</p>
      <p className="font-bold text-gray-900">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export default function EarningsChart() {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
  return (
    <div className="bg-white rounded-3xl border mt-5 border-gray-100 p-8 w-full">
      <div className="grid grid-cols-[280px_1fr] gap-8">
        {/* LEFT */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Earnings Overview
          </h3>

          <p className="text-sm text-gray-400 mt-8">
            Total Earnings this month
          </p>

          <h1 className="text-[64px] font-bold leading-none mt-3">$2,341</h1>

          <div className="mt-5 inline-flex items-center bg-yellow-400 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-white mr-2" />
            <span className="text-xs font-semibold text-white">
              +14% this month
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-8 leading-6">
            Update your status
            <br />
            information in Setting
          </p>
        </div>

        {/* RIGHT CHART */}
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="28%">
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 6000]}
                ticks={[0, 2000, 4000, 6000]}
                tick={{
                  fill: "#C2C8D0",
                  fontSize: 13,
                }}
                tickFormatter={(v) => (v === 0 ? "$0" : `$${v / 1000}K`)}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#A8AFB8",
                  fontSize: 14,
                }}
              />

              <Tooltip cursor={false} content={<CustomTooltip />} />

              <Bar dataKey="value" radius={[18, 18, 18, 18]} barSize={46}>
                {data.map((_, index) => (
                  <Cell key={index} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-3 gap-6 mt-10 border-t border-gray-300 pt-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Wallet size={24} className="text-gray-700" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <h4 className="text-3xl font-bold">$34,300</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center">
            <CakeSlice size={24} className="text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Cakes Earnings</p>
            <h4 className="text-3xl font-bold">$29,483</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B57] flex items-center justify-center">
            <BadgeDollarSign size={24} className="text-white" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Tax withheld</p>
            <h4 className="text-3xl font-bold">$3,430</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
