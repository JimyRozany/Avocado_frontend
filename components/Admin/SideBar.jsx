"use client";
import Link from "next/link";
import React, { useState } from "react";

const menuItems = [
  { icon: "📊", label: "Overview", link: "/admin-dashboard" },
  { icon: "📂", label: "Case Management", link: "/admin-dashboard/case-management" },
  { icon: "👥", label: "Client Management", link: "/admin-dashboard/client-management" },
  { icon: "👤", label: "Lawyer Management", link: "/admin-dashboard/lawyer-management" },
  { icon: "⚖️", label: "Legal Management", link: "/admin-dashboard/legal-management" },
];

const SideBar = ({ type = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  let filteredMenuItems = menuItems;

  if (type === "user") {
    filteredMenuItems = menuItems
      // remove unwanted items
      .filter(
        (item) =>
          ![
            "Legal Management",
            "Lawyer Management",
            "Client Management",
          ].includes(item.label)
      )
      // replace admin-dashboard with user-dashboard
      .map((item) => ({
        ...item,
        link: item.link.replace("/admin-dashboard", "/user-dashboard"),
      }));
  }

    if (type === "lawyer") {
    filteredMenuItems = menuItems
      // remove unwanted items
      .filter(
        (item) =>
          ![
            "Legal Management",
            "Lawyer Management",
            "Client Management",
          ].includes(item.label)
      )
      // replace admin-dashboard with user-dashboard
      .map((item) => ({
        ...item,
        link: item.link.replace("/admin-dashboard", "/lawyer-dashboard"),
      }));
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
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:shrink-0
          z-50
        `}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 px-6 py-5 border-b border-gray-700">
          <div className="text-3xl font-bold">⚖️</div>
          <div>
            <h1 className="text-xl font-bold">AVOCATO</h1>
            <p className="text-xs tracking-widest">
              YOUR CASE, YOUR CONTROL
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
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
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SideBar;