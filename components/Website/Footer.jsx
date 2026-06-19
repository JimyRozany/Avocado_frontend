"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import image2 from "../../public/Images/side/Group 688.png"
import Image from "next/image";
const menuLinks = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Find a Lawyer", link: "/lawyers" },
  { name: "Law Library", link: "/law-library" },
  { name: "Terms", link: "/terms" },
  { name: "Contact Us", link: "/contact" },
];
const linkLinks = ["LinkedIn", "Email", "WhatsApp", "Facebook", "Instagram", "Tiktok", "X"];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 md:px-10 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
           <Image src={image2} alt="image2" className="w-40"/>
        </div>

        {/* Menu */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">Menu</p>
          <ul className="flex flex-col gap-2">
            {menuLinks.map((l, i) => (
              <li key={i}>
                <Link href={l.link} className="text-white/40 text-xs hover:text-white transition">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Link */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">Link</p>
          <ul className="flex flex-col gap-2">
            {linkLinks.map((l, i) => (
              <li key={i}>
                <a href="#" className="text-white/40 text-xs hover:text-white transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">Contact</p>
          <ul className="flex flex-col gap-2">
            <li className="text-white/40 text-xs">Jl Lorem ipsum, City, Location</li>
            <li className="text-white/40 text-xs">+ 123 456 7890</li>
            <li className="text-white/40 text-xs">Support@Porawes.Com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs">Copyrighted © 2025 By AVOCATO</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Data Protection", "Disclaimer"].map((t, i) => (
            <a key={i} href="#" className="text-white/30 text-xs hover:text-white transition">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
