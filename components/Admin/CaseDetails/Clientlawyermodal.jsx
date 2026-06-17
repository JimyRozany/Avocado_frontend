"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function PersonCard({ info, label, avatarColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-sm flex flex-col items-center"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 self-start">
        {label}
      </h3>

      {/* Avatar */}
      <div className="w-28 h-28 rounded-full mb-4 overflow-hidden shadow-md">
        {info?.image ? (
          <Image
            src={info.image}
            alt={info.name}
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-4xl font-bold text-white ${avatarColor}`}
          >
            {info?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>

      {/* Name + Case */}
      <div className="self-start mb-4">
        <p className="text-xl font-bold text-gray-900">{info.name}</p>
        <p className="text-xs text-gray-400">{info.caseId}</p>
      </div>

      {/* Fields */}
      <div className="w-full grid grid-cols-2 gap-2">
        {info.fields.map((field) => (
          <div
            key={field.label}
            className="border border-gray-100 rounded-lg px-3 py-2 bg-gray-50"
          >
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
              {field.label}
            </p>
            <p className="text-sm text-gray-700 font-medium mt-0.5 wrap-break-word">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ClientLawyerModal({
  onClose,
  CaseDataDetails,
}) {
  const client = CaseDataDetails?.client;

  const clientInfo = client
    ? {
        name: client.name || "-",
        image: client.image
          ? client.image.startsWith("http")
            ? client.image
            : `${process.env.NEXT_PUBLIC_API_URL}/storage/${client.image}`
          : null,
        caseId: `#${CaseDataDetails?.case_number || "-"}`,
        fields: [
          { label: "Role", value: client.type || "Client" },
          { label: "Phone", value: client.mobile || "-" },
          { label: "Email", value: client.email || "-" },
          { label: "Status", value: CaseDataDetails?.status || "-" },
          { label: "Case Type", value: CaseDataDetails?.type || "-" },
          {
            label: "Joined",
            value: client.created_at
              ? new Date(client.created_at).toLocaleDateString()
              : "-",
          },
        ],
      }
    : null;

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
        className="flex flex-col lg:flex-row gap-5 relative max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        {/* Lawyers */}
        {CaseDataDetails?.lawyers?.length > 0 ? (
          CaseDataDetails.lawyers.map((lawyer) => {
            const lawyerInfo = {
              name: lawyer.name || "-",
              image: lawyer.image
                ? lawyer.image.startsWith("http")
                  ? lawyer.image
                  : `${process.env.NEXT_PUBLIC_API_URL}/storage/${lawyer.image}`
                : null,
              caseId: `#${CaseDataDetails?.case_number || "-"}`,
              fields: [
                { label: "Role", value: lawyer?.pivot?.side || "Lawyer" },
                { label: "Phone", value: lawyer.mobile || "-" },
                { label: "Email", value: lawyer.email || "-" },
                { label: "Bar No.", value: lawyer.bar_association_number || "-" },
                { label: "Experience", value: lawyer.years_of_experience || "-" },
                { label: "Rate", value: lawyer.rate || "-" },
              ],
            };

            return (
              <PersonCard
                key={lawyer.id}
                info={lawyerInfo}
                label="Lawyer Details"
                avatarColor="bg-orange-500"
              />
            );
          })
        ) : (
          <PersonCard
            info={{
              name: "No Lawyer Assigned",
              image: null,
              caseId: "-",
              fields: [{ label: "Status", value: "No lawyer found" }],
            }}
            label="Lawyer Details"
            avatarColor="bg-orange-500"
          />
        )}

        {/* Client */}
        {clientInfo && (
          <PersonCard
            info={clientInfo}
            label="Client Details"
            avatarColor="bg-amber-600"
          />
        )}
      </motion.div>
    </motion.div>
  );
}