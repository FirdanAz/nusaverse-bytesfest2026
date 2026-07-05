"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Languages, Shield, Archive, Map } from "lucide-react";

export default function SDGsImpact() {
  const { currentLang, t } = useLanguage();
  
  // Connection diagram hover state
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger progress bar load on scroll view
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const sdgCards = [
    {
      id: "4",
      color: "#C5192D",
      titleKey: "sdg4-title",
      descKey: "sdg4-desc",
      label: currentLang === "id" ? "Sasaran Edukasi Kebudayaan" : "Cultural Education Target",
      progress: "95%",
      hoverClass: "hover:border-[#C5192D] hover:bg-[#C5192D]/3 hover:shadow-[0_10px_30px_rgba(197,25,45,0.15)]",
      fillClass: "bg-[#C5192D]",
    },
    {
      id: "10",
      color: "#DD1367",
      titleKey: "sdg10-title",
      descKey: "sdg10-desc",
      label: currentLang === "id" ? "Inklusi Suku Adat Terpencil" : "Indigenous Inclusion Target",
      progress: "80%",
      hoverClass: "hover:border-[#DD1367] hover:bg-[#DD1367]/3 hover:shadow-[0_10px_30px_rgba(221,19,103,0.15)]",
      fillClass: "bg-[#DD1367]",
    },
    {
      id: "11",
      color: "#FD9D24",
      titleKey: "sdg11-title",
      descKey: "sdg11-desc",
      label: currentLang === "id" ? "Konservasi Cagar Budaya" : "Heritage Conservation Target",
      progress: "88%",
      hoverClass: "hover:border-[#FD9D24] hover:bg-[#FD9D24]/3 hover:shadow-[0_10px_30px_rgba(253,157,36,0.15)]",
      fillClass: "bg-[#FD9D24]",
    },
    {
      id: "16",
      color: "#00689D",
      titleKey: "sdg16-title",
      descKey: "sdg16-desc",
      label: currentLang === "id" ? "Hak Kekayaan Intelektual" : "Intellectual Property Rights",
      progress: "100%",
      hoverClass: "hover:border-[#00689D] hover:bg-[#00689D]/3 hover:shadow-[0_10px_30px_rgba(0,104,157,0.15)]",
      fillClass: "bg-[#00689D]",
    },
  ];

  const features = [
    { id: "sdg4", label: currentLang === "id" ? "Arsip Bahasa & Aksara" : "Language & Script Archive", desc: currentLang === "id" ? "Edukasi & pelestarian aksara daerah" : "Education & native script archiving", icon: <Languages size={20} /> },
    { id: "sdg11", label: currentLang === "id" ? "Museum Digital 3D" : "3D Digital Museum", desc: currentLang === "id" ? "Konservasi warisan budaya tak benda" : "Tangible & intangible heritage assets preservation", icon: <Archive size={20} /> },
    { id: "sdg10", label: currentLang === "id" ? "Peta Interaktif Nusantara" : "Nusantara Interactive Map", desc: currentLang === "id" ? "Inklusi suku adat & wilayah terpencil" : "Bridging remote tribes exclusion", icon: <Map size={20} /> },
    { id: "sdg16", label: currentLang === "id" ? "Hak Cipta Seni Komunal" : "Communal Art Rights Protection", desc: currentLang === "id" ? "Perlindungan hak adat tradisional" : "Securing indigenous custom properties", icon: <Shield size={20} /> },
  ];

  const sdgNodes = [
    { id: "sdg4", label: "SDG 4", color: "#C5192D", title: t("sdg4-title"), desc: currentLang === "id" ? "Target 4.7: Edukasi Kebudayaan Global" : "Target 4.7: Global Heritage Education" },
    { id: "sdg10", label: "SDG 10", color: "#DD1367", title: t("sdg10-title"), desc: currentLang === "id" ? "Target 10.2: Inklusi Sosial & Politik" : "Target 10.2: Social & Political Inclusion" },
    { id: "sdg11", label: "SDG 11", color: "#FD9D24", title: t("sdg11-title"), desc: currentLang === "id" ? "Target 11.4: Perlindungan Warisan Budaya" : "Target 11.4: Cultural Heritage Protection" },
    { id: "sdg16", label: "SDG 16", color: "#00689D", title: t("sdg16-title"), desc: currentLang === "id" ? "Target 16.b: Hukum Adat Non-Diskriminatif" : "Target 16.b: Non-Discriminatory Custom Laws" },
  ];

  return (
    <section id="sdgs" ref={sectionRef} className="sdgs-section section-padding reveal">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/3 border border-gold-primary rounded-full text-[11px] font-bold tracking-widest uppercase text-gold-light mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Globe size={12} />
            <span>{t("sdg-eyebrow")}</span>
          </div>
          <h2 className="text-display text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            {t("sdg-title-1")} <span className="text-gradient-gold">{t("sdg-title-2")}</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-[650px] leading-relaxed">
            {t("sdg-subtitle")}
          </p>
        </div>

        {/* SDG cards grid */}
        <div className="sdg-cards-grid">
          {sdgCards.map((card) => (
            <div
              key={card.id}
              className={`sdg-card glass-card sdg-card-${card.id}`}
              data-sdg={card.id}
            >
              <div className="sdg-icon-box">
                SDG {card.id}
              </div>
              
              <h4 className="sdg-card-title">{t(card.titleKey)}</h4>
              <p className="sdg-card-desc">{t(card.descKey)}</p>

              {/* Progress bar container */}
              <div className="sdg-progress-container">
                <div className="sdg-progress-label">
                  <span>{card.label}</span>
                  <span>{card.progress}</span>
                </div>
                <div className="sdg-progress-bar">
                  <div
                    className="sdg-progress-fill"
                    style={{
                      width: card.progress,
                      backgroundColor: card.color,
                      transform: isVisible ? `scaleX(1)` : `scaleX(0)`,
                    }}
                  ></div>
                </div>
              </div>

              <span className="sdg-card-link">
                {t("sdg-btn")} Dampak →
              </span>
            </div>
          ))}
        </div>

        {/* Feature-to-SDG Connection Diagram */}
        <div className="sdg-connection-diagram glass-card reveal">
          <h3 className="diagram-title">
            {currentLang === "id" ? "Pemetaan Fitur Platform ke SDGs" : "Platform Features Mapping to SDGs"}
          </h3>
          
          <div className="diagram-grid">
            
            {/* Left Column: Features nodes */}
            <div className="diagram-column features-col">
              {features.map((feat) => (
                <div
                  key={feat.id}
                  onMouseEnter={() => setHoveredTarget(feat.id)}
                  onMouseLeave={() => setHoveredTarget(null)}
                  className={`diagram-node feature-node ${hoveredTarget === feat.id ? "active" : ""}`}
                  data-target={feat.id}
                >
                  <div className="node-icon">
                    {feat.icon}
                  </div>
                  <div className="node-text">
                    <h4>{feat.label}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column: SVG connection lines */}
            <div className="diagram-lines-wrapper">
              <svg className="diagram-lines-svg" viewBox="0 0 200 400" preserveAspectRatio="none">
                {/* Line 1 -> SDG 4 */}
                <path
                  id="line-f1-sdg4"
                  d="M 0 50 C 100 50, 100 50, 200 50"
                  className={`conn-line ${hoveredTarget === "sdg4" ? "active" : ""}`}
                  style={{
                    stroke: hoveredTarget === "sdg4" ? "#C5192D" : "",
                  }}
                />
                {/* Line 2 -> SDG 11 */}
                <path
                  id="line-f2-sdg11"
                  d="M 0 150 C 100 150, 100 250, 200 250"
                  className={`conn-line ${hoveredTarget === "sdg11" ? "active" : ""}`}
                  style={{
                    stroke: hoveredTarget === "sdg11" ? "#FD9D24" : "",
                  }}
                />
                {/* Line 3 -> SDG 10 */}
                <path
                  id="line-f3-sdg10"
                  d="M 0 250 C 100 250, 100 150, 200 150"
                  className={`conn-line ${hoveredTarget === "sdg10" ? "active" : ""}`}
                  style={{
                    stroke: hoveredTarget === "sdg10" ? "#DD1367" : "",
                  }}
                />
                {/* Line 4 -> SDG 16 */}
                <path
                  id="line-f4-sdg16"
                  d="M 0 350 C 100 350, 100 350, 200 350"
                  className={`conn-line ${hoveredTarget === "sdg16" ? "active" : ""}`}
                  style={{
                    stroke: hoveredTarget === "sdg16" ? "#00689D" : "",
                  }}
                />
              </svg>
            </div>

            {/* Right Column: SDGs targets nodes */}
            <div className="diagram-column sdgs-col">
              {sdgNodes.map((node) => {
                const isActive = hoveredTarget === node.id;
                return (
                  <div
                    key={node.id}
                    className={`diagram-node sdg-node ${isActive ? "active" : ""}`}
                    id={`node-${node.id}`}
                  >
                    <div
                      className="node-badge"
                      style={{ backgroundColor: node.color }}
                    >
                      {node.label}
                    </div>
                    <div className="node-text">
                      <h4>{node.title}</h4>
                      <p>{node.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Quotes block */}
        <div className="sdg-quote-container glass-card">
          <p className="sdg-quote-text">
            {t("sdg-quote")}
          </p>
          <span className="sdg-quote-author">
            {t("sdg-author")}
          </span>
        </div>

      </div>
    </section>
  );
}
