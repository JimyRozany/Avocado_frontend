"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiArrowUpRight } from "react-icons/hi2";
import { MdOutlineGavel, MdOutlineSearch, MdOutlineSupportAgent, MdOutlineLock } from "react-icons/md";

const features = [
  {
    icon: <MdOutlineGavel size={20} />,
    title: "Digital Case",
    desc: "Step-by-step case management with case tracking, timelines, and document sharing in an organized and secure manner.",
  },
  {
    icon: <MdOutlineSearch size={20} />,
    title: "Egyptian Law",
    desc: "Quick search within Egyptian laws by article number or keywords — direct access to information.",
  },
  {
    icon: <MdOutlineSupportAgent size={20} />,
    title: "AI Legal Search Assistant",
    desc: "Ask about any legal material, and get a simplified explanation along with a presentation of the legal texts based on it.",
  },
  {
    icon: <MdOutlineLock size={20} />,
    title: "Secure Legal",
    desc: "A secure environment with multiple permissions, data encryption, and complete document access control.",
  },
];

const steps = [
  { num: "01", title: "Create Your Account", desc: "Choose your role (client or attorney) and get started in seconds." },
  { num: "02", title: "Submit Your Request Or Receive A Case", desc: "The client submits a request, and the attorney reviews and approves." },
  { num: "03", title: "Follow The Situation Moment By Moment", desc: "Track updates, sessions, and documents." },
  { num: "04", title: "Communicate And Close The Case Safely", desc: "Live chat + encrypted documents + official closure." },
];

export default function Platform({type=""}) {
   const router=useRouter()
  return (
    <section className="bg-black ">
        <div className="py-16 px-6 md:px-10 w-[95%] mx-auto">
             {/* Top: Intro + feature cards */}
      <div className={`${type === "about" ? "hidden" : "grid"} grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-white text-3xl font-bold leading-snug">
            An Integrated Legal Platform For Case Management And Legal Research
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Avocato combines case management, Egyptian law research, and an intelligent legal assistant — in a safe and organized environment that serves lawyers and clients.
          </p>
          <motion.button
          onClick={()=>router.push("/law-library")}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 cursor-pointer bg-[#E8C547] text-black text-sm font-bold px-5 py-3 rounded-full w-fit"
          >
            Explore Now
            <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <HiArrowUpRight className="text-[#E8C547] text-xs" />
            </span>
          </motion.button>
        </motion.div>

        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#E8C547]/30 transition group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center text-[#E8C547] group-hover:bg-[#E8C547]/20 transition">
                  {f.icon}
                </div>
                <HiArrowUpRight className="text-white/30 group-hover:text-white/60 transition" />
              </div>
              <h3 className="text-white font-semibold text-base">{f.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-white text-3xl font-bold">How It Works</h2>
        <p className="text-white/40 text-sm mt-2">Simple steps...for professional legal management</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center">
                <span className="text-[#E8C547] text-lg">⚖</span>
              </div>
              <span className="text-white/20 text-sm font-mono">{s.num}</span>
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug">{s.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
        </div>
    </section>
  );
}
