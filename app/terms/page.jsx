"use client";

import PopupChatBot from "@/components/PopupChatBot";
import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
import { motion } from "framer-motion";

const termsSections = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to Avocato.",
      "By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions.",
      "If you do not agree with any part of these terms, please do not use our services.",
    ],
  },
  {
    title: "2. Definitions",
    content: [
      "Platform: Refers to Avocato website and services.",
      "User: Any individual using the platform (Client or Lawyer).",
      "Client: A user seeking legal services.",
      "Lawyer: A registered legal professional providing services.",
    ],
  },
  {
    title: "3. Use Of The Platform",
    content: [
      "You agree to use the platform only for lawful purposes.",
      "Users must not misuse, disrupt, or attempt unauthorized access to the platform.",
      "All information provided must be accurate and up to date.",
    ],
  },
  {
    title: "4. Privacy Policy",
    content: [
      "Your personal information is handled according to our Privacy Policy.",
      "We take reasonable measures to protect your data and confidentiality.",
    ],
  },
  {
    title: "5. Limitation Of Liability",
    content: [
      "Avocato is not responsible for legal outcomes resulting from lawyer-client interactions.",
      "We provide a platform for connection and legal resources only.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-black px-6 py-24 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h1 className="text-4xl font-semibold md:text-5xl">
          Terms & Conditions
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          Home /{" "}
          <span className="font-medium text-yellow-400">
            Terms & Conditions
          </span>
        </p>
      </motion.div>

      {/* Content */}
      <div className="mx-auto mt-24 max-w-5xl space-y-16">
        {termsSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
          >
            <h2 className="text-3xl font-semibold md:text-4xl">
              {section.title}
            </h2>

            <div className="mt-6 space-y-4 text-gray-300">
              {section.content.map((text, i) => (
                <p
                  key={i}
                  className="text-base leading-8 md:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    <PopupChatBot />
    <Footer/>
    </>
  );
}