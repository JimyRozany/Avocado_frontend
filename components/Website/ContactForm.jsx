// components/ContactForm.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // PRINT OBJECT
    console.log(formData);

    /*
      OUTPUT:
      {
        fullName: "John",
        email: "john@gmail.com",
        mobileNumber: "123456789",
        message: "Hello"
      }
    */
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Full Name */}
      <Input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      {/* Email + Mobile */}
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative">
          <Input
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          <ChevronDown
            size={16}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Type here"
        value={formData.message}
        onChange={handleChange}
        className="h-52 w-full rounded-3xl border border-white/5 bg-[#1a1a1a] px-6 py-5 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-yellow-400"
      />

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-white px-7 py-3 text-xs font-semibold tracking-wide text-black transition-all duration-300 group-hover:bg-yellow-400">
            SEND
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
            <ArrowUpRight size={16} />
          </span>
        </button>
      </div>
    </motion.form>
  );
}

/* Reusable Input */
function Input({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-16 w-full rounded-full border border-white/5 bg-[#1a1a1a] px-6 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-yellow-400"
    />
  );
}