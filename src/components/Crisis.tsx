"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangle, AlertOctagon, TrendingDown, BookOpen, Skull, Eye } from "lucide-react";

export default function Crisis() {
  const { currentLang, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Extinction countdown timer
  useEffect(() => {
    // 8 days, 14 hours, 32 mins, 15 secs in seconds
    let totalSeconds = 8 * 24 * 3600 + 14 * 3600 + 32 * 60 + 15;

    const pad = (num: number) => String(num).padStart(2, "0");

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        totalSeconds = 14 * 24 * 3600; // Reset to 14 days
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
        
        {/* Grid layout */}
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

            {/* Extinction countdown box */}
            <div className="countdown-box">
              <div className="flex items-center justify-center gap-2 text-[11px] tracking-widest font-bold text-red-500 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_#EF4444] animate-pulse"></span>
                <span>{currentLang === "id" ? "PENGHITUNG MUNDUR KEPUNAHAN" : "EXTINCTION COUNTDOWN"}</span>
              </div>
              <div className="countdown-timer">
                {timeLeft}
              </div>
              <span className="text-xs text-white/50 block mt-2">
                {currentLang === "id"
                  ? "*Interval rata-rata hilangnya penutur aktif bahasa daerah"
                  : "*Average interval of local native speaker loss"}
              </span>
            </div>
          </div>

          {/* Right chart column */}
          <div
            ref={chartRef}
            className={`crisis-chart-container transition-all duration-500 ${
              isAnimated ? "animated" : ""
            }`}
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
                <text x="350" y="192" className="text-[10px] fill-white/50 font-sans">2050 (Proj.)</text>

                {/* Area under chart */}
                <path
                  d="M 40 170 L 40 20 L 150 40 L 260 70 L 370 130 L 370 170 Z"
                  className={`fill-[url(#chart-gradient)] transition-opacity duration-1000 delay-[2000ms] ${
                    isAnimated ? "opacity-12" : "opacity-0"
                  }`}
                />

                {/* Active Line */}
                <path
                  d="M 40 20 L 150 40 L 260 70"
                  className={`fill-none stroke-cyan-primary stroke-[3.5] stroke-linecap-round transition-all duration-[2000ms] ease-in-out`}
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: isAnimated ? 0 : 400,
                  }}
                />
                
                {/* Extinct Proj Line */}
                <path
                  d="M 260 70 L 370 130"
                  className={`fill-none stroke-red-500 stroke-[3.5] stroke-dasharray-[6,4] transition-all duration-[2000ms] ease-in-out delay-1000`}
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: isAnimated ? 0 : 400,
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
          </div>
        </div>

        {/* Stats Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 border border-red-500/8 hover:border-red-500/40 rounded-2xl bg-red-500/1 text-left relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10_30px_rgba(239,68,68,0.05)]">
            <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <Skull size={20} />
            </div>
            <div className="text-display text-4xl font-black text-white leading-none mb-3">8</div>
            <div className="text-sm text-white/70">{t("crisis-card-1")}</div>
          </div>

          <div className="p-8 border border-red-500/8 hover:border-red-500/40 rounded-2xl bg-red-500/1 text-left relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10_30px_rgba(239,68,68,0.05)]">
            <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <TrendingDown size={20} />
            </div>
            <div className="text-display text-4xl font-black text-white leading-none mb-3">85%</div>
            <div className="text-sm text-white/70">{t("crisis-card-2")}</div>
          </div>

          <div className="p-8 border border-red-500/8 hover:border-red-500/40 rounded-2xl bg-red-500/1 text-left relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10_30px_rgba(239,68,68,0.05)]">
            <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <AlertTriangle size={20} />
            </div>
            <div className="text-display text-4xl font-black text-white leading-none mb-3">5</div>
            <div className="text-sm text-white/70">{t("crisis-card-3")}</div>
          </div>

          <div className="p-8 border border-red-500/8 hover:border-red-500/40 rounded-2xl bg-red-500/1 text-left relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10_30px_rgba(239,68,68,0.05)]">
            <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <BookOpen size={20} />
            </div>
            <div className="text-display text-4xl font-black text-white leading-none mb-3">60%</div>
            <div className="text-sm text-white/70">{t("crisis-card-4")}</div>
          </div>
        </div>

        {/* Data Reference Note */}
        <div className="mt-8 text-[11px] text-white/40 max-w-[800px] mx-auto text-center leading-relaxed">
          {t("chart-source-note")}
        </div>
      </div>
    </section>
  );
}
