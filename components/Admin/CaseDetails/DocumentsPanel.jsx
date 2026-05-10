"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const initialDocs = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Document_${String(i + 1).padStart(3, "0")}.pdf`,
  uploadedBy: "Bahr Adam",
  date: "02 Jun 2025",
  size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
}));

export default function DocumentsPanel({ onUpload }) {
  const [docs, setDocs] = useState(initialDocs);
  const [hoveredDoc, setHoveredDoc] = useState(null);

  const handleDelete = (id) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col"
    >
      <h2 className="text-base font-bold text-gray-900 mb-4">Documents</h2>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-150 pr-1">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: i * 0.03 }}
            onHoverStart={() => setHoveredDoc(doc.id)}
            onHoverEnd={() => setHoveredDoc(null)}
            className="border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">FILE NAME</p>
                <p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>Uploaded By: <span className="text-gray-600">{doc.uploadedBy}</span></span>
                  <span>Date: <span className="text-gray-600">{doc.date}</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-100 transition"
                  title="Download"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(doc.id)}
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
        Upload Document
      </motion.button>
    </motion.div>
  );
}