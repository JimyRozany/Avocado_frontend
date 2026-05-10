"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function LawRulesTable({ rules }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl w-full border border-gray-100 shadow-sm p-5 my-6 mt-0"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">Law Rules</h2>
        <p className="text-xs text-gray-400 mt-1">
          All added rules will appear here
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-2 text-gray-400 font-semibold text-[11px]">
                Law Name
              </th>
              <th className="text-left py-2 px-2 text-gray-400 font-semibold text-[11px]">
                Rule #
              </th>
              <th className="text-left py-2 px-2 text-gray-400 font-semibold text-[11px]">
                Description
              </th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="popLayout">
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-300">
                    No rules added yet
                  </td>
                </tr>
              ) : (
                rules.map((rule, i) => (
                  <motion.tr
                    key={rule.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition"
                  >
                    <td className="py-3 px-2 text-gray-700">{rule.lawName}</td>

                    <td className="py-3 px-2 text-gray-500 font-mono">
                      {rule.ruleNumber}
                    </td>

                    <td className="py-3 px-2 text-gray-500 max-w-75">
                      <span className="line-clamp-2">{rule.description}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-2">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === i ? null : i)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100"
                        >
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>

                        <AnimatePresence>
                          {openMenu === i && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute right-0 mt-2 w-28 bg-white border border-gray-100 rounded-lg shadow-lg z-10"
                            >
                              <button
                                onClick={() => {
                                  console.log("Delete:", rule.id);
                                  setOpenMenu(null);
                                }}
                                className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </motion.div>
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

      {/* Footer */}
      <p className="text-[11px] text-gray-300 mt-3">
        Showing {rules.length} rules
      </p>
    </motion.div>
  );
}
