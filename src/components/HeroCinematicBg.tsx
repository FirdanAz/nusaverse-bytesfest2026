"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";

/* ─── Hotspot data ────────────────────────────────────────────────────────── */
interface HotspotDef {
  id: string;
  x: string; // CSS left %
  y: string; // CSS top %
  emoji: string;
  title: string;
  subtitle: string;
}

const HOTSPOTS: HotspotDef[] = [
  {
    id: "borobudur",
    x: "55%",
    y: "42%",
    emoji: "✨",
    title: "Borobudur",
    subtitle: "UNESCO World Heritage",
  },
  {
    id: "batik",
    x: "24%",
    y: "63%",
    emoji: "✨",
    title: "Batik",
    subtitle: "UNESCO Intangible Heritage",
  },
  {
    id: "wayang",
    x: "76%",
    y: "28%",
    emoji: "✨",
    title: "Wayang",
    subtitle: "UNESCO Intangible Heritage",
  },
  {
    id: "gamelan",
    x: "40%",
    y: "72%",
    emoji: "✨",
    title: "Gamelan",
    subtitle: "UNESCO Intangible Heritage",
  },
  {
    id: "prambanan",
    x: "68%",
    y: "57%",
    emoji: "✨",
    title: "Prambanan",
    subtitle: "UNESCO World Heritage",
  },
];

/* ─── Spotlight radius ────────────────────────────────────────────────────── */
const RADIUS = 290; // px
const LERP_FACTOR = 0.09; // spotlight smoothing (lower = smoother)
const GLOW_DIST = RADIUS * 0.75; // px – distance at which hotspot starts glowing

/* ─── Hotspot dot component (memoised) ───────────────────────────────────── */
interface HotspotProps {
  def: HotspotDef;
  isActive: boolean;
  dotRef: React.RefObject<HTMLElement | null>;
  onClick: (id: string) => void;
  onClose: () => void;
}

const HotspotDot = memo(function HotspotDot({
  def,
  isActive,
  dotRef,
  onClick,
  onClose,
}: HotspotProps) {
  return (
    <div
      className="hcb-hotspot"
      style={{ left: def.x, top: def.y }}
      aria-label={`Hotspot: ${def.title}`}
    >
      {/* Clickable dot – glow driven by CSS --glow var written by RAF */}
      <button
        className="hcb-dot"
        ref={dotRef as React.RefObject<HTMLButtonElement>}
        onClick={() => onClick(def.id)}
        aria-expanded={isActive}
        aria-haspopup="true"
        title={def.title}
      />

      {/* Tooltip card – shown / hidden via CSS class */}
      <div
        className={`hcb-tooltip${isActive ? " hcb-tooltip--open" : ""}`}
        role="dialog"
        aria-label={def.title}
      >
        <button
          className="hcb-tooltip-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        >
          ×
        </button>
        <span className="hcb-tooltip-emoji">{def.emoji}</span>
        <strong className="hcb-tooltip-title">{def.title}</strong>
        <span className="hcb-tooltip-sub">{def.subtitle}</span>
      </div>
    </div>
  );
});

