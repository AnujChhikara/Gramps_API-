import HeroSection from "@/components/sections/HeroSection";
import { UpcomingFeatures } from "@/components/sections/UpcomingFeatures";
import { FeaturesSection } from "@/components/sections/Features";
import React from "react";
import { MainSection } from "@/components/sections/MainSection";
import Navbar from "@/components/sections/Navbar";

export default function Home() {
  return (
    <div className='bg-white text-black'>
      <Navbar />
      <MainSection />

      <HeroSection />

      <FeaturesSection />
      <UpcomingFeatures />
      <footer className='py-8 text-center font-bold'>
        <p>&copy; 2024 Reqium. All rights reserved.</p>
      </footer>
    </div>
  );
}
