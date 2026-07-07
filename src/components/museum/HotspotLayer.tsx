"use client";

import { useState } from "react";
import { Hotspot } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface HotspotLayerProps {
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  nextUndiscoveredHotspotId?: string | null;
  discoveredHotspots?: string[];
  lang: "id" | "en";
  onToggle: (id: string) => void;
  t: (key: string) => string;
}

/** Returns the horizontal offset (in percentage points) for the gold dot from the artifact point. */
function getHotspotOffset(spot: Hotspot) {
  const offsetX = spot.length !== undefined ? spot.length : (spot.x < 50 ? -12 : 12);
  return { offsetX };
}

export default function HotspotLayer({
  hotspots,
  activeHotspotId,
  nextUndiscoveredHotspotId,
  discoveredHotspots = [],
  lang,
  onToggle,
  t,
}: HotspotLayerProps) {
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const isSomeHotspotActive = activeHotspotId !== null;

  return (
    <>
      {hotspots.map((spot) => {
        const isActive      = activeHotspotId === spot.id;
        const isNextUndiscovered = nextUndiscoveredHotspotId === spot.id;
        const isVisited     = discoveredHotspots.includes(spot.id);
        const isHovered     = hoveredHotspotId === spot.id;
        const isLineVisible = isHovered || isActive;

        const title    = lang === "id" ? spot.title_id    : spot.title_en;
        const desc     = lang === "id" ? spot.desc_id     : spot.desc_en;
        const material = lang === "id" ? spot.material_id : spot.material_en;
        const meaning  = lang === "id" ? spot.meaning_id  : spot.meaning_en;

        const { offsetX } = getHotspotOffset(spot);

        /* ── opacity logic ─────────────────────────────────── */
        let groupOpacity = 1.0;
        if (isSomeHotspotActive) {
          groupOpacity = isActive ? 1.0 : 0.3;
        } else if (isVisited) {
          groupOpacity = 0.55;
        }

        const lineOpacity = isLineVisible ? 1 : 0;

        /* ── line geometry (percentage-based) ──────────────── */
        // artifact point  → spot.x, spot.y
        // gold dot        → spot.x + offsetX, spot.y
        const lineLeft  = Math.min(spot.x, spot.x + offsetX); // left edge %
        const lineWidth = Math.abs(offsetX);                    // width %

        return (
          // Root group — lives in the same 3D plane (translateZ 70px) as the gold dot
          <div
            key={spot.id}
            style={{
              position:      "absolute",
              top:           0,
              left:          0,
              width:         "100%",
              height:        "100%",
              pointerEvents: "none",
              transformStyle: "preserve-3d",
              // All children share this Z-depth so they tilt identically with the artifact
              transform:     "translateZ(70px)",
              opacity:       groupOpacity,
              transition:    "opacity 0.25s ease-out",
            }}
          >
            {/* ── Connector line (HTML div, not SVG) ────────────────────────── */}
            <div
              style={{
                position:   "absolute",
                left:       `${lineLeft}%`,
                top:        `${spot.y}%`,
                width:      `${lineWidth}%`,
                height:     "1.5px",
                // Dashed look via repeating-linear-gradient
                background: `repeating-linear-gradient(
                  90deg,
                  var(--gold-primary) 0px,
                  var(--gold-primary) 3px,
                  transparent       3px,
                  transparent       6px
                )`,
                transform:  "translateY(-50%)",
                opacity:    lineOpacity,
                transition: "opacity 0.25s ease-in-out",
                pointerEvents: "none",
                zIndex:     10,
              }}
            />

            {/* ── Cyan target dot at artifact point ─────────────────────────── */}
            <div
              style={{
                position:     "absolute",
                left:         `${spot.x}%`,
                top:          `${spot.y}%`,
                width:        "6px",
                height:       "6px",
                borderRadius: "50%",
                background:   "var(--cyan-primary)",
                border:       "1px solid rgba(255,255,255,0.4)",
                transform:    "translate(-50%, -50%)",
                opacity:      lineOpacity,
                transition:   "opacity 0.25s ease-in-out",
                pointerEvents: "none",
                zIndex:       11,
              }}
            />

            {/* ── Gold dot + tooltip at offset position ──────────────────────── */}
            <div
              style={{
                position:      "absolute",
                left:          `${spot.x + offsetX}%`,
                top:           `${spot.y}%`,
                pointerEvents: "auto",
                zIndex:        25,   /* fixed — no stacking-context change on click */
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold pulse dot — scale fully owned by Framer Motion, no CSS conflict */}
              <motion.button
                className={`hotspot-dot${isActive ? " active" : ""}${isNextUndiscovered ? " next-undiscovered" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(spot.id);
                }}
                onMouseEnter={() => setHoveredHotspotId(spot.id)}
                onMouseLeave={() => setHoveredHotspotId(null)}
                aria-label={title}
                aria-expanded={isActive}
                animate={{ scale: isActive ? 1.3 : 1 }}
                whileHover={{ scale: isActive ? 1.35 : 1.2 }}
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />

              {/* Pulse ring — Framer Motion div, always centered on the dot */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: isNextUndiscovered
                    ? "1.5px solid rgba(34, 211, 238, 0.8)"
                    : isActive
                    ? "1.5px solid rgba(212, 175, 55, 1)"
                    : "1.5px solid rgba(212, 175, 55, 0.6)",
                  left: "-15px",
                  top: "-15px",
                  pointerEvents: "none",
                }}
                animate={{ scale: [0.6, 1.45], opacity: [1, 0] }}
                transition={{
                  duration: isNextUndiscovered ? 1.8 : 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatType: "loop",
                }}
              />

              {/* Glassmorphism tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="hotspot-tooltip"
                    role="tooltip"
                    style={{ pointerEvents: "auto" }}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
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
          </div>
        );
      })}
    </>
  );
}
