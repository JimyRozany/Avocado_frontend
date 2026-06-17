"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActionMenu from "./ActionMenu";
import { useDispatch, useSelector } from "react-redux";
import { CreateLawyer } from "@/lib/LawyerManagement";
import { ClipLoader } from "react-spinners";
import { CreateClient } from "@/lib/ClientManagement";
import CreateCaseModal from "@/components/Admin/CaseDetails/CreateCaseModal";
const CaseTable = ({
  CASE_COLUMNS,
  INITIAL_CASES,
  statusConfig,
  getItems,
  type = "",
  active=""
}) => {
  const { loadingForce } = useSelector((state) => state.CaseRTK);

  const { loadingCreate: loadingLawyerCreate } = useSelector(
    (state) => state.LawyerRTK,
  );

  const { loadingCreate: loadingClientCreate } = useSelector(
    (state) => state.ClientRTK,
  );
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const [rows, setRows] = useState([]);
  const [toast, setToast] = useState(null);
  const [addLawyerOpen, setAddLawyerOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lawyerForm, setLawyerForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    setRows(INITIAL_CASES || []);
  }, [INITIAL_CASES]);

  const safeRows = Array.isArray(rows) ? rows : [];

  const normalizedRows =
    type === "client"
      ? safeRows
          .filter(
            (item) => item && !Array.isArray(item) && typeof item === "object",
          )
          .map((client) => ({
            id: client.id,
            title: client.name,
            client: client.email,
            lawyer: client.mobile,
            rate: client.rate || 5,
            active_cases: client.total_cases,
            is_active: Number(client.is_active),
            status: Number(client.is_active) === 1 ? "ACTIVE" : "INACTIVE",
            created: client.created_at,
            updated: client.updated_at,
          }))
      : type === "lawyer"
        ? safeRows
            .filter(
              (item) =>
                item && !Array.isArray(item) && typeof item === "object",
            )
            .map((lawyer) => ({
              id: lawyer.id,
              title: lawyer.name,
              client: lawyer.email,
              lawyer: lawyer.mobile,
              rate: lawyer.rate || 5,
              active_cases: lawyer.active_cases,
              is_active: Number(lawyer.is_active),
              status: Number(lawyer.is_active) === 1 ? "ACTIVE" : "INACTIVE",
              created: lawyer.created_at,
              updated: lawyer.updated_at,
            }))
        : safeRows
            .filter(
              (item) =>
                item && !Array.isArray(item) && typeof item === "object",
            )
            .map((caseItem) => ({
              id: caseItem.id,
              case_number: caseItem.case_number,
              title: caseItem.title,
              client: caseItem.client?.name || "No Client",
              lawyer: caseItem.lawyers?.[0]?.name || "No Lawyer",
              category: caseItem.type,
              status: caseItem.status?.toUpperCase(),
              created: caseItem.created_at,
              updated: caseItem.updated_at,
            }));

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });

    setTimeout(() => setToast(null), 2500);
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
              is_active: Number(r.is_active ?? 0) === 1 ? 0 : 1,
              status: Number(r.is_active ?? 0) === 1 ? "INACTIVE" : "ACTIVE",
            }
          : r,
      ),
    );

    setOpenMenu(null);
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

  const handleSaveLawyer = async () => {
    if (loadingLawyerCreate || loadingClientCreate) {
      return;
    }
    const data = {
      name: lawyerForm.name,
      email: lawyerForm.email,
      mobile: lawyerForm.mobile,
      password: lawyerForm.password,
    };

    const result =
      type === "client"
        ? await dispatch(CreateClient(data))
        : await dispatch(CreateLawyer(data));
    if (
      CreateLawyer.fulfilled.match(result) ||
      CreateClient.fulfilled.match(result)
    ) {
      setAddLawyerOpen(false);
      setLawyerForm({ name: "", email: "", mobile: "", password: "" });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.35,
      }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <LayoutGrid size={15} className="text-gray-400" />

          <div>
            <h2 className="text-sm font-bold text-gray-900">
              All{" "}
              {type === "client"
                ? "Client"
                : type === "case"
                  ? "Cases"
                  : "Lawyer"}
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Manage{" "}
              {type === "client"
                ? "Client"
                : type === "case"
                  ? "Cases"
                  : "Lawyer"}{" "}
              and their information
            </p>
          </div>
        </div>

        {
          active === "" && 
          <button
          onClick={() =>
            type === "case" ? setShowCreateModal(true) : setAddLawyerOpen(true)
          }
          className="px-4 py-2 rounded-xl bg-black text-white text-xs font-medium hover:bg-gray-800 transition"
        >
          Add{" "}
          {type === "client" ? "Client" : type === "case" ? "Case" : "Lawyer"}
        </button>
        }
      </div>
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
              {normalizedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-xs text-gray-300"
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                normalizedRows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                    }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.04,
                    }}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-gray-700">
                      {type === "case" ? row.case_number : row.title}
                    </td>

                    <td className="py-3 px-2 text-gray-700 max-w-35">
                      <span className="line-clamp-1">
                        {type === "case" ? row.title : row.client}
                      </span>
                    </td>
                    {type === "case" && (
                      <>
                        <td className="py-3 px-2 text-gray-700 max-w-35">
                          <span className="line-clamp-1">{row.client}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-700 max-w-35">
                          <span className="line-clamp-1">{row.lawyer}</span>
                        </td>
                      </>
                    )}
                    {type !== "case" && (
                      <td className="py-3 px-2 text-gray-500">
                        {row.active_cases}
                      </td>
                    )}
                    {type !== "case" && (
                      <td className="py-3 px-2 text-gray-500">{row.rate}</td>
                    )}

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
        Showing {normalizedRows.length} cases
      </p>
      <AnimatePresence>
        {addLawyerOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setAddLawyerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Add{" "}
                {type === "client"
                  ? "Client"
                  : type === "case"
                    ? "Case"
                    : "Lawyer"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={lawyerForm.name}
                  onChange={(e) =>
                    setLawyerForm({
                      ...lawyerForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={lawyerForm.email}
                  onChange={(e) =>
                    setLawyerForm({
                      ...lawyerForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder="Mobile"
                  value={lawyerForm.mobile}
                  onChange={(e) =>
                    setLawyerForm({
                      ...lawyerForm,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={lawyerForm.password}
                  onChange={(e) =>
                    setLawyerForm({
                      ...lawyerForm,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setAddLawyerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveLawyer}
                  className="px-4 py-2 rounded-xl bg-black text-white text-sm"
                >
                  {(loadingClientCreate || loadingLawyerCreate) && (
                    <ClipLoader
                      size={16}
                      color="#fff"
                      className="relative top-1 mr-1"
                    />
                  )}
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCreateModal && (
          <CreateCaseModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CaseTable;
