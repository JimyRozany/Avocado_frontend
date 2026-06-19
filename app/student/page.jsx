"use client";

import ContactForm from "@/components/Website/ContactForm";
import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
import PopupChatBot from "@/components/PopupChatBot";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Scale,
} from "lucide-react";

const Student = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white px-4 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-yellow-400 uppercase tracking-[4px] text-sm">
              Internship Program
            </span>

            <h1 className="mt-4 text-5xl md:text-6xl font-light leading-tight">
              Build Your Future
              <span className="block text-yellow-400">
                In Law
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-gray-400 leading-8">
              Join our legal internship program and gain practical
              experience alongside experienced attorneys. Develop
              professional skills, work on real legal matters, and
              take the next step in your legal career.
            </p>
          </motion.div>

          {/* Features */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Scale size={28} />}
              title="Real Legal Exposure"
              description="Work closely with legal teams and gain insight into real-world legal practice."
            />

            <FeatureCard
              icon={<Briefcase size={28} />}
              title="Professional Experience"
              description="Develop practical skills and strengthen your legal knowledge."
            />

            <FeatureCard
              icon={<GraduationCap size={28} />}
              title="Career Growth"
              description="Enhance your future opportunities through mentorship and hands-on experience."
            />
          </div>

          {/* Main Section */}
          <div className="mt-24 grid gap-16 lg:grid-cols-2 items-start">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-yellow-400 uppercase tracking-[4px] text-sm">
                Apply Today
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-light leading-tight">
                Start Your Legal Journey
              </h2>

              <p className="mt-6 text-gray-400 leading-8">
                We welcome ambitious law students who are eager to
                learn, contribute, and grow within a professional
                legal environment. Complete the application form and
                our team will review your submission.
              </p>

              <div className="mt-10 border-l-2 border-yellow-400 pl-6">
                <p className="text-gray-300">
                  ✔ Law students and fresh graduates
                </p>
                <p className="mt-3 text-gray-300">
                  ✔ Strong communication skills
                </p>
                <p className="mt-3 text-gray-300">
                  ✔ Passion for legal research and practice
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-yellow-400/20 bg-[#111] p-6 md:p-8 shadow-[0_0_40px_rgba(255,193,7,0.08)]"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-medium">
                  Student Application
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Fill out the form below and submit your application.
                </p>
              </div>

              <ContactForm type="student"/>
            </motion.div>
          </div>
        </div>
      </section>

      <PopupChatBot />
      <Footer />
    </>
  );
};

export default Student;

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group border border-white/10 bg-[#111] p-8 transition-all duration-300 hover:border-yellow-400/40 hover:bg-[#151515]">
      <div className="text-yellow-400">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-400">
        {description}
      </p>
    </div>
  );
}