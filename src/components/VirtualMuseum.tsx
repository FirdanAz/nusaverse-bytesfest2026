"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ARTIFACTS_DATA } from "@/data/culturalData";
import { ArtifactData, ArtifactCategory } from "@/types";
import { Landmark } from "lucide-react";
import { motion } from "framer-motion";

import ArtifactList   from "./museum/ArtifactList";
import ArtifactViewer from "./museum/ArtifactViewer";
import InfoPanel      from "./museum/InfoPanel";

export default function VirtualMuseum() {
  const { currentLang, t } = useLanguage();

  const [activeCategory,   setActiveCategory]   = useState<string>("all");
  const [selectedId,       setSelectedId]       = useState<string>(ARTIFACTS_DATA[0].id);
  const [activeHotspotId,  setActiveHotspotId]  = useState<string | null>(null);

  /* Derived: filtered list */
  const filtered: ArtifactData[] =
    activeCategory === "all"
      ? ARTIFACTS_DATA
      : ARTIFACTS_DATA.filter((a) => a.category === (activeCategory as ArtifactCategory));

  /* Active artifact */
  const activeArtifact: ArtifactData =
    ARTIFACTS_DATA.find((a) => a.id === selectedId) ?? ARTIFACTS_DATA[0];

  /* When category changes → reset to first in new filter, close hotspot */
  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedId(filtered[0].id);
      setActiveHotspotId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  /* Close hotspot when artifact changes */
  useEffect(() => {
    setActiveHotspotId(null);
  }, [selectedId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleHotspotToggle = useCallback((id: string) => {
    setActiveHotspotId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseHotspot = useCallback(() => {
    setActiveHotspotId(null);
  }, []);

  return (
    <section id="museum" className="museum-section section-padding reveal">
      <div className="container">

        {/* ── Section Header ──────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="eyebrow-chip">
            <Landmark size={12} />
            <span>{t("museum-eyebrow")}</span>
          </div>
          <h2 className="section-title">
            {t("museum-title-1")}{" "}
            <span className="text-gradient-gold">{t("museum-title-2")}</span>
          </h2>
          <p className="section-subtitle">{t("museum-subtitle")}</p>
        </motion.div>

        {/* ── Main Split Layout ────────────────────────────────────────── */}
        <div className="museum-cards-container">

          {/* Left: Artifact list with category filter */}
          <ArtifactList
            artifacts={ARTIFACTS_DATA}
            selectedId={selectedId}
            lang={currentLang}
            activeCategory={activeCategory}
            onSelect={handleSelect}
            onCategoryChange={setActiveCategory}
            t={t}
          />

          {/* Right: Sticky viewer + info panel */}
          <div className="museum-showroom glass-card" style={{ padding: 0 }}>
            <ArtifactViewer
              artifact={activeArtifact}
              activeHotspotId={activeHotspotId}
              lang={currentLang}
              onHotspotToggle={handleHotspotToggle}
              onCloseHotspot={handleCloseHotspot}
              t={t}
            />
            <InfoPanel
              artifact={activeArtifact}
              lang={currentLang}
              t={t}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
