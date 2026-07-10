"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CULINARY_DATA } from "@/data/culinaryData";
import { UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import CulinaryNavigation from "./CulinaryNavigation";
import CulinaryDetail from "./CulinaryDetail";

export default function CulinarySection() {
  const { currentLang, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("rendang");

  const activeCulinary = CULINARY_DATA.find((c) => c.id === activeId) || CULINARY_DATA[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <section id="culinary" className="culinary-section section-padding reveal">
      <div className="container">
        
        {/* ─── Section Header ─── */}
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
          <div className="eyebrow-chip eyebrow-chip-cyan">
            <UtensilsCrossed size={12} />
            <span>{currentLang === "id" ? "Arsip Warisan Kuliner" : "Culinary Heritage"}</span>
          </div>
          
          <h2 className="section-title">
            {currentLang === "id" ? "Warisan Kuliner Tradisional" : "Traditional Culinary"}{" "}
            <span className="text-gradient-gold">
              {currentLang === "id" ? "Indonesia" : "Heritage"}
            </span>
          </h2>
          
          <p className="section-subtitle" style={{ maxWidth: "700px", margin: "16px auto 0 auto" }}>
            {currentLang === "id"
              ? "Telusuri latar belakang sejarah, asal daerah, metode pembuatan tradisional, dan makna budaya dari warisan kuliner Indonesia melalui arsip digital modern."
              : "Discover the historical background, regional origins, traditional preparation methods, and cultural significance of Indonesia's culinary heritage through a modern digital archive."}
          </p>
        </div>

        {/* ─── Responsive Split Layout Pane ─── */}
        {/* DOM structure: Detail Panel is rendered first so that on mobile flex-column stack, it naturally sits on top.
            On desktop/tablet, flex-direction is set to row-reverse, displaying Navigation on the left (35%) and Detail on the right (65%). */}
        <div className="culinary-layout-flex">
          
          {/* 1. Detail Panel (65% on Desktop, Top on Mobile) */}
          <div className="culinary-detail-panel glass-card">
            <CulinaryDetail
              item={activeCulinary}
              allCulinary={CULINARY_DATA}
              onSelectRelated={handleSelect}
            />
          </div>

          {/* 2. Navigation Panel (35% on Desktop, Bottom on Mobile) */}
          <div className="culinary-navigation-panel glass-card">
            <CulinaryNavigation
              culinaryList={CULINARY_DATA}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
