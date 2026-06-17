"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  KeyRound,
  Trash2,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import EditPermissionModal from "@/components/Admin/EditPermissionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateRoles,
  DeleteRole,
  GetPermissions,
  GetRoles,
} from "@/lib/RolePermissions";

const Permissions = () => {
  const { loading, RoleData, PermissionData } = useSelector(
    (state) => state.RoleRTK,
  );
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addLawyerOpen, setAddLawyerOpen] = useState(false);
  const [lawyerForm, setLawyerForm] = useState({
    name: "",
  });
  const handleSaveLawyer = async () => {
    const data = {
      name: lawyerForm.name,
    };
    const result = await dispatch(CreateRoles(data));
    if (CreateRoles.fulfilled.match(result)) {
      setAddLawyerOpen(false);
      setLawyerForm({ name: "" });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(GetPermissions());
    dispatch(GetRoles());
  }, [dispatch]);

  const HandleDelete = async (id) => {
    if (loading) {
      return;
    }
    const result = await dispatch(DeleteRole(id));
    if (DeleteRole.fulfilled.match(result)) {
      setOpenDropdown(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F7F8FA] p-8 px-0 pt-0">
        <div className="mx-auto w-full">
          {/* Card */}
          <div className="mt-8 rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm">
            {/* Top Section */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#222]">
                  User & Role Permissions
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  See insights on how your{" "}
                  <span className="font-medium text-amber-500">
                    Support Tickets
                  </span>{" "}
                  has grown and changed over time
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setAddLawyerOpen(true)}
                  className="flex items-center cursor-pointer gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Plus size={16} />
                  Create
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      User ID
                    </th>
                    <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Name
                    </th>
                    <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Joined Date
                    </th>
                    <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Last Login
                    </th>
                    <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {RoleData?.map((user, index) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-[#FAFAFA]"
                    >
                      <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                        {user.id}
                      </td>

                      <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm font-medium text-gray-800">
                        {user.name}
                      </td>


                      <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                        {formatDate(user.created_at)}
                      </td>

                      <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                        {formatDate(user.updated_at)}
                      </td>

                      <td
                        ref={openDropdown === index ? dropdownRef : null}
                        className="relative border-b border-[#F2F2F2] px-6 py-5"
                      >
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === index ? null : index,
                            )
                          }
                          className="rounded-lg p-2 cursor-pointer transition hover:bg-gray-100"
                        >
                          <MoreVertical size={18} />
                        </button>

                        <AnimatePresence>
                          {openDropdown === index && (
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
                                y: -10,
                                scale: 0.95,
                              }}
                              transition={{
                                duration: 0.18,
                              }}
                              className="absolute right-8 top-12 z-50 w-48 rounded-xl border border-gray-100 bg-white shadow-xl"
                            >
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditModalOpen(true);
                                  setOpenDropdown(null);
                                }}
                                className="flex w-full items-center cursor-pointer gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit size={16} />
                                Edit
                              </button>

                              <button
                                onClick={() => {
                                  HandleDelete(user?.id);
                                }}
                                className="flex w-full items-center cursor-pointer gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                              >
                                {loading ? (
                                  <ClipLoader
                                    size={16}
                                    color="#fb2c36"
                                    className="relative top-0"
                                  />
                                ) : (
                                  <Trash2 size={16} />
                                )}
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
                Add Role
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
                  className="px-4 py-2 rounded-xl cursor-pointer bg-black text-white text-sm"
                >
                  {loading && (
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
      <EditPermissionModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
      />
    </>
  );
};

export default Permissions;
