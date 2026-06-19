"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout, Updatetoken } from "@/lib/UserAuth";
import { useDispatch, useSelector } from "react-redux";
import image1 from "../../public/Images/side/Group 2976.png"
import image2 from "../../public/Images/side/Group 2990.png"
import image3 from "../../public/Images/side/Group 3000.png"
import image4 from "../../public/Images/side/Group 3002.png"
import image5 from "../../public/Images/side/Group 3377.png"
import image6 from "../../public/Images/side/Group 688.png"
import image7 from "../../public/Images/side/Layer 2.png"
import image8 from "../../public/Images/side/Path 8241.png"
import image9 from "../../public/Images/side/ic_Dashboard.png"
import image10 from "../../public/Images/side/tabler-icon-coins.png"
import image11 from "../../public/Images/side/Group 3156.png"
import Image from "next/image";
const menuItems = [
  { icon: image9, label: "Overview", link: "/admin-dashboard" },
  {
    icon: image3,
    label: "Case Management",
    link: "/admin-dashboard/case-management",
  },
  {
    icon: image7,
    label: "Client Management",
    link: "/admin-dashboard/client-management",
  },
  {
    icon: image8,
    label: "Lawyer Management",
    link: "/admin-dashboard/lawyer-management",
  },
  {
    icon: image1,
    label: "Legal Management",
    link: "/admin-dashboard/legal-management",
  },
  {
    icon: image11,
    label: "Permissions",
    link: "/admin-dashboard/permissions",
  },
  {
    icon: image10,
    label: "Subscription",
    link: "/admin-dashboard/subscription",
  },
    {
    icon: image4,
    label: "Support",
    link: "/admin-dashboard/support",
  },
  {
    icon: image2,
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
            "Permissions",
            "Support"
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
            "Permissions",
            "Support"
          ].includes(item.label),
      )
      .map((item) => ({
        ...item,
        link: item.link.replace("/admin-dashboard", "/lawyer-dashboard"),
      }));
  }

  if (type === "user" || type === "lawyer") {
    filteredMenuItems.push({
      icon: image4,
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
         <Image src={image6} alt="" className="w-40"/>
        </Link>

        {/* Menu Items */}
        <nav className="mt-6 flex-1">
          {filteredMenuItems.map(({ icon, label, link }) => (
            <Link
              key={label}
              href={link}
              className="flex items-center px-6 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors duration-200"
            >
              <Image src={icon} alt="" className="w-5 h-5 mx-2"/>
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
