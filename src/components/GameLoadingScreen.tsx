"use client";

import React, { useState, useEffect, useMemo } from "react";

interface GameLoadingScreenProps {
  siteName?: string;
  logoUrl?: string;
  siteTheme?: "red" | "blue";
  onFinished?: () => void;
  minDuration?: number;
}

// ===== Theme Config =====
const THEME_COLORS = {
  red: {
    accent: "#ef4444",
    accentRgb: "239,68,68",
    gradient: "#f97316",
    gradientRgb: "249,115,22",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #0d0d12 30%, #0a0a0f 60%, #080810 100%)",
    barFill: "linear-gradient(90deg, #ef4444, #f97316)",
    barGlow: "0 0 12px rgba(239,68,68,0.4)",
    cornerClass: "from-red-500/60",
    hexStroke: "rgba(239,68,68,0.25)",
    hexStroke2: "rgba(239,68,68,0.15)",
    logoBg: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.1))",
    logoBorder: "1px solid rgba(239,68,68,0.2)",
    logoShadow: "0 0 30px rgba(239,68,68,0.1), inset 0 0 30px rgba(239,68,68,0.05)",
    logoPulseShadow: "0 0 50px rgba(239,68,68,0.2), inset 0 0 40px rgba(239,68,68,0.08)",
    textShadow: "0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(239,68,68,0.2)",
    dropShadow: "drop-shadow(0 0 8px rgba(239,68,68,0.4))",
    spinBorder: "border-red-500/30 border-t-red-500",
    glowBg: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
  },
  blue: {
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    gradient: "#06b6d4",
    gradientRgb: "6,182,212",
    bg: "linear-gradient(135deg, #050810 0%, #0a0f1e 30%, #060a15 60%, #030510 100%)",
    barFill: "linear-gradient(90deg, #3b82f6, #06b6d4)",
    barGlow: "0 0 12px rgba(59,130,246,0.4)",
    cornerClass: "from-blue-500/60",
    hexStroke: "rgba(59,130,246,0.25)",
    hexStroke2: "rgba(59,130,246,0.15)",
    logoBg: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))",
    logoBorder: "1px solid rgba(59,130,246,0.2)",
    logoShadow: "0 0 30px rgba(59,130,246,0.1), inset 0 0 30px rgba(59,130,246,0.05)",
    logoPulseShadow: "0 0 50px rgba(59,130,246,0.2), inset 0 0 40px rgba(59,130,246,0.08)",
    textShadow: "0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(59,130,246,0.2)",
    dropShadow: "drop-shadow(0 0 8px rgba(59,130,246,0.4))",
    spinBorder: "border-blue-500/30 border-t-blue-500",
    glowBg: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
  },
};

