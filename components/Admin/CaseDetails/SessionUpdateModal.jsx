"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { createSession } from "@/lib/CaseManagement";

export default function SessionUpdateModal({
  mode = "session",
  onClose,
  CaseDataDetails,
}) {
  const dispatch = useDispatch();

  const [sessionDate, setSessionDate] = useState("");
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [saved, setSaved] = useState(false);

  const fileRef = useRef(null);

  const isDoc = mode === "document";
  const title = isDoc ? "Upload Document" : "Session Update";

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!sessionDate || !decision) return;

    try {
      const formData = new FormData();

      // REQUIRED FIELDS (match Postman exactly)
      formData.append("case_id", CaseDataDetails?.id);
      formData.append("session_date", sessionDate);
      formData.append("decision", decision);
      formData.append("notes", notes);

      // IMPORTANT: DO NOT SEND next_session_date

      // FILES
      if (uploadedFiles.length > 0) {
        formData.append("documents[0]", uploadedFiles[0]);
      }

      await dispatch(createSession(formData)).unwrap();

      setSaved(true);
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.log(err);
    }
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
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
      >
        {saved ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              ✓
            </div>
            <p className="text-lg font-bold text-gray-900">
              Session Saved Successfully
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>

            {/* SESSION DATE */}
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 mb-3 text-sm"
            />

            {/* DECISION */}
            <input
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="Decision"
              className="w-full border border-gray-200 rounded-xl p-3 mb-3 text-sm"
            />

            {/* NOTES */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes..."
              className="w-full border border-gray-200 rounded-xl p-3 mb-3 text-sm min-h-[80px]"
            />

            {/* FILE UPLOAD */}
            <div className="mb-4">
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={() => fileRef.current?.click()}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
              >
                Upload Document
              </button>
            </div>

            {/* FILE LIST */}
            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {uploadedFiles.map((file, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs flex items-center gap-2"
                  >
                    📎 {file.name}
                    <button
                      onClick={() => removeFile(i)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm"
              >
                Save
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
