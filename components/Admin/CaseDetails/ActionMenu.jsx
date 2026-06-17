"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { DeleteCase, ForceClose } from "@/lib/CaseManagement";

const menuItems = (status) => [
  {
    label: "Client & Lawyer Cards",
    action: "clientLawyer",
    color: "text-gray-700",
  },
  {
    label: "Force Close",
    action: "forceClose",
    color: "text-gray-700",
    hidden: status === "closed",
  },
  { label: "Delete Case", action: "delete", color: "text-red-500" },
];

export default function ActionMenu({
  open,
  onClose,
  onClientLawyer,
  onForceClose,
  CaseDataDetails,
  actions,
  type=""
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  const handleAction = async (action) => {
    if (action === "clientLawyer") {
      onClientLawyer();
    } else if (action === "forceClose") {
      const result = await dispatch(ForceClose(CaseDataDetails.id));

      if (ForceClose.fulfilled.match(result)) {
        actions?.closeMenu?.();
      }
    } else if (action === "delete") {
      const result = await dispatch(DeleteCase(CaseDataDetails.id));

      if (DeleteCase.fulfilled.match(result)) {
        actions?.closeMenu?.();
        if(type === "lawyer"){
          router.push("/lawyer-dashboard/case-management");
        }else if(type === "client"){
          router.push("/user-dashboard/case-management");
        }
      }
    } else {
      onClose();
    }
  };

  const items = menuItems(CaseDataDetails?.status).filter((i) => !i.hidden);

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
          {items.map((item, i) => (
            <button
              key={item.action}
              onClick={() => handleAction(item.action)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 ${item.color} ${
                i < items.length - 1 ? "border-b border-gray-50" : ""
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
