"use client";

import { motion } from "framer-motion";

const lawyerInfo = {
  name: "Bahr Adam",
  caseId: "#L-10231",
  fields: [
    { label: "Role", value: "Lead Attorney" },
    { label: "Phone", value: "+1 234 567 8900" },
    { label: "Contact Email", value: "bahr@lawfirm.com" },
    { label: "Bar No.", value: "BA-20914" },
    { label: "Joined Date", value: "Jan 2021" },
    { label: "Rating", value: "4.8 / 5" },
  ],
};

const clientInfo = {
  name: "Bahr Adam",
  caseId: "#C-10231",
  fields: [
    { label: "Role", value: "Plaintiff" },
    { label: "Phone", value: "+1 987 654 3210" },
    { label: "Email", value: "client@email.com" },
    { label: "ID No.", value: "ID-00312" },
    { label: "Since", value: "Jun 2019" },
    { label: "Rating", value: "N/A" },
  ],
};

function PersonCard({ info, label, avatarColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-xs flex flex-col items-center"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 self-start">{label}</h3>
      <div
        className={`w-28 h-28 rounded-full mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-md ${avatarColor}`}
      >
        {info.name[0]}
      </div>
      <div className="self-start mb-4">
        <p className="text-xl font-bold text-gray-900">{info.name}</p>
        <p className="text-xs text-gray-400">{info.caseId}</p>
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        {info.fields.map((f) => (
          <div key={f.label} className="border border-gray-100 rounded-lg px-3 py-2 bg-gray-50">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">{f.label}</p>
            <p className="text-sm text-gray-700 font-medium mt-0.5">{f.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ClientLawyerModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col sm:flex-row gap-5 relative"
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>
        <PersonCard info={lawyerInfo} label="Lawyer Details" avatarColor="bg-orange-500" />
        <PersonCard info={clientInfo} label="Client Details" avatarColor="bg-amber-600" />
      </motion.div>
    </motion.div>
  );
}