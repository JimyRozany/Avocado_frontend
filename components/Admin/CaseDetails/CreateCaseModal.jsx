"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { CreateCase } from "@/lib/CaseManagement";
import { toast } from "react-toastify";

export default function CreateCaseModalCompact({ onClose }) {
  const fileRef = useRef(null);
  const {loadingCreate} =useSelector((state)=>state.CaseRTK)
  const [form, setForm] = useState({
    caseName: "",
    lawyer: "",
    category: "",
    expectations: "",
    lastUpdate: "",
    firstHearingDate: "",
    category2: "",
    circumstances: "",
    lastUpdate2: "",
    transactions: "",
    judge: "",
    courtParty: "",
  });

  const [documents, setDocuments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionText, setSessionText] = useState("");
  const dispatch=useDispatch()
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 📄 Upload Documents
  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      file,
    }));
    setDocuments((prev) => [...prev, ...mapped]);
  };

  // 📝 Add Session
  const handleAddSession = () => {
    if (!sessionText.trim()) return;

    const newSession = {
      id: Date.now(),
      text: sessionText,
      date: new Date().toLocaleDateString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setSessionText("");
  };

  const handleSave = async () => {
    if(loadingCreate){
      return
    }
    const payload = {
      ...form,
      documents,
      sessions,
    };
    const result = await dispatch(CreateCase(payload))
    if(CreateCase.fulfilled.match(result)){
      toast.success("Added successfully")
    }
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Create New Case
        </h2>

        {/* 🔹 INPUTS */}
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Case name" value={form.caseName} onChange={(v) => handleChange("caseName", v)} />
          <Input placeholder="Lawyer name" value={form.lawyer} onChange={(v) => handleChange("lawyer", v)} />

          <Input placeholder="Category" value={form.category} onChange={(v) => handleChange("category", v)} />
          <Input placeholder="Expectations" value={form.expectations} onChange={(v) => handleChange("expectations", v)} />

          <div>
            <label className="text-[10px] text-gray-600 mb-1">lastUpdate</label>
            <Input type="date" value={form.lastUpdate} onChange={(v) => handleChange("lastUpdate", v)} />
          </div>
          <div>
            <label className="text-[10px] text-gray-600 mb-1">firstHearingDate</label>
            <Input type="date" value={form.firstHearingDate} onChange={(v) => handleChange("firstHearingDate", v)} />
          </div>

          <Input placeholder="Category" value={form.category2} onChange={(v) => handleChange("category2", v)} />
          <Input placeholder="Circumstances" value={form.circumstances} onChange={(v) => handleChange("circumstances", v)} />

          <Input placeholder="Last update" value={form.lastUpdate2} onChange={(v) => handleChange("lastUpdate2", v)} />
          <Input placeholder="Transactions" value={form.transactions} onChange={(v) => handleChange("transactions", v)} />

          <Input placeholder="Judge" value={form.judge} onChange={(v) => handleChange("judge", v)} />
          <Input placeholder="Court / Party" value={form.courtParty} onChange={(v) => handleChange("courtParty", v)} />
        </div>

        {/* 📄 DOCUMENTS */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Documents
          </h3>

          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center border border-gray-100 rounded-lg px-3 py-2 bg-gray-50"
              >
                <span className="text-sm text-gray-700 truncate">
                  {doc.name}
                </span>
                <button
                  onClick={() =>
                    setDocuments((prev) =>
                      prev.filter((d) => d.id !== doc.id)
                    )
                  }
                  className="text-xs text-red-500 hover:text-red-700"
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
            onClick={() => fileRef.current.click()}
            className="mt-3 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition"
          >
            + Upload Document
          </button>
        </div>

        {/* 📝 SESSIONS */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Sessions
          </h3>

          <textarea
            value={sessionText}
            onChange={(e) => setSessionText(e.target.value)}
            placeholder="Add session update..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />

          <button
            onClick={handleAddSession}
            className="mt-2 w-full py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600"
          >
            + Add Session
          </button>

          <div className="flex flex-col gap-2 mt-3 max-h-40 overflow-y-auto">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="border border-gray-100 rounded-lg px-3 py-2 bg-gray-50"
              >
                <p className="text-sm text-gray-700">{s.text}</p>
                <span className="text-xs text-gray-400">{s.date}</span>
              </div>
            ))}
          </div>
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
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700"
          >
            Save Case
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* 🔹 Reusable Input */
function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition bg-gray-50"
    />
  );
}