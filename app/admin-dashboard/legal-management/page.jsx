"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LawRulesTable from "@/components/Admin/LegalManagment/LawRulesTable";

export default function CreateLawPage() {
  const [rules, setRules] = useState([]);

  const [form, setForm] = useState({
    lawName: "",
    ruleNumber: "",
    description: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.lawName || !form.ruleNumber) return;

    const newRule = {
      id: Date.now(),
      ...form,
    };

    setRules((prev) => [newRule, ...prev]);

    console.log("📘 LAW DATA:", newRule);

    setForm({
      lawName: "",
      ruleNumber: "",
      description: "",
    });
  };

  return (
    <>
      <div className=" bg-gray-50 flex items-start justify-center p-6 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
        >
          {!saved ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Add Law / Rule
              </h2>

              {/* 🔹 Law Name */}
              <Input
                placeholder="Law name (e.g. القانون المدني)"
                value={form.lawName}
                onChange={(v) => handleChange("lawName", v)}
              />

              {/* 🔹 Rule Number */}
              <Input
                placeholder="Rule number (e.g. 101)"
                value={form.ruleNumber}
                onChange={(v) => handleChange("ruleNumber", v)}
                type="number"
              />

              {/* 🔹 Description */}
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Rule description..."
                className="w-full mt-3 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none min-h-[100px]"
              />

              {/* 🔹 Save Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="mt-5 w-full py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition"
              >
                Save
              </motion.button>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                ✓
              </div>
              <p className="font-semibold text-gray-800">
                Law Saved Successfully
              </p>
            </motion.div>
          )}
        </motion.div>
        <LawRulesTable rules={rules} />
      </div>
      
    </>
  );
}

/* 🔹 Input Component (same style as your project) */
function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-3 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-gray-50"
    />
  );
}