/* ─── Main component ──────────────────────────────────────────────────────── */
function HeroCinematicBg() {
  /* Reveal layer ref — spotlight CSS vars written here */
  const revealRef = useRef<HTMLDivElement>(null);

  /* One ref per hotspot dot – glow CSS var written by RAF */
  const dotRefs = useRef<Array<React.RefObject<HTMLElement | null>>>(
    HOTSPOTS.map(() => React.createRef<HTMLElement>())
  );

  /* Single piece of state: which hotspot tooltip is open */
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  /* RAF state (mutable, no re-render) */
  const rafRef = useRef<number>(0);
  const lxRef = useRef(-999); // current lerped spotlight X
  const lyRef = useRef(-999); // current lerped spotlight Y
  const txRef = useRef(-999); // target X
  const tyRef = useRef(-999); // target Y
  const isTouchRef = useRef(false);
  const sweepTRef = useRef(0); // time accumulator for mobile sweep

  /* Section ref for touch events */
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Close tooltip when clicking outside */
  const handleClose = useCallback(() => setActiveHotspot(null), []);
  const handleOpen = useCallback((id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    /* ── Detect touch device ── */
    isTouchRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    /* ── Reduced-motion preference ── */
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Mouse tracking (desktop) ── */
    const sectionEl = sectionRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current || !sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      txRef.current = e.clientX - rect.left;
      tyRef.current = e.clientY - rect.top;
    };

    /* ── Touch tracking (mobile drag) ── */
    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionEl) return;
      const touch = e.touches[0];
      const rect = sectionEl.getBoundingClientRect();
      txRef.current = touch.clientX - rect.left;
      tyRef.current = touch.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    /* ── RAF loop ── */
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50); // cap delta
      lastTime = now;

      const reveal = revealRef.current;
      if (!reveal) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      /* Mobile auto-sweep when no touch drag is happening */
      if (isTouchRef.current && txRef.current === -999) {
        sweepTRef.current += dt / 9000; // full cycle every 9s
        const sectionEl2 = sectionRef.current;
        if (sectionEl2) {
          const w = sectionEl2.offsetWidth;
          const h = sectionEl2.offsetHeight;
          txRef.current = (Math.sin(sweepTRef.current * Math.PI * 2) * 0.4 + 0.5) * w;
          tyRef.current = (Math.cos(sweepTRef.current * Math.PI * 1.3) * 0.25 + 0.5) * h;
        }
      }

      /* Lerp spotlight position */
      if (prefersReduced) {
        lxRef.current = txRef.current;
        lyRef.current = tyRef.current;
      } else {
        lxRef.current += (txRef.current - lxRef.current) * LERP_FACTOR;
        lyRef.current += (tyRef.current - lyRef.current) * LERP_FACTOR;
      }

      const lx = lxRef.current;
      const ly = lyRef.current;

      /* Write spotlight position to CSS custom props on the reveal layer */
      reveal.style.setProperty("--sx", `${lx}px`);
      reveal.style.setProperty("--sy", `${ly}px`);

      /* Update hotspot glow via CSS --glow var on each dot ref */
      HOTSPOTS.forEach((hs, i) => {
        const dotEl = dotRefs.current[i]?.current;
        if (!dotEl || !sectionRef.current) return;

        const sEl = sectionRef.current;
        const w = sEl.offsetWidth;
        const h = sEl.offsetHeight;

        // Hotspot position in px
        const hx = (parseFloat(hs.x) / 100) * w;
        const hy = (parseFloat(hs.y) / 100) * h;

        const dist = Math.sqrt((lx - hx) ** 2 + (ly - hy) ** 2);
        const glow = lx === -999 ? 0 : Math.max(0, 1 - dist / GLOW_DIST);

        dotEl.style.setProperty("--glow", glow.toFixed(3));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="hcb-root"
      onClick={handleClose}
      aria-hidden="true"
    >
      {/* ── Layer 1: Dark cinematic base ── */}
      <div className="hcb-layer-dark">
        {/* SVG: Topographic contour lines */}
        <svg
          className="hcb-contours"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[
            { rx: 580, ry: 220, dashLen: 2200 },
            { rx: 460, ry: 175, dashLen: 1800 },
            { rx: 340, ry: 130, dashLen: 1400 },
            { rx: 650, ry: 270, dashLen: 2600 },
            { rx: 200, ry: 85,  dashLen: 950  },
          ].map((e, i) => (
            <ellipse
              key={i}
              cx="600"
              cy="350"
              rx={e.rx}
              ry={e.ry}
              fill="none"
              stroke="rgba(34,211,238,0.07)"
              strokeWidth="1"
              strokeDasharray={`${e.dashLen} ${e.dashLen}`}
              style={{
                animationDelay: `${i * -6}s`,
                strokeDashoffset: e.dashLen,
              }}
              className="hcb-contour-line"
            />
          ))}
        </svg>

        {/* SVG: Indonesia wireframe silhouette (simplified bounding shapes) */}
        <svg
          className="hcb-silhouette"
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Simplified Indonesia archipelago shapes – Sumatra, Java, Kalimantan, Sulawesi, Papua */}
          <g opacity="0.055" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.2">
            {/* Sumatra (left elongated) */}
            <path d="M80,180 C100,120 160,90 220,100 C280,110 320,150 310,190 C300,230 240,250 180,240 C120,230 70,220 80,180Z" />
            {/* Java */}
            <path d="M290,200 C320,185 400,175 470,185 C540,195 570,215 555,235 C540,255 470,265 400,258 C330,251 275,225 290,200Z" />
            {/* Kalimantan (large center) */}
            <path d="M480,80 C520,50 620,45 700,60 C780,75 820,120 810,170 C800,220 740,250 680,255 C620,260 550,240 510,200 C470,160 450,110 480,80Z" />
            {/* Sulawesi (distinctive K-shape simplified) */}
            <path d="M790,100 C810,80 840,90 850,115 C860,140 845,170 825,175 C860,180 880,200 870,225 C860,250 830,255 810,240 C820,215 800,190 790,175 C770,160 760,130 790,100Z" />
            {/* Papua (right side) */}
            <path d="M950,120 C990,90 1080,85 1140,105 C1180,125 1190,165 1160,190 C1130,215 1070,225 1010,215 C950,205 920,170 950,120Z" />
          </g>
        </svg>

        {/* Ambient glow orbs */}
        <div className="hcb-glow hcb-glow-gold" />
        <div className="hcb-glow hcb-glow-cyan" />
      </div>

      {/* ── Layer 2: Cultural reveal (CSS mask driven by --sx / --sy) ── */}
      <div className="hcb-layer-cultural" ref={revealRef}>
        <svg
          className="hcb-cultural-svg"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Batik geometric tile pattern */}
            <pattern
              id="hcb-batik"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer diamond */}
              <polygon
                points="30,4 56,30 30,56 4,30"
                fill="none"
                stroke="rgba(212,160,50,0.55)"
                strokeWidth="1.2"
              />
              {/* Inner diamond */}
              <polygon
                points="30,14 46,30 30,46 14,30"
                fill="none"
                stroke="rgba(200,120,40,0.4)"
                strokeWidth="0.8"
              />
              {/* Center cross */}
              <line x1="30" y1="20" x2="30" y2="40" stroke="rgba(212,160,50,0.3)" strokeWidth="0.6" />
              <line x1="20" y1="30" x2="40" y2="30" stroke="rgba(212,160,50,0.3)" strokeWidth="0.6" />
              {/* Corner dots */}
              <circle cx="30" cy="4"  r="2" fill="rgba(212,160,50,0.45)" />
              <circle cx="56" cy="30" r="2" fill="rgba(212,160,50,0.45)" />
              <circle cx="30" cy="56" r="2" fill="rgba(212,160,50,0.45)" />
              <circle cx="4"  cy="30" r="2" fill="rgba(212,160,50,0.45)" />
              {/* Small center dot */}
              <circle cx="30" cy="30" r="3" fill="rgba(200,130,60,0.5)" />
            </pattern>

            {/* Radial fade mask for cultural SVG edges */}
            <radialGradient id="hcb-edge-fade" cx="50%" cy="50%" r="55%">
              <stop offset="20%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="hcb-fade-mask">
              <rect width="1200" height="700" fill="url(#hcb-edge-fade)" />
            </mask>
          </defs>

          {/* Batik tile background */}
          <rect
            width="1200"
            height="700"
            fill="url(#hcb-batik)"
            mask="url(#hcb-fade-mask)"
            opacity="0.9"
          />

          {/* Warm gradient wash */}
          <rect
            width="1200"
            height="700"
            fill="url(#hcb-warm-grad)"
            opacity="0.6"
          />

          {/* Borobudur silhouette (center-left) */}
          <g transform="translate(280, 280)" opacity="0.75">
            {/* Base platform tiers */}
            <rect x="-120" y="60" width="240" height="14" rx="2" fill="rgba(212,175,55,0.7)" />
            <rect x="-100" y="46" width="200" height="14" rx="2" fill="rgba(212,175,55,0.65)" />
            <rect x="-80"  y="32" width="160" height="14" rx="2" fill="rgba(212,175,55,0.6)" />
            <rect x="-60"  y="20" width="120" height="12" rx="2" fill="rgba(212,175,55,0.55)" />
            <rect x="-40"  y="10" width="80"  height="10" rx="2" fill="rgba(212,175,55,0.5)" />
            {/* Circular terraces (simplified) */}
            <ellipse cx="0" cy="8"  rx="30" ry="8"  fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
            <ellipse cx="0" cy="2"  rx="20" ry="6"  fill="none" stroke="rgba(212,175,55,0.45)" strokeWidth="1.2" />
            {/* Main stupa */}
            <ellipse cx="0" cy="0" rx="12" ry="10" fill="rgba(212,175,55,0.6)" />
            <line x1="0" y1="-10" x2="0" y2="-24" stroke="rgba(212,175,55,0.5)" strokeWidth="2" />
            <circle cx="0" cy="-24" r="3" fill="rgba(212,175,55,0.55)" />
            {/* Small stupas */}
            {[-50,-25,0,25,50].map((dx, i) => (
              <g key={i} transform={`translate(${dx}, 8)`}>
                <ellipse cx="0" cy="0" rx="6" ry="5" fill="rgba(212,175,55,0.35)" />
                <line x1="0" y1="-5" x2="0" y2="-12" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
              </g>
            ))}
          </g>

          {/* Wayang figure silhouette (right side) */}
          <g transform="translate(900, 200)" opacity="0.65">
            {/* Head */}
            <ellipse cx="0" cy="-80" rx="18" ry="22" fill="rgba(200,140,40,0.6)" />
            {/* Crown/headdress */}
            <path d="M-12,-100 L0,-135 L12,-100" fill="rgba(212,175,55,0.55)" />
            <path d="M-8,-102 L-18,-125 M8,-102 L18,-125" stroke="rgba(212,175,55,0.45)" strokeWidth="1.5" fill="none"/>
            {/* Body */}
            <path d="M-8,-58 L-20,0 L-10,60 L0,70 L10,60 L20,0 L8,-58Z" fill="rgba(200,140,40,0.55)" />
            {/* Arms – outstretched */}
            <path d="M-8,-40 L-80,-10 L-90,0 M8,-40 L80,-10 L90,-5" stroke="rgba(212,175,55,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <circle cx="-90" cy="0"  r="5" fill="rgba(200,140,40,0.5)" />
            <circle cx="90"  cy="-5" r="5" fill="rgba(200,140,40,0.5)" />
            {/* Legs */}
            <path d="M-5,70 L-15,140 M5,70 L15,140" stroke="rgba(200,140,40,0.5)" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Ornamental detail lines */}
            <path d="M-15,-30 L15,-30 M-18,-15 L18,-15 M-16,0 L16,0" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" fill="none"/>
          </g>

          {/* Decorative traditional ornament arcs */}
          <g opacity="0.5">
            <path
              d="M100,600 Q300,450 500,550 Q700,650 900,500 Q1100,350 1200,480"
              fill="none"
              stroke="rgba(212,160,50,0.3)"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            <path
              d="M0,400 Q200,300 400,380 Q600,460 800,340"
              fill="none"
              stroke="rgba(200,130,60,0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </g>

          {/* Warm gradient definition (referenced above) */}
          <defs>
            <radialGradient id="hcb-warm-grad" cx="40%" cy="50%" r="60%">
              <stop offset="0%"   stopColor="rgba(160,80,20,0.45)" />
              <stop offset="50%"  stopColor="rgba(120,50,10,0.3)" />
              <stop offset="100%" stopColor="rgba(80,30,5,0.1)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* ── Hotspots ── */}
      {HOTSPOTS.map((hs, i) => (
        <HotspotDot
          key={hs.id}
          def={hs}
          isActive={activeHotspot === hs.id}
          dotRef={dotRefs.current[i] as React.RefObject<HTMLElement | null>}
          onClick={handleOpen}
          onClose={handleClose}
        />
      ))}
    </div>
  );
}

export default memo(HeroCinematicBg);
