"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown, X } from "lucide-react";
import { usePathname } from "next/navigation";

const DATE_RANGES = [
  "Jun 13, 2019 – Jul 12, 2022",
  "Jan 1, 2022 – Dec 31, 2022",
  "Jan 1, 2023 – Dec 31, 2023",
  "Last 30 Days",
  "Last 90 Days",
  "Last 12 Months",
];

const SEARCH_SUGGESTIONS = [
  "Total Users",
  "Active Cases",
  "Open Consultations",
  "Pending Approvals",
  "Subscription Transactions",
  "Case Activity Overview",
];

export default function AdminNavbar({ type = "" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(DATE_RANGES[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/case-management\/(\d+)/);
    const lawyermatch = pathname.match(/lawyer-management\/(\d+)/);
    if (match) {
      setActive("caseNumber");
    } else if (pathname === "/admin-dashboard/case-management") {
      setActive("case");
    } else if (lawyermatch) {
      setActive("lawyerNumber");
    } else {
      setActive("");
    }
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : SEARCH_SUGGESTIONS;

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row px-4 sm:px-6 py-6 sm:items-start sm:justify-between gap-3 mb-6"
      >
        {/* Greeting */}
        {active === "caseNumber" ? (
          <>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Case Details
              </h1>
              <span className="text-2xl font-light text-gray-400">
                #C-10231
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 cursor-pointer hover:underline">
              Active <span>▾</span>
            </span>
          </>
        ) : active === "lawyerNumber" ? (
          <>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Lawyer Details
              </h1>
              <span className="text-2xl font-light text-gray-400">
                #C-10231
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 cursor-pointer hover:underline">
              Active <span>▾</span>
            </span>
          </>
        ) : active === "case" ? (
          <>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Case Management
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                See insights on how{" "}
                <span className="text-yellow-500 font-medium underline underline-offset-2 cursor-pointer">
                  Your Business
                </span>{" "}
                has changed from Jun 13 - Jul 12
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Hi, Bahr Adam...
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                See insights on how{" "}
                <span className="text-yellow-500 font-medium underline underline-offset-2 cursor-pointer">
                  Your Business
                </span>{" "}
                has changed from Jun 13 - Jul 12
              </p>
            </div>
          </>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Date range dropdown */}
          <div className="relative z-20" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Calendar size={15} className="text-gray-500 shrink-0" />
              <span className="hidden sm:inline max-w-47.5 truncate">
                {selectedRange}
              </span>
              <span className="sm:hidden">Date Range</span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {DATE_RANGES.map((range) => (
                    <li key={range}>
                      <button
                        onClick={() => {
                          setSelectedRange(range);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedRange === range
                            ? "bg-gray-900 text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {range}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Search trigger button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 active:scale-95 transition-all shadow-sm"
          >
            <Search size={16} />
          </button>
        </div>
      </motion.div>

      {/* ── Search Modal ── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Input row */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dashboard..."
                    className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Results */}
                <ul className="py-2 max-h-64 overflow-y-auto overflow-x-hidden">
                  {filtered.length > 0 ? (
                    filtered.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <button
                          onClick={() => setSearchOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Search
                            size={12}
                            className="text-gray-300 shrink-0"
                          />
                          {s}
                        </button>
                      </motion.li>
                    ))
                  ) : (
                    <li className="px-4 py-5 text-sm text-gray-400 text-center">
                      No results for &quot;{searchQuery}&quot;
                    </li>
                  )}
                </ul>

                <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-300">
                    Press ESC to close
                  </span>
                  <span className="text-[10px] text-gray-300">
                    {filtered.length} results
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
