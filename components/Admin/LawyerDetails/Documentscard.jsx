"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Trash2, FileText, Upload, FilePlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CreateDocument, DeleteDocument } from "@/lib/LawyerManagement";

const DocumentItem = ({ doc, isEditing, onDelete, index }) => {
  const { loadingDocument } = useSelector((state) => state.LawyerRTK);
  const dispatch = useDispatch();
  const handleDownload = async () => {
    try {
      const response = await fetch(doc.url);

      if (!response.ok) throw new Error("File not found");

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = doc.name || "document";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };
  const HandleDelete = async () => {
    const result = await dispatch(DeleteDocument(doc.id));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, height: 0 }}
      className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-sm flex-shrink-0">
          <FileText className="w-5 h-5 text-[#c8a96e]" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-700 truncate">
            {doc.name}
          </p>

          <p className="text-xs text-stone-400">
            {doc.size || "—"} · {doc.date || "—"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-3">
        <button
          type="button"
          onClick={handleDownload}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white border border-transparent hover:border-stone-200 transition-all text-stone-400 hover:text-stone-700"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </button>

        {isEditing && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => HandleDelete()}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all text-stone-400 hover:text-rose-500"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default function DocumentsCard({
  documents = [],
  isEditing,
  onUpload,
  onDelete,
}) {
  const fileInputRef = useRef(null);
    const dispatch = useDispatch();
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      await dispatch(CreateDocument(formData));
    }

    e.target.value = "";
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            Documents
          </h2>

          <p className="text-xs text-stone-400 mt-0.5">
            {documents.length} file
            {documents.length !== 1 ? "s" : ""} attached
          </p>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload
            </motion.button>
          )}
        </AnimatePresence>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {documents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <FilePlus className="w-10 h-10 mx-auto text-stone-200 mb-3" />

              <p className="text-sm text-stone-400">No documents available</p>
            </motion.div>
          ) : (
            documents.map((doc, index) => (
              <DocumentItem
                key={doc.id}
                doc={doc}
                index={index}
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
