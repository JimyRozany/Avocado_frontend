"use client";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useRouter } from "next/navigation";
import DefaultUser from "../../../public/Image/DefaultUser.jpg";
import pexels from "../../../public/Image/interior-cathedral.png";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});
const data = [
  { year: "2022", value: 3 },
  { year: "2023", value: 5 },
  { year: "2024", value: 7 },
  { year: "2025", value: 10 },
];
export default function Hero() {
  const router = useRouter();
  return (
    <section className="bg-[#F5F0E8] min-h-105 ">
      <div className="relative overflow-hidden px-6 md:px-10 w-[95%] mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Headline */}
        <div className="flex flex-col gap-5 z-10 col-span-1">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-[2.5rem] md:text-[3rem] font-black text-[#111] leading-[1.1] tracking-tight"
          >
            Justice.
            <br />
            Simplified.
            <br />
            <span className="text-[#111]">
              Digital Legal
              <br />
              Solutions That
              <br />
              Empower You.
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.25)}>
            <span className="text-[#E8C547] text-3xl">✦</span>
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="text-[#111]/60 text-sm max-w-xs leading-relaxed"
          >
            Find a lawyer, follow your case step by step, and learn about
            Egyptian laws easily — in one place.
          </motion.p>

          <motion.button
            onClick={() => router.push("/contact")}
            {...fadeUp(0.4)}
            className="flex items-center cursor-pointer gap-2 bg-black text-white text-sm font-semibold px-5 py-3 rounded-full w-fit hover:bg-[#333] transition"
          >
            Contact Us
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <HiArrowUpRight className="text-black text-xs" />
            </span>
          </motion.button>
        </div>

        {/* Center: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 h-75 md:h-92.5 rounded-2xl overflow-hidden relative bg-[#ccc]"
        >
          <Image src={pexels} alt="Justice columns" fill className="object-cover" />
        </motion.div>

        {/* Right: Stats card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="col-span-1 flex flex-col gap-4"
        >
          {/* Avatars + text */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <Image
                  key={i}
                  src={DefaultUser}
                  alt="DefaultUser"
                  className="w-8 h-8"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-[#E8C547] border-2 border-[#F5F0E8] flex items-center justify-center text-black text-xs font-bold">
                +
              </div>
            </div>
            <p className="text-[#111]/60 text-xs leading-tight max-w-37.5">
              Thousands of users choose Avocato every day... Stay informed. Stay
              protected.
            </p>
          </div>

          {/* Cash Flow Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#111] text-sm font-semibold">
                Cash Flow Capital
              </span>
              <span className="text-[#111]/40 text-xs">2022 - 2025</span>
            </div>

            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                >
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "rgba(17,17,17,.3)" }}
                    ticks={[1, 5, 10]}
                    tickFormatter={(v) => `${v}M`}
                  />

                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "rgba(17,17,17,.4)" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#E8C547"
                    strokeWidth={3}
                    dot={{
                      fill: "#E8C547",
                      strokeWidth: 0,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#E8C547",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
