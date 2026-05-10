"use client";
import React, { Activity, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ActionMenu = ({
  onClose,
items
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -4 }}
      transition={{ duration: 0.12 }}
      className="absolute right-0 top-8 w-44 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      {items.map(({ label, icon: Icon, color, hover, action }) => (
        <button
          key={label}
          onClick={action}
          className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs ${color} ${hover} transition-colors`}
        >
         {label}
        </button>
      ))}
    </motion.div>
  );
};

export default ActionMenu;
