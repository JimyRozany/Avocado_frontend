// components/LawyersSection.jsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import image from "../../public/photo-1506794778202-cad84cf45f1d.avif"
import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
const lawyers = [
  {
    id: 1,
    name: "Bahr Adam",
    role: "Corporate Lawyer",
    rating: 4.9,
    image:
      image,
  },
  {
    id: 2,
    name: "Bahr Adam",
    role: "Criminal Lawyer",
    rating: 4.9,
    image:
      image,
  },
  {
    id: 3,
    name: "Bahr Adam",
    role: "Family Lawyer",
    rating: 4.9,
    image:
      image,
  },
  {
    id: 4,
    name: "Bahr Adam",
    role: "Business Lawyer",
    rating: 4.9,
    image:
      image,
  },
  {
    id: 5,
    name: "Bahr Adam",
    role: "Immigration Lawyer",
    rating: 4.9,
    image:
      image,
  },
  {
    id: 6,
    name: "Bahr Adam",
    role: "Civil Lawyer",
    rating: 4.9,
    image:
      image,
  },
];

export default function LawyersSection() {
  return (
    <>
    <Navbar/>
    <section className="bg-black px-4 py-20 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-4xl font-semibold md:text-5xl">
            Find a Lawyer
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Home /{" "}
            <span className="text-yellow-400">
              Find a Lawyer
            </span>
          </p>
        </motion.div>

        {/* Title Row */}
        <div className="mt-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-2xl text-3xl font-light leading-tight md:text-5xl"
          >
            Trusted For Decades...
            <br />
            Engineered For The Digital Age.
          </motion.h2>

          {/* Arrows */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200">
              <ArrowLeft size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:bg-yellow-300">
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Lawyers Grid */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-sm bg-[#111]">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  width={280}
                  height={280}
                  className="h-70 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium">
                    {lawyer.name}
                  </h3>

                  <p className="mt-1 text-sm text-yellow-400">
                    {lawyer.role}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm">
                    {lawyer.rating}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}