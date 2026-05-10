"use client";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Image from "next/image";

const stats = [
  { value: "+850", label: "Cases Managed" },
  { value: "+120", label: "Registered Lawyers" },
  { value: "4.9", label: "Average Rating" },
  { value: "+5,000", label: "Legal Articles" },
];

const lawyers = [
  { name: "Bahr Adam", role: "Claude Lawyer", rating: "4.9" },
  { name: "Bahr Adam", role: "Claude Lawyer", rating: "4.9" },
  { name: "Bahr Adam", role: "Claude Lawyer", rating: "4.9" },
];

export default function ExpertiseSection({type=""}) {
  return (
    <section className="bg-black ">
      <div className="py-16 px-6 md:px-10 border-t border-white/10 w-[95%] mx-auto">
        {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-snug">
            Decades Of Expertise.<br />
            Built For The Next<br />
            Decade.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-4 md:pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 bg-[#E8C547] text-black text-sm font-bold px-5 py-3 rounded-full w-fit self-end"
          >
            Explore Now
            <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <HiArrowUpRight className="text-[#E8C547] text-xs" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Image + Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="h-55 rounded-2xl overflow-hidden relative bg-[#333]"
        >
          {/* <Image src="imageHere" alt="Courthouse columns" fill className="object-cover" /> */}
        </motion.div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#555] border-2 border-[#111]" />
              ))}
              <div className="w-8 h-8 rounded-full bg-[#E8C547] border-2 border-[#111] flex items-center justify-center text-black text-xs font-bold">+</div>
            </div>
            <p className="text-white/50 text-xs">Thousands of users choose Avocato every day</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-[#E8C547] text-2xl font-black">{s.value}</p>
                <p className="text-white/40 text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-l-2 border-[#E8C547] pl-4">
            <p className="text-white font-semibold text-base italic">
              We Build The Systems That Move Business Forward
            </p>
          </div>
        </div>
      </div>

      {/* Lawyers */}
      <div className={`${type === "about" ? "hidden" : "flex"} items-center justify-between mb-6`}>
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug">
            Trusted For Decades.<br />
            Engineered For The Digital Age.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition">
            <HiChevronLeft />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#E8C547] flex items-center justify-center text-black hover:bg-[#d4b33d] transition">
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className={`${type === "about" ? "hidden" : "grid"} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}>
        {lawyers.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#E8C547]/30 transition group"
          >
            <div className="relative h-44 bg-[#2a2a2a]">
              {/* <Image src="imageHere" alt={l.name} fill className="object-cover" /> */}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-white font-semibold text-sm">{l.name}</p>
                <span className="text-[#E8C547] text-sm font-bold">{l.rating}</span>
              </div>
              <p className="text-white/40 text-xs mb-2">{l.role}</p>
              <p className="text-white/30 text-xs leading-relaxed line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 bg-[#E8C547] text-black text-sm font-bold px-5 py-3 rounded-full"
        >
          Explore Now
          <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <HiArrowUpRight className="text-[#E8C547] text-xs" />
          </span>
        </motion.button>
      </div>
      </div>
    </section>
  );
}
