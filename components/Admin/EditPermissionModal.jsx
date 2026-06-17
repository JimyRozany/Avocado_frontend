"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GetRolesShow, GetUpdateRoles } from "@/lib/RolePermissions";
import { ClipLoader } from "react-spinners";

export default function EditPermissionModal({ open, onClose, user }) {
  const dispatch = useDispatch();

  const { PermissionData, RoleShowData, loading } = useSelector(
    (state) => state.RoleRTK,
  );

  const [rolePermissions, setRolePermissions] = useState({});

  /**
   * Group permissions by module
   * Example:
   * {
   *   cases: ["view-own", "create", "show"],
   *   profile: ["view", "update"]
   * }
   */
  const groupedPermissions = useMemo(() => {
    if (!PermissionData?.length) return {};

    return PermissionData.reduce((acc, permission) => {
      const [module, action] = permission.name.split(".");

      if (!acc[module]) {
        acc[module] = [];
      }

      acc[module].push(action);

      return acc;
    }, {});
  }, [PermissionData]);

  /**
   * Build initial checked state
   */
  useEffect(() => {
    if (!PermissionData?.length) return;

    const initial = {};

    PermissionData.forEach((permission) => {
      initial[permission.name] = false;
    });

    RoleShowData?.permissions?.forEach((permission) => {
      initial[permission.name] = true;
    });

    setRolePermissions(initial);
  }, [PermissionData, RoleShowData]);

  /**
   * Fetch role details
   */
  useEffect(() => {
    if (user?.id) {
      dispatch(GetRolesShow(user.id));
    }
  }, [dispatch, user?.id]);

  /**
   * Toggle single permission
   */
  const togglePermission = (permissionName) => {
    setRolePermissions((prev) => ({
      ...prev,
      [permissionName]: !prev[permissionName],
    }));
  };

  /**
   * Toggle module permissions
   */
  const toggleModule = (module) => {
    const permissions = groupedPermissions[module];

    const allChecked = permissions.every(
      (action) => rolePermissions[`${module}.${action}`],
    );

    setRolePermissions((prev) => {
      const updated = { ...prev };

      permissions.forEach((action) => {
        updated[`${module}.${action}`] = !allChecked;
      });

      return updated;
    });
  };

  /**
   * Save
   */
  const handleSave = async () => {
    if (loading) {
      return;
    }
    const selectedPermissions = Object.entries(rolePermissions)
      .filter(([, checked]) => checked)
      .map(([permission]) => permission);

    const payload = {
      permissions: selectedPermissions,
    };

    const result = await dispatch(GetUpdateRoles({data:payload,id:user.id}));
    if (GetUpdateRoles.fulfilled.match(result)) {
      onClose();
    }
  };

  if (!open || !user) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Role Permissions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage permissions assigned to this role.
            </p>
          </div>

          {/* Table */}
          <div className="max-h-[65vh] overflow-y-auto p-6">
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="w-56 px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Module
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Permissions
                    </th>

                    <th className="w-32 px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Select All
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(groupedPermissions).map(
                    ([module, actions]) => {
                      const allChecked = actions.every(
                        (action) =>
                          rolePermissions[`${module}.${action}`] === true,
                      );

                      return (
                        <tr
                          key={module}
                          className="border-t border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-6 py-5">
                            <div className="font-medium capitalize text-gray-800">
                              {module.replaceAll("-", " ")}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {actions.map((action) => {
                                const permissionName = `${module}.${action}`;

                                const checked =
                                  rolePermissions[permissionName] || false;

                                return (
                                  <label
                                    key={permissionName}
                                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                                      checked
                                        ? "border-black bg-blue-50 text-black"
                                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() =>
                                        togglePermission(permissionName)
                                      }
                                      className="h-4 w-4 accent-black"
                                    />

                                    <span className="capitalize">
                                      {action.replaceAll("-", " ")}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={allChecked}
                              onChange={() => toggleModule(module)}
                              className="h-5 w-5 cursor-pointer accent-black"
                            />
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-8 py-5">
            <button
              onClick={onClose}
              className="rounded-lg border cursor-pointer border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-black cursor-pointer px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
            >
              {loading && (
                <ClipLoader
                  size={16}
                  color="#fff"
                  className="relative top-1 mr-1"
                />
              )}
              Save Permissions
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
