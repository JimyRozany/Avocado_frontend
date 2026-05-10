"use client";

import { motion, AnimatePresence } from "framer-motion";

const Toggle = ({ enabled, onChange, disabled }) => (
  <button
    onClick={() => !disabled && onChange(!enabled)}
    className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0 focus:outline-none ${
      enabled ? "bg-[#c8a96e]" : "bg-stone-200"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    style={{ height: "22px", width: "40px" }}
    role="switch"
    aria-checked={enabled}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
      style={{ left: enabled ? "calc(100% - 18px)" : "2px" }}
    />
  </button>
);

const NotificationRow = ({ label, notifKey, value, isEditing, onChange }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-stone-50 last:border-0">
    <span className="text-sm text-stone-600 font-medium">{label}</span>
    <Toggle enabled={value} onChange={(v) => onChange(notifKey, v)} disabled={!isEditing} />
  </div>
);

export default function NotificationSettingsCard({ notifications = {}, isEditing, onChange }) {
  const leftNotifs = [
    { label: "Email Notifications", key: "emailNotifications" },
    { label: "New Case Created", key: "newCaseCreated" },
    { label: "Messages", key: "messages" },
  ];

  const rightNotifs = [
    { label: "Reviews", key: "reviews" },
    { label: "Payment Received", key: "paymentReceived" },
    { label: "System Alerts", key: "systemAlerts" },
  ];

  return (
    <motion.div layout className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-stone-800 tracking-tight">Notification Settings</h2>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEditing ? "Tap toggles to change preferences" : "Manage how you receive notifications"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <div>
          {leftNotifs.map((n) => (
            <NotificationRow
              key={n.key}
              label={n.label}
              notifKey={n.key}
              value={!!notifications[n.key]}
              isEditing={isEditing}
              onChange={onChange}
            />
          ))}
        </div>
        <div>
          {rightNotifs.map((n) => (
            <NotificationRow
              key={n.key}
              label={n.label}
              notifKey={n.key}
              value={!!notifications[n.key]}
              isEditing={isEditing}
              onChange={onChange}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!isEditing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-[11px] text-stone-300 italic"
          >
            Press Edit Profile above to change notification settings.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}