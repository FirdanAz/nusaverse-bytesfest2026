"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ARTIFACTS_DATA } from "@/data/culturalData";
import { Landmark, Compass, RotateCw } from "lucide-react";

export default function VirtualMuseum() {
  const { currentLang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>("kris");
  
  // 3D perspective hologram tilt states
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: t("cat-all") },
    { id: "sacred", label: t("cat-sacred") },
    { id: "textiles", label: t("cat-textiles") },
    { id: "weapons", label: t("cat-weapons") },
  ];

  const filteredArtifacts = ARTIFACTS_DATA.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Set the first item of the filtered category as active when category changes
  useEffect(() => {
    if (filteredArtifacts.length > 0) {
      setSelectedArtifactId(filteredArtifacts[0].id);
      setTiltX(0);
      setTiltY(0);
    }
  }, [activeCategory]);

  const activeArtifact =
    ARTIFACTS_DATA.find((item) => item.id === selectedArtifactId) || ARTIFACTS_DATA[0];

  // Mouse Move Tilt Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewerRef.current) return;
    const rect = viewerRef.current.getBoundingClientRect();
    
    // Normalize cursor position: -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Y-axis rotation based on X movement, X-axis rotation based on Y movement
    setTiltY(x * 50); // -25deg to +25deg
    setTiltX(-y * 36); // -18deg to +18deg
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };

  // Touch handlers for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!viewerRef.current) return;
    const rect = viewerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width)) - 0.5;
    const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height)) - 0.5;
    
    setTiltY(x * 50);
    setTiltX(-y * 36);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };

  return (
    <section id="museum" className="museum-section section-padding reveal">
      <div className="container">
        
        {/* Header */}
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow-chip">
            <Landmark size={12} />
            <span>{t("museum-eyebrow")}</span>
          </div>
          <h2 className="section-title">
            {t("museum-title-1")} <span className="text-gradient-gold">{t("museum-title-2")}</span>
          </h2>
          <p className="section-subtitle">
            {t("museum-subtitle")}
          </p>
        </div>

        {/* Category Pills */}
        <div className="museum-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-chip ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Museum Grid split layout */}
        <div className="museum-cards-container">
          
          {/* Left Column: Artifact Cards list */}
          <div className="museum-grid" id="museum-cards-grid">
            {filteredArtifacts.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedArtifactId(item.id)}
                className={`artifact-card ${selectedArtifactId === item.id ? "active" : ""}`}
              >
                {/* Image wrapper */}
                <div className="artifact-img-box">
                  <img
                    src={item.image}
                    alt={currentLang === "id" ? item.title_id : item.title_en}
                    loading="lazy"
                  />
                </div>
                {/* Body details */}
                <div className="artifact-body">
                  <h4 className="artifact-title">
                    {currentLang === "id" ? item.title_id : item.title_en}
                  </h4>
                  <span className="artifact-origin">
                    <Compass size={12} />
                    {currentLang === "id" ? item.origin_id : item.origin_en}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: 3D Showroom View Box */}
          <div className="museum-showroom glass-card">
            
            {/* Viewer Display */}
            <div
              ref={viewerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="viewer-3d-box"
              style={{ cursor: "pointer" }}
            >
              <div
                className="viewer-card-wrapper"
                style={{
                  transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                  transition: isHovered ? "none" : "transform 0.5s ease",
                }}
              >
                {/* Rotating Image representation */}
                <img
                  src={activeArtifact.image}
                  alt={currentLang === "id" ? activeArtifact.title_id : activeArtifact.title_en}
                  className="viewer-image"
                />

                {/* Gold Hotspots pins */}
                <div
                  className="hotspot"
                  style={{ top: activeArtifact.h1_top, left: activeArtifact.h1_left }}
                >
                  <div className="hotspot-annotation">
                    <div className="hotspot-annotation-title">
                      {currentLang === "id" ? activeArtifact.hotspot_1_title_id : activeArtifact.hotspot_1_title_en}
                    </div>
                    <div className="hotspot-annotation-text">
                      {currentLang === "id" ? activeArtifact.hotspot_1_desc_id : activeArtifact.hotspot_1_desc_en}
                    </div>
                  </div>
                </div>

                <div
                  className="hotspot"
                  style={{ top: activeArtifact.h2_top, left: activeArtifact.h2_left }}
                >
                  <div className="hotspot-annotation">
                    <div className="hotspot-annotation-title">
                      {currentLang === "id" ? activeArtifact.hotspot_2_title_id : activeArtifact.hotspot_2_title_en}
                    </div>
                    <div className="hotspot-annotation-text">
                      {currentLang === "id" ? activeArtifact.hotspot_2_desc_id : activeArtifact.hotspot_2_desc_en}
                    </div>
                  </div>
                </div>

                {/* Rotation Ring base indicator */}
                <div className="rotation-ring"></div>
              </div>
            </div>

            {/* Viewer Guidelines instructions */}
            <div className="flex justify-center gap-4 text-xs text-white/50 mb-6 font-semibold uppercase tracking-wider" style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <RotateCw size={12} className="text-cyan-primary animate-spin" style={{ animationDuration: "8s" }} />
                {t("inst-drag")}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
                {t("inst-hotspot")}
              </span>
            </div>

            {/* Details Section info */}
            <div>
              <h3 className="museum-detail-title">
                {currentLang === "id" ? activeArtifact.title_id : activeArtifact.title_en}
              </h3>
              <p className="museum-detail-desc">
                {currentLang === "id" ? activeArtifact.desc_id : activeArtifact.desc_en}
              </p>
              
              {/* Regional / Era specifications */}
              <div className="museum-metadata-grid">
                <div className="museum-metadata-item">
                  <span className="museum-meta-label">{t("lbl-origin")}</span>
                  <span className="museum-meta-val">
                    {currentLang === "id" ? activeArtifact.origin_id : activeArtifact.origin_en}
                  </span>
                </div>
                <div className="museum-metadata-item">
                  <span className="museum-meta-label">{t("lbl-era")}</span>
                  <span className="museum-meta-val">
                    {currentLang === "id" ? activeArtifact.era_id : activeArtifact.era_en}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
