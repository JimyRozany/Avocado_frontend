"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { UpdateCase } from "@/lib/CaseManagement";

export default function CaseSummary({ CaseDataDetails }) {
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fields that can be edited
  const editableKeys = ["case_number", "title", "type", "court_name"];
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!CaseDataDetails) return;

    const filteredData = Object.fromEntries(
      Object.entries(CaseDataDetails).filter(([key, value]) => {
        return (
          value !== null &&
          value !== "" &&
          !Array.isArray(value) &&
          typeof value !== "object" &&
          !["id", "created_by", "deleted_at"].includes(key)
        );
      }),
    );

    setEditableFields(filteredData);
  }, [CaseDataDetails]);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const updatedData = Object.fromEntries(
      Object.entries(editableFields).filter(([key]) =>
        editableKeys.includes(key),
      ),
    );
    const data = {
      ...updatedData,
      lawyer_id: CaseDataDetails?.lawyers?.[0]?.id,
      client_id: CaseDataDetails?.client?.id,
      _method: "put",
    };
    const result = await dispatch(UpdateCase({data:data,id:CaseDataDetails?.id}));
    if (UpdateCase.fulfilled.match(result)) {
      setIsEditing(false);
    }

    // Call your API here
  };

  const formatLabel = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const isDateField = (key) => {
    return key.includes("date") || key === "created_at" || key === "updated_at";
  };

  const getDisplayValue = (key, value) => {
    if (isDateField(key)) {
      return formatDate(value);
    }

    return value || "";
  };

  const mainContent = [
    CaseDataDetails?.description,
    CaseDataDetails?.court_name,
    CaseDataDetails?.type,
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Case Summary</h2>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg cursor-pointer bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Dynamic Fields */}
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(editableFields).map(([key, value]) => {
          const canEdit = editableKeys.includes(key);

          return (
            <div key={key}>
              <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {formatLabel(key)}
              </label>

              <input
                type="text"
                value={getDisplayValue(key, value)}
                disabled={!isEditing || !canEdit}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm transition
                  ${
                    canEdit
                      ? "border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      : "border-gray-100 bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      {mainContent.length > 0 && (
        <div className="mt-2">
          <h3 className="text-base font-bold text-gray-900 mb-3">
            Main Content Area
          </h3>

          <div className="flex flex-col gap-2">
            {mainContent.map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition bg-gray-50"
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
