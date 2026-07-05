"use client";

import { Hotspot } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface HotspotLayerProps {
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  lang: "id" | "en";
  onToggle: (id: string) => void;
  t: (key: string) => string;
}

export default function HotspotLayer({
  hotspots,
  activeHotspotId,
  lang,
  onToggle,
  t,
}: HotspotLayerProps) {
  return (
    <>
      {hotspots.map((spot) => {
        const isActive = activeHotspotId === spot.id;
        const title    = lang === "id" ? spot.title_id    : spot.title_en;
        const desc     = lang === "id" ? spot.desc_id     : spot.desc_en;
        const material = lang === "id" ? spot.material_id : spot.material_en;
        const meaning  = lang === "id" ? spot.meaning_id  : spot.meaning_en;

        return (
          // Stop propagation here so clicks on the hotspot zone
          // don't bubble up to viewer-stage's onCloseHotspot handler
          <div
            key={spot.id}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: `${spot.x}%`,
              top:  `${spot.y}%`,
              zIndex: 20,
              pointerEvents: "auto", // re-enable clicks through parent none overlay
            }}
          >
            {/* Gold pulse dot */}
            <motion.button
              className={`hotspot-dot${isActive ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(spot.id);
              }}
              aria-label={title}
              aria-expanded={isActive}
              whileTap={{ scale: 0.9 }}
            />

            {/* Glassmorphism tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="hotspot-tooltip"
                  role="tooltip"
                  // Allow tooltip interaction (scroll, text selection)
                  style={{ pointerEvents: "auto" }}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit   ={{ opacity: 0, y: 8,  scale: 0.95 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="tooltip-title">{title}</div>
                  <div className="tooltip-desc">{desc}</div>

                  {material && (
                    <div className="tooltip-row">
                      <span className="tooltip-row-label">{t("lbl-material")}</span>
                      <span className="tooltip-row-val">{material}</span>
                    </div>
                  )}
                  {meaning && (
                    <div className="tooltip-row" style={{ marginTop: "6px" }}>
                      <span className="tooltip-row-label">
                        {lang === "id" ? "Makna Budaya" : "Cultural Meaning"}
                      </span>
                      <span className="tooltip-row-val">{meaning}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}

