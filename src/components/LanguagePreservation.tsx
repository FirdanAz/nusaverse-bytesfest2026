"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES_DATA } from "@/data/culturalData";
import { Languages } from "lucide-react";

export default function LanguagePreservation() {
  const { currentLang, t } = useLanguage();
  const [selectedLangId, setSelectedLangId] = useState<string>("jawa");
  
  const langList = [
    { id: "jawa", name: "Bahasa Jawa", region: currentLang === "id" ? "Jawa Tengah & Jawa Timur" : "Central & East Java", status: "vulnerable" },
    { id: "sunda", name: "Bahasa Sunda", region: currentLang === "id" ? "Jawa Barat & Banten" : "West Java & Banten", status: "vulnerable" },
    { id: "batak", name: "Bahasa Batak Karo", region: currentLang === "id" ? "Sumatra Utara" : "North Sumatra", status: "vulnerable" },
    { id: "bugis", name: "Bahasa Bugis", region: currentLang === "id" ? "Sulawesi Selatan" : "South Sulawesi", status: "endangered" },
    { id: "asmat", name: "Bahasa Asmat", region: currentLang === "id" ? "Papua Selatan" : "South Papua", status: "critical" },
  ];

  const activeLanguage = LANGUAGES_DATA[selectedLangId] || LANGUAGES_DATA["jawa"];

  const getStatusLabel = (status: string) => {
    if (status === "vulnerable") return currentLang === "id" ? "Rentan" : "Vulnerable";
    if (status === "endangered") return currentLang === "id" ? "Terancam" : "Endangered";
    return currentLang === "id" ? "Kritis" : "Critical";
  };

  const getStatusClass = (status: string) => {
    if (status === "vulnerable") return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    if (status === "endangered") return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    return "bg-red-500/15 text-red-400 border-red-500/30";
  };

  return (
    <section id="language" className="lang-section section-padding reveal">
      <div className="container">
        
        {/* Header */}
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow-chip eyebrow-chip-cyan">
            <Languages size={12} />
            <span>{t("lang-eyebrow")}</span>
          </div>
          <h2 className="section-title">
            {t("lang-title-1")} <br />
            <span className="text-gradient-cyan">{t("lang-title-2")}</span>
          </h2>
          <p className="section-subtitle">
            {t("lang-subtitle")}
          </p>
        </div>

        {/* Column Grid Layout */}
        <div className="lang-grid">
          
          {/* Left Column: Language selector list */}
          <div className="lang-selector-list">
            {langList.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLangId(lang.id)}
                className={`lang-item-row ${selectedLangId === lang.id ? "active" : ""}`}
              >
                <div className="lang-item-info">
                  <span className="lang-item-name">{lang.name}</span>
                  <span className="lang-item-region">{lang.region}</span>
                </div>
                <span className={`lang-item-badge badge-${lang.status}`}>
                  {getStatusLabel(lang.status)}
                </span>
              </button>
            ))}
          </div>

          {/* Right Column: Language display panel */}
          <div className="lang-display-panel glass-card">
            
            {/* Header info */}
            <div className="lang-display-header">
              <div>
                <h3 className="lang-display-title">{activeLanguage.name}</h3>
                <span className={`lang-item-badge badge-${activeLanguage.status}`} style={{ marginTop: "8px", display: "inline-block" }}>
                  {getStatusLabel(activeLanguage.status)}
                </span>
              </div>
            </div>

            {/* Native script display banner */}
            <div className="script-banner">
              <span className="script-text-native">
                {activeLanguage.script}
              </span>
            </div>

            {/* Phrase Card */}
            <div className="phrase-card">
              <div className="phrase-label">{t("lbl-example")}</div>
              <div className="phrase-text">
                {activeLanguage.phrase}
              </div>
              <div className="phrase-translation">
                {currentLang === "id" ? activeLanguage.translation_id : activeLanguage.translation_en}
              </div>
            </div>



            {/* Interactive Alphabet Character Cards (Y-axis perspective flipping) */}
            <div>
              <div className="phrase-label" style={{ marginBottom: "12px" }}>
                {t("lbl-alphabet")}
              </div>
              
              <div className="alphabet-grid">
                {activeLanguage.alphabet.map((item, idx) => (
                  <div key={idx} className="alpha-card">
                    <div className="alpha-card-inner">
                      
                      {/* Front Card Face */}
                      <div className="alpha-card-front">
                        {item.native}
                      </div>

                      {/* Back Card Face */}
                      <div className="alpha-card-back">
                        <span className="alpha-roman">{item.roman}</span>
                        <span className="alpha-sound">"{item.sound}"</span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
