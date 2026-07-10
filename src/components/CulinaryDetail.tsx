"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CulinaryData } from "@/types";
import { MapPin, Tag, Utensils, Users, Award, ChevronDown } from "lucide-react";
import FlavorProfile from "./FlavorProfile";
import PreparationTimeline from "./PreparationTimeline";
import ProvinceMap from "./ProvinceMap";

interface CulinaryDetailProps {
  item: CulinaryData;
  allCulinary: CulinaryData[];
  onSelectRelated: (id: string) => void;
}

export default function CulinaryDetail({ item, allCulinary, onSelectRelated }: CulinaryDetailProps) {
  const { currentLang } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");
  const [imgError, setImgError] = useState(false);
  const [relatedErrors, setRelatedErrors] = useState<Record<string, boolean>>({});
  const [imgLoading, setImgLoading] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset state asynchronously to avoid react-hooks/set-state-in-effect warning
    setTimeout(() => {
      setImgError(false);
      setRelatedErrors({});
    }, 0);
    
    if (imgRef.current) {
      if (imgRef.current.complete) {
        const hasError = imgRef.current.naturalWidth === 0;
        setTimeout(() => {
          if (hasError) {
            setImgError(true);
          }
          setImgLoading(false);
        }, 0);
      } else {
        setTimeout(() => {
          setImgLoading(true);
        }, 0);
      }
    } else {
      setTimeout(() => {
        setImgLoading(true);
      }, 0);
    }
    
    requestAnimationFrame(() => {
      imageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [item.id]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get related items objects
  const relatedItems = allCulinary.filter((c) => item.relatedItems.includes(c.id));

  // Category translation helper
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

  // Specific ethnographic data for variations and facts since they represent deep cultural info
  const getExtraInfo = (id: string) => {
    const infoMap: Record<string, { variations_id: string[]; variations_en: string[]; facts_id: string[]; facts_en: string[]; tradition_id: string; tradition_en: string; ingredients_id: string; ingredients_en: string }> = {
      rendang: {
        variations_id: ["Rendang Daging Sapi (Klasik)", "Rendang Ayam (Lebih Basah)", "Rendang Runtiah (Suwir Kering)", "Rendang Jengkol (Vegetarian)"],
        variations_en: ["Beef Rendang (Classic)", "Chicken Rendang (Moister)", "Rendang Runtiah (Dry Shredded)", "Jengkol Rendang (Vegetarian)"],
        facts_id: [
          "Dahulu rendang dimasak selama berminggu-minggu dengan teknik pemanasan berulang agar awet berbulan-bulan.",
          "Dinobatkan sebagai Makanan Terlezat di Dunia (#1) versi CNN International selama beberapa tahun berturut-turut."
        ],
        facts_en: [
          "Historically cooked for weeks using repetitive reheating to keep it edible for months during travels.",
          "Crowned the World's Most Delicious Food (#1) by CNN International for several consecutive years."
        ],
        tradition_id: "Hantaran Adat Batagak Penghulu & Hari Raya",
        tradition_en: "Batagak Penghulu (Inauguration) & Eid Festivities",
        ingredients_id: "Santan Pekat & Rempah Minang",
        ingredients_en: "Rich Coconut Cream & Minang Spices"
      },
      gudeg: {
        variations_id: ["Gudeg Kering (Sangat Manis, Tahan Lama)", "Gudeg Basah (Gurih, Berkuah Santan/Areh)", "Gudeg Manggar (Bunga Kelapa Muda)"],
        variations_en: ["Dry Gudeg (Very Sweet, Longer Shelf-life)", "Wet Gudeg (Savory, Infused with Coconut Areh)", "Gudeg Manggar (Made of young coconut flowers)"],
        facts_id: [
          "Warna cokelat kemerahan gelap yang khas murni berasal dari tanin alami daun jati, bukan pewarna sintetis.",
          "Kuali tanah liat tradisional (kendil) membantu menjaga temperatur stabil belasan jam selama proses slow stewing."
        ],
        facts_en: [
          "The signature deep reddish-brown color is naturally derived from teak leaf tannins, not artificial colorings.",
          "Traditional clay vessels (kendil) help maintain a steady temperature for 12+ hours during slow-cooking."
        ],
        tradition_id: "Hidangan Keraton & Slametan Syukuran",
        tradition_en: "Royal Palace Feasts & Thanksgiving Rituals",
        ingredients_id: "Nangka Gori & Gula Kelapa Jawa",
        ingredients_en: "Young Gori Jackfruit & Javanese Palm Sugar"
      },
      pempek: {
        variations_id: ["Pempek Kapal Selam (Isi Telur Utuh)", "Pempek Lenjer (Silinder)", "Pempek Adaan (Bulat Wangi Bawang)", "Pempek Kulit (Ikan Crispy)"],
        variations_en: ["Pempek Kapal Selam (Whole Egg Filled)", "Pempek Lenjer (Cylindrical)", "Pempek Adaan (Round with Shallots)", "Pempek Kulit (Crispy Fish Skin)"],
        facts_id: [
          "Cuko Palembang asli yang otentik tidak menggunakan kecap manis; warna hitam pekat murni dari gula aren berkualitas tinggi.",
          "Teksturnya yang kenyal elastis berasal dari kualitas pati tepung sagu tani lokal yang diproduksi tradisional."
        ],
        facts_en: [
          "Authentic Palembang cuko does not use soy sauce; its deep black color is purely from top-grade dark palm sugar.",
          "Its signature elastic chewiness comes from the quality starch of locally and traditionally produced sago flour."
        ],
        tradition_id: "Santapan Kasual Sore & Perayaan Imlek Palembang",
        tradition_en: "Casual Afternoon Snack & Chinese New Year Palembang",
        ingredients_id: "Ikan Tenggiri Giling & Sagu",
        ingredients_en: "Ground Mackerel Fish & Sago Starch"
      },
      "es-cendol": {
        variations_id: ["Cendol Klasik Priangan (Nangka)", "Cendol Durian (Modern)", "Dawet Ayu Banjarnegara (Tepung Beras Ketan)"],
        variations_en: ["Classic Priangan Cendol (Jackfruit)", "Durian Cendol (Modern)", "Dawet Ayu Banjarnegara (Glutinous Rice Flour)"],
        facts_id: [
          "Warna hijau cerah cendol berasal dari perasan daun suji (pewarna alami) dan daun pandan (pemberi aroma harum).",
          "Air kapur sirih ditambahkan ke dalam adonan agar butiran jeli memadat kenyal alami saat dicetak di air es."
        ],
        facts_en: [
          "The bright green hue is extracted from suji leaves (natural color) and pandan leaves (aromatic booster).",
          "Limestone water (kapur sirih) is mixed in to naturally firm up the jelly droplets when pressed into ice water."
        ],
        tradition_id: "Minuman Penyambut Tamu & Pelepas Dahaga Agraris",
        tradition_en: "Guest Welcoming Drink & Agrarian Thirst Quencher",
        ingredients_id: "Suji Hijau, Santan, Gula Aren",
        ingredients_en: "Suji Extract, Coconut Milk, Palm Sugar"
      },
      klepon: {
        variations_id: ["Klepon Gula Merah (Klasik)", "Klepon Ubi Ungu (Variasi Warna)", "Onde-Onde Bugis (Kembaran dengan Isian Unti Kelapa)"],
        variations_en: ["Palm Sugar Klepon (Classic)", "Purple Yam Klepon (Color Variant)", "Onde-Onde Bugis (Stuffed with Coconut shreds)"],
        facts_id: [
          "Pembaluran parutan kelapa kukus yang diberi garam memberikan rasa gurih yang mengimbangi kemanisan gula cair.",
          "Dalam tradisi Jawa, bentuk bulat klepon melambangkan tekad bulat dan kebersamaan hidup beragama."
        ],
        facts_en: [
          "Coating with salted, steamed shredded coconut provides a savory balance to the sweet liquid sugar burst.",
          "In Javanese customs, the round shape of klepon symbolizes unity, firm resolve, and communal harmony."
        ],
        tradition_id: "Bancakan Weton & Upacara Slametan Adat",
        tradition_en: "Bancakan Weton (Birthday Celebrations) & Slametan",
        ingredients_id: "Tepung Ketan & Kelapa Parut Gurih",
        ingredients_en: "Glutinous Flour & Steamed Coconut"
      },
      "sambal-roa": {
        variations_id: ["Sambal Roa Manado (Kering Abon)", "Sambal Roa Minyak (Lebih Awet)", "Dabu-Dabu Lilang (Segar Irisan)"],
        variations_en: ["Manado Roa Chili (Dry Shredded)", "Oily Roa Chili (Longer Shelf-life)", "Dabu-Dabu Lilang (Fresh Sliced variant)"],
        facts_id: [
          "Ikan Roa harus diasap secara perlahan selama berhari-hari hingga benar-benar kering keras sebelum ditumbuk.",
          "Aroma asap (smoky) yang pekat memberikan kedalaman rasa umami laut yang sangat unik dibandingkan sambal lainnya."
        ],
        facts_en: [
          "Roa fish must be cold-smoked for days until completely dry and hard before it can be ground into powder.",
          "The distinct smoky aroma provides a deep, unique oceanic umami flavor unlike any other chili paste."
        ],
        tradition_id: "Pendamping Pisang Goroho & Jamuan Makan Adat Minahasa",
        tradition_en: "Goroho Banana Side & Minahasan Customary Banquets",
        ingredients_id: "Ikan Roa Asap & Cabai Rawit Pedas",
        ingredients_en: "Smoked Roa Fish & Bird's Eye Chili"
      },
      papeda: {
        variations_id: ["Papeda Sagu Murni (Klasik Papua)", "Papeda Tepung Tapioka (Alternatif Kota)", "Papeda Bungkus Daun (Kenyal Dingin)"],
        variations_en: ["Pure Sago Papeda (Classic Papuan)", "Tapioca Papeda (Urban Alternative)", "Leaf-wrapped Papeda (Firm Cold)"],
        facts_id: [
          "Pohon sagu berumur 10-15 tahun dipotong batangnya, parutan empulurnya diperas berulang untuk diambil acinya.",
          "Papeda dinikmati tanpa dikunyah; digulung dengan sumpit gata-gata lalu langsung diseruput bersama kuah hangat."
        ],
        facts_en: [
          "Sago palms aged 10-15 years are harvested, their inner pulp grated and washed repeatedly to extract starch.",
          "Papeda is eaten without chewing; it is rolled around split bamboo sticks and slurped directly with warm soup."
        ],
        tradition_id: "Jamuan Adat Pelantikan Kepala Suku Papua",
        tradition_en: "Customary Feasts for Papuan Tribal Chief Inauguration",
        ingredients_id: "Aci Sagu Basah & Kaldu Ikan Kuning",
        ingredients_en: "Wet Sago Starch & Yellow Fish Broth"
      },
      "soto-banjar": {
        variations_id: ["Soto Banjar Kuah Susu/Areh (Gurih Keruh)", "Soto Banjar Kuah Bening (Segar Rempah)", "Sop Banjar (Tanpa Ketupat, Sajian Kentang)"],
        variations_en: ["Soto Banjar Oily Milk (Rich Creamy)", "Soto Banjar Clear Broth (Light Spiced)", "Sop Banjar (No Rice Cakes, Potato focus)"],
        facts_id: [
          "Sebagian pembuat soto tradisional menambahkan kentang rebus lumat atau telur bebek matang hancur ke dalam kuah agar keruh gurih.",
          "Soto disajikan dengan telur bebek rebus, bukan telur ayam, sebagai simbol prestise hidangan pesta Kesultanan Banjar lama."
        ],
        facts_en: [
          "Some traditional cooks mash boiled potatoes or duck egg yolks into the soup to create a rich cloudy broth.",
          "Served with boiled duck egg instead of chicken egg, which was a symbol of prestige in the Banjar Sultanate feasts."
        ],
        tradition_id: "Kenduri Pernikahan Adat Banjar & Jamuan Sungai",
        tradition_en: "Banjarese Customary Weddings & River Festivals",
        ingredients_id: "Ayam Kampung & Rempah Jalur Sutra",
        ingredients_en: "Free-range Chicken & Silk Road Spices"
      }
    };

    return infoMap[id] || {
      variations_id: ["Variasi Lokal 1", "Variasi Lokal 2"],
      variations_en: ["Local Variant 1", "Local Variant 2"],
      facts_id: ["Bahan diolah secara tradisional.", "Menjadi kebanggaan budaya kuliner setempat."],
      facts_en: ["Prepared traditionally using indigenous methods.", "Stands as a culinary pride of the local community."],
      tradition_id: "Tradisi Perayaan Hari Raya & Upacara Syukuran",
      tradition_en: "Festive Holiday Tradition & Thanksgiving Ceremonies",
      ingredients_id: "Bahan Utama Segar & Rempah Khas",
      ingredients_en: "Fresh Key Ingredients & Regional Spices"
    };
  };

  const extraInfo = getExtraInfo(item.id);

  return (
    <div className="culinary-detail-scroller" style={{ height: "100%", overflowY: "auto", paddingRight: "4px" }}>
      
      {/* 16:9 Featured Image with Gradient Overlay */}
      <div
        ref={imageRef}
        className="reveal active"
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", /* 16:9 ratio */
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "var(--glass-glow)",
          marginBottom: "24px"
        }}
      >
        {imgError ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
              color: "var(--gold-light)",
              gap: "8px"
            }}
          >
            <span style={{ fontSize: "36px" }}>🍽️</span>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {currentLang === "id" ? item.title_id : item.title_en}
            </span>
          </div>
        ) : (
          <>
            {imgLoading && (
              <div
                className="shimmer-skeleton"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.01) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.01) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.6s infinite ease-in-out",
                  borderRadius: "14px",
                  zIndex: 2
                }}
              />
            )}
            <img
              ref={imgRef}
              src={item.gallery[0]}
              alt={currentLang === "id" ? item.title_id : item.title_en}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: imgLoading ? 0 : 1,
                transition: "opacity 0.4s ease, transform 0.4s ease"
              }}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgError(true);
                setImgLoading(false);
              }}
            />
          </>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(3, 10, 20, 0.95) 0%, rgba(3, 10, 20, 0.3) 50%, transparent 100%)",
            pointerEvents: "none"
          }}
        />
      </div>

      {/* Metadata Grid Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "32px"
        }}
      >
        {/* Origin */}
        <div className="glass-card" style={{ padding: "12px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.03)" }}>
          <MapPin size={16} className="text-cyan" style={{ marginTop: "2px", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>{currentLang === "id" ? "Provinsi" : "Province"}</span>
            <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--white-90)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>{currentLang === "id" ? item.province_id : item.province_en}</span>
          </div>
        </div>

        {/* Category */}
        <div className="glass-card" style={{ padding: "12px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.03)" }}>
          <Tag size={16} className="text-gold" style={{ marginTop: "2px", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>{currentLang === "id" ? "Kategori" : "Category"}</span>
            <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--white-90)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>{getCategoryLabel(item.category)}</span>
          </div>
        </div>

        {/* Primary Ingredients */}
        <div className="glass-card" style={{ padding: "12px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.03)" }}>
          <Utensils size={16} className="text-cyan" style={{ marginTop: "2px", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>{currentLang === "id" ? "Bahan Utama" : "Key Ingredients"}</span>
            <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--white-90)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>
              {currentLang === "id" ? extraInfo.ingredients_id : extraInfo.ingredients_en}
            </span>
          </div>
        </div>

        {/* Serving Tradition */}
        <div className="glass-card" style={{ padding: "12px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.03)" }}>
          <Users size={16} className="text-gold" style={{ marginTop: "2px", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>{currentLang === "id" ? "Tradisi Saji" : "Tradition"}</span>
            <span style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--white-90)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>
              {currentLang === "id" ? extraInfo.tradition_id : extraInfo.tradition_en}
            </span>
          </div>
        </div>

        {/* Recognition Status */}
        {item.recognition && (
          <div className="glass-card" style={{ padding: "12px", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start", border: "1px solid rgba(255,255,255,0.03)" }}>
            <Award size={16} className="text-cyan" style={{ marginTop: "2px", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>{currentLang === "id" ? "Pengakuan" : "Status"}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--white-90)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>
                {currentLang === "id" ? item.recognition.title_id : item.recognition.title_en}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Header Info: Title, Province & Intro */}
      <div style={{ marginBottom: "32px", textAlign: "left" }}>
        <h3 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900, marginBottom: "8px", fontFamily: "var(--font-display)" }}>
          {currentLang === "id" ? item.title_id : item.title_en}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--gold-light)", fontWeight: 600, marginBottom: "16px" }}>
          <span>{currentLang === "id" ? item.province_id : item.province_en}</span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{currentLang === "id" ? "Arsip Etnografis" : "Ethnographic Record"}</span>
        </div>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
          {currentLang === "id" ? item.description_id : item.description_en}
        </p>
      </div>

      {/* ─── ACCORDION ARCHIVE SECTIONS ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
        
        {/* SECTION 1: OVERVIEW & PROFILE (Default Expanded) */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("overview")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "overview" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "I. Gambaran & Profil Rasa" : "I. Overview & Flavor Profile"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "overview" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "overview" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                    
                    {/* Flavor Profile */}
                    <div>
                      <h4 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--white-50)", marginBottom: "16px" }}>
                        {currentLang === "id" ? "Karakteristik Profil Rasa" : "Flavor Profile Indicators"}
                      </h4>
                      <FlavorProfile profile={item.flavorProfile} />
                    </div>

                    {/* Province Indicator Map */}
                    <div>
                      <h4 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--white-50)", marginBottom: "16px" }}>
                        {currentLang === "id" ? "Indikator Geografis Asal" : "Geographic Indicator Map"}
                      </h4>
                      <div style={{ height: "170px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", background: "rgba(3, 10, 20, 0.3)" }}>
                        <ProvinceMap provinceId={item.province_id} />
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 2: HISTORICAL BACKGROUND */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("history")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "history" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "II. Latar Belakang Sejarah" : "II. Historical Background"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "history" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "history" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: "1.7" }}>
                    {currentLang === "id" ? item.history_id : item.history_en}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 3: TRADITIONAL PREPARATION TIMELINE */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("preparation")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "preparation" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "III. Alur Pembuatan Tradisional" : "III. Traditional Preparation Timeline"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "preparation" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "preparation" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <PreparationTimeline steps={item.preparation} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 4: INGREDIENTS BADGES */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("ingredients")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "ingredients" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "IV. Komposisi Bahan Tradisional" : "IV. Traditional Ingredients"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "ingredients" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "ingredients" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="glass-card"
                        style={{
                          fontSize: "12px",
                          padding: "6px 14px",
                          borderRadius: "100px",
                          backgroundColor: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.85)"
                        }}
                      >
                        {currentLang === "id" ? ing.name_id : ing.name_en}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 5: CULTURAL SIGNIFICANCE */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("significance")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "significance" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "V. Filosofi & Makna Adat" : "V. Philosophical & Cultural Significance"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "significance" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "significance" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    {item.culturalMeaning.map((meaning, idx) => (
                      <div
                        key={idx}
                        className="glass-card"
                        style={{
                          padding: "16px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255, 255, 255, 0.04)",
                          backgroundColor: "rgba(255, 255, 255, 0.015)"
                        }}
                      >
                        <h5 style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--gold-light)", marginBottom: "8px" }}>
                          {currentLang === "id" ? meaning.title_id : meaning.title_en}
                        </h5>
                        <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.6" }}>
                          {currentLang === "id" ? meaning.desc_id : meaning.desc_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 6: REGIONAL VARIATIONS */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("variations")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "variations" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "VI. Varian Tradisional Wilayah" : "VI. Regional Variations"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "variations" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "variations" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                    {(currentLang === "id" ? extraInfo.variations_id : extraInfo.variations_en).map((variant, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "10px 14px",
                          fontSize: "12.5px",
                          color: "rgba(255,255,255,0.8)",
                          backgroundColor: "rgba(255,255,255,0.01)",
                          borderLeft: "2px solid var(--cyan-primary)",
                          borderRadius: "0 6px 6px 0"
                        }}
                      >
                        {variant}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 7: INTERESTING FACTS */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => toggleSection("facts")}
            style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "none", cursor: "pointer", outline: "none" }}
          >
            <span style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: expandedSection === "facts" ? "var(--cyan-primary)" : "var(--white)" }}>
              {currentLang === "id" ? "VII. Fakta Etnografis Menarik" : "VII. Interesting Ethnographic Facts"}
            </span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", transform: expandedSection === "facts" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
          </button>
          
          <AnimatePresence initial={false}>
            {expandedSection === "facts" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div style={{ padding: "0 20px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px" }}>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "20px", margin: 0, fontSize: "13.5px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                    {(currentLang === "id" ? extraInfo.facts_id : extraInfo.facts_en).map((fact, idx) => (
                      <li key={idx} style={{ listStyleType: "circle" }}>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ─── RELATED CULINARY RECOMMENDATIONS ─── */}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "32px", marginBottom: "16px", textAlign: "left" }}>
        <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--white)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "var(--font-display)" }}>
          {currentLang === "id" ? "Rekomendasi Kuliner Terkait" : "Related Culinary Heritage"}
        </h4>
        
        {/* Horizontal scroll grid */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "16px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {relatedItems.map((rel) => (
            <button
              key={rel.id}
              onClick={() => onSelectRelated(rel.id)}
              className="glass-card snap-start"
              style={{
                flex: "0 0 200px",
                width: "200px",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "left",
                backgroundColor: "rgba(255, 255, 255, 0.015)",
                borderColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                transition: "transform 0.2s ease, border-color 0.2s ease",
                outline: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--cyan-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", width: "100%", height: "100px", borderRadius: "6px", overflow: "hidden", marginBottom: "10px", backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
                {relatedErrors[rel.id] ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
                      color: "var(--gold-light)",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {rel.title_id.charAt(0)}
                  </div>
                ) : (
                  <img
                    src={rel.gallery[0]}
                    alt={currentLang === "id" ? rel.title_id : rel.title_en}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                    onError={() => setRelatedErrors((prev) => ({ ...prev, [rel.id]: true }))}
                  />
                )}
              </div>

              {/* Title & Province */}
              <h5 style={{ fontSize: "13px", fontWeight: 700, color: "var(--white)", margin: "0 0 2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {currentLang === "id" ? rel.title_id : rel.title_en}
              </h5>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.45)", display: "block" }}>
                {currentLang === "id" ? rel.province_id : rel.province_en}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
