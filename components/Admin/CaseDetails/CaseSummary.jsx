"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fields = [
  { label: "Case Name", placeholder: "Enter case name" },
  { label: "Lawyer Name", placeholder: "Assigned lawyer" },
  { label: "Category", placeholder: "Case category" },
  { label: "Expectations", placeholder: "Client expectations", hasIcon: true },
  { label: "Last Update", placeholder: "Last update date" },
  { label: "First Hearing Date", placeholder: "dd/mm/yyyy" },
  { label: "Category", placeholder: "Category" },
  { label: "Circumstances", placeholder: "Circumstances" },
  { label: "Last Update", placeholder: "Details" },
  { label: "Transactions", placeholder: "Transaction info" },
  { label: "Judge", placeholder: "Presiding judge" },
  { label: "Court/Party", placeholder: "Court or party" },
];

const mainContent = [
  "Main summary of the case facts and background information goes here.",
  "Additional discovery descriptions and relevant case notes.",
  "List of all filing submissions related to the case.",
];

export default function CaseSummary() {
  const [editableFields, setEditableFields] = useState(
    fields.reduce((acc, f, i) => ({ ...acc, [i]: "" }), {})
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4"
    >
      <h2 className="text-base font-bold text-gray-900">Case Summary</h2>

      <div className="grid grid-cols-2 gap-3">
        {fields.map((field, i) => (
          <div key={i} className="relative">
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="text"
                value={editableFields[i]}
                onChange={(e) => setEditableFields((prev) => ({ ...prev, [i]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition bg-gray-50"
              />
              {field.hasIcon && (
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <h3 className="text-base font-bold text-gray-900 mb-3">Main Content Area</h3>
        <div className="flex flex-col gap-2">
          {mainContent.map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition bg-gray-50"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}