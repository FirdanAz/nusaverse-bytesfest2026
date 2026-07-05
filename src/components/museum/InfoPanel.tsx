"use client";

import { ArtifactData } from "@/types";
import { Award } from "lucide-react";

interface InfoPanelProps {
  artifact: ArtifactData;
  lang: "id" | "en";
  t: (key: string) => string;
}

const CATEGORY_LABELS_ID: Record<string, string> = {
  sacred:       "Benda Sakral",
  textiles:     "Tekstil & Tenun",
  weapons:      "Senjata Adat",
  music:        "Instrumen Musik",
  architecture: "Arsitektur Tradisional",
};
const CATEGORY_LABELS_EN: Record<string, string> = {
  sacred:       "Sacred Object",
  textiles:     "Textile & Weaving",
  weapons:      "Traditional Weapon",
  music:        "Music Instrument",
  architecture: "Traditional Architecture",
};

export default function InfoPanel({ artifact, lang, t }: InfoPanelProps) {
  const title    = lang === "id" ? artifact.title_id    : artifact.title_en;
  const desc     = lang === "id" ? artifact.desc_id     : artifact.desc_en;
  const origin   = lang === "id" ? artifact.origin_id   : artifact.origin_en;
  const era      = lang === "id" ? artifact.era_id      : artifact.era_en;
  const material = lang === "id" ? artifact.material_id : artifact.material_en;
  const catLabel = lang === "id"
    ? CATEGORY_LABELS_ID[artifact.category]
    : CATEGORY_LABELS_EN[artifact.category];

  return (
    <div className="museum-info-panel">
      <h3 className="museum-info-name">{title}</h3>
      <p className="museum-info-desc">{desc}</p>

      <div className="museum-info-grid">
        <div className="museum-info-item">
          <span className="museum-info-label">{t("lbl-origin")}</span>
          <span className="museum-info-val">{origin}</span>
        </div>
        <div className="museum-info-item">
          <span className="museum-info-label">{t("lbl-era")}</span>
          <span className="museum-info-val">{era}</span>
        </div>
        <div className="museum-info-item">
          <span className="museum-info-label">{t("lbl-material")}</span>
          <span className="museum-info-val">{material}</span>
        </div>
        <div className="museum-info-item">
          <span className="museum-info-label">{t("lbl-category")}</span>
          <span className="museum-info-val">{catLabel}</span>
        </div>
      </div>

      {artifact.unesco && (
        <div className="museum-unesco-badge">
          <Award size={11} />
          {artifact.unesco}
        </div>
      )}
    </div>
  );
}