// ===== Game-Themed Professional Loading Screen =====
export default function GameLoadingScreen({
  siteName = "RYYSENGTOR",
  logoUrl = "/logo.svg",
  siteTheme = "red",
  onFinished,
  minDuration = 2800,
}: GameLoadingScreenProps) {
  const tc = THEME_COLORS[siteTheme];
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "loading" | "ready">("boot");
  const [glitchText, setGlitchText] = useState("");
  const [exitAnimation, setExitAnimation] = useState(false);

  // Game-themed floating particles
  const particles = useMemo(
    () =>
      [
        { emoji: "⚔️", x: 8, y: 15, delay: 0, duration: 6, size: 18 },
        { emoji: "🎮", x: 85, y: 10, delay: 0.8, duration: 7, size: 20 },
        { emoji: "🎯", x: 15, y: 75, delay: 1.5, duration: 5.5, size: 16 },
        { emoji: "🏆", x: 90, y: 70, delay: 2.2, duration: 6.5, size: 17 },
        { emoji: "💎", x: 50, y: 8, delay: 0.5, duration: 7.5, size: 15 },
        { emoji: "⚡", x: 75, y: 85, delay: 1.8, duration: 5, size: 18 },
        { emoji: "🔥", x: 25, y: 88, delay: 3, duration: 6, size: 16 },
        { emoji: "🌟", x: 65, y: 5, delay: 2.5, duration: 6.8, size: 14 },
        { emoji: "🛡️", x: 5, y: 50, delay: 1.2, duration: 5.8, size: 15 },
        { emoji: "🎯", x: 92, y: 40, delay: 3.5, duration: 6.2, size: 14 },
      ] as const,
    []
  );

  // Progress simulation — throttled rAF for smooth 60fps without excessive re-renders
  useEffect(() => {
    const startTime = Date.now();
    let rafId: number;
    let lastUpdate = 0;
    const tick = (now: number) => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min((elapsed / minDuration) * 100, 100);

      // Only update state every ~50ms to reduce re-renders while staying smooth
      if (now - lastUpdate > 50) {
        lastUpdate = now;
        // Non-linear easing for more realistic loading feel
        const eased = raw < 30 ? raw * 1.2 : raw < 70 ? 36 + (raw - 30) * 0.9 : raw < 90 ? 72 + (raw - 70) * 0.7 : 86 + (raw - 90) * 1.4;
        setProgress(Math.min(eased, 100));

        if (elapsed < 600) setPhase("boot");
        else if (elapsed < minDuration - 400) setPhase("loading");
        else setPhase("ready");
      }

      if (elapsed >= minDuration) {
        setProgress(100);
        setPhase("ready");
        setExitAnimation(true);
        setTimeout(() => onFinished?.(), 600);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [minDuration, onFinished]);

  // Glitch text effect for site name
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:<>?/~`█▓▒░";
    const target = siteName;
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return target[i];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );
      if (iteration >= target.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(interval);
  }, [siteName]);

  const statusTexts: Record<string, string> = {
    boot: "INITIALIZING SYSTEM...",
    loading: "LOADING GAME DATA...",
    ready: "READY!",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: tc.bg,
        opacity: exitAnimation ? 0 : 1,
        transform: exitAnimation ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {/* ===== ANIMATED CIRCUIT BOARD LINES ===== */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
        {[100, 320, 550, 780].map((y, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={y}
            x2="1440"
            y2={y}
            stroke={tc.accent}
            strokeWidth="1"
            strokeDasharray="20 40"
            style={{
              animation: `circuitFlow ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        {/* Vertical lines */}
        {[150, 580, 1050, 1300].map((x, i) => (
          <line
            key={`v-${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2="900"
            stroke={tc.accent}
            strokeWidth="1"
            strokeDasharray="15 35"
            style={{
              animation: `circuitFlowV ${4 + i * 0.4}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        {/* Circuit nodes */}
        {[
          [150, 100],
          [580, 200],
          [1050, 450],
          [1300, 680],
          [580, 780],
        ].map(([cx, cy], i) => (
          <circle
            key={`n-${i}`}
            cx={cx}
            cy={cy}
            r="3"
            fill={tc.accent}
            opacity="0.3"
            style={{
              animation: `circuitPulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </svg>

      {/* ===== FLOATING GAME PARTICLES ===== */}
      {particles.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: 0,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            contain: 'layout',
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* ===== CORNER DECORATIONS — Game UI frame ===== */}
      <div className="absolute top-4 left-4 w-16 h-16">
        <div className={`absolute top-0 left-0 w-8 h-[2px] bg-gradient-to-r ${tc.cornerClass} to-transparent`} />
        <div className={`absolute top-0 left-0 w-[2px] h-8 bg-gradient-to-b ${tc.cornerClass} to-transparent`} />
      </div>
      <div className="absolute top-4 right-4 w-16 h-16">
        <div className={`absolute top-0 right-0 w-8 h-[2px] bg-gradient-to-l ${tc.cornerClass} to-transparent`} />
        <div className={`absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b ${tc.cornerClass} to-transparent`} />
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16">
        <div className={`absolute bottom-0 left-0 w-8 h-[2px] bg-gradient-to-r ${tc.cornerClass} to-transparent`} />
        <div className={`absolute bottom-0 left-0 w-[2px] h-8 bg-gradient-to-t ${tc.cornerClass} to-transparent`} />
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16">
        <div className={`absolute bottom-0 right-0 w-8 h-[2px] bg-gradient-to-l ${tc.cornerClass} to-transparent`} />
        <div className={`absolute bottom-0 right-0 w-[2px] h-8 bg-gradient-to-t ${tc.cornerClass} to-transparent`} />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* ===== GAMEPAD ANIMATION ===== */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: "140px",
              height: "140px",
              margin: "-20px",
              background: tc.glowBg,
              animation: "loadingGlow 2s ease-in-out infinite",
            }}
          />
          {/* Spinning hex ring */}
          <div
            className="absolute"
            style={{
              width: "120px",
              height: "120px",
              margin: "-10px",
              animation: "hexSpin 8s linear infinite",
            }}
          >
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <polygon
                points="60,5 107,28 107,72 60,95 13,72 13,28"
                fill="none"
                stroke={tc.hexStroke}
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
            </svg>
          </div>
          {/* Inner spinning ring (opposite direction) */}
          <div
            className="absolute"
            style={{
              width: "110px",
              height: "110px",
              margin: "-5px",
              animation: "hexSpin 6s linear infinite reverse",
            }}
          >
            <svg viewBox="0 0 110 110" className="w-full h-full">
              <polygon
                points="55,8 97,27 97,73 55,92 13,73 13,27"
                fill="none"
                stroke={tc.hexStroke2}
                strokeWidth="1"
                strokeDasharray="5 8"
              />
            </svg>
          </div>
          {/* Logo or Gamepad icon */}
          <div
            className="relative w-[100px] h-[100px] rounded-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: tc.logoBg,
              border: tc.logoBorder,
              boxShadow: tc.logoShadow,
            }}
          >
            {logoUrl && logoUrl !== "/logo.svg" ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="w-16 h-16 object-cover rounded-lg"
                style={{ animation: "logoBreathe 2.5s ease-in-out infinite" }}
              />
            ) : (
              <svg
                viewBox="0 0 64 64"
                className="w-14 h-14"
                style={{
                  animation: "logoBreathe 2.5s ease-in-out infinite",
                  filter: tc.dropShadow,
                }}
              >
                {/* Gamepad body */}
                <rect x="8" y="18" width="48" height="28" rx="8" fill="none" stroke={tc.accent} strokeWidth="2" opacity="0.9" />
                {/* D-pad */}
                <rect x="16" y="27" width="10" height="3" rx="1" fill={tc.accent} opacity="0.7" />
                <rect x="19.5" y="23.5" width="3" height="10" rx="1" fill={tc.accent} opacity="0.7" />
                {/* Buttons */}
                <circle cx="42" cy="27" r="2.5" fill={tc.gradient} opacity="0.8" />
                <circle cx="48" cy="31" r="2.5" fill={tc.gradient} opacity="0.8" />
                <circle cx="36" cy="31" r="2.5" fill={tc.gradient} opacity="0.8" />
                <circle cx="42" cy="35" r="2.5" fill={tc.gradient} opacity="0.8" />
                {/* Center select */}
                <rect x="28" y="30" width="8" height="3" rx="1.5" fill={tc.accent} opacity="0.5" />
                {/* Grip lines */}
                <line x1="10" y1="40" x2="16" y2="44" stroke={tc.accent} strokeWidth="1.5" opacity="0.3" />
                <line x1="54" y1="40" x2="48" y2="44" stroke={tc.accent} strokeWidth="1.5" opacity="0.3" />
              </svg>
            )}
          </div>
        </div>

        {/* ===== SITE NAME WITH GLITCH EFFECT ===== */}
        <div className="text-center">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{
              color: "#ffffff",
              textShadow: tc.textShadow,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            <span
              style={{
                animation: "glitchFlicker 4s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              {glitchText || siteName}
            </span>
          </h1>
          {/* Subtitle */}
          <p
            className="text-xs sm:text-sm mt-2 tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Game Account Marketplace
          </p>
        </div>

        {/* ===== PROGRESS BAR — Game HP/XP bar style ===== */}
        <div className="w-64 sm:w-80">
          {/* Bar container */}
          <div
            className="relative h-3 rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid rgba(${tc.accentRgb},0.15)`,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {/* Animated background scan line */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(${tc.accentRgb},0.05) 50%, transparent 100%)`,
                animation: "barScan 2s linear infinite",
              }}
            />
            {/* Fill bar */}
            <div
              className="h-full rounded-full relative overflow-hidden transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: progress >= 100 ? "linear-gradient(90deg, #22c55e, #4ade80)" : tc.barFill,
                boxShadow: progress >= 100 ? "0 0 12px rgba(34,197,94,0.5)" : tc.barGlow,
              }}
            >
              {/* Animated shine across the bar */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  animation: "barShine 1.5s ease-in-out infinite",
                }}
              />
              {/* Pixel segments overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
                }}
              />
            </div>
          </div>

          {/* Status text + percentage */}
          <div className="flex items-center justify-between mt-2">
            <span
              className="text-[10px] sm:text-xs tracking-wider font-mono"
              style={{
                color: phase === "ready" ? "#22c55e" : `rgba(${tc.accentRgb},0.6)`,
                textShadow: phase === "ready" ? "0 0 8px rgba(34,197,94,0.4)" : "none",
              }}
            >
              {statusTexts[phase]}
            </span>
            <span
              className="text-[10px] sm:text-xs font-mono font-bold"
              style={{ color: progress >= 100 ? "#22c55e" : "rgba(255,255,255,0.4)" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* ===== TIPS SECTION ===== */}
        <div
          className="text-center max-w-xs"
          style={{ opacity: phase === "ready" ? 0 : 0.4, transition: "opacity 0.5s" }}
        >
          <p className="text-[10px] sm:text-xs text-white/30 font-mono">
            💡 TIP: Gunakan filter untuk mencari akun impianmu
          </p>
        </div>
      </div>

      {/* ===== ALL KEYFRAME ANIMATIONS ===== */}
      <style>{`
        @keyframes circuitFlow {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circuitFlowV {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circuitPulse {
          0%, 100% { opacity: 0.15; r: 2; }
          50% { opacity: 0.5; r: 4; }
        }
        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(20px) rotate(0deg); }
          15% { opacity: 0.35; }
          85% { opacity: 0.35; }
          100% { opacity: 0; transform: translateY(-30px) rotate(20deg); }
        }
        @keyframes loadingGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes hexSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: ${tc.logoShadow}; }
          50% { box-shadow: ${tc.logoPulseShadow}; }
        }
        @keyframes logoBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes glitchFlicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.8; transform: translateX(-2px); }
          97% { opacity: 1; transform: translateX(1px); }
          98% { opacity: 0.7; transform: translateX(-1px); }
          99% { opacity: 1; transform: translateX(0); }
        }
        @keyframes barScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes barShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
