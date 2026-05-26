"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  LayoutGrid,
  MoreHorizontal,
  SlidersHorizontal,
  Upload,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const CaseTable = ({
  CASE_COLUMNS,
  INITIAL_CASES,
  statusConfig,
  STATUS_FILTERS,
  getItems,
  type = "",
}) => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPos, setFilterPos] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);
  const [rows, setRows] = useState([]);
  const [exported, setExported] = useState(false);
  const [toast, setToast] = useState(null);

  const filterRef = useRef(null);
  const router = useRouter();

  // Sync redux/api data
  useEffect(() => {
    setRows(INITIAL_CASES || []);
  }, [INITIAL_CASES]);

  // Normalize data if type === client
  const normalizedRows =
    type === "client" || type === "lawyer"
      ? rows?.map((client) => ({
          id: client.id,
          title: client.name,
          client: client.email,
          lawyer: client.mobile,
          rate: client.rate || 5,

          ...(type === "lawyer"
            ? { email_verified_at: client.email_verified_at }
            : {}),

          status: client.status || "ACTIVE",
          created: client.created_at,
          updated: client.updated_at,
        }))
      : rows;

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });

    setTimeout(() => setToast(null), 2500);
  };

  const displayed =
    statusFilter === "ALL"
      ? normalizedRows
      : normalizedRows.filter((r) => r.status === statusFilter);

  const handleExport = () => {
    const csv = [
      CASE_COLUMNS.slice(0, -1).join(","),
      ...displayed?.map((r) =>
        [
          r.id,
          r.title,
          r.client,
          r.lawyer,
          r.category,
          r.status,
          r.created,
          r.updated,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "cases.csv";
    a.click();

    URL.revokeObjectURL(url);

    setExported(true);

    setTimeout(() => setExported(false), 2000);

    showToast("Cases exported successfully!", "success");
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));

    setOpenMenu(null);

    showToast(`Case ${id} deleted`, "error");
  };

  const handleSuspend = (id) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED",
            }
          : r,
      ),
    );

    setOpenMenu(null);

    showToast(`Case ${id} status updated`, "info");
  };

  const handleForceClose = (id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "CLOSED" } : r)),
    );

    setOpenMenu(null);

    showToast(`Case ${id} force closed`, "success");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 right-4 z-100 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg ${
              toast.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : toast.type === "error"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-gray-900 text-white"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <LayoutGrid size={15} className="text-gray-400" />

          <div>
            <h2 className="text-sm font-bold text-gray-900">All Cases</h2>

            <p className="text-xs text-gray-400 mt-0.5">
              See insights on how your{" "}
              <span className="text-yellow-500 underline underline-offset-1 cursor-pointer">
                Case Management
              </span>{" "}
              has grown and changed over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          {/* FILTER */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                setFilterPos({
                  top: rect.bottom + window.scrollY,
                  left: rect.left + window.scrollX,
                });

                setFilterOpen((p) => !p);
              }}
              className={`flex items-center gap-1.5 cursor-pointer border rounded-lg px-3 py-1.5 text-xs transition-colors ${
                filterOpen
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={13} />
              Filter
              {statusFilter !== "ALL" && (
                <span className="ml-0.5 bg-yellow-400 text-gray-900 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">
                  1
                </span>
              )}
            </button>

            {/* 🔥 PORTAL DROPDOWN */}
            {filterOpen &&
              filterPos &&
              createPortal(
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  className="fixed w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-9999 overflow-hidden"
                  style={{
                    top: filterPos.top,
                    left: filterPos.left,
                  }}
                >
                  <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Status
                    </span>

                    {statusFilter !== "ALL" && (
                      <button
                        onClick={() => setStatusFilter("ALL")}
                        className="text-[10px] text-red-400 hover:text-red-600 font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {STATUS_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setStatusFilter(f);
                        setFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors ${
                        statusFilter === f
                          ? "bg-gray-50 text-gray-900 font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{f === "ALL" ? "All Statuses" : f}</span>

                      {statusFilter === f && (
                        <Check size={12} className="text-gray-900" />
                      )}
                    </button>
                  ))}
                </motion.div>,
                document.body,
              )}
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className={`flex items-center cursor-pointer gap-1.5 border rounded-lg px-3 py-1.5 text-xs transition-all ${
              exported
                ? "border-green-300 bg-green-50 text-green-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {exported ? <Check size={13} /> : <Upload size={13} />}

            {exported ? "Exported!" : "Export"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="-mx-1">
        <table className="w-full min-w-225 text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {CASE_COLUMNS.map((col) => (
                <th
                  key={col}
                  className="text-left text-[11px] font-semibold text-gray-400 py-2 px-2 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="popLayout">
              {displayed?.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-xs text-gray-300"
                  >
                    No cases match the current filter.
                  </td>
                </tr>
              ) : (
                displayed?.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.04,
                    }}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-gray-700">
                      {row.title}
                    </td>

                    <td className="py-3 px-2 text-gray-700 max-w-35">
                      <span className="line-clamp-1">{row.client}</span>
                    </td>

                    <td className="py-3 px-2 text-gray-500">{row.client}</td>

                    <td className="py-3 px-2 text-gray-500">{row.rate}</td>

                    {type !== "client" && type !== "lawyer" && (
                      <td className="py-3 px-2 text-gray-500">
                        {row.category}
                      </td>
                    )}

                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          statusConfig[row.status] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {row.status || "UNKNOWN"}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-gray-500 whitespace-nowrap">
                      {formatDate(row.created)}
                    </td>

                    <td className="py-3 px-2 text-gray-500 whitespace-nowrap">
                      {formatDate(row.updated)}
                    </td>

                    <td className="py-3 px-2">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === i ? null : i)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            openMenu === i
                              ? "border-gray-300 bg-gray-100"
                              : "border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>

                        <AnimatePresence>
                          {openMenu === i && (
                            <ActionMenu
                              onClose={() => setOpenMenu(null)}
                              items={getItems(row, {
                                handleDelete,
                                handleSuspend,
                                handleForceClose,
                                showToast,
                                closeMenu: () => setOpenMenu(null),
                              })}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-300 mt-3">
        Showing {displayed?.length} of {rows?.length} cases
      </p>
    </motion.div>
  );
};

export default CaseTable;
