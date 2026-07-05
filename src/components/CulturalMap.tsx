"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ISLANDS_DATA } from "@/data/culturalData";
import InteractiveMap from "./maps/InteractiveMap";
import { Landmark, Languages, Info, MapPin } from "lucide-react";

export default function CulturalMap() {
  const { currentLang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedIsland, setSelectedIsland] = useState<string>("sumatra");
  
  // Tooltip state
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; visible: boolean }>({
    text: "",
    x: 0,
    y: 0,
    visible: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const filterChips = [
    { id: "all", label: t("island-all") },
    { id: "sumatra", label: t("island-sum") },
    { id: "java", label: t("island-java") },
    { id: "kalimantan", label: t("island-kal") },
    { id: "sulawesi", label: t("island-sul") },
    { id: "nusatenggara", label: t("island-nusa") },
    { id: "papua", label: t("island-papua") },
  ];

  // Map Event Delegation
  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    const group = target.closest(".map-island-group");
    
    if (group && containerRef.current) {
      // Check if it is currently hidden due to active filter
      const dataIsland = group.getAttribute("data-island");
      if (activeFilter !== "all" && dataIsland !== activeFilter) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        return;
      }

      const name = group.getAttribute("data-name") || "";
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to the map container
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      setTooltip({
        text: name,
        x: x + 15,
        y: y - 35,
        visible: true,
      });
    } else {
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  };

  const handleMapMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const islandInfo = ISLANDS_DATA[selectedIsland] || ISLANDS_DATA["sumatra"];

  return (
    <section id="explore" className="map-section section-padding reveal">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow-chip">
            <MapPin size={12} />
            <span>{t("map-eyebrow")}</span>
          </div>
          <h2 className="section-title">
            {t("map-title")}
          </h2>
          <p className="section-subtitle">
            {t("map-subtitle")}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="map-filter-bar">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`filter-chip ${activeFilter === chip.id ? "active" : ""}`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Map and Details Grid */}
        <div className="map-grid">
          
          {/* Map Canvas Box */}
          <div
            ref={containerRef}
            onMouseMove={handleMapMouseMove}
            onMouseLeave={handleMapMouseLeave}
            className="interactive-map-panel"
          >
            {/* Map Component with filtered visibility */}
            <div className="w-full h-full">
              <InteractiveMap
                selectedIsland={selectedIsland}
                onSelectIsland={(islandId) => setSelectedIsland(islandId)}
              />
            </div>

            {/* Custom styled CSS Map tooltip */}
            <div
              className="map-tooltip"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                opacity: tooltip.visible ? 1 : 0,
              }}
            >
              {tooltip.text}
            </div>

            {/* Injected filter CSS values dynamically using React styled scope */}
            <style jsx global>{`
              #indonesia-svg-map .map-island-group {
                transition: opacity 0.4s ease, fill 0.3s ease, stroke 0.3s ease;
              }
              ${
                activeFilter !== "all"
                  ? `#indonesia-svg-map .map-island-group:not([data-island="${activeFilter}"]) {
                      opacity: 0.15 !important;
                      pointer-events: none !important;
                    }`
                  : ""
              }
            `}</style>
          </div>

          {/* Island Detail Card (Right Column) */}
          <div className="map-detail-card glass-card">
            {/* Region Image */}
            <img
              src={islandInfo.image}
              alt={currentLang === "id" ? islandInfo.title_id : islandInfo.title_en}
              className="map-detail-img"
              loading="lazy"
            />
            
            <h3 className="map-detail-title">
              {currentLang === "id" ? islandInfo.title_id : islandInfo.title_en}
            </h3>
            
            <div className="map-detail-meta">
              {currentLang === "id" ? islandInfo.meta_id : islandInfo.meta_en}
            </div>
            
            <p className="map-detail-desc">
              {currentLang === "id" ? islandInfo.desc_id : islandInfo.desc_en}
            </p>

            {/* Region Stats */}
            <div className="map-detail-stats">
              <div className="map-detail-stat-item">
                <span className="map-detail-stat-label">{t("lbl-langs")}</span>
                <span className="map-detail-stat-val">{islandInfo.langs}</span>
              </div>
              <div className="map-detail-stat-item">
                <span className="map-detail-stat-label">{t("lbl-unesco")}</span>
                <span className="map-detail-stat-val">{islandInfo.unesco}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
