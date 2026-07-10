"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Check } from "lucide-react";

export default function Footer() {
  const { currentLang, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Trigger modal show (complies with "no storage/database of any kind")
    setShowModal(true);
    setEmail("");
  };



  return (
    <>
      {/* ─── CTA SECTION ─── */}
      <section id="cta" className="cta-section">
        <div className="cta-glow-gold"></div>
        <div className="cta-glow-cyan"></div>

        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">
              {t("cta-title-1")}
              <br />
              <span className="text-gradient-gold-cyan">{t("cta-title-2")}</span>
            </h2>
            <p className="cta-desc">
              {t("cta-desc")}
            </p>

            {/* Waitlist form */}
            <form onSubmit={handleWaitlistSubmit} className="cta-form-row" id="waitlist-form">
              <label htmlFor="waitlist-email" className="sr-only">Alamat email untuk mendaftar waitlist</label>
              <input
                type="email"
                required
                id="waitlist-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={currentLang === "id" ? "Masukkan alamat email Anda..." : "Enter your email address..."}
                className="cta-input"
              />
              <button
                type="submit"
                className="btn btn-gold"
                style={{ height: "52px" }}
              >
                {t("cta-submit")}
              </button>
            </form>

            {/* Social Proof */}
            <div className="cta-social-proof">
              {t("cta-proof")}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            
            {/* Brand details */}
            <div className="footer-brand">
              <a href="#hero" className="nav-brand" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <svg
                  className="nav-logo-mark"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Logo bintang batik NUSAVERSE"
                  style={{ width: "28px", height: "28px" }}
                >
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="2"/>
                  <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke-width="2" />
                  <circle cx="50" cy="50" r="22" fill="none" stroke-width="2" />
                  <path d="M50 22 C35 35 35 65 50 78 C65 65 65 35 50 22 Z" fill="none" stroke-width="2" />
                  <path d="M22 50 C35 35 65 35 78 50 C65 65 35 65 22 50 Z" fill="none" stroke-width="2" />
                </svg>
                <span className="nav-logo-text" style={{ fontSize: "18px" }}>NUSAVERSE</span>
              </a>
              <p className="footer-tagline">
                {t("foot-tagline")}
              </p>
              
              {/* Social icons */}
              <div className="footer-social-row">
                <a href="#" className="social-icon-btn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="social-icon-btn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="social-icon-btn">
                  <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                </a>
                <a href="#" className="social-icon-btn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Column 1: Explore */}
            <div>
              <h5 className="footer-col-title">
                {t("foot-col-1")}
              </h5>
              <ul className="footer-links-list">
                <li className="footer-link-item"><a href="#explore">{t("foot-item-1")}</a></li>
                <li className="footer-link-item"><a href="#language">{t("foot-item-2")}</a></li>
                <li className="footer-link-item"><a href="#museum">{t("foot-item-3")}</a></li>
                <li className="footer-link-item"><a href="#timeline">{t("foot-item-4")}</a></li>
              </ul>
            </div>

            {/* Column 2: Alliances */}
            <div>
              <h5 className="footer-col-title">
                {t("foot-col-2")}
              </h5>
              <ul className="footer-links-list">
                <li className="footer-link-item"><a href="#culinary">{t("foot-item-5")}</a></li>
                <li className="footer-link-item"><a href="#ai-guide">{t("foot-item-6")}</a></li>
                <li className="footer-link-item"><a href="#language">{t("foot-item-7")}</a></li>
                <li className="footer-link-item"><a href="#">{t("foot-item-8")}</a></li>
              </ul>
            </div>



          </div>

          {/* References block list */}
          <div className="border-t border-white/10 pt-8 flex flex-col gap-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", display: "flex", flexDirection: "column", gap: "24px", textAlign: "center" }}>
            
            {/* Specific Sources & Disclaimers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "11px", color: "rgba(255,255,255,0.45)", maxWidth: "900px", margin: "0 auto", lineHeight: "1.6" }}>
              <div>
                <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{t("foot-sources-title")}: </strong>
                {t("foot-sources-text")}
              </div>
            </div>

            {/* Copyright & credit */}
            <div className="footer-bottom-bar">
              <span className="footer-copyright">
                &copy; {new Date().getFullYear()} NUSAVERSE. All Rights Reserved. SDGs Creative Web Competition Entry.
              </span>
              
              <span className="footer-heart-credit">
                {t("foot-credit")}
              </span>
            </div>

          </div>
        </div>
      </footer>

      {/* ─── WAITLIST SUCCESS MODAL OVERLAY ─── */}
      <div
        className={`modal-overlay ${showModal ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!showModal}
      >
        <div className="modal-card">
          <div className="modal-icon-box">
            <Check size={28} />
          </div>
          <h3 className="modal-title">
            {currentLang === "id" ? "Berhasil Terdaftar!" : "Successfully Registered!"}
          </h3>
          <p className="modal-desc">
            {currentLang === "id"
              ? "Email Anda telah masuk ke dalam antrean waitlist NUSAVERSE Beta. Kami akan mengabari Anda segera."
              : "Your email has been added to the NUSAVERSE Beta waitlist. We will notify you shortly."}
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-gold"
            style={{ margin: "0 auto", display: "block" }}
          >
            {t("modal-close")}
          </button>
        </div>
      </div>
    </>
  );
}
