"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangle, AlertOctagon, TrendingDown, BookOpen, Skull, Users } from "lucide-react";

export default function Crisis() {
  const { currentLang, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Extinction countdown timer
  useEffect(() => {
    let totalSeconds = 8 * 24 * 3600 + 14 * 3600 + 32 * 60 + 15;

    const pad = (num: number) => String(num).padStart(2, "0");

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        totalSeconds = 14 * 24 * 3600;
      }
      const d = Math.floor(totalSeconds / (24 * 3600));
      const h = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft(`${pad(d)}d : ${pad(h)}h : ${pad(m)}m : ${pad(s)}s`);
      totalSeconds--;
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // IntersectionObserver for chart animation
  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="crisis" className="crisis-section section-padding reveal">
      <div className="container">

        {/* ── Top: 2-col text + chart grid ── */}
        <div className="crisis-grid">

          {/* Left info column */}
          <div className="crisis-content">
            <div className="eyebrow-chip" style={{ borderColor: "#EF4444", color: "#EF4444", boxShadow: "0 0 15px rgba(239, 68, 68, 0.1)" }}>
              <AlertOctagon size={14} />
              <span>{t("crisis-eyebrow")}</span>
            </div>

            <h2 className="section-title">
              {t("crisis-title-1")}
              <br />
              <span style={{ color: "#EF4444" }}>{t("crisis-title-2")}</span>
            </h2>

            <p className="section-subtitle">
              {t("crisis-desc")}
            </p>
          </div>

          {/* Right chart column */}
          <div
            ref={chartRef}
            className={`crisis-chart-container transition-all duration-500 ${isAnimated ? "animated" : ""}`}
          >
            <div className="crisis-chart-title">
              <TrendingDown className="text-red-500" />
              <span>{t("chart-title")}</span>
            </div>

            <div className="chart-wrapper">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="380" y2="20" className="stroke-white/5 stroke-[1]" />
                <line x1="40" y1="70" x2="380" y2="70" className="stroke-white/5 stroke-[1]" />
                <line x1="40" y1="120" x2="380" y2="120" className="stroke-white/5 stroke-[1]" />
                <line x1="40" y1="170" x2="380" y2="170" className="stroke-white/5 stroke-[1]" />

                {/* Y Axis Labels */}
                <text x="10" y="24" className="text-[10px] fill-white/50 font-sans">714</text>
                <text x="10" y="74" className="text-[10px] fill-white/50 font-sans">500</text>
                <text x="10" y="124" className="text-[10px] fill-white/50 font-sans">250</text>
                <text x="10" y="174" className="text-[10px] fill-white/50 font-sans">0</text>

                {/* X Axis Labels */}
                <text x="40" y="192" className="text-[10px] fill-white/50 font-sans">1970</text>
                <text x="150" y="192" className="text-[10px] fill-white/50 font-sans">2000</text>
                <text x="260" y="192" className="text-[10px] fill-white/50 font-sans">2026</text>
                <text x="340" y="192" className="text-[10px] fill-white/50 font-sans">2050 (Proj.)</text>

                {/* Area under chart */}
                <path
                  d="M 40 170 L 40 20 L 150 40 L 260 70 L 370 130 L 370 170 Z"
                  className={`fill-[url(#chart-gradient)] transition-opacity duration-1000 delay-[2000ms] ${isAnimated ? "opacity-12" : "opacity-0"}`}
                />

                {/* Active Line */}
                <path
                  d="M 40 20 L 150 40 L 260 70"
                  className="fill-none stroke-cyan-primary stroke-[3.5] stroke-linecap-round transition-all duration-[2000ms] ease-in-out"
                  style={{ strokeDasharray: 400, strokeDashoffset: isAnimated ? 0 : 400 }}
                />

                {/* Extinct Proj Line */}
                <path
                  d="M 260 70 L 370 130"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                  strokeDashoffset={isAnimated ? 0 : 400}
                  style={{
                    transition: "stroke-dashoffset 2s ease-in-out 1s",
                  }}
                />

                {/* Dot indicators */}
                {isAnimated && (
                  <>
                    <circle cx="260" cy="70" r="6" className="fill-red-500 drop-shadow-[0_0_8px_#EF4444]" />
                    <text x="270" y="65" className="text-[11px] fill-red-500 font-bold font-sans">
                      {t("chart-alert")}
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Source note inside chart */}
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "12px", lineHeight: "1.6" }}>
              {t("chart-source-note")}
            </p>
          </div>
        </div>

        {/* ── Stats 2×2 Grid ── */}
        <div className="crisis-stats-grid">
          {[
            { icon: <Skull size={20} />, num: "8", label: t("crisis-card-1") },
            { icon: <Users size={20} />, num: "67%", label: t("crisis-card-2") },
            { icon: <BookOpen size={20} />, num: "5", label: t("crisis-card-3") },
            { icon: <AlertTriangle size={20} />, num: "35%", label: t("crisis-card-4") },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                borderRadius: "16px",
                background: "rgba(15, 20, 35, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,68,68,0.4)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(239,68,68,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,68,68,0.15)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#EF4444", marginBottom: "20px",
              }}>
                {card.icon}
              </div>
              <div style={{
                fontSize: "40px", fontWeight: 900, color: "var(--white)",
                lineHeight: 1, marginBottom: "10px", fontFamily: "var(--font-display)",
              }}>
                {card.num}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: "1.5" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Full-width Extinction Ticker Banner ── */}
        <div style={{
          padding: "32px",
          borderRadius: "20px",
          background: "rgba(239, 68, 68, 0.03)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#EF4444";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(239,68,68,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,68,68,0.2)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: "0.15em", color: "#EF4444", fontWeight: 700, marginBottom: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#EF4444", boxShadow: "0 0 12px #EF4444", animation: "pulse 1.5s infinite", display: "inline-block" }} />
            {currentLang === "id" ? "REAL-TIME EXTINCTION TICKER" : "REAL-TIME EXTINCTION TICKER"}
          </div>

          {/* Timer */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900,
            color: "#EF4444",
            textShadow: "0 0 15px rgba(239,68,68,0.4)",
            letterSpacing: "0.05em",
            margin: "8px 0",
          }}>
            {timeLeft}
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            {currentLang === "id"
              ? "Hingga bahasa daerah berikutnya diperkirakan punah total (Laju: 1 bahasa / 14 hari)"
              : "Until the next regional language is estimated to go completely extinct (Rate: 1 language / 14 days)"}
          </div>
        </div>

      </div>
    </section>
  );
}
