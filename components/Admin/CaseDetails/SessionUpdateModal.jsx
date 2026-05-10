"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const existingSessions = [
  {
    id: 1,
    text: "The hearing was held today, and the case was adjourned until July 15 to request an additional document.",
    by: "Bahr Adam",
    date: "02 Jun 2025",
  },
  {
    id: 2,
    text: "The hearing was held today, and the case was adjourned until July 15 to request an additional document.",
    by: "Bahr Adam",
    date: "02 Jun 2025",
  },
];

export default function SessionUpdateModal({ mode = "session", onClose }) {
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const isDoc = mode === "document";
  const title = isDoc ? "Upload Document" : "Session Updates";

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleSave = () => {
    if (!description.trim() && uploadedFiles.length === 0) return;
    setSaved(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative"
      >
        {saved ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-10"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
            <p className="text-lg font-bold text-gray-900">{isDoc ? "Document Uploaded" : "Session Saved"}</p>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>

            {/* Description */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isDoc ? "Add a note about this document..." : "Description"}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none min-h-[72px]"
              />
            </div>

            {/* Existing sessions/docs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {existingSessions.map((s) => (
                <div
                  key={s.id}
                  className="border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 flex flex-col gap-1"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                  <div className="flex gap-3 text-xs text-gray-400 mt-1">
                    <span>By: <span className="text-gray-600">{s.by}</span></span>
                    <span>Date: <span className="text-gray-600">{s.date}</span></span>
                  </div>
                  <div className="flex gap-1 mt-1 self-end">
                    <button className="p-1 rounded text-gray-400 hover:text-amber-500 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-1 rounded text-gray-400 hover:text-gray-700 transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="5" cy="12" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="19" cy="12" r="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {uploadedFiles.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium"
                  >
                    📎 {f.name}
                    <button
                      onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="ml-1 text-amber-600 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fileRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition"
              >
                Upload
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition"
              >
                Save
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}