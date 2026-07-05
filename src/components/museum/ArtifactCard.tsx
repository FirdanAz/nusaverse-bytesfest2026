"use client";

import { ArtifactData, ArtifactCategory } from "@/types";
import Image from "next/image";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

interface ArtifactCardProps {
  artifact: ArtifactData;
  isActive: boolean;
  lang: "id" | "en";
  onClick: () => void;
  /** Stagger delay index for entrance animation */
  index: number;
}

const CATEGORY_COLORS: Record<ArtifactCategory, string> = {
  sacred:       "rgba(239,176,51,0.15)",
  textiles:     "rgba(34,211,238,0.12)",
  weapons:      "rgba(239,68,68,0.12)",
  music:        "rgba(167,139,250,0.12)",
  architecture: "rgba(52,211,153,0.12)",
};

export default function ArtifactCard({
  artifact,
  isActive,
  lang,
  onClick,
  index,
}: ArtifactCardProps) {
  const title  = lang === "id" ? artifact.title_id  : artifact.title_en;
  const origin = lang === "id" ? artifact.origin_id : artifact.origin_en;

  return (
    <motion.button
      onClick={onClick}
      className={`artifact-card${isActive ? " active" : ""}`}
      style={{ position: "relative", overflow: "hidden", textAlign: "left", width: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      aria-pressed={isActive}
      aria-label={title}
    >
      {/* Hover glow overlay */}
      <div className="artifact-card-glow" aria-hidden="true" />

      {/* Artifact image */}
      <div className="artifact-img-box" style={{ background: CATEGORY_COLORS[artifact.category] }}>
        <Image
          src={artifact.image}
          alt={title}
          width={240}
          height={140}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="artifact-body">
        <h4 className="artifact-title">{title}</h4>
        <span className="artifact-origin">
          <Compass size={11} />
          {origin}
        </span>
      </div>

      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="active-bar"
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 3,
            background: "var(--gold-primary)",
            borderRadius: "2px 0 0 2px",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
