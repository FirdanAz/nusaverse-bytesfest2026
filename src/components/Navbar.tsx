"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { currentLang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#crisis", label: currentLang === "id" ? "Urgensi" : "Urgency" },
    { href: "#explore", label: currentLang === "id" ? "Peta" : "Map" },
    { href: "#language", label: currentLang === "id" ? "Bahasa" : "Language" },
    { href: "#museum", label: "Museum" },
    { href: "#timeline", label: currentLang === "id" ? "Sejarah" : "History" },
    { href: "#ai-guide", label: "Nusa AI" },
    { href: "#sdgs", label: "SDGs" },
  ];

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "scrolled" : ""}`} aria-label="Navigasi utama">
      <div className="nav-container">
        
        {/* Brand logo */}
        <a href="#hero" className="nav-brand" aria-label="NUSAVERSE, kembali ke beranda">
          <svg className="nav-logo-mark" viewBox="0 0 100 100" role="img" aria-label="Logo bintang batik NUSAVERSE">
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="2"/>
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" strokeWidth="2"/>
            <circle cx="50" cy="50" r="22" fill="none" strokeWidth="2"/>
            <path d="M50 22 C35 35 35 65 50 78 C65 65 65 35 50 22 Z" fill="none" strokeWidth="2"/>
            <path d="M22 50 C35 35 65 35 78 50 C65 65 35 65 22 50 Z" fill="none" strokeWidth="2"/>
          </svg>
          <span className="nav-logo-text">NUSAVERSE</span>
        </a>

        {/* Navigation links drawer */}
        <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`} id="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action button triggers */}
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Pilih bahasa">
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`lang-btn ${currentLang === "id" ? "active" : ""}`}
              aria-pressed={currentLang === "id"}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`lang-btn ${currentLang === "en" ? "active" : ""}`}
              aria-pressed={currentLang === "en"}
            >
              EN
            </button>
          </div>
          <a href="#cta" className="btn btn-gold btn-sm" style={{ padding: "8px 16px" }}>
            {currentLang === "id" ? "Gabung Waitlist" : "Join Waitlist"}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="menu-toggle"
          id="menu-toggle-btn"
          aria-label="Toggle menu navigasi"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>
    </nav>
  );
}
