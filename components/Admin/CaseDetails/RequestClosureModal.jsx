"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RequestClosureModal({ onClose }) {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
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
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative"
      >
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
            <p className="text-lg font-bold text-gray-900">Closure Requested</p>
            <p className="text-sm text-gray-500 text-center">Case closure requested by the lawyer. Waiting for client approval.</p>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Closure</h2>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Reason for Request Closure
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write the reason clearly so the client and admin can understand why the case was declined."
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none min-h-[80px]"
              />
            </div>
            <p className="text-xs text-gray-400 text-right mb-6">
              Case closure requested by the lawyer. Waiting for client approval.
            </p>

            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={!reason.trim()}
                className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}