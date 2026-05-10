"use client";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
    <section className="bg-black py-16 px-6 md:px-10 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-[95%] mx-auto">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-white text-3xl font-bold leading-snug">
            Discuss Your Complaint Now
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Are you looking for solutions that suit your needs?<br />
            We are here to help you, contact us
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
                <MdOutlineEmail className="text-white/60" size={18} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">Email</p>
                <p className="text-white/80 text-sm">INFO@AVOCATO.COM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
                <MdOutlinePhone className="text-white/60" size={18} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">Mobile number</p>
                <p className="text-white/80 text-sm">+123-456-7890</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
       <ContactForm/>
      </div>
    </section>
  );
}
