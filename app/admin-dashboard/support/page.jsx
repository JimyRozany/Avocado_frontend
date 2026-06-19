"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Mail, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSupport, getSupport, UpdateSupport } from "@/lib/Home";

function StatusBadge({ status }) {
  const styles = {
    closed: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-22.5
        px-4 py-1.5
        rounded-full border
        text-[11px] font-semibold uppercase
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

export default function SupportTable() {
  const { loading, SupportData } = useSelector((state) => state.HomeRTK);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleOutside(e) {
      if (
        selectedMessage &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setSelectedMessage(null);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [selectedMessage]);
  useEffect(() => {
    dispatch(getSupport());
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDelete = (id) => {
    dispatch(DeleteSupport(id));
  };

  const handleClose = (id) => {
    dispatch(UpdateSupport(id));
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900">
              Support Messages
            </h2>

            <p className="text-[13px] text-gray-400 mt-1">
              Manage and review customer support requests.
            </p>
          </div>
        </div>

        <div className="">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Created
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {SupportData?.map((message, index) => (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-5 font-medium">{message.full_name}</td>

                  <td className="px-6 py-5">{message.email}</td>

                  <td className="px-6 py-5">{message.mobile}</td>

                  <td className="px-6 py-5">
                    {message.type === null ? "Client" : message.type}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={message.status} />
                  </td>

                  <td className="px-6 py-5">
                    {formatDate(message.created_at)}
                  </td>

                  <td ref={dropdownRef} className="px-6 py-5 relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === message.id ? null : message.id,
                        )
                      }
                      className="
      w-8 h-8
      rounded-lg
      flex items-center justify-center
      hover:bg-gray-100
      transition
    "
                    >
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>

                    <AnimatePresence>
                      {openDropdown === message.id && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.95,
                          }}
                          className="
          absolute
          right-6
          top-14
          z-50
          w-56
          bg-white
          border
          border-gray-100
          rounded-2xl
          shadow-xl
          overflow-hidden
        "
                        >
                          <button
                            onClick={() => {
                              setSelectedMessage(message);
                              setOpenDropdown(null);
                            }}
                            className="
    w-full
    h-11
    px-4
    flex
    items-center
    gap-3
    text-sm
    text-gray-600
    hover:bg-gray-50
  "
                          >
                            <Eye size={16} />
                            View
                          </button>
                          {/* Close */}
                          {message.status === "pending" && (
                            <button
                              onClick={() => {
                                handleClose(message.id);
                                setOpenDropdown(null);
                              }}
                              className="
            w-full
            h-11
            px-4
            flex
            items-center
            gap-3
            text-sm
            text-gray-600
            hover:bg-gray-50
          "
                            >
                              <CheckCircle size={16} />
                              Change Status
                            </button>
                          )}

                          {/* Email */}
                          <button
                            onClick={() => {
                              window.open(`mailto:${message.email}`);
                              setOpenDropdown(null);
                            }}
                            className="
            w-full
            h-11
            px-4
            flex
            items-center
            gap-3
            text-sm
            text-gray-600
            hover:bg-gray-50
          "
                          >
                            <Mail size={16} />
                            Send Email
                          </button>

                          <div className="mx-3 border-t border-gray-100" />

                          {/* Delete */}
                          <button
                            onClick={() => {
                              handleDelete(message.id);
                              setOpenDropdown(null);
                            }}
                            className="
            w-full
            h-11
            px-4
            flex
            items-center
            gap-3
            text-sm
            text-red-500
            hover:bg-red-50
          "
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence>
        {selectedMessage && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-black/40 z-100"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
          fixed
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          z-[101]
          w-full
          max-w-lg
          bg-white
          rounded-2xl
          shadow-2xl
          p-6
        "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Support Message</h3>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="font-medium">{selectedMessage.full_name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p>{selectedMessage.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p>{selectedMessage.mobile}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Message</p>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
