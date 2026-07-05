"use client";

import { ArtifactData, ArtifactCategory } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import ArtifactCard from "./ArtifactCard";

interface ArtifactListProps {
  artifacts: ArtifactData[];
  selectedId: string;
  lang: "id" | "en";
  activeCategory: string;
  onSelect: (id: string) => void;
  onCategoryChange: (cat: string) => void;
  t: (key: string) => string;
}

const CATEGORIES: { id: string; key: string }[] = [
  { id: "all",          key: "cat-all"          },
  { id: "sacred",       key: "cat-sacred"       },
  { id: "textiles",     key: "cat-textiles"     },
  { id: "weapons",      key: "cat-weapons"      },
  { id: "music",        key: "cat-music"        },
  { id: "architecture", key: "cat-architecture" },
];

const CATEGORY_ICONS: Record<string, string> = {
  all:          "✦",
  sacred:       "🌿",
  textiles:     "🧵",
  weapons:      "⚔",
  music:        "🎵",
  architecture: "🏛",
};

export default function ArtifactList({
  artifacts,
  selectedId,
  lang,
  activeCategory,
  onSelect,
  onCategoryChange,
  t,
}: ArtifactListProps) {
  const filtered: ArtifactData[] =
    activeCategory === "all"
      ? artifacts
      : artifacts.filter((a) => a.category === (activeCategory as ArtifactCategory));

  return (
    <div>
      {/* Category filter chips */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
        role="group"
        aria-label="Filter kategori artefak"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`museum-cat-chip${activeCategory === cat.id ? " active" : ""}`}
            aria-pressed={activeCategory === cat.id}
          >
            <span style={{ marginRight: "5px" }}>{CATEGORY_ICONS[cat.id]}</span>
            {t(cat.key)}
          </button>
        ))}
      </div>

      {/* Artifact card grid */}
      <div
        className="museum-grid"
        role="listbox"
        aria-label="Daftar artefak"
        id="museum-cards-grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((artifact, idx) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              isActive={selectedId === artifact.id}
              lang={lang}
              onClick={() => onSelect(artifact.id)}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
