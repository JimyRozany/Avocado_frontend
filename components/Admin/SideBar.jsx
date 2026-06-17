"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout, Updatetoken } from "@/lib/UserAuth";
import { useDispatch, useSelector } from "react-redux";

const menuItems = [
  { icon: "📊", label: "Overview", link: "/admin-dashboard" },
  {
    icon: "📂",
    label: "Case Management",
    link: "/admin-dashboard/case-management",
  },
  {
    icon: "👥",
    label: "Client Management",
    link: "/admin-dashboard/client-management",
  },
  {
    icon: "👤",
    label: "Lawyer Management",
    link: "/admin-dashboard/lawyer-management",
  },
  {
    icon: "⚖️",
    label: "Legal Management",
    link: "/admin-dashboard/legal-management",
  },
  {
    icon: "🔐",
    label: "Permissions",
    link: "/admin-dashboard/permissions",
  },
  {
    icon: "💳",
    label: "Subscription",
    link: "/admin-dashboard/subscription",
  },
  {
    icon: "📈",
    label: "Reports",
    link: "/admin-dashboard/report",
  },
];

const SideBar = ({ type = "" }) => {
  const { loading } = useSelector((state) => state.UserRTK);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (loading) {
      return;
    }
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      dispatch(Updatetoken(""));
      router.push("/");
      setUser("");
    }
  };

  let filteredMenuItems = menuItems;

  if (type === "user") {
    filteredMenuItems = menuItems
      .filter(
        (item) =>
          ![
            "Legal Management",
            "Lawyer Management",
            "Client Management",
            "Reports",
            "Permissions"
          ].includes(item.label),
      )
      .map((item) => ({
        ...item,
        link: item.link.replace("/admin-dashboard", "/user-dashboard"),
      }));
  }

  if (type === "lawyer") {
    filteredMenuItems = menuItems
      .filter(
        (item) =>
          ![
            "Legal Management",
            "Lawyer Management",
            "Permissions"
          ].includes(item.label),
      )
      .map((item) => ({
        ...item,
        link: item.link.replace("/admin-dashboard", "/lawyer-dashboard"),
      }));
  }

  if (type === "user" || type === "lawyer") {
    filteredMenuItems.push({
      icon: "👤",
      label: "Profile",
      link: `/${type}-dashboard/profile`,
    });
  }

  return (
    <div className="min-h-screen fixed top-0 bottom-0 bg-black z-50">
      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-3 m-2 text-white bg-gray-800 rounded-md fixed top-2 left-2 z-20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black text-white w-64
          flex flex-col
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:shrink-0
          z-50
        `}
      >
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center space-x-2 px-6 py-5 border-b border-gray-700"
        >
          <div className="text-3xl font-bold">⚖️</div>
          <div>
            <h1 className="text-xl font-bold">AVOCATO</h1>
            <p className="text-xs tracking-widest">YOUR CASE, YOUR CONTROL</p>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="mt-6 flex-1">
          {filteredMenuItems.map(({ icon, label, link }) => (
            <Link
              key={label}
              href={link}
              className="flex items-center px-6 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="text-lg mr-4">{icon}</span>
              <span className="font-semibold">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 cursor-pointer py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <span className="text-lg mr-4">🚪</span>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SideBar;
