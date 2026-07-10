"use client";

import React, { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Crisis from "@/components/Crisis";
import CulturalMap from "@/components/CulturalMap";
import LanguagePreservation from "@/components/LanguagePreservation";
import VirtualMuseum from "@/components/VirtualMuseum";
import Timeline from "@/components/Timeline";
import AIChat from "@/components/AIChat";
import CulinarySection from "@/components/CulinarySection";
import Footer from "@/components/Footer";

export default function Home() {
  // Reset scroll to top and clear hash on page load/refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    // Clear hash
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // Lock scroll to top for the first 500ms to override browser auto-scrolling
    window.scrollTo(0, 0);
    let count = 0;
    const interval = setInterval(() => {
      window.scrollTo(0, 0);
      count++;
      if (count >= 10) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Global scroll reveal animations
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageProvider>
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Langsung ke konten utama / Skip to main content
      </a>

      {/* Primary Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* 01. Hero Showcase Section */}
        <Hero />

        {/* 02. Cultural Crisis Section */}
        <Crisis />

        {/* 03. Interactive Maps Section */}
        <CulturalMap />

        {/* 04. Local Languages Preservation Section */}
        <LanguagePreservation />

        {/* 05. Virtual 3D Artifacts Museum Section */}
        <VirtualMuseum />

        {/* 06. Historical Linimasa Timeline Section */}
        <Timeline />

        {/* 07. Culinary Heritage Archive Section */}
        <CulinarySection />

        {/* 08. Nusa AI Assistant Section */}
        <AIChat />
      </main>

      {/* CTA waitlist form & Footer links */}
      <Footer />
    </LanguageProvider>
  );
}
