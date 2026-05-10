"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const initialSessions = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  text: "The hearing was held today, and the case was adjourned until July 15 to request an additional document.",
  by: "Bahr Adam",
  date: "02 Jun 2025",
}));

export default function SessionsPanel({ onUpload }) {
  const [sessions, setSessions] = useState(initialSessions);

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col"
    >
      <h2 className="text-base font-bold text-gray-900 mb-4">Sessions</h2>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-150 pr-1">
        {sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: i * 0.04 }}
            className="border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition group"
          >
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{session.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-xs text-gray-400">
                <span>By: <span className="text-gray-600 font-medium">{session.by}</span></span>
                <span>Date: <span className="text-gray-600">{session.date}</span></span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-100 transition"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(session.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUpload}
        className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span>
        New Session
      </motion.button>
    </motion.div>
  );
}