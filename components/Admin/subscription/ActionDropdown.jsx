"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ActionDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-8 h-8
          rounded-lg
          flex items-center justify-center
          hover:bg-gray-100
          transition
        "
      >
        <MoreVertical
          size={18}
          className="text-gray-500"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
            className="
              absolute
              right-0
              top-10
              z-[9999]
              w-52
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              overflow-hidden
            "
          >
            <DropdownItem
              icon={<Eye size={16} />}
              label="View Details"
            />

            <DropdownItem
              icon={<Pencil size={16} />}
              label="Edit"
            />

            <div className="mx-3 border-t border-gray-100" />

            <DropdownItem
              icon={<Trash2 size={16} />}
              label="Delete Subscription"
              danger
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  icon,
  label,
  danger = false,
}) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full
        h-11
        px-4
        flex
        items-center
        gap-3
        text-sm
        transition-colors
        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}