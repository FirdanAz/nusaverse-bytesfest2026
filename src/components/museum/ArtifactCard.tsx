"use client";

import { useState } from "react";
import { ArtifactData, ArtifactCategory } from "@/types";
import Image from "next/image";
import { Compass, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface ArtifactCardProps {
  artifact: ArtifactData;
  isActive: boolean;
  lang: "id" | "en";
  onClick: () => void;
  index: number;
}

const CATEGORY_COLORS: Record<ArtifactCategory, string> = {
  sacred:       "rgba(239,176,51,0.06)",
  textiles:     "rgba(34,211,238,0.05)",
  weapons:      "rgba(239,68,68,0.05)",
  music:        "rgba(167,139,250,0.05)",
  architecture: "rgba(52,211,153,0.05)",
};

const CATEGORY_ICONS: Record<ArtifactCategory, string> = {
  weapons:      "⚔",
  sacred:       "🌿",
  textiles:     "🧵",
  music:        "🎵",
  architecture: "🏛",
};

export default function ArtifactCard({
  artifact,
  isActive,
  lang,
  onClick,
  index,
}: ArtifactCardProps) {
  const [imageError, setImageError] = useState(false);
  const title  = lang === "id" ? artifact.title_id  : artifact.title_en;
  const origin = lang === "id" ? artifact.origin_id : artifact.origin_en;
  const era    = lang === "id" ? artifact.era_id    : artifact.era_en;

  return (
    <motion.button
      onClick={onClick}
      className={`artifact-card compact${isActive ? " active" : ""}`}
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
        width: "155px",
        flex: "0 0 155px",
        borderRadius: "10px",
        border: isActive ? "1px solid var(--gold-primary)" : "1px solid var(--glass-border)",
        background: isActive ? "rgba(212, 175, 55, 0.04)" : "rgba(255, 255, 255, 0.01)",
        boxShadow: isActive ? "0 0 15px rgba(212, 175, 55, 0.08)" : "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
      aria-pressed={isActive}
      aria-label={title}
    >
      {/* Glow overlay */}
      <div className="artifact-card-glow" aria-hidden="true" />

      {/* Image container */}
      <div 
        className="artifact-img-box" 
        style={{ 
          width: "100%", 
          height: "85px", 
          background: CATEGORY_COLORS[artifact.category],
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {!imageError ? (
          <Image
            src={artifact.image}
            alt={title}
            fill
            sizes="155px"
            style={{ objectFit: "cover" }}
            loading="lazy"
            unoptimized
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(3, 8, 16, 0.6)",
            fontSize: "24px",
            color: "var(--gold-primary)",
          }}>
            {CATEGORY_ICONS[artifact.category]}
          </div>
        )}
        
        {/* Floating Category Badge */}
        <span 
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            background: "rgba(10, 20, 35, 0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            zIndex: 10,
          }}
          title={artifact.category}
        >
          {CATEGORY_ICONS[artifact.category]}
        </span>
      </div>

      {/* Body details */}
      <div style={{ padding: "10px", width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
        <h4 
          style={{ 
            fontSize: "13px", 
            fontWeight: "700", 
            color: "var(--white)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.3"
          }}
        >
          {title}
        </h4>

        {/* Badges container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {/* Province Badge */}
          <span 
            style={{ 
              fontSize: "10px", 
              color: "var(--gold-primary)", 
              display: "flex", 
              alignItems: "center", 
              gap: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            <Compass size={9} />
            {origin}
          </span>

          {/* Era Badge */}
          <span 
            style={{ 
              fontSize: "9px", 
              color: "rgba(255,255,255,0.45)", 
              display: "flex", 
              alignItems: "center", 
              gap: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            <Calendar size={9} />
            {era}
          </span>
        </div>
      </div>

      {/* Left border active bar */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 3,
            background: "var(--gold-primary)",
            borderRadius: "2px 0 0 2px",
            zIndex: 5,
          }}
        />
      )}
    </motion.button>
  );
}
