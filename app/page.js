"use client";
import PopupChatBot from "@/components/PopupChatBot";
import Footer from "@/components/Website/Footer";
import ContactSection from "@/components/Website/Home/ContactSection";
import ExpertiseSection from "@/components/Website/Home/ExpertiseSection";
import Hero from "@/components/Website/Home/Hero";
import Platform from "@/components/Website/Home/Platform";
import Services from "@/components/Website/Home/Services";
import Navbar from "@/components/Website/Navbar";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen font-sans ">
      <Navbar />
      <Hero />
      <Services />
      <Platform />
      <ExpertiseSection />
      <ContactSection />
      <Footer />
      <PopupChatBot />
    </main>
  );
}
