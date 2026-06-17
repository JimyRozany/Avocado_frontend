"use client"
import PopupChatBot from "@/components/PopupChatBot";
import AboutSection from "@/components/Website/About/AboutSection";
import LegalHero from "@/components/Website/About/LegalHero";
import Footer from "@/components/Website/Footer";
import ExpertiseSection from "@/components/Website/Home/ExpertiseSection";
import Platform from "@/components/Website/Home/Platform";
import Navbar from "@/components/Website/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <AboutSection />
      <Platform type="about" />
      <ExpertiseSection type="about" />
      <div className="w-full bg-black pb-10">
        <LegalHero />
      </div>
      <PopupChatBot />
      <Footer />
    </div>
  );
};

export default page;
