"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function LegalHero() {
  return (
    <section className="relative h-95 w-[90%] mx-auto overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-light tracking-wide text-white md:text-6xl"
        >
          Need Legal Help?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-4 max-w-2xl text-sm text-gray-200 md:text-xl"
        >
          Get Started Today And Connect With A Lawyer In Minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 flex items-center gap-4"
        >
          <Link
            href="/signup"
            className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
          >
            SIGN UP
          </Link>

          <Link
            href="/signin"
            className="rounded-full border border-white/20 bg-black/40 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
          >
            SIGN IN
          </Link>

          <motion.div whileHover={{ rotate: 45, scale: 1.1 }}>
            <Link
              href="/contact"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition hover:bg-white hover:text-black"
            >
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}