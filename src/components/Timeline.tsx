"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ERAS_DATA } from "@/data/culturalData";
import { Hourglass, Calendar, Award } from "lucide-react";

export default function Timeline() {
  const { currentLang, t } = useLanguage();
  const [eraId, setEraId] = useState<number>(2); // Maritime era by default (index 2)

  const activeEra = ERAS_DATA.find((e) => e.id === eraId) || ERAS_DATA[2];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEraId(parseInt(e.target.value));
  };

  // Percentage for progress fill and handle position
  const progressPercent = (eraId / 5) * 100;

  // Era list for nodes labels mapping
  const eraNodes = [
    { id: 0, labelKey: "era-pre", year: "~2500 SM" },
    { id: 1, labelKey: "era-classical", year: "Abad ke-4 M" },
    { id: 2, labelKey: "era-maritime", year: "Abad ke-7 M" },
    { id: 3, labelKey: "era-colonial", year: "Abad ke-16 M" },
    { id: 4, labelKey: "era-indep", year: "1945" },
    { id: 5, labelKey: "era-modern", year: "Era Digital" },
  ];

  return (
    <section id="timeline" className="timeline-section section-padding reveal">
      <div className="container">
        
        {/* Header */}
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="eyebrow-chip">
            <Hourglass size={12} className="animate-pulse" />
            <span>{t("time-eyebrow")}</span>
          </div>
          <h2 className="section-title">
            {t("time-title")}
          </h2>
          <p className="section-subtitle">
            {t("time-subtitle")}
          </p>
        </div>

        {/* Timeline Slider Track Controller */}
        <div className="timeline-container">
          
          <div className="timeline-slider-wrapper">
            
            {/* Custom Background tracks */}
            <div className="timeline-slider-rail"></div>
            <div
              className="timeline-slider-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>

            {/* Range Input element */}
            <input
              type="range"
              min="0"
              max="5"
              value={eraId}
              onChange={handleSliderChange}
              className="timeline-input"
              aria-label="Pilih era linimasa sejarah"
            />

            {/* Slider Handle element */}
            <div
              className="timeline-slider-handle"
              style={{ left: `${progressPercent}%` }}
            ></div>

          </div>

          {/* Node Labels below slider */}
          <div className="timeline-labels-row">
            {eraNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setEraId(node.id)}
                className={`timeline-label-node ${eraId === node.id ? "active" : ""}`}
                style={{ border: "none", background: "transparent", cursor: "pointer" }}
              >
                <div className="timeline-node-dot"></div>
                <span className="timeline-node-text">
                  {t(node.labelKey)}
                </span>
                <span className="timeline-node-year">
                  {node.year}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Era Content Cards */}
        <div className="era-content-box">
          
          {/* Visual Showcase Card (Left) */}
          <div className="era-visual-card">
            {/* Year Tag badge */}
            <div className="era-year-tag">
              {activeEra.year}
            </div>
            <img
              src={activeEra.image}
              alt={currentLang === "id" ? activeEra.title_id : activeEra.title_en}
              className="era-visual-img"
            />
          </div>

          {/* Text Description Card (Right) */}
          <div className="era-details-card">
            <h3 className="era-title">
              {currentLang === "id" ? activeEra.title_id : activeEra.title_en}
            </h3>
            <p className="era-desc">
              {currentLang === "id" ? activeEra.desc_id : activeEra.desc_en}
            </p>

            {/* List of historical milestones events */}
            <div className="era-events-title">
              {t("lbl-events")}
            </div>
            
            <div className="era-events-list">
              {activeEra.events.map((event, idx) => (
                <div key={idx} className="era-event-item">
                  <div className="era-event-icon">
                    <Award size={14} />
                  </div>
                  <div className="era-event-info">
                    <span className="era-event-year">{event.year}</span>
                    <span className="era-event-text">
                      {currentLang === "id" ? event.text_id : event.text_en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Marquee track */}
        <div className="era-marquee-wrapper">
          <div className="era-marquee-content" style={{ display: "flex", gap: "48px" }}>
            {/* Duplicate active era marquee text strings to ensure continuous scrolling loop */}
            {[...activeEra.marquee, ...activeEra.marquee, ...activeEra.marquee].map((txt, i) => (
              <span
                key={i}
                className="era-marquee-item"
              >
                {txt}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
