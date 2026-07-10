"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CulinaryFlavorProfile } from "@/types";

interface FlavorProfileProps {
  profile: CulinaryFlavorProfile;
}

export default function FlavorProfile({ profile }: FlavorProfileProps) {
  const { currentLang } = useLanguage();

  // Define the taste items to render
  const tasteItems = [
    { key: "spiciness", label_id: "Kepedasan", label_en: "Spiciness", value: profile.spiciness },
    { key: "sweetness", label_id: "Kemanisan", label_en: "Sweetness", value: profile.sweetness },
    { key: "savory", label_id: "Kegurihan", label_en: "Savory", value: profile.savory },
    { key: "richness", label_id: "Kekentalan (Rempah)", name_en: "Richness", label_en: "Richness", value: profile.richness },
    { key: "texture", label_id: "Tekstur", label_en: "Texture", value: profile.texture },
  ].filter(item => !(item.key === "spiciness" && item.value === 0));

  // Helper to translate values
  const getLevelLabel = (val: number, key: string) => {
    if (key === "texture") {
      if (val === 1) return currentLang === "id" ? "Lembut" : "Soft";
      if (val === 2) return currentLang === "id" ? "Kenyal" : "Chewy";
      return currentLang === "id" ? "Padat" : "Firm";
    }
    if (val === 1) return currentLang === "id" ? "Rendah" : "Low";
    if (val === 2) return currentLang === "id" ? "Sedang" : "Medium";
    return currentLang === "id" ? "Tinggi" : "High";
  };

  // Helper for width percentage
  const getWidthPercent = (val: number) => {
    if (val === 1) return "33.33%";
    if (val === 2) return "66.66%";
    return "100%";
  };

  return (
    <div className="flavor-profile-wrapper" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {tasteItems.map((item) => (
        <div key={item.key} className="flavor-item-row" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          
          {/* Label and Qualitative level */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: 500 }}>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>
              {currentLang === "id" ? item.label_id : item.label_en}
            </span>
            <span style={{ color: "var(--gold-light)", fontWeight: 600, fontSize: "11.5px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {getLevelLabel(item.value, item.key)}
            </span>
          </div>

          {/* Thin premium progress bar container */}
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "100px",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {/* Filled bar with transition and gold gradient */}
            <div
              style={{
                width: getWidthPercent(item.value),
                height: "100%",
                background: "linear-gradient(90deg, var(--gold-primary) 0%, var(--gold-light) 100%)",
                borderRadius: "100px",
                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 0 8px rgba(212, 175, 55, 0.4)"
              }}
            />
          </div>

        </div>
      ))}
    </div>
  );
}
