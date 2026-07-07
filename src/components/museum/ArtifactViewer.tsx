"use client";

import { ArtifactData } from "@/types";
import Image from "next/image";
import { useRef, useCallback } from "react";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import HotspotLayer from "./HotspotLayer";
import MuseumBackground from "./MuseumBackground";
import { RotateCw } from "lucide-react";

interface ArtifactViewerProps {
  artifact: ArtifactData;
  activeHotspotId: string | null;
  lang: "id" | "en";
  onHotspotToggle: (id: string) => void;
  onCloseHotspot: () => void;
  t: (key: string) => string;
}

/** Maximum tilt in degrees — kept at 8° for elegance as per spec */
const MAX_TILT = 8;

export default function ArtifactViewer({
  artifact,
  activeHotspotId,
  lang,
  onHotspotToggle,
  onCloseHotspot,
  t,
}: ArtifactViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Spring-based tilt values ──────────────────────────────────────── */
  const rawX = useSpring(0, { stiffness: 180, damping: 22 });
  const rawY = useSpring(0, { stiffness: 180, damping: 22 });

  /* Map spring values to CSS-ready degree strings */
  const rotateX = useTransform(rawX, (v) => `${v}deg`);
  const rotateY = useTransform(rawY, (v) => `${v}deg`);

  /* Track hover state to pause float animation */
  const isHoveredRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize: -0.5 → +0.5
      const nx = (e.clientX - rect.left)  / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)   / rect.height - 0.5;
      rawY.set(nx * MAX_TILT * 2);  // left-right  → Y rotation
      rawX.set(-ny * MAX_TILT * 2); // up-down     → X rotation
      isHoveredRef.current = true;
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    isHoveredRef.current = false;
  }, [rawX, rawY]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const nx    = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))  - 0.5;
      const ny    = Math.max(0, Math.min(1, (touch.clientY - rect.top)  / rect.height)) - 0.5;
      rawY.set(nx * MAX_TILT * 2);
      rawX.set(-ny * MAX_TILT * 2);
    },
    [rawX, rawY]
  );

  const handleTouchEnd = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const title = lang === "id" ? artifact.title_id : artifact.title_en;

  return (
    <div className="viewer-premium-wrap">
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
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={onCloseHotspot}
            style={{ cursor: "crosshair", overflow: "hidden" }}
            role="img"
            aria-label={`Interactive viewer: ${title}`}
          >
            {/* Decorative museum background */}
            <MuseumBackground />

            {/* 3D tilt + auto-float artifact */}
            <motion.div
              className="artifact-float-wrapper"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Artifact swap transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={artifact.id}
                  style={{
                    position: "relative",
                    height: "75%",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)", rotateY: -12 }}
                  animate={{ opacity: 1, scale: 1,    filter: "blur(0px)",  rotateY: 0   }}
                  exit   ={{ opacity: 0, scale: 1.06, filter: "blur(6px)"                }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Float idle animation */}
                  <motion.div
                    animate={{ y: [0, -11, 0], scale: [1, 1.01, 1], rotate: [0, 0.4, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "loop",
                    }}
                    style={{ width: "100%", height: "100%", position: "relative" }}
                  >
                    <Image
                      src={artifact.image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 80vw, 320px"
                      className="viewer-artifact-img"
                      style={{ objectFit: "contain" }}
                      priority
                      unoptimized
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative base shadow ring */}
              <div className="viewer-rotation-ring" aria-hidden="true" />
            </motion.div>
          </div>

          {/* ── Hotspot Overlay ──────────────────────────────────────────
              Sits as absolute sibling *over* the stage, with overflow:visible
              so tooltips can escape upward without being clipped.
              Pointer events only hit the hotspot dots — background is transparent. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "100%",
              pointerEvents: "none",  /* transparent to mouse by default */
              zIndex: 30,
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Centered hotspot wrapper matching image size and tilt/float exactly */}
            <motion.div
              style={{
                position: "relative",
                height: "75%",
                aspectRatio: "1 / 1",
                overflow: "visible",
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              animate={{ y: [0, -11, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            >
              <HotspotLayer
                hotspots={artifact.hotspots}
                activeHotspotId={activeHotspotId}
                lang={lang}
                onToggle={onHotspotToggle}
                t={t}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Hint Bar ─────────────────────────────────────────────────── */}
        <div className="viewer-hints">
          <span className="viewer-hint-item">
            <RotateCw
              size={11}
              style={{ color: "var(--cyan-primary)", animation: "spin 8s linear infinite" }}
            />
            {t("inst-drag")}
          </span>
          <span className="viewer-hint-item">
            <span className="hint-dot-gold" />
            {t("inst-hotspot")}
          </span>
        </div>
      </div>
    </div>
  );
}
