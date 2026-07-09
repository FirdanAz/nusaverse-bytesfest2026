"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function SDGsImpact() {
  const { currentLang, t } = useLanguage();

  const mappingData = [
    {
      feature: currentLang === "id" ? "Museum Digital" : "Digital Museum",
      sdgNum: "11",
      sdgTitle: currentLang === "id" ? "Kota & Komunitas Berkelanjutan" : "Sustainable Cities",
      color: "#FD9D24",
    },
    {
      feature: currentLang === "id" ? "Bahasa Daerah" : "Local Languages",
      sdgNum: "4",
      sdgTitle: currentLang === "id" ? "Pendidikan Berkualitas" : "Quality Education",
      color: "#C5192D",
    },
    {
      feature: currentLang === "id" ? "Peta Budaya" : "Cultural Map",
      sdgNum: "10",
      sdgTitle: currentLang === "id" ? "Mengurangi Ketimpangan" : "Reduced Inequalities",
      color: "#DD1367",
    },
    {
      feature: currentLang === "id" ? "Hak Cipta Budaya" : "Cultural Copyright",
      sdgNum: "16",
      sdgTitle: currentLang === "id" ? "Perdamaian & Keadilan" : "Peace, Justice & Institutions",
      color: "#00689D",
    },
  ];

  const sdgCards = [
    {
      id: "4",
      color: "#C5192D",
      titleKey: "sdg4-title",
      descKey: "sdg4-desc",
    },
    {
      id: "10",
      color: "#DD1367",
      titleKey: "sdg10-title",
      descKey: "sdg10-desc",
    },
    {
      id: "11",
      color: "#FD9D24",
      titleKey: "sdg11-title",
      descKey: "sdg11-desc",
    },
    {
      id: "16",
      color: "#00689D",
      titleKey: "sdg16-title",
      descKey: "sdg16-desc",
    },
  ];

  // Subtle animations configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="sdgs" className="sdg-section section-padding">
      <div className="container">
        
        {/* ── Section Header ── */}
        <motion.div
          className="text-center"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="eyebrow-chip">
            <Globe size={12} />
            <span>{t("sdg-eyebrow")}</span>
          </div>
          
          <h2 className="section-title">
            {t("sdg-title-1")}{" "}
            <span className="text-gradient-gold">{t("sdg-title-2")}</span>
          </h2>
          
          <p className="section-subtitle" style={{ maxWidth: "600px", margin: "16px auto 0 auto" }}>
            {t("sdg-subtitle")}
          </p>
        </motion.div>

        {/* ── Feature to SDG Mapping Grid ── */}
        <motion.div
          className="sdg-mapping-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {mappingData.map((item, idx) => (
            <motion.div
              key={idx}
              className="sdg-mapping-card"
              variants={itemVariants}
            >
              <div className="feature-part">
                <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan-primary)", display: "block", marginBottom: "4px" }}>
                  {currentLang === "id" ? "Fitur Platform" : "Platform Feature"}
                </span>
                <h4>{item.feature}</h4>
              </div>
              
              <div className="connector-arrow">↓</div>
              
              <div className="sdg-part">
                <span
                  className="sdg-mapping-badge-small"
                  style={{ backgroundColor: item.color }}
                >
                  SDG {item.sdgNum}
                </span>
                <h4>{item.sdgTitle}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 4 Compact SDG Cards ── */}
        <motion.div
          className="sdg-compact-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {sdgCards.map((card) => (
            <motion.div
              key={card.id}
              className="sdg-compact-card"
              variants={itemVariants}
            >
              <span
                className="sdg-compact-badge"
                style={{ backgroundColor: card.color }}
              >
                SDG {card.id}
              </span>
              
              <h4 className="sdg-compact-title">
                {t(card.titleKey)}
              </h4>
              
              <p className="sdg-compact-desc">
                {t(card.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Closing Statement ── */}
        <motion.div
          className="sdg-premium-closing"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p className="sdg-closing-quote">
            "{t("sdg-quote")}"
          </p>
          <p className="sdg-closing-caption">
            {t("sdg-author")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
