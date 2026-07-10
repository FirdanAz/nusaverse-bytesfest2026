"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CulinaryData } from "@/types";

interface CulinaryCardProps {
  item: CulinaryData;
  isActive: boolean;
  onClick: () => void;
  showCategory?: boolean;
}

export default function CulinaryCard({ item, isActive, onClick, showCategory = false }: CulinaryCardProps) {
  const { currentLang, t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [item.id]);

  // Map category code to translations key or local text
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "main-dishes":
        return currentLang === "id" ? "Hidangan Utama" : "Main Dishes";
      case "traditional-cakes":
        return currentLang === "id" ? "Kue Tradisional" : "Traditional Cakes";
      case "snacks":
        return currentLang === "id" ? "Kudapan" : "Snacks";
      case "beverages":
        return currentLang === "id" ? "Minuman" : "Beverages";
      case "traditional-condiments":
        return currentLang === "id" ? "Penyedap/Sambal" : "Condiments";
      default:
        return category;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`culinary-compact-card ${isActive ? "active" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "10px 12px",
        backgroundColor: isActive ? "rgba(34, 211, 238, 0.08)" : "rgba(255,255,255,0.02)",
        border: isActive ? "1px solid var(--cyan-primary)" : "1px solid rgba(255,255,255,0.04)",
        borderRadius: "10px",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.25s ease",
        outline: "none"
      }}
      role="tab"
      aria-selected={isActive}
    >
      {/* Thumbnail Image */}
      <div style={{ position: "relative", width: "48px", height: "48px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.05)" }}>
        {imgError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, var(--gold-primary) 0%, #B45309 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {item.title_id.charAt(0)}
          </div>
        ) : (
          <img
            src={item.gallery[0]}
            alt={currentLang === "id" ? item.title_id : item.title_en}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Info labels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexGrow: 1, minWidth: 0 }}>
        {/* Title */}
        <h5
          style={{
            fontSize: "13.5px",
            fontWeight: 600,
            color: isActive ? "var(--white)" : "rgba(255,255,255,0.85)",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {currentLang === "id" ? item.title_id : item.title_en}
        </h5>
        
        {/* Province */}
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
          {currentLang === "id" ? item.province_id : item.province_en}
        </span>

        {/* Small category tag */}
        {showCategory && (
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "8.5px",
                fontWeight: 800,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                padding: "1px 5px",
                borderRadius: "4px",
                backgroundColor: isActive ? "rgba(34, 211, 238, 0.15)" : "rgba(255, 255, 255, 0.04)",
                color: isActive ? "var(--cyan-light)" : "rgba(255,255,255,0.5)"
              }}
            >
              {getCategoryLabel(item.category)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
