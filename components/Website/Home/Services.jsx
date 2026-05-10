"use client";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

const services = [
  { label: "Digital Case Management", active: true },
  { label: "Smart legal advice", active: false },
  { label: "Secure communication", active: false },
  { label: "Legal document management", active: false },
  { label: "Research in Egyptian laws", active: false },
  { label: "AI Legal Research Assistant", active: false },
  { label: "Lawyers evaluation system", active: false },
  { label: "Lawyers verification", active: false },
  { label: "Professional control panel", active: false },
];

const includes = [
  "Create and update issues",
  "Status tracking (Active / Pending / Closed)",
  "Historical Timeline for each action",
  "Sharing documents related to the case",
  "Close the case with the client's approval",
];

export default function Services() {
  return (
    <section className="bg-black ">
      <div className="py-16 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start mx-auto w-[95%]">
        {/* Left: Services list */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Our Services</h2>
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
            <HiArrowUpRight className="text-white text-sm" />
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {services.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`w-full text-left px-5 py-3 rounded-full text-sm font-medium transition border ${
                s.active
                  ? "bg-[#E8C547] text-black border-[#E8C547]"
                  : "bg-transparent text-white/70 border-white/15 hover:border-white/40 hover:text-white"
              }`}
            >
              {s.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Right: Description */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col gap-6 pt-2"
      >
        <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug">
          An Integrated System For Managing And Following Up On Cases Step By Step With Complete Professionalism.
        </h2>
        <div>
          <p className="text-white font-semibold mb-2">Includes:</p>
          <ul className="flex flex-col gap-1">
            {includes.map((item, i) => (
              <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white text-xl font-bold leading-snug">
            All The Details Of Your Case In One Place...<br />
            <span className="text-white">Organized And Secure.</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 bg-[#E8C547] text-black text-sm font-bold px-5 py-3 rounded-full w-fit"
        >
          Explore Now
          <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <HiArrowUpRight className="text-[#E8C547] text-xs" />
          </span>
        </motion.button>
      </motion.div>
      </div>
    </section>
  );
}
