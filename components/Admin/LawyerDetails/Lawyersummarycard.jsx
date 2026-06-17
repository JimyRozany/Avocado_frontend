"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const InputField = ({
  label,
  value,
  isEditing,
  onChange,
  className = "",
  textarea = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      {isEditing ? (
        textarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-[#c8a96e] bg-amber-50/40 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#b8964f] resize-none transition-colors"
          />
        ) : (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-[#c8a96e] bg-amber-50/40 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#b8964f] transition-colors"
          />
        )
      ) : (
        <div className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-700 text-sm min-h-10.5">
          {value || (
            <span className="text-stone-300 text-xs italic">{label}</span>
          )}
        </div>
      )}
      <label className="absolute -top-2 left-2.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-white px-1">
        {label}
      </label>
    </div>
  );
};

export default function LawyerSummaryCard({
  data,
  isEditing,
  onChange,
  onImageChange,
  type = "",
}) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onImageChange(file, previewUrl);
    e.target.value = "";
  };
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
    >
      {/* Avatar */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative shrink-0">
          <motion.div
            whileHover={isEditing ? { scale: 1.04 } : {}}
            onClick={handleImageClick}
            className={`w-20 h-20 rounded-full overflow-hidden border-2 ${isEditing ? "border-[#c8a96e] cursor-pointer" : "border-stone-200 cursor-default"} transition-colors relative`}
          >
            {data?.avatarUrl ? (
              <Image
                src={data?.avatarUrl}
                alt="Avatar"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
          </motion.div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFile}
            className="hidden"
          />
          {isEditing && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c8a96e] rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            {data?.name}
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">{data?.specialty}</p>
          {isEditing && (
            <button
              onClick={handleImageClick}
              className="mt-1.5 text-xs text-[#c8a96e] underline underline-offset-2 hover:text-[#b8964f] transition-colors"
            >
              Change photo
            </button>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            value={data?.summary?.fullName}
            isEditing={isEditing}
            onChange={(v) => onChange("fullName", v)}
          />
          <InputField
            label="Email"
            value={data?.summary?.email}
            isEditing={isEditing}
            onChange={(v) => onChange("email", v)}
          />
        </div>

        <InputField
          label="Bio"
          value={data?.summary?.bio}
          isEditing={isEditing}
          onChange={(v) => onChange("bio", v)}
          textarea
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Phone"
            value={data?.summary?.phone}
            isEditing={isEditing}
            onChange={(v) => onChange("phone", v)}
          />
          {type === "" && (
            <InputField
              label="Bar Association Number"
              value={data?.summary?.barNumber}
              isEditing={isEditing}
              onChange={(v) => onChange("barNumber", v)}
            />
          )}
          {type !== "" && (
            <div className="relative">
              <div
                className={`w-full px-3 py-2.5 rounded-lg border min-h-10.5 text-sm flex items-center gap-2 ${isEditing ? "border-stone-200 bg-stone-50" : "border-stone-200 bg-white"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${data?.summary?.accountStatus === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}
                />
                <span
                  className={`font-medium text-sm ${data?.summary?.accountStatus === "Active" ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {data?.summary?.accountStatus}
                </span>
              </div>
              <label className="absolute -top-2 left-2.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-white px-1">
                Account Status
              </label>
            </div>
          )}
        </div>

        {type === "" && (
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Years of Experience"
              value={data?.summary?.yearsExp}
              isEditing={isEditing}
              onChange={(v) => onChange("yearsExp", v)}
            />
            <InputField
              label="Specialty"
              value={data?.summary?.specialty}
              isEditing={isEditing}
              onChange={(v) => onChange("specialty", v)}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {type === "" && (
            <InputField
              label="Office Location"
              value={data?.summary?.officeLocation}
              isEditing={isEditing}
              onChange={(v) => onChange("officeLocation", v)}
            />
          )}
          {type === "" && (
            <div className="relative">
              <div
                className={`w-full px-3 py-2.5 rounded-lg border min-h-10.5 text-sm flex items-center gap-2 ${isEditing ? "border-stone-200 bg-stone-50" : "border-stone-200 bg-white"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${data?.summary?.accountStatus === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}
                />
                <span
                  className={`font-medium text-sm ${data?.summary?.accountStatus === "Active" ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {data?.summary?.accountStatus}
                </span>
              </div>
              <label className="absolute -top-2 left-2.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-white px-1">
                Account Status
              </label>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
