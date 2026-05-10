"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: <Target className="h-10 w-10 text-yellow-400" />,
      title: "Our Mission",
      description:
        "Avocato is a modern legal platform designed to simplify the way people access legal services. We connect clients with qualified lawyers, provide reliable legal resources, and offer smart tools to make legal processes faster and more transparent.",
    },
    {
      icon: <Eye className="h-10 w-10 text-yellow-400" />,
      title: "Our Vision",
      description:
        "We envision a future where legal services are digital, simple, and available to anyone, anytime. Avocato is built to become a trusted legal ecosystem that empowers both clients and lawyers.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white">
      {/* Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-4xl font-semibold md:text-5xl">About Us</h2>

        <p className="mt-3 text-sm text-gray-400">
          Home /{" "}
          <span className="font-medium text-yellow-400">About Us</span>
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.2,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/5 bg-linear-to-br from-zinc-800 to-zinc-900 p-10 shadow-2xl transition-all"
          >
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-3xl font-semibold">{card.title}</h3>

            {/* Description */}
            <p className="mt-5 leading-7 text-gray-400">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}