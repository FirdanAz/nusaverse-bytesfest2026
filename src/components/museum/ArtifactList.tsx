"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArtifactData, ArtifactCategory } from "@/types";
import {
  ArrowUpDown, ChevronDown, ChevronUp,
  LayoutGrid, Sword, Leaf, Layers, Music, Building2, MapPin, Search, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ArtifactCard from "./ArtifactCard";
import Image from "next/image";

interface ArtifactListProps {
  artifacts: ArtifactData[];
  selectedId: string;
  lang: "id" | "en";
  activeCategory: string; // From parent filter chips
  onSelect: (id: string) => void;
  onCategoryChange: (cat: string) => void;
  t: (key: string) => string;
}

const CATEGORY_KEYS: { id: ArtifactCategory; key: string; icon: React.ReactNode }[] = [
  { id: "weapons",      key: "cat-weapons",      icon: <Sword     size={13} /> },
  { id: "sacred",       key: "cat-sacred",       icon: <Leaf      size={13} /> },
  { id: "textiles",     key: "cat-textiles",     icon: <Layers    size={13} /> },
  { id: "music",        key: "cat-music",        icon: <Music     size={13} /> },
  { id: "architecture", key: "cat-architecture", icon: <Building2 size={13} /> },
];

const CATEGORY_NAMES_FALLBACK: Record<ArtifactCategory, Record<"id" | "en", string>> = {
  weapons:      { id: "Senjata Tradisional", en: "Traditional Weapons" },
  sacred:       { id: "Benda Sakral & Seni", en: "Sacred & Performing Arts" },
  textiles:     { id: "Wastra & Tenun",      en: "Traditional Textiles" },
  music:        { id: "Alat Musik",          en: "Musical Instruments" },
  architecture: { id: "Candi & Rumah Adat",  en: "Architecture & Houses" },
};

const FILTER_CATEGORIES: { id: string; key: string; icon: React.ReactNode; fallback: { id: string; en: string } }[] = [
  { id: "all",          key: "cat-all",          icon: <LayoutGrid size={11} />, fallback: { id: "Semua", en: "All" } },
  { id: "weapons",      key: "cat-weapons",      icon: <Sword     size={11} />, fallback: { id: "Senjata", en: "Weapons" } },
  { id: "sacred",       key: "cat-sacred",       icon: <Leaf      size={11} />, fallback: { id: "Sakral", en: "Sacred" } },
  { id: "textiles",     key: "cat-textiles",     icon: <Layers    size={11} />, fallback: { id: "Tekstil", en: "Textiles" } },
  { id: "music",        key: "cat-music",        icon: <Music     size={11} />, fallback: { id: "Musik", en: "Music" } },
  { id: "architecture", key: "cat-architecture", icon: <Building2 size={11} />, fallback: { id: "Arsitektur", en: "Architecture" } },
];

export default function ArtifactList({
  artifacts,
  selectedId,
  lang,
  activeCategory,
  onSelect,
  onCategoryChange,
  t,
}: ArtifactListProps) {
  const [sortBy, setSortBy] = useState("default");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<ArtifactCategory, boolean>>({
    weapons: true,
    sacred: false,
    textiles: false,
    music: false,
    architecture: false,
  });

  // Dynamically compute list of provinces for dropdown
  const provinces = useMemo(() => {
    const set = new Set<string>();
    artifacts.forEach((a) => {
      const p = lang === "id" ? a.origin_id : a.origin_en;
      if (p) set.add(p);
    });
    return Array.from(set).sort();
  }, [artifacts, lang]);

  // Highlighted/Selected artifact object
  const selectedArtifact = useMemo(() => {
    return artifacts.find((a) => a.id === selectedId) ?? artifacts[0];
  }, [artifacts, selectedId]);

  // Expand a category if it is chosen in the parent filter chips
  useEffect(() => {
    if (activeCategory !== "all" && activeCategory in expandedCategories) {
      setExpandedCategories((prev) => ({
        ...prev,
        [activeCategory]: true,
      }));
    }
  }, [activeCategory]);

  const toggleCategory = (catId: ArtifactCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // 1. Filter entirely on client side
  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((item) => {
      // Filter by category chip/dropdown first
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Filter by province dropdown
      if (selectedProvince !== "all") {
        const origin = lang === "id" ? item.origin_id : item.origin_en;
        if (origin !== selectedProvince) return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const title = (lang === "id" ? item.title_id : item.title_en).toLowerCase();
        const origin = (lang === "id" ? item.origin_id : item.origin_en).toLowerCase();
        const desc = (lang === "id" ? item.desc_id : item.desc_en).toLowerCase();
        if (!title.includes(q) && !origin.includes(q) && !desc.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [artifacts, activeCategory, selectedProvince, searchQuery, lang]);

  // 2. Sort results
  const sortedAndFiltered = useMemo(() => {
    const list = [...filteredArtifacts];
    if (sortBy === "name-asc") {
      list.sort((a, b) => {
        const titleA = lang === "id" ? a.title_id : a.title_en;
        const titleB = lang === "id" ? b.title_id : b.title_en;
        return titleA.localeCompare(titleB);
      });
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => {
        const titleA = lang === "id" ? a.title_id : a.title_en;
        const titleB = lang === "id" ? b.title_id : b.title_en;
        return titleB.localeCompare(titleA);
      });
    } else if (sortBy === "province") {
      list.sort((a, b) => {
        const originA = lang === "id" ? a.origin_id : a.origin_en;
        const originB = lang === "id" ? b.origin_id : b.origin_en;
        return originA.localeCompare(originB);
      });
    }
    return list;
  }, [filteredArtifacts, sortBy, lang]);

  // Group sorted results by category
  const groupedArtifacts = useMemo(() => {
    const groups: Record<ArtifactCategory, ArtifactData[]> = {
      weapons: [],
      sacred: [],
      textiles: [],
      music: [],
      architecture: [],
    };
    sortedAndFiltered.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [sortedAndFiltered]);

  const activeTitle = lang === "id" ? selectedArtifact.title_id : selectedArtifact.title_en;
  const activeOrigin = lang === "id" ? selectedArtifact.origin_id : selectedArtifact.origin_en;
  const activeDesc = lang === "id" ? selectedArtifact.desc_id : selectedArtifact.desc_en;

  return (
    <div className="museum-navigation-panel" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* ── FILTER CHIPS ────────────────────────────────────────────── */}
      {searchQuery.trim() === "" && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            paddingBottom: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
          }}
          role="group"
          aria-label="Filter kategori"
        >
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`museum-cat-chip${activeCategory === cat.id ? " active" : ""}`}
              style={{
                padding: "6px 10px",
                fontSize: "11px",
                borderRadius: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <span>{cat.icon}</span>
              {t(cat.key) || cat.fallback[lang]}
            </button>
          ))}
        </div>
      )}

      {/* ── SEARCH BAR ────────────────────────────────────────────── */}
      <div 
        style={{ 
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: "4px"
        }}
      >
        <Search 
          size={14} 
          style={{ 
            position: "absolute", 
            left: "12px", 
            color: "rgba(255, 255, 255, 0.4)" 
          }} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === "id" ? "Cari artefak..." : "Search artifacts..."}
          style={{
            width: "100%",
            height: "36px",
            padding: "0 32px 0 34px",
            fontSize: "12px",
            background: "rgba(3, 8, 16, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            color: "var(--white-90)",
            outline: "none",
            transition: "all 0.2s ease",
          }}
          className="museum-search-input"
        />
        <style>{`
          .museum-search-input:focus {
            border-color: rgba(253, 157, 36, 0.4) !important;
            box-shadow: 0 0 10px rgba(253, 157, 36, 0.1);
          }
        `}</style>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{
              position: "absolute",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255, 255, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px"
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* ── CURRENTLY VIEWING STATUS CARD ────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedArtifact.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span 
              style={{ 
                fontSize: "9px", 
                fontWeight: "850", 
                color: "rgba(255,255,255,0.35)", 
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
            >
              {lang === "id" ? "Sedang Ditampilkan" : "Currently Viewing"}
            </span>
            <h3 
              style={{ 
                fontSize: "14px", 
                fontWeight: "800", 
                color: "var(--white)", 
                margin: "2px 0 0" 
              }}
            >
              {activeTitle}
            </h3>
          </div>
          <span 
            style={{ 
              fontSize: "11px", 
              color: "var(--gold-primary)", 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "4px",
              background: "rgba(212, 175, 55, 0.06)",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              padding: "4px 8px",
              borderRadius: "6px"
            }}
          >
            <MapPin size={9} style={{ flexShrink: 0 }} /> {activeOrigin}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── COLLAPSIBLE CATEGORIES ACCORDIONS ─────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {CATEGORY_KEYS.map((cat, groupIdx) => {
          const catItems = groupedArtifacts[cat.id];
          
          // If searching and this category has no items, hide the entire group!
          if (searchQuery.trim() !== "" && catItems.length === 0) {
            return null;
          }

          // If searching, force expand the category so search results are visible
          const isExpanded = searchQuery.trim() !== "" ? true : expandedCategories[cat.id];
          const displayName = t(cat.key) || CATEGORY_NAMES_FALLBACK[cat.id][lang];

          // If filtering on activeCategory chip and it doesn't match, hide group
          if (activeCategory !== "all" && activeCategory !== cat.id) {
            return null;
          }

          return (
            <div 
              key={cat.id} 
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "14px"
              }}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 4px",
                  background: "none",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  color: "var(--white)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px", color: "var(--gold-primary)" }}>{cat.icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "0.02em" }}>
                    {displayName}
                  </span>
                  <span 
                    style={{ 
                      fontSize: "10px", 
                      color: "rgba(255,255,255,0.35)", 
                      background: "rgba(255,255,255,0.04)", 
                      padding: "2px 6px", 
                      borderRadius: "10px"
                    }}
                  >
                    {catItems.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                ) : (
                  <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                )}
              </button>

              {/* Collapsible Content Area */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {catItems.length === 0 ? (
                      <div style={{ padding: "12px 6px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                        {lang === "id" ? "Tidak ada artefak yang cocok" : "No matching artifacts"}
                      </div>
                    ) : (
                      /* Horizontal Carousel Scroll Container */
                      <div 
                        style={{ 
                          display: "flex", 
                          gap: "12px", 
                          overflowX: "auto",
                          padding: "12px 4px 6px",
                          width: "100%",
                          scrollBehavior: "smooth",
                          WebkitOverflowScrolling: "touch",
                        }}
                        className="museum-carousel-scrollbar"
                      >
                        {catItems.map((item, idx) => (
                          <ArtifactCard
                            key={item.id}
                            artifact={item}
                            isActive={selectedId === item.id}
                            lang={lang}
                            onClick={() => onSelect(item.id)}
                            index={idx}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
