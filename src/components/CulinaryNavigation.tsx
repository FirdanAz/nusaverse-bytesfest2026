"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CulinaryData } from "@/types";
import CulinaryCard from "./CulinaryCard";

interface CulinaryNavigationProps {
  culinaryList: CulinaryData[];
  activeId: string;
  onSelect: (id: string) => void;
}

type CategoryCode = "all" | "main-dishes" | "traditional-cakes" | "snacks" | "beverages" | "traditional-condiments";

export default function CulinaryNavigation({ culinaryList, activeId, onSelect }: CulinaryNavigationProps) {
  const { currentLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Accordion open/close state for each category
  const [collapsedCategories, setCollapsedCategories] = useState<Record<CategoryCode, boolean>>({
    all: false,
    "main-dishes": false,
    "traditional-cakes": false,
    snacks: false,
    beverages: false,
    "traditional-condiments": false,
  });

  const toggleCategory = (cat: CategoryCode) => {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Categories metadata
  const categories: { code: CategoryCode; title_id: string; title_en: string }[] = [
    { code: "main-dishes", title_id: "Hidangan Utama", title_en: "Main Dishes" },
    { code: "traditional-cakes", title_id: "Kue Tradisional", title_en: "Traditional Cakes" },
    { code: "snacks", title_id: "Kudapan", title_en: "Snacks" },
    { code: "beverages", title_id: "Minuman", title_en: "Beverages" },
    { code: "traditional-condiments", title_id: "Penyedap & Sambal", title_en: "Traditional Condiments" },
  ];

  // Filtering logic
  const filteredList = culinaryList.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchesName = item.title_id.toLowerCase().includes(query) || item.title_en.toLowerCase().includes(query);
    const matchesProvince = item.province_id.toLowerCase().includes(query) || item.province_en.toLowerCase().includes(query);
    const matchesIngredients = item.ingredients.some(
      (ing) => ing.name_id.toLowerCase().includes(query) || ing.name_en.toLowerCase().includes(query)
    );

    return matchesName || matchesProvince || matchesIngredients;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      
      {/* ── Top Search Box ── */}
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "8px",
            padding: "8px 12px",
            gap: "8px",
            transition: "border-color 0.2s ease"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--cyan-primary)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
          }}
        >
          <Search size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === "id"
                ? "Cari kuliner, asal, bahan..."
                : "Search culinary, origin, ingredient..."
            }
            style={{
              flexGrow: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--white)",
              fontSize: "13px"
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Category Accordions Scroller ── */}
      <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", paddingRight: "4px" }}>
        
        {/* If search query is active, show flat list instead of separate accordions */}
        {searchQuery ? (
          <div>
            <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px", textAlign: "left" }}>
              {currentLang === "id"
                ? `Hasil Pencarian (${filteredList.length})`
                : `Search Results (${filteredList.length})`}
            </h4>
            
            {filteredList.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {filteredList.map((item) => (
                  <CulinaryCard
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    onClick={() => onSelect(item.id)}
                    showCategory={true}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
                {currentLang === "id" ? "Kuliner tidak ditemukan" : "No culinary heritage found"}
              </div>
            )}
          </div>
        ) : (
          /* Render Collapsible Categories with Horizontal Scroll list */
          categories.map((cat) => {
            const catItems = filteredList.filter((item) => item.category === cat.code);
            const isCollapsed = collapsedCategories[cat.code];
            const title = currentLang === "id" ? cat.title_id : cat.title_en;

            if (catItems.length === 0) return null;

            return (
              <div key={cat.code} className="category-accordion-wrapper" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "16px" }}>
                
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleCategory(cat.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px 0",
                    background: "transparent",
                    border: "none",
                    color: "var(--white)",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    outline: "none"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    {title}
                  </span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "20px" }}>
                    {catItems.length}
                  </span>
                </button>

                {/* Collapsible Content Area */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      {/* Horizontal scroll grid */}
                      <div
                        className="scrollbar-thin"
                        style={{
                          display: "flex",
                          gap: "10px",
                          overflowX: "auto",
                          overflowY: "hidden",
                          padding: "12px 2px",
                          scrollSnapType: "x mandatory",
                          WebkitOverflowScrolling: "touch"
                        }}
                      >
                        {catItems.map((item) => (
                          <div key={item.id} style={{ flex: "0 0 170px", width: "170px", scrollSnapAlign: "start" }}>
                            <CulinaryCard
                              item={item}
                              isActive={item.id === activeId}
                              onClick={() => onSelect(item.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}
