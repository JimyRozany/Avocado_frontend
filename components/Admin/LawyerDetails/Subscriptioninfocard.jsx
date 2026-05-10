"use client";

import { motion } from "framer-motion";

const InputField = ({ label, value, isEditing, onChange, type = "text" }) => (
  <div className="relative">
    {isEditing ? (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="w-full px-3 py-2.5 rounded-lg border-2 border-[#c8a96e] bg-amber-50/40 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#b8964f] transition-colors"
      />
    ) : (
      <div className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-700 text-sm min-h-[42px]">
        {value || <span className="text-stone-300 text-xs italic">{label}</span>}
      </div>
    )}
    <label className="absolute -top-2 left-2.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-white px-1">
      {label}
    </label>
  </div>
);

export default function SubscriptionInfoCard({ data, isEditing, onChange }) {
  return (
    <motion.div layout className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">Subscription Information</h2>
          <p className="text-xs text-stone-400 mt-0.5">Plan & billing details</p>
        </div>
        {data?.planBadge && (
          <span className="px-3 py-1 bg-[#c8a96e]/10 text-[#c8a96e] text-xs font-bold rounded-full border border-[#c8a96e]/30 uppercase tracking-wider">
            {data.planBadge}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Plan Name" value={data?.planName} isEditing={isEditing} onChange={(v) => onChange("planName", v)} />
          <InputField label="Subscription Status" value={data?.status} isEditing={isEditing} onChange={(v) => onChange("status", v)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Start Date" value={data?.startDate} isEditing={isEditing} onChange={(v) => onChange("startDate", v)} type="date" />
          <InputField label="Expiry Date" value={data?.expiryDate} isEditing={isEditing} onChange={(v) => onChange("expiryDate", v)} type="date" />
        </div>
        <InputField label="Account Setting" value={data?.accountSetting} isEditing={isEditing} onChange={(v) => onChange("accountSetting", v)} />
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex justify-end"
        >
          <button className="px-5 py-2.5 bg-[#e8533a] hover:bg-[#d04530] text-white text-sm font-semibold rounded-lg transition-colors">
            Update Subscription
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}