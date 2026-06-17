"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Download } from "lucide-react";
import { createDocument } from "@/lib/CaseManagement";

export default function DocumentsPanel({ CaseDataDetails }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const documents = CaseDataDetails?.documents || [];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length || !CaseDataDetails?.id) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("documents[]", file);
    });

    dispatch(
      createDocument({
        id: CaseDataDetails.id,
        data: formData,
      })
    );

    e.target.value = null;
  };

  const handleDownload = (doc) => {
    if (!doc?.file_path) return;

    const link = document.createElement("a");
    link.href = doc.file_path;
    link.target = "_blank";
    link.download = doc.name || "document";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (docId) => {
    console.log("Delete document:", docId);

    // dispatch(deleteDocument(docId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col"
    >
      <h2 className="text-base font-bold text-gray-900 mb-4">
        Documents
      </h2>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileUpload}
      />

      {/* Documents list */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-150 pr-1">
        {documents.length === 0 ? (
          <p className="text-sm text-gray-400">
            No documents uploaded
          </p>
        ) : (
          documents.map((doc, i) => (
            <motion.div
              key={doc.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group border border-gray-100 rounded-xl px-4 py-3 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    FILE NAME
                  </p>

                  <p className="text-sm font-medium text-gray-800 truncate">
                    {doc.name || doc.file_path || "Unnamed file"}
                  </p>

                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>
                      Uploaded By:{" "}
                      <span className="text-gray-600">
                        {doc.uploaded_by?.name || "Unknown"}
                      </span>
                    </span>

                    <span>
                      Date:{" "}
                      <span className="text-gray-600">
                        {doc.created_at
                          ? new Date(
                              doc.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(doc)}
                  className="p-2 rounded-lg hover:bg-white cursor-pointer transition"
                  title="Download document"
                >
                  <Download
                    size={18}
                    className="text-gray-600 hover:text-gray-900"
                  />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Upload button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span>
        Upload Document
      </motion.button>
    </motion.div>
  );
}