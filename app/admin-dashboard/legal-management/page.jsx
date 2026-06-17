"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LawRulesTable from "@/components/Admin/LegalManagment/LawRulesTable";
import { useDispatch, useSelector } from "react-redux";
import { CreateLegal, GetLegal, UpdateLegal } from "@/lib/LegalManagement";
import { ChevronDown } from "lucide-react";

export default function CreateLawPage() {
  const { loading, loadingAction, LegalData } = useSelector(
    (state) => state.LegalRTK,
  );
  const [editingRule, setEditingRule] = useState(null);
  const [form, setForm] = useState({
    lawName: "",
    ruleNumber: "",
    description: "",
  });
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [openLawDropdown, setOpenLawDropdown] = useState(false);
  const lawDropdownRef = useRef(null);

  const laws = [
    "القانون المدني",
    "القانون التجاري",
    "قانون العقوبات",
    "قانون الأسرة",
    "قانون الإجراءات الجنائية",
  ];
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.lawName || !form.ruleNumber) return;

    const data = {
      rule_description: form.description,
      rule_number: form.ruleNumber,
      name: form.lawName,
    };

    let result;

    if (editingRule) {
      result = await dispatch(
        UpdateLegal({
          id: editingRule.id,
          data,
        }),
      );
    } else {
      result = await dispatch(CreateLegal(data));
    }

    if (
      CreateLegal.fulfilled.match(result) ||
      UpdateLegal.fulfilled.match(result)
    ) {
      setForm({
        lawName: "",
        ruleNumber: "",
        description: "",
      });

      setEditingRule(null);
    }
  };

  useEffect(() => {
    dispatch(GetLegal());
  }, [dispatch]);
  const handleEdit = (rule) => {
    setEditingRule(rule);

    setForm({
      lawName: rule.name,
      ruleNumber: rule.rule_number,
      description: rule.rule_description,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        lawDropdownRef.current &&
        !lawDropdownRef.current.contains(e.target)
      ) {
        setOpenLawDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <div ref={lawDropdownRef} className="relative mt-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenLawDropdown(!openLawDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition-all"
                >
                  <span
                    className={`text-sm ${
                      form.lawName ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {form.lawName || "اختر القانون"}
                  </span>

                  <motion.div
                    animate={{
                      rotate: openLawDropdown ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <ChevronDown size={18} className="text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openLawDropdown && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="absolute left-0 right-0 mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl z-50"
                    >
                      {laws.map((law, index) => (
                        <motion.button
                          key={law}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.03,
                          }}
                          onClick={() => {
                            handleChange("lawName", law);
                            setOpenLawDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-right text-sm transition-all
            ${
              form.lawName === law
                ? "bg-amber-50 text-amber-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
                        >
                          {law}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 🔹 Rule Number */}
              <Input
                placeholder="Rule number (e.g. 101)"
                value={form.ruleNumber}
                onChange={(v) => handleChange("ruleNumber", v)}
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
                {editingRule ? "Update" : "Save"}
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
        <LawRulesTable rules={LegalData?.data} onEdit={handleEdit} />
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
