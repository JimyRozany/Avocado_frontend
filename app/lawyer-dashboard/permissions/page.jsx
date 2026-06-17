"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GetPermissions, GetRoles } from "@/lib/RolePermissions";

const Permissions = () => {
  const { loading, RoleData, PermissionData } = useSelector(
    (state) => state.RoleRTK,
  );
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();
  const users = [
    {
      id: "U-1023",
      name: "Bahr Adam",
      email: "bahr@gmail.com",
      role: "Accountant",
      joined: "25 Jun 2025",
      lastLogin: "25 Jun 2025",
    },
    {
      id: "U-1024",
      name: "John Smith",
      email: "john@gmail.com",
      role: "Admin",
      joined: "24 Jun 2025",
      lastLogin: "25 Jun 2025",
    },
    {
      id: "U-1025",
      name: "Sarah Wilson",
      email: "sarah@gmail.com",
      role: "Manager",
      joined: "23 Jun 2025",
      lastLogin: "24 Jun 2025",
    },
    {
      id: "U-1026",
      name: "David Brown",
      email: "david@gmail.com",
      role: "Support",
      joined: "22 Jun 2025",
      lastLogin: "25 Jun 2025",
    },
    {
      id: "U-1027",
      name: "Emma Clark",
      email: "emma@gmail.com",
      role: "Accountant",
      joined: "21 Jun 2025",
      lastLogin: "24 Jun 2025",
    },
    {
      id: "U-1028",
      name: "Michael Lee",
      email: "michael@gmail.com",
      role: "Admin",
      joined: "20 Jun 2025",
      lastLogin: "25 Jun 2025",
    },
    {
      id: "U-1029",
      name: "Sophia Davis",
      email: "sophia@gmail.com",
      role: "Manager",
      joined: "19 Jun 2025",
      lastLogin: "24 Jun 2025",
    },
    {
      id: "U-1030",
      name: "Daniel White",
      email: "daniel@gmail.com",
      role: "Support",
      joined: "18 Jun 2025",
      lastLogin: "25 Jun 2025",
    },
  ];
  useEffect(() => {
    dispatch(GetPermissions());
    dispatch(GetRoles());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#F7F8FA] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="text-[38px] font-bold text-[#1D1D1F]">
          User & Role Permissions
        </h1>

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
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Filter size={16} />
                Filter
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Download size={16} />
                Export
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Plus size={16} />
                Create
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
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
                    Email
                  </th>
                  <th className="border-b border-[#EEEEEE] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
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
                {users.map((user, index) => (
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
                      {user.email}
                    </td>

                    <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                      {user.role}
                    </td>

                    <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                      {user.joined}
                    </td>

                    <td className="border-b border-[#F2F2F2] px-6 py-5 text-sm text-gray-600">
                      {user.lastLogin}
                    </td>

                    <td className="relative border-b border-[#F2F2F2] px-6 py-5">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="rounded-lg p-2 transition hover:bg-gray-100"
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
                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye size={16} />
                              View Details
                            </button>

                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                              <Edit size={16} />
                              Edit
                            </button>

                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                              <KeyRound size={16} />
                              Reset Password
                            </button>

                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                              <Trash2 size={16} />
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
  );
};

export default Permissions;
