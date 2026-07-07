"use client";

import React, { useState, useEffect } from "react";
import { ArtifactData } from "@/types";
import { ChevronDown, ChevronUp, Award, MapPin, Calendar, Hammer, Sparkles, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoPanelProps {
  artifact: ArtifactData;
  lang: "id" | "en";
  t: (key: string) => string;
}

const CATEGORY_LABELS_ID: Record<string, string> = {
  sacred:       "Benda Sakral & Seni",
  textiles:     "Tekstil & Wastra",
  weapons:      "Senjata Tradisional",
  music:        "Alat Musik Tradisional",
  architecture: "Arsitektur & Rumah Adat",
};
const CATEGORY_LABELS_EN: Record<string, string> = {
  sacred:       "Sacred & Performing Arts",
  textiles:     "Traditional Textiles",
  weapons:      "Traditional Weapons",
  music:        "Musical Instruments",
  architecture: "Traditional Architecture",
};

export default function InfoPanel({ artifact, lang, t }: InfoPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    history: false,
    craftsmanship: false,
    meaning: false,
    unesco: false,
  });

  // Reset accordion state when active artifact changes
  useEffect(() => {
    setExpandedSections({
      overview: true,
      history: false,
      craftsmanship: false,
      meaning: false,
      unesco: false,
    });
  }, [artifact.id]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const title    = lang === "id" ? artifact.title_id    : artifact.title_en;
  const desc     = lang === "id" ? artifact.desc_id     : artifact.desc_en;
  const origin   = lang === "id" ? artifact.origin_id   : artifact.origin_en;
  const era      = lang === "id" ? artifact.era_id      : artifact.era_en;
  const material = lang === "id" ? artifact.material_id : artifact.material_en;
  const catLabel = lang === "id"
    ? CATEGORY_LABELS_ID[artifact.category]
    : CATEGORY_LABELS_EN[artifact.category];

  // Dynamic history context builder to serve as narrative storytelling
  const historyText = lang === "id"
    ? `Dibuat dan dilestarikan sejak ${era} di daerah ${origin}. Karya seni pusaka ini mencerminkan puncak pencapaian sejarah peradaban Nusantara pada masanya. Berperan penting sebagai instrumen upacara adat, simbol prestise kemasyarakatan, serta diwariskan turun-temurun sebagai penjaga identitas budaya leluhur.`
    : `Crafted and preserved since the ${era} in the region of ${origin}. This heritage masterpiece reflects the zenith of historical achievements in the Nusantara archipelago during its time. It has served as an essential ceremonial object, a symbol of societal prestige, and passed down through generations to safeguard ancestral cultural identity.`;

  return (
    <div className="museum-info-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* ── Title block ──────────────────────────────────────────────── */}
      <div>
        <h3 className="museum-info-name" style={{ margin: 0, fontSize: "22px", fontWeight: "900", color: "var(--gold-primary)", letterSpacing: "0.02em" }}>
          {title}
        </h3>
      </div>

      {/* ── QUICK FACTS BADGES (Permanently Visible) ──────────────────── */}
      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "8px", 
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}
        aria-label="Fakta Cepat"
      >
        <span className="info-badge-premium" style={{ background: "rgba(212, 175, 55, 0.06)", border: "1px solid rgba(212, 175, 55, 0.18)" }}>
          <MapPin size={10} style={{ color: "var(--gold-primary)" }} /> {origin}
        </span>
        <span className="info-badge-premium">
          <Calendar size={10} /> {era}
        </span>
        <span className="info-badge-premium">
          <Hammer size={10} /> {material.split(",")[0]}
        </span>
        {artifact.unesco && (
          <span className="info-badge-premium" style={{ background: "rgba(34, 211, 238, 0.06)", border: "1px solid rgba(34, 211, 238, 0.2)", color: "var(--cyan-primary)" }}>
            <Award size={10} /> {artifact.unesco}
          </span>
        )}
      </div>

      {/* ── PROGRESSIVE DISCLOSURE ACCORDIONS ─────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        {/* Accordion 1: Overview */}
        <div style={{ border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", overflow: "hidden" }}>
          <button
            onClick={() => toggleSection("overview")}
            aria-expanded={expandedSections.overview}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "none",
              border: "none",
              color: "var(--white)",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BookOpen size={13} style={{ color: "var(--gold-primary)" }} />
              <span>{lang === "id" ? "Deskripsi & Ringkasan" : "Overview & Description"}</span>
            </div>
            {expandedSections.overview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSections.overview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "var(--white-80)", lineHeight: "1.6" }}>
                  {desc}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 2: History */}
        <div style={{ border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", overflow: "hidden" }}>
          <button
            onClick={() => toggleSection("history")}
            aria-expanded={expandedSections.history}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "none",
              border: "none",
              color: "var(--white)",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={13} style={{ color: "var(--gold-primary)" }} />
              <span>{lang === "id" ? "Latar Belakang Sejarah" : "Historical Background"}</span>
            </div>
            {expandedSections.history ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSections.history && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "var(--white-80)", lineHeight: "1.6" }}>
                  {historyText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 3: Materials & Craftsmanship */}
        <div style={{ border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", overflow: "hidden" }}>
          <button
            onClick={() => toggleSection("craftsmanship")}
            aria-expanded={expandedSections.craftsmanship}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "none",
              border: "none",
              color: "var(--white)",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Hammer size={13} style={{ color: "var(--gold-primary)" }} />
              <span>{lang === "id" ? "Bahan & Proses Pembuatan" : "Materials & Craftsmanship"}</span>
            </div>
            {expandedSections.craftsmanship ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSections.craftsmanship && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "var(--white-80)", lineHeight: "1.6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", color: "var(--gold-primary)" }}>
                    <strong>{lang === "id" ? "Material Utama:" : "Key Materials:"}</strong>
                  </div>
                  <p style={{ margin: "0 0 12px 0", paddingLeft: "12px" }}>{material}</p>
                  
                  {/* Pull specifics from hotspots if available */}
                  {artifact.hotspots.some((h) => h.material_id) && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                      <strong style={{ fontSize: "12px", color: "var(--white)" }}>{lang === "id" ? "Detail Komponen:" : "Component Details:"}</strong>
                      {artifact.hotspots.filter((h) => h.material_id).map((spot) => (
                        <div key={spot.id} style={{ fontSize: "12.5px", paddingLeft: "12px" }}>
                          <span style={{ color: "var(--gold-primary)" }}>• {lang === "id" ? spot.title_id : spot.title_en}:</span>{" "}
                          {lang === "id" ? spot.material_id : spot.material_en}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 4: Cultural Symbolism */}
        <div style={{ border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", overflow: "hidden" }}>
          <button
            onClick={() => toggleSection("meaning")}
            aria-expanded={expandedSections.meaning}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "none",
              border: "none",
              color: "var(--white)",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={13} style={{ color: "var(--gold-primary)" }} />
              <span>{lang === "id" ? "Makna & Simbolisme Budaya" : "Cultural Symbolism & Meaning"}</span>
            </div>
            {expandedSections.meaning ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSections.meaning && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "var(--white-80)", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {artifact.hotspots.map((spot) => {
                    const spotTitle = lang === "id" ? spot.title_id : spot.title_en;
                    const spotMeaning = lang === "id" ? spot.meaning_id || spot.desc_id : spot.meaning_en || spot.desc_en;
                    return (
                      <div key={spot.id} style={{ borderLeft: "2.5px solid var(--cyan-primary)", paddingLeft: "10px" }}>
                        <strong style={{ color: "var(--white)", fontSize: "12px" }}>{spotTitle}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "var(--white-70)" }}>{spotMeaning}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 5: UNESCO (only if applicable) */}
        {artifact.unesco && (
          <div style={{ border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", overflow: "hidden" }}>
            <button
              onClick={() => toggleSection("unesco")}
              aria-expanded={expandedSections.unesco}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "none",
                border: "none",
                color: "var(--white)",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={13} style={{ color: "var(--gold-primary)" }} />
                <span>{lang === "id" ? "Pengakuan Warisan Dunia (UNESCO)" : "World Heritage Recognition (UNESCO)"}</span>
              </div>
              {expandedSections.unesco ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            <AnimatePresence initial={false}>
              {expandedSections.unesco && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 16px 16px", fontSize: "13px", color: "var(--white-80)", lineHeight: "1.6" }}>
                    {lang === "id" 
                      ? `Artefak ini diakui secara resmi oleh UNESCO sebagai bagian dari ${artifact.unesco}, menegaskan signifikansi globalnya dalam melindungi kekayaan budaya takbenda bagi kemanusiaan.`
                      : `This artifact is officially recognized by UNESCO as part of the ${artifact.unesco}, highlighting its global significance in safeguarding intangible cultural heritage for humanity.`
                    }
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
      
    </div>
  );
}
