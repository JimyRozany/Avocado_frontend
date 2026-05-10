"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DocumentItem = ({ doc, isEditing, onDelete, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9, height: 0 }}
    className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors group"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg className="w-4 h-4 text-[#c8a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-stone-700 truncate">{doc.name}</p>
        <p className="text-xs text-stone-400">{doc.size || "—"} · {doc.date || "—"}</p>
      </div>
    </div>

    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
      <a
        href={doc.url || "#"}
        download={doc.name}
        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white border border-transparent hover:border-stone-200 transition-all text-stone-400 hover:text-stone-600"
        title="Download"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
      <button
        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white border border-transparent hover:border-stone-200 transition-all text-stone-400 hover:text-stone-600"
        title="View"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      {isEditing && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onDelete(index)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all text-stone-300 hover:text-rose-500"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      )}
    </div>
  </motion.div>
);

export default function DocumentsCard({ documents = [], isEditing, onUpload, onDelete }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      onUpload({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        url,
      });
    });
    e.target.value = "";
  };

  return (
    <motion.div layout className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">Documents</h2>
          <p className="text-xs text-stone-400 mt-0.5">{documents.length} file{documents.length !== 1 ? "s" : ""} attached</p>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload
            </motion.button>
          )}
        </AnimatePresence>
        <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
      </div>

      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {documents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-stone-300 text-sm"
            >
              <svg className="w-10 h-10 mx-auto mb-2 text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              No documents yet
            </motion.div>
          ) : (
            documents.map((doc, i) => (
              <DocumentItem
                key={doc.name + i}
                doc={doc}
                index={i}
                isEditing={isEditing}
                onDelete={onDelete}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}