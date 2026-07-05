"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroMap from "./maps/HeroMap";
import CountUp from "./CountUp";
import { Globe, ArrowRight, Play, Languages, Users, Map } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      color: string;
    }> = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.5,
        speedY: -(Math.random() * 0.35 + 0.05),
        speedX: Math.random() * 0.3 - 0.15,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? "#D4AF37" : "#22D3EE",
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.speedX *= -1;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = p1.color === p2.color ? p1.color : "#ffffff";
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section reveal">
      {/* Floating Canvas Background */}
      <canvas ref={canvasRef} id="hero-canvas" className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]"></canvas>

      <div className="container hero-container relative z-10">
        <div className="hero-grid">
          
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="eyebrow-chip">
              <Globe size={14} />
              <span>{t("hero-eyebrow")}</span>
            </div>

            <h1 className="hero-title">
              {t("hero-title-1")}
              <br />
              <span className="text-gradient-gold">{t("hero-title-2")}</span>
            </h1>

            <p className="hero-subtitle">
              {t("hero-desc")}
            </p>

            <div className="hero-buttons">
              <a href="#explore" className="btn btn-gold text-decoration-none">
                <span>{t("hero-cta-1")}</span>
                <ArrowRight size={16} />
              </a>
              <a href="#museum" className="btn btn-ghost text-decoration-none">
                <span>{t("hero-cta-2")}</span>
                <Play size={16} />
              </a>
            </div>

            {/* Counters */}
            <div className="hero-stats">
              <div className="hero-stat-item">
                <CountUp end={714} suffix="" className="hero-stat-num" />
                <span className="hero-stat-label">
                  {t("stat-langs")}
                </span>
              </div>
              <div className="hero-stat-item">
                <CountUp end={1340} suffix="" className="hero-stat-num" />
                <span className="hero-stat-label">
                  {t("stat-groups")}
                </span>
              </div>
              <div className="hero-stat-item">
                <CountUp end={38} suffix="" className="hero-stat-num" />
                <span className="hero-stat-label">
                  {t("stat-provs")}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Map Showcase */}
          <div className="hero-showcase">
            {/* Floating Badges */}
            <div className="floating-badge badge-1 animate-float-1">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-primary">
                <Languages size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-display text-base font-bold text-white">714</span>
                <span className="text-[10px] text-white/50">{t("stat-langs")}</span>
              </div>
            </div>

            <div className="floating-badge badge-2 animate-float-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold-primary">
                <Users size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-display text-base font-bold text-white">1,340</span>
                <span className="text-[10px] text-white/50">{t("stat-groups")}</span>
              </div>
            </div>

            <div className="floating-badge badge-3 animate-float-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-primary">
                <Map size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-display text-base font-bold text-white">38</span>
                <span className="text-[10px] text-white/50">{t("stat-provs")}</span>
              </div>
            </div>

            {/* Static Hero Map */}
            <HeroMap className="hero-map-svg" />
          </div>
        </div>
      </div>
    </section>
  );
}
