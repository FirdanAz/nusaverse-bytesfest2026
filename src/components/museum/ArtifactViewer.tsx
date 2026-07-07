"use client";

import { ArtifactData } from "@/types";
import Image from "next/image";
import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import HotspotLayer from "./HotspotLayer";
import MuseumBackground from "./MuseumBackground";
import { RotateCw, Sword, Leaf, Layers, Music, Building2 } from "lucide-react";

interface ArtifactViewerProps {
  artifact: ArtifactData;
  activeHotspotId: string | null;
  lang: "id" | "en";
  onHotspotToggle: (id: string) => void;
  onCloseHotspot: () => void;
  t: (key: string) => string;
}

/** Maximum tilt in degrees — increased to 13° for more tangible 3D depth, yet elegant */
const MAX_TILT = 13;

export default function ArtifactViewer({
  artifact,
  activeHotspotId,
  lang,
  onHotspotToggle,
  onCloseHotspot,
  t,
}: ArtifactViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Zoom and Panning States ─────────────────────────────────────── */
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  /* ── Hotspot Discovery Progress States ────────────────────────────── */
  const [discoveredHotspots, setDiscoveredHotspots] = useState<string[]>([]);

  // Reset states on artifact swap
  useEffect(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    setTouchStartDist(null);
    setDiscoveredHotspots([]);
    setImageError(false);
  }, [artifact.id]);

  // Track discovered hotspots
  useEffect(() => {
    if (activeHotspotId && !discoveredHotspots.includes(activeHotspotId)) {
      setDiscoveredHotspots((prev) => [...prev, activeHotspotId]);
    }
  }, [activeHotspotId, discoveredHotspots]);

  // Escape key zoom reset listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomed(false);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Next undiscovered hotspot ID
  const nextUndiscoveredHotspotId = useMemo(() => {
    const nextSpot = artifact.hotspots.find((spot) => !discoveredHotspots.includes(spot.id));
    return nextSpot ? nextSpot.id : null;
  }, [artifact.hotspots, discoveredHotspots]);

  /* ── Spring-based tilt values ──────────────────────────────────────── */
  const rawX = useSpring(0, { stiffness: 180, damping: 22 });
  const rawY = useSpring(0, { stiffness: 180, damping: 22 });

  /* Map spring values to CSS-ready degree strings */
  const rotateX = useTransform(rawX, (v) => `${v}deg`);
  const rotateY = useTransform(rawY, (v) => `${v}deg`);

  /* ── Shared float Y ─────────────────────────────────────────────────── */
  /* Single source of truth: one MotionValue drives BOTH the image and the  */
  /* hotspot layer so they are ALWAYS perfectly in phase — no drift ever.   */
  const floatY = useMotionValue(0);
  const floatStartRef = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (isZoomed) {
      floatY.set(0);
      floatStartRef.current = null;
      return;
    }
    if (floatStartRef.current === null) floatStartRef.current = t;
    const elapsed = (t - floatStartRef.current) / 1000; // seconds
    const period = 4; // 4-second cycle, same as before
    const phase = (elapsed % period) / period; // 0..1
    // Smooth cosine loop: 0 → -11 → 0 matching previous "easeInOut" keyframe
    const y = -5.5 * (1 - Math.cos(phase * Math.PI * 2));
    floatY.set(y);
  });

  /* Track hover state to pause float animation */
  const isHoveredRef = useRef(false);

  /* ── Double Click/Tap Zoom Toggle ────────────────────────────────── */
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed((prev) => {
      if (prev) {
        setPan({ x: 0, y: 0 });
      }
      return !prev;
    });
  }, []);

  /* ── Mouse Event Handlers ────────────────────────────────────────── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  }, [isZoomed, pan.x, pan.y]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isZoomed) {
        if (isDragging) {
          const x = e.clientX - dragStart.x;
          const y = e.clientY - dragStart.y;
          // Clamp dragging to comfortable bounds (e.g. +/- 120px)
          setPan({
            x: Math.max(-120, Math.min(120, x)),
            y: Math.max(-120, Math.min(120, y)),
          });
        }
      } else {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize: -0.5 → +0.5
        const nx = (e.clientX - rect.left)  / rect.width  - 0.5;
        const ny = (e.clientY - rect.top)   / rect.height - 0.5;
        rawY.set(nx * MAX_TILT * 2);  // left-right  → Y rotation
        rawX.set(-ny * MAX_TILT * 2); // up-down     → X rotation
        isHoveredRef.current = true;
      }
    },
    [isZoomed, isDragging, dragStart, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    if (isZoomed) {
      setIsDragging(false);
    } else {
      rawX.set(0);
      rawY.set(0);
      isHoveredRef.current = false;
    }
  }, [isZoomed, rawX, rawY]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ── Touch Event Handlers (Mobile Zoom & Pan) ───────────────────── */
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      if (isZoomed) {
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({
          x: touch.clientX - pan.x,
          y: touch.clientY - pan.y,
        });
      }
    } else if (e.touches.length === 2) {
      // Setup pinch distance
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
    }
  }, [isZoomed, pan.x, pan.y]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 1 && isDragging && isZoomed) {
        const touch = e.touches[0];
        const x = touch.clientX - dragStart.x;
        const y = touch.clientY - dragStart.y;
        setPan({
          x: Math.max(-120, Math.min(120, x)),
          y: Math.max(-120, Math.min(120, y)),
        });
      } else if (e.touches.length === 2 && touchStartDist !== null) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = dist / touchStartDist;
        if (ratio > 1.25 && !isZoomed) {
          setIsZoomed(true);
          setPan({ x: 0, y: 0 });
        } else if (ratio < 0.75 && isZoomed) {
          setIsZoomed(false);
          setPan({ x: 0, y: 0 });
        }
      } else if (!isZoomed && e.touches.length === 1) {
        if (!containerRef.current) return;
        const rect  = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const nx    = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))  - 0.5;
        const ny    = Math.max(0, Math.min(1, (touch.clientY - rect.top)  / rect.height)) - 0.5;
        rawY.set(nx * MAX_TILT * 2);
        rawX.set(-ny * MAX_TILT * 2);
      }
    },
    [isZoomed, isDragging, dragStart, touchStartDist, rawX, rawY]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchStartDist(null);
    if (!isZoomed) {
      rawX.set(0);
      rawY.set(0);
    }
  }, [isZoomed, rawX, rawY]);

  const handleResetZoom = useCallback(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const title = lang === "id" ? artifact.title_id : artifact.title_en;

  return (
    <div className="viewer-premium-wrap" onMouseUp={handleMouseUp}>
      {/* overflow: visible so tooltips can pop above the rounded border */}
      <div className="viewer-premium-inner" style={{ overflow: "visible", position: "relative" }}>

        {/* Wrapper to align overlay height exactly to the stage height, excluding the hints bar */}
        <div style={{ position: "relative", width: "100%", overflow: "visible" }}>
          {/* ── Viewer Stage (overflow:hidden for visual cleanliness) ──── */}
          <div
            ref={containerRef}
            className="viewer-stage"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            onClick={onCloseHotspot}
            style={{ 
              cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "crosshair", 
              overflow: "hidden",
              userSelect: "none"
            }}
            role="img"
            aria-label={`Interactive viewer: ${title}`}
          >
            {/* Soft spotlight behind artifact */}
            <div className="viewer-spotlight" aria-hidden="true" />
            
            {/* Subtle perspective floor grid */}
            <div className="viewer-floor-grid" aria-hidden="true" />

            {/* Decorative museum background */}
            <MuseumBackground />

            {/* 3D tilt + auto-float artifact */}
            <motion.div
              className="artifact-float-wrapper"
              style={{ 
                rotateX: isZoomed ? 0 : rotateX, 
                rotateY: isZoomed ? 0 : rotateY, 
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Artifact swap transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={artifact.id}
                  style={{
                    position: "relative",
                    height: "68%", /* 65-70% of viewer height */
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ opacity: 0, scale: 0.97, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1,    rotate: 0  }}
                  exit   ={{ opacity: 0, scale: 1.03, rotate: 2  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Float idle animation / Zoom & Pan styling */}
                  {/* Uses shared floatY MotionValue — same source as HotspotLayer */}
                  <motion.div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transformStyle: "preserve-3d",
                      y: isZoomed ? 0 : floatY,
                    }}
                    // transformTemplate receives Framer Motion's resolved values each frame
                    transformTemplate={({ y }) =>
                      isZoomed
                        ? `scale(2.0) translate3d(${pan.x}px, ${pan.y}px, 50px)`
                        : `translateZ(40px) translateY(${y})`
                    }
                  >
                    {!imageError ? (
                      <Image
                        src={artifact.image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 80vw, 320px"
                        className="viewer-artifact-img"
                        style={{ objectFit: "contain" }}
                        priority
                        unoptimized
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gold-primary)",
                        transform: "translateZ(30px)"
                      }}>
                        {artifact.category === "weapons"      ? <Sword     size={56} /> :
                         artifact.category === "sacred"       ? <Leaf      size={56} /> :
                         artifact.category === "textiles"     ? <Layers    size={56} /> :
                         artifact.category === "music"        ? <Music     size={56} /> :
                                                                <Building2 size={56} />}
                        <span style={{ fontSize: "14px", color: "var(--white-50)", marginTop: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {lang === "id" ? "Gambar belum tersedia" : "Image not available yet"}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative base shadow ring (Only show when not zoomed) */}
              {!isZoomed && <div className="viewer-rotation-ring" aria-hidden="true" />}
            </motion.div>
          </div>

          {/* ── Reset Zoom Overlay Button ──────────────────────────────── */}
          {isZoomed && (
            <button
              onClick={handleResetZoom}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(10, 20, 35, 0.88)",
                border: "1px solid var(--gold-primary)",
                borderRadius: "20px",
                padding: "6px 12px",
                color: "var(--gold-primary)",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                zIndex: 40,
                boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
                transition: "all 0.2s"
              }}
            >
              {lang === "id" ? "Atur Ulang Zoom" : "Reset Zoom"}
            </button>
          )}

          {/* ── Hotspot Overlay (Conditioned on zoom to avoid placement errors) ─ */}
          {!isZoomed && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                pointerEvents: "none",
                zIndex: 30,
                overflow: "visible",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Centered hotspot wrapper — shares floatY with artifact image, zero drift */}
              <motion.div
                style={{
                  position: "relative",
                  height: "68%",
                  aspectRatio: "1 / 1",
                  overflow: "visible",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  y: floatY,
                }}
              >
                <HotspotLayer
                  hotspots={artifact.hotspots}
                  activeHotspotId={activeHotspotId}
                  nextUndiscoveredHotspotId={nextUndiscoveredHotspotId}
                  discoveredHotspots={discoveredHotspots}
                  lang={lang}
                  onToggle={onHotspotToggle}
                  t={t}
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* ── Progress & Hint Bar ───────────────────────────────────────── */}
        <div className="viewer-hints" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          {/* Hotspots Discovery Progress */}
          <span 
            style={{ 
              fontSize: "11px", 
              fontWeight: "700", 
              color: discoveredHotspots.length === artifact.hotspots.length ? "var(--gold-primary)" : "var(--white-70)",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <span 
              style={{ 
                display: "inline-block", 
                width: "6px", 
                height: "6px", 
                borderRadius: "50%", 
                background: discoveredHotspots.length === artifact.hotspots.length ? "var(--gold-primary)" : "var(--cyan-primary)"
              }} 
            />
            {lang === "id" 
              ? `Hotspot: ${discoveredHotspots.length} dari ${artifact.hotspots.length} Ditemukan`
              : `Hotspots: ${discoveredHotspots.length} of ${artifact.hotspots.length} Discovered`}
          </span>

          <div style={{ display: "flex", gap: "14px" }}>
            <span className="viewer-hint-item">
              <RotateCw
                size={11}
                style={{ color: "var(--cyan-primary)", animation: "spin 8s linear infinite" }}
              />
              {isZoomed 
                ? (lang === "id" ? "Geser untuk Panning" : "Drag to Pan")
                : t("inst-drag") || (lang === "id" ? "Arahkan Kursor untuk 3D" : "Hover for 3D")}
            </span>
            <span className="viewer-hint-item">
              <span className="hint-dot-gold" />
              {t("inst-hotspot") || (lang === "id" ? "Klik Titik Informasi" : "Click Hotspots")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
