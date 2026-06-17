"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CreateCase } from "@/lib/CaseManagement";
import { GetClient } from "@/lib/ClientManagement";
import { GetLawyer } from "@/lib/LawyerManagement";
import { ClipLoader } from "react-spinners";

export default function CreateCaseModalCompact({ onClose }) {
  const { ClientData } = useSelector((state) => state.ClientRTK);
  const { LawyerData } = useSelector((state) => state.LawyerRTK);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.type === "admin";
  const isLawyer = user?.type === "avocato";
  const isUser = user?.type === "client";
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { loadingCreate } = useSelector((state) => state.CaseRTK);

  const [form, setForm] = useState({
    case_number: "",
    title: "",
    type: "",
    court_name: "",
    lawyer_id: "",
    client_id: "",
  });

  const [documents, setDocuments] = useState([]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      file,
    }));

    setDocuments((prev) => [...prev, ...mapped]);
  };

  const handleSave = async () => {
    if (loadingCreate) return;

    const formData = new FormData();

    formData.append("case_number", form.case_number);
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("court_name", form.court_name);
    formData.append("lawyer_id", form.lawyer_id);
    formData.append("client_id", form.client_id);

    documents.forEach((doc) => {
      if (doc.file instanceof File) {
        formData.append("documents[]", doc.file);
      }
    });

    const result = await dispatch(CreateCase(formData));

    if (CreateCase.fulfilled.match(result)) {
      onClose();
      setForm({
        case_number: "",
        title: "",
        type: "",
        court_name: "",
        lawyer_id: "",
        client_id: "",
      });
    }
  };

  useEffect(() => {
    dispatch(GetClient());
    dispatch(GetLawyer());
  }, [dispatch]);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{
          scale: 0.9,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Create New Case
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Case Number"
            value={form.case_number}
            onChange={(v) => handleChange("case_number", v)}
          />

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(v) => handleChange("title", v)}
          />

          <Input
            placeholder="Type"
            value={form.type}
            onChange={(v) => handleChange("type", v)}
          />

          <Input
            placeholder="Court Name"
            value={form.court_name}
            onChange={(v) => handleChange("court_name", v)}
          />

          {(isAdmin || isUser) && (
            <AnimatedSelect
              label="Lawyer"
              value={form.lawyer_id}
              options={LawyerData?.data?.data}
              onChange={(value) => handleChange("lawyer_id", value)}
            />
          )}

          {(isAdmin || isLawyer) && (
            <AnimatedSelect
              label="Client"
              value={form.client_id}
              options={ClientData?.data}
              onChange={(value) => handleChange("client_id", value)}
            />
          )}
        </div>

        {/* DOCUMENTS */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Documents
          </h3>

          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center border border-gray-100 rounded-lg px-3 py-2 bg-gray-50"
              >
                <span className="text-sm truncate">{doc.name}</span>

                <button
                  onClick={() =>
                    setDocuments((prev) => prev.filter((d) => d.id !== doc.id))
                  }
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleDocUpload}
          />

          <button
            onClick={() => fileRef.current?.click()}
            className="mt-3 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition"
          >
            + Upload Document
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
          >
            Cancel
          </button>

          <button
            disabled={loadingCreate}
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-50"
          >
            {loadingCreate && (
              <ClipLoader
                size={15}
                color="#fff "
                className="relative top-1 mx-1"
              />
            )}
            Save Case
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* INPUT */

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  );
}

/* ANIMATED SELECT */

function AnimatedSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const safeOptions = Array.isArray(options) ? options : [];

  const selected = safeOptions.find((item) => item.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-left text-sm text-gray-700"
      >
        {selected?.name || `Select ${label}`}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {options.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-amber-50"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
