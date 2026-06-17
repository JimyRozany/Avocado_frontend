"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import AuthDrawer from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { logout, Updatetoken } from "@/lib/UserAuth";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Find a Lawyer", link: "/lawyers" },
  { name: "Law Library", link: "/law-library" },
  { name: "Terms", link: "/terms" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact Us", link: "/contact" },
];

export default function Navbar() {
  const { token, loading } = useSelector((state) => state.UserRTK);
  const dispatch = useDispatch();
  const [authToken, setauthToken] = useState();
  const pathname = usePathname();
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setauthToken(localStorage.getItem("authToken"));
  }, [token]);

  const [menuOpen, setMenuOpen] = useState(false);
  // AUTH DRAWER STATE
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("register");
  // OPEN REGISTER
  const openRegister = () => {
    setAuthType("register");
    setAuthOpen(true);
  };

  // OPEN LOGIN
  const openLogin = () => {
    setAuthType("login");
    setAuthOpen(true);
  };

  const handleLogout = async () => {
    if (loading) {
      return;
    }
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      dispatch(Updatetoken(""));
      setUser("");
    }
  };

  useEffect(() => {
    dispatch(Updatetoken(authToken));
  }, [authToken, dispatch]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex items-center justify-between px-6 md:px-10 py-4 bg-black border-b border-white/10 sticky top-0 z-50"
      >
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white rounded-[1px]" />
                ))}
              </div>

              <span className="text-white font-bold text-lg tracking-widest uppercase">
                AVOCATO
              </span>
            </div>

            <span className="text-white/30 text-[8px] tracking-widest ml-6">
              FIND YOUR LAWYER
            </span>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.link}
                className={`text-sm transition-colors ${
                  pathname === link.link
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* DESKTOP BUTTONS */}
        {!token ? (
          <div className="hidden md:flex items-center gap-2">
            {/* REGISTER */}
            <button
              onClick={openRegister}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
            >
              SIGN UP
            </button>

            {/* LOGIN */}
            <button
              onClick={openLogin}
              className="px-4 py-2 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white transition"
            >
              SIGN IN
            </button>

            {/* ARROW */}
            <button className="w-8 h-8 rounded-full bg-[#E8C547] flex items-center justify-center">
              <HiArrowUpRight className="text-black text-sm" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href={
                user?.type === "avocato"
                  ? `/lawyer-dashboard`
                  : user?.type === "admin"
                    ? `/admin-dashboard`
                    : `/user-dashboard`
              }
              className="px-4 py-2 rounded-full bg-[#E8C547] cursor-pointer text-black text-sm font-semibold hover:bg-[#E8C547]/90 transition"
            >
              DashBoard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full cursor-pointer border border-white/30 text-white text-sm font-semibold hover:border-white transition"
            >
              {loading ? (
                <ClipLoader size={20} color="#fff" className="relative top-1" />
              ) : (
                "Logout"
              )}
            </button>
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </motion.nav>

      {/* AUTH DRAWER */}
      <AuthDrawer
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        type={authType}
      />
    </>
  );
}
