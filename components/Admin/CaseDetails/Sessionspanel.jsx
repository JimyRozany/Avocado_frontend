"use client";

import { DeleteSession } from "@/lib/CaseManagement";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

export default function SessionsPanel({ onUpload, CaseDataDetails }) {
  const sessions = CaseDataDetails?.sessions || [];
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    const result = await dispatch(DeleteSession(id));
    if (DeleteSession.fulfilled.match(result)) {
    }
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
        {sessions.length === 0 ? (
          <p className="text-sm text-gray-400">No sessions yet</p>
        ) : (
          sessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    {session.text || session.decision || "No text"}
                  </p>

                  <div className="flex gap-3 text-xs text-gray-400">
                    <span>
                      By:{" "}
                      <span className="text-gray-600 font-medium">
                        {session.by?.name || session.creator?.name || "Unknown"}
                      </span>
                    </span>

                    <span>
                      Date:{" "}
                      <span className="text-gray-600">
                        {session.date || session.created_at?.slice(0, 10)}
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(session.id)}
                  title="Delete"
                  className="
                    opacity-0
                    translate-x-2
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    cursor-pointer
                    duration-200
                    text-red-500
                    hover:text-red-700
                    shrink-0
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
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
