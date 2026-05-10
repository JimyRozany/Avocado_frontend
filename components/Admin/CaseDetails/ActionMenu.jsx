"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const menuItems = [
  { label: "Client & Lawyer Cards", action: "clientLawyer", color: "text-gray-700" },
  { label: "Force Close", action: "forceClose", color: "text-gray-700" },
  { label: "Send Warning", action: "warning", color: "text-gray-700" },
  { label: "Delete Case", action: "delete", color: "text-red-500" },
];

export default function ActionMenu({ open, onClose, onClientLawyer, onForceClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  const handleAction = (action) => {
    if (action === "clientLawyer") onClientLawyer();
    else if (action === "forceClose") onForceClose();
    else onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
        >
          {menuItems.map((item, i) => (
            <button
              key={item.action}
              onClick={() => handleAction(item.action)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 ${item.color} ${
                i < menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}