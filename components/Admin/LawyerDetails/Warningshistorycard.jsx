"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { UpdateStatusWarning } from "@/lib/LawyerManagement";
const statusConfig = {
  resolved: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  active: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  pending: {
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

const StatusBadge = ({ status, isEditing, onChange }) => {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[status] || statusConfig.pending;

  if (!isEditing) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {status}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.color} hover:opacity-80 transition-opacity`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {status}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-10 top-full mt-1 left-0 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden"
          >
            {Object.keys(statusConfig).map((s) => (
              <button
                key={s}
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors ${statusConfig[s].color}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusConfig[s].dot}`}
                />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function WarningsHistoryCard({ warnings = [] }) {
  const dispatch = useDispatch();
  const [localWarnings, setLocalWarnings] = useState([]);

  useEffect(() => {
    if (Array.isArray(warnings)) {
      setLocalWarnings(warnings);
    }
  }, [warnings]);

  const handleStatusChange = (warning, newStatus) => {
    // 2. dispatch to backend
    dispatch(
      UpdateStatusWarning({
        id: warning.id,
        data: {
          status: newStatus,
        },
      }),
    );
  };

  const avgRating = 4.5;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            Warnings History
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            {localWarnings.length} warnings on record
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
          <svg
            className="w-3.5 h-3.5 text-amber-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-bold text-amber-700">{avgRating}</span>
        </div>
      </div>

      <div className="-mx-2">
        <table className="w-full min-w-130 text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Warning ID", "Reason", "Sent By", "Date", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {localWarnings.map((w, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors"
              >
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-600">
                  {w.warning_id}
                </td>
                <td className="py-3 px-3 text-stone-500 max-w-30">
                  <span className="block truncate text-xs">{w.reason}</span>
                </td>
                <td className="py-3 px-3 text-xs text-stone-500">{w.sentBy}</td>
                <td className="py-3 px-3 text-xs text-stone-400 whitespace-nowrap">
                  {w.date}
                </td>
                <td className="py-3 px-3">
                  <StatusBadge
                    status={w.status}
                    isEditing={true}
                    onChange={(s) => handleStatusChange(w, s)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
