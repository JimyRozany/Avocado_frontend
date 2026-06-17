// app/contact/page.jsx
"use client";

import PopupChatBot from "@/components/PopupChatBot";
import ContactForm from "@/components/Website/ContactForm";
import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

export default function ContactPage() {
  return (
   <>
   <Navbar/>
    <section className="min-h-screen bg-black px-4 py-20 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Contact us
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Home /{" "}
            <span className="font-medium text-yellow-400">
              Contact us
            </span>
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-14 grid gap-5 rounded-sm bg-[#111] p-6 md:grid-cols-3"
        >
          <InfoCard
            icon={<Mail size={20} />}
            title="INFO@RMS.COM"
          />

          <InfoCard
            icon={<MapPin size={20} />}
            title="KUWAIT STREET, KUWAIT"
          />

          <InfoCard
            icon={<Phone size={20} />}
            title="(+966) 555-0105"
          />
        </motion.div>

        {/* Main Section */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light leading-tight md:text-5xl">
              let’s get in touch
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed diam nonumy eirmod tempor.
            </p>
          </motion.div>

          {/* Form */}
            <ContactForm/>
        </div>
      </div>
    </section>
    <PopupChatBot />
    <Footer/>
   </>
  );
}

/* Reusable Components */

function InfoCard({ icon, title }) {
  return (
    <div className="flex items-center gap-4 border border-white/5 bg-[#111] p-4">
      <div>{icon}</div>

      <p className="text-sm tracking-wide text-gray-300">
        {title}
      </p>
    </div>
  );
}
