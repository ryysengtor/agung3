'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// ─── Admin Theme Types ──────────────────────────────────────────
export type AdminTheme = 'red' | 'blue';

interface AdminThemeConfig {
  name: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentDark: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  bgSidebar: string;
  bgSidebarFrom: string;
  bgSidebarVia: string;
  bgSidebarTo: string;
  borderAccent: string;
  shadowAccent: string;
  glowAccent: string;
  weatherEffect: 'snow' | 'rain' | 'ocean' | 'none';
}

export const ADMIN_THEMES: Record<AdminTheme, AdminThemeConfig> = {
  red: {
    name: 'Crimson Blaze',
    accent: '#ef4444',
    accentHover: '#dc2626',
    accentLight: '#f87171',
    accentDark: '#7f1d1d',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    gradientFrom: '#ef4444',
    gradientTo: '#f97316',
    bgSidebar: 'from-[#1a0505] via-[#2d0a0a] to-[#1a0505]',
    bgSidebarFrom: '#1a0505',
    bgSidebarVia: '#2d0a0a',
    bgSidebarTo: '#1a0505',
    borderAccent: '#ef4444',
    shadowAccent: '#ef4444',
    glowAccent: 'rgba(239,68,68,0.3)',
    weatherEffect: 'ocean',
  },
  blue: {
    name: 'Arctic Frost',
    accent: '#3b82f6',
    accentHover: '#1d4ed8',
    accentLight: '#60a5fa',
    accentDark: '#1e3a5f',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    bgSidebar: 'from-[#020617] via-[#0f172a] to-[#020617]',
    bgSidebarFrom: '#020617',
    bgSidebarVia: '#0f172a',
    bgSidebarTo: '#020617',
    borderAccent: '#3b82f6',
    shadowAccent: '#3b82f6',
    glowAccent: 'rgba(59,130,246,0.3)',
    weatherEffect: 'snow',
  },
};

interface AdminThemeContextType {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  config: AdminThemeConfig;
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  theme: 'blue',
  setTheme: () => {},
  config: ADMIN_THEMES.blue,
});

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

// ─── Arctic Night Effect Component (Blue Theme — Lightweight for admin performance) ──
function ArcticNightEffect() {
  const snowData = React.useMemo(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 5 + 3,
      opacity: Math.random() * 0.4 + 0.15,
      drift: (Math.random() - 0.5) * 80,
    })), []);

  return (
    <div className="admin-arctic-container pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ willChange: 'transform', transform: 'translate3d(0,0,0)', contain: 'layout' }} aria-hidden="true">
      {/* Deep arctic night sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #010412 0%, #040818 12%, #061028 25%, #081430 40%, #061028 55%, #040818 70%, #020612 85%, #010412 100%)',
      }} />

      {/* Subtle atmospheric blue nebula glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '20%', width: '40%', height: '30%',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* Aurora Borealis — simplified for admin performance */}
      <div style={{
        position: 'absolute', top: '2%', left: '5%', width: '90%', height: '40%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.03) 20%, rgba(34,211,238,0.05) 40%, rgba(59,130,246,0.04) 60%, rgba(139,92,246,0.02) 80%, transparent 100%)',
        filter: 'blur(30px)',
        animation: 'adminAroraCurtain 12s ease-in-out infinite',
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute', top: '4%', left: '10%', width: '80%', height: '35%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.04) 25%, rgba(59,130,246,0.06) 50%, rgba(16,185,129,0.03) 75%, transparent 100%)',
        filter: 'blur(25px)',
        animation: 'adminAroraCurtain 15s ease-in-out infinite 3s',
        opacity: 0.6,
      }} />

      {/* Moon with ice-blue glow */}
      <div className="absolute" style={{ top: '6%', right: '14%', width: '90px', height: '90px' }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px', width: '210px', height: '210px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.12) 0%, rgba(147,197,253,0.04) 35%, transparent 65%)',
          animation: 'adminArcticMoonGlow 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '-30px', left: '-30px', width: '150px', height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.18) 0%, rgba(147,197,253,0.06) 45%, transparent 70%)',
          animation: 'adminArcticMoonGlow 6s ease-in-out infinite 1s',
        }} />
        <div style={{
          position: 'absolute', top: '-12px', left: '-12px', width: '114px', height: '114px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,219,254,0.25) 0%, rgba(147,197,253,0.08) 50%, transparent 70%)',
        }} />
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f0f9ff, #dbeafe 25%, #93c5fd 55%, #60a5fa 85%)',
          boxShadow: '0 0 60px 25px rgba(147,197,253,0.35), 0 0 120px 50px rgba(59,130,246,0.15), 0 0 200px 100px rgba(59,130,246,0.06)',
          animation: 'adminArcticMoonPulse 8s ease-in-out infinite',
        }} />
        <div style={{ position: 'absolute', top: '22px', left: '28px', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(96,165,250,0.3)' }} />
        <div style={{ position: 'absolute', top: '40px', left: '45px', width: '16px', height: '12px', borderRadius: '50%', background: 'rgba(96,165,250,0.2)' }} />
        <div style={{ position: 'absolute', top: '18px', left: '52px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(96,165,250,0.25)' }} />
      </div>

      {/* Stars with blue tints */}
      {Array.from({ length: 12 }).map((_, i) => {
        const size = Math.random() * 2.5 + 0.8;
        return (
          <div key={`star-${i}`} style={{
            position: 'absolute',
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`, height: `${size}px`,
            borderRadius: '50%',
            background: i % 4 === 0 ? '#bfdbfe' : i % 4 === 1 ? '#a5f3fc' : 'white',
            opacity: Math.random() * 0.6 + 0.2,
            animation: `adminArcticStarTwinkle ${Math.random() * 4 + 2}s ${Math.random() * 5}s ease-in-out infinite`,
          }} />
        );
      })}

      {/* Shooting Stars — blue-cyan tinted */}
      {Array.from({ length: 2 }).map((_, i) => {
        const startX = 15 + Math.random() * 60;
        const startY = 3 + Math.random() * 30;
        const angle = 25 + Math.random() * 30;
        const travelDist = 200 + Math.random() * 300;
        const delay = i * 4 + Math.random() * 3;
        return (
          <div key={`shooting-star-${i}`} style={{
            position: 'absolute',
            top: `${startY}%`,
            left: `${startX}%`,
            width: '3px', height: '3px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 6px 2px rgba(147,197,253,0.8), 0 0 12px 4px rgba(59,130,246,0.5)',
            opacity: 0,
            animation: `adminArcticShootingStar ${1.2 + Math.random() * 0.8}s ${delay}s ease-out infinite`,
            '--shoot-angle': `${angle}deg`,
            '--shoot-dist': `${travelDist}px`,
          } as React.CSSProperties} >
            <div style={{
              position: 'absolute',
              top: '0', right: '100%',
              width: '80px', height: '2px',
              background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(147,197,253,0.4), transparent)',
              borderRadius: '2px',
              transformOrigin: 'right center',
              transform: `rotate(${angle - 180}deg)`,
            }} />
          </div>
        );
      })}

      {/* Moon reflection on frozen lake */}
      <div style={{
        position: 'absolute', top: '46%', right: '10%', width: '140px', height: '54%',
        background: 'linear-gradient(180deg, rgba(147,197,253,0.22), rgba(59,130,246,0.1) 25%, rgba(59,130,246,0.04) 50%, transparent 80%)',
        filter: 'blur(25px)',
        animation: 'adminArcticReflection 6s ease-in-out infinite',
        borderRadius: '40% 40% 0 0',
      }} />

      {/* Animated SVG ice/frozen lake layers — 3 layers for admin performance */}
      <svg className="absolute" style={{ top: '44%', left: 0, width: '200%', height: '56%', animation: 'adminArcticIceDrift1 18s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 C1680,120 1920,280 2160,200 C2400,120 2640,280 2880,200 L2880,800 L0,800 Z"
          fill="rgba(8,24,58,0.65)" />
      </svg>
      {/* Ice layer 2 removed for performance optimization */}
      <svg className="absolute" style={{ top: '54%', left: 0, width: '200%', height: '46%', animation: 'adminArcticIceDrift3 9s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,300 C280,180 560,380 840,280 C1120,180 1400,380 1680,280 C1960,180 2240,380 2520,280 C2800,180 2880,300 2880,300 L2880,800 L0,800 Z"
          fill="rgba(15,38,85,0.65)" />
      </svg>

      {/* Deep frozen lake fill */}
      <div style={{
        position: 'absolute', top: '56%', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(8,24,58,0.8) 0%, rgba(4,16,42,0.9) 20%, rgba(2,10,28,0.95) 50%, #010412 100%)',
      }} />

      {/* Ice surface shimmer lines */}
      <div style={{
        position: 'absolute', top: '45.5%', left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.2) 15%, rgba(147,197,253,0.45) 50%, rgba(147,197,253,0.2) 85%, transparent 100%)',
        animation: 'adminArcticShimmer 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '47%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(147,197,253,0.15) 25%, rgba(147,197,253,0.3) 50%, rgba(147,197,253,0.15) 75%, transparent 95%)',
        animation: 'adminArcticShimmer 4s ease-in-out infinite 1s',
      }} />

      {/* Sparkles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`sparkle-${i}`} style={{
          position: 'absolute',
          top: `${48 + Math.random() * 22}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 5 + 2}px`,
          height: '1.5px',
          background: `rgba(147,197,253,${Math.random() * 0.5 + 0.3})`,
          borderRadius: '50%',
          animation: `adminArcticSparkle ${Math.random() * 4 + 2}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* Blue-tinted frost highlights */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={`frost-${i}`} style={{
          position: 'absolute',
          top: `${46 + Math.random() * 5}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 30 + 10}px`,
          height: '1px',
          background: `rgba(59,130,246,${Math.random() * 0.15 + 0.05})`,
          borderRadius: '50%',
          animation: `adminArcticSparkle ${Math.random() * 6 + 3}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* Left pine tree silhouette */}
      <svg className="absolute" style={{ bottom: '15%', left: '-3%', width: '220px', height: '400px', animation: 'adminPineSwayLeft 8s ease-in-out infinite', transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M95,480 L92,340 L98,340 Z" fill="#040818" />
        <path d="M95,340 L50,380 L65,370 L35,410 L55,398 L20,440 L80,430 L80,480 L110,480 L110,430 L170,440 L135,398 L155,410 L125,370 L140,380 Z" fill="#040c20" />
        <path d="M55,370 Q65,365 75,370 Q65,368 55,370" fill="rgba(147,197,253,0.12)" />
        <path d="M25,432 Q50,425 75,432 Q50,428 25,432" fill="rgba(147,197,253,0.08)" />
        <path d="M125,432 Q150,425 175,432 Q150,428 125,432" fill="rgba(147,197,253,0.08)" />
        <path d="M95,260 L70,310 L80,300 L60,340 L75,330 L55,370 L95,355 L95,340 Z" fill="#040c20" />
        <path d="M95,260 L120,310 L110,300 L130,340 L115,330 L135,370 L95,355 L95,340 Z" fill="#050d22" />
        <path d="M95,260 Q88,258 82,262 Q88,260 95,260 Q102,258 108,262 Q102,260 95,260" fill="rgba(147,197,253,0.15)" />
      </svg>

      {/* Right pine tree silhouette */}
      <svg className="absolute" style={{ bottom: '15%', right: '-3%', width: '220px', height: '400px', animation: 'adminPineSwayRight 9s ease-in-out infinite', transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M105,480 L108,340 L102,340 Z" fill="#040818" />
        <path d="M105,340 L60,380 L75,370 L45,410 L65,398 L30,440 L90,430 L90,480 L120,480 L120,430 L180,440 L145,398 L165,410 L135,370 L150,380 Z" fill="#040c20" />
        <path d="M65,370 Q75,365 85,370 Q75,368 65,370" fill="rgba(147,197,253,0.12)" />
        <path d="M35,432 Q60,425 85,432 Q60,428 35,432" fill="rgba(147,197,253,0.08)" />
        <path d="M125,432 Q150,425 175,432 Q150,428 125,432" fill="rgba(147,197,253,0.08)" />
        <path d="M105,260 L80,310 L90,300 L70,340 L85,330 L65,370 L105,355 L105,340 Z" fill="#050d22" />
        <path d="M105,260 L130,310 L120,300 L140,340 L125,330 L145,370 L105,355 L105,340 Z" fill="#040c20" />
        <path d="M105,260 Q98,258 92,262 Q98,260 105,260 Q112,258 118,262 Q112,260 105,260" fill="rgba(147,197,253,0.15)" />
      </svg>

      {/* Snow-covered ground silhouette */}
      <svg className="absolute" style={{ bottom: 0, left: 0, width: '100%', height: '100px' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,100 L0,70 C30,50 60,65 90,55 C120,45 150,60 180,50 C210,40 240,58 270,48 C300,38 330,55 360,45 C390,35 420,52 450,42 C480,32 510,50 540,40 C570,30 600,48 630,38 C660,28 690,45 720,35 C750,25 780,42 810,32 C840,22 870,40 900,30 C930,20 960,38 990,28 C1020,18 1050,35 1080,25 C1110,15 1140,32 1170,22 C1200,12 1230,30 1260,20 C1290,10 1320,28 1350,18 C1380,10 1410,22 1440,15 L1440,100 Z"
          fill="#020510" />
        <path d="M0,70 C30,50 60,65 90,55 C120,45 150,60 180,50 C210,40 240,58 270,48 C300,38 330,55 360,45 C390,35 420,52 450,42 C480,32 510,50 540,40 C570,30 600,48 630,38 C660,28 690,45 720,35 C750,25 780,42 810,32 C840,22 870,40 900,30 C930,20 960,38 990,28 C1020,18 1050,35 1080,25 C1110,15 1140,32 1170,22 C1200,12 1230,30 1260,20 C1290,10 1320,28 1350,18 C1380,10 1410,22 1440,15"
          fill="none" stroke="rgba(147,197,253,0.06)" strokeWidth="1" />
      </svg>

      {/* Snowfall */}
      {snowData.map((s, i) => (
        <div
          key={`snow-${i}`}
          className="admin-snowflake"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            '--snow-drift': `${s.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      <style>{`
        @keyframes adminAroraCurtain {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.7; }
          25% { transform: translateX(3%) scaleY(1.1); opacity: 0.5; }
          50% { transform: translateX(-2%) scaleY(0.9); opacity: 0.8; }
          75% { transform: translateX(1%) scaleY(1.05); opacity: 0.6; }
        }
        @keyframes adminArcticMoonGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes adminArcticMoonPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes adminArcticStarTwinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes adminArcticShootingStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(var(--shoot-angle, 30deg)); }
          5% { opacity: 1; }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--shoot-dist, 300px), 0) rotate(var(--shoot-angle, 30deg)); }
        }
        @keyframes adminArcticReflection {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          25% { opacity: 0.4; transform: scaleX(1.2); }
          50% { opacity: 0.9; transform: scaleX(0.8); }
          75% { opacity: 0.5; transform: scaleX(1.1); }
        }
        @keyframes adminArcticShimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes adminArcticSparkle {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          25% { opacity: 0.9; transform: scaleX(1.8); }
          50% { opacity: 0.2; transform: scaleX(0.6); }
          75% { opacity: 0.7; transform: scaleX(1.4); }
        }
        @keyframes adminArcticIceDrift1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes adminArcticIceDrift2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes adminArcticIceDrift3 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }
        @keyframes adminPineSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1.5deg); }
          50% { transform: rotate(0.3deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes adminPineSwayRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1.5deg); }
          50% { transform: rotate(-0.3deg); }
          75% { transform: rotate(1deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Night Ocean Effect Component (Red Theme — Lightweight for admin performance) ──
function NightOceanEffect() {
  return (
    <div className="admin-ocean-container pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ willChange: 'transform', transform: 'translate3d(0,0,0)', contain: 'layout' }} aria-hidden="true">
      {/* Night sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #080205 0%, #150408 12%, #1c0810 25%, #1a0608 40%, #150408 55%, #100306 70%, #0a0204 85%, #080205 100%)',
      }} />

      {/* Moon with prominent glow */}
      <div className="absolute" style={{ top: '6%', right: '14%', width: '90px', height: '90px' }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px', width: '210px', height: '210px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.12) 0%, rgba(253,203,110,0.05) 35%, transparent 65%)',
          animation: 'adminOceanMoonGlow 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '-30px', left: '-30px', width: '150px', height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.18) 0%, rgba(253,203,110,0.06) 45%, transparent 70%)',
          animation: 'adminOceanMoonGlow 6s ease-in-out infinite 1s',
        }} />
        <div style={{
          position: 'absolute', top: '-12px', left: '-12px', width: '114px', height: '114px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.25) 0%, rgba(253,203,110,0.08) 50%, transparent 70%)',
        }} />
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fff8e1, #ffeaa7 25%, #fdcb6e 55%, #e8a830 85%)',
          boxShadow: '0 0 60px 25px rgba(253,203,110,0.35), 0 0 120px 50px rgba(253,203,110,0.15), 0 0 200px 100px rgba(253,203,110,0.06)',
          animation: 'adminOceanMoonPulse 8s ease-in-out infinite',
        }} />
        <div style={{ position: 'absolute', top: '22px', left: '28px', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(200,170,80,0.3)' }} />
        <div style={{ position: 'absolute', top: '40px', left: '45px', width: '16px', height: '12px', borderRadius: '50%', background: 'rgba(200,170,80,0.2)' }} />
        <div style={{ position: 'absolute', top: '18px', left: '52px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(200,170,80,0.25)' }} />
        <div style={{ position: 'absolute', top: '50px', left: '32px', width: '10px', height: '9px', borderRadius: '50%', background: 'rgba(200,170,80,0.18)' }} />
      </div>

      {/* Stars */}
      {Array.from({ length: 12 }).map((_, i) => {
        const size = Math.random() * 2.5 + 0.8;
        return (
          <div key={`star-${i}`} style={{
            position: 'absolute',
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`, height: `${size}px`,
            borderRadius: '50%',
            background: i % 4 === 0 ? '#ffeaa7' : i % 4 === 1 ? '#ffd6a0' : 'white',
            opacity: Math.random() * 0.6 + 0.2,
            animation: `adminOceanStarTwinkle ${Math.random() * 4 + 2}s ${Math.random() * 5}s ease-in-out infinite`,
          }} />
        );
      })}

      {/* ★ SHOOTING STARS ★ */}
      {Array.from({ length: 2 }).map((_, i) => {
        const startX = 15 + Math.random() * 60;
        const startY = 3 + Math.random() * 30;
        const angle = 25 + Math.random() * 30;
        const travelDist = 200 + Math.random() * 300;
        const delay = i * 4 + Math.random() * 3;
        return (
          <div key={`shooting-star-${i}`} style={{
            position: 'absolute',
            top: `${startY}%`,
            left: `${startX}%`,
            width: '3px', height: '3px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.8), 0 0 12px 4px rgba(255,234,167,0.5)',
            opacity: 0,
            animation: `adminShootingStar ${1.2 + Math.random() * 0.8}s ${delay}s ease-out infinite`,
            '--shoot-angle': `${angle}deg`,
            '--shoot-dist': `${travelDist}px`,
          } as React.CSSProperties} >
            <div style={{
              position: 'absolute',
              top: '0', right: '100%',
              width: '80px', height: '2px',
              background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,234,167,0.4), transparent)',
              borderRadius: '2px',
              transformOrigin: 'right center',
              transform: `rotate(${angle - 180}deg)`,
            }} />
          </div>
        );
      })}

      {/* Moon reflection */}
      <div style={{
        position: 'absolute', top: '46%', right: '10%', width: '140px', height: '54%',
        background: 'linear-gradient(180deg, rgba(253,203,110,0.25), rgba(253,203,110,0.1) 25%, rgba(253,203,110,0.04) 50%, transparent 80%)',
        filter: 'blur(25px)',
        animation: 'adminOceanReflection 6s ease-in-out infinite',
        borderRadius: '40% 40% 0 0',
      }} />

      {/* Animated SVG ocean waves — 3 layers for performance */}
      <svg className="absolute" style={{ top: '44%', left: 0, width: '200%', height: '56%', animation: 'adminOceanWaveDrift1 18s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 C1680,120 1920,280 2160,200 C2400,120 2640,280 2880,200 L2880,800 L0,800 Z"
          fill="rgba(60,18,28,0.55)" />
      </svg>
      {/* Wave layer 2 removed for performance optimization */}
      <svg className="absolute" style={{ top: '54%', left: 0, width: '200%', height: '46%', animation: 'adminOceanWaveDrift3 9s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,300 C280,180 560,380 840,280 C1120,180 1400,380 1680,280 C1960,180 2240,380 2520,280 C2800,180 2880,300 2880,300 L2880,800 L0,800 Z"
          fill="rgba(100,28,40,0.55)" />
      </svg>

      {/* Deeper ocean fill */}
      <div style={{
        position: 'absolute', top: '56%', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(55,16,24,0.75) 0%, rgba(70,20,30,0.85) 20%, rgba(45,12,20,0.92) 50%, rgba(25,6,12,0.97) 80%, #0a0204 100%)',
      }} />

      {/* Water surface shimmer lines */}
      <div style={{
        position: 'absolute', top: '45.5%', left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(253,203,110,0.2) 15%, rgba(253,203,110,0.45) 50%, rgba(253,203,110,0.2) 85%, transparent 100%)',
        animation: 'adminOceanShimmer 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '47%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(253,203,110,0.15) 25%, rgba(253,203,110,0.3) 50%, rgba(253,203,110,0.15) 75%, transparent 95%)',
        animation: 'adminOceanShimmer 4s ease-in-out infinite 1s',
      }} />

      {/* Sparkles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`sparkle-${i}`} style={{
          position: 'absolute',
          top: `${48 + Math.random() * 22}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 5 + 2}px`,
          height: '1.5px',
          background: `rgba(253,203,110,${Math.random() * 0.5 + 0.3})`,
          borderRadius: '50%',
          animation: `adminOceanSparkle ${Math.random() * 4 + 2}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* Red-tinted water foam highlights */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={`foam-${i}`} style={{
          position: 'absolute',
          top: `${46 + Math.random() * 5}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 30 + 10}px`,
          height: '1px',
          background: `rgba(239,68,68,${Math.random() * 0.15 + 0.05})`,
          borderRadius: '50%',
          animation: `adminOceanSparkle ${Math.random() * 6 + 3}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* Left palm tree silhouette — BIGGER SWAY */}
      <svg className="absolute" style={{ bottom: '15%', left: '-3%', width: '260px', height: '480px', animation: 'adminPalmSwayLeft 6s ease-in-out infinite', transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M95,480 C93,420 88,360 82,300 C76,240 72,180 70,130 C68,90 67,60 68,35" fill="none" stroke="#0a0204" strokeWidth="16" strokeLinecap="round" />
        <path d="M95,480 C93,420 88,360 82,300 C76,240 72,180 70,130 C68,90 67,60 68,35" fill="none" stroke="#1a0810" strokeWidth="11" strokeLinecap="round" />
        <g fill="#0a0204">
          <path d="M68,40 C50,25 20,15 -15,25 C18,30 45,45 68,50" />
          <path d="M68,40 C55,15 30,-5 -10,-15 C22,0 48,20 68,45" />
          <path d="M68,37 C80,10 110,-10 155,-20 C115,0 85,20 68,43" />
          <path d="M68,37 C92,15 130,0 175,-5 C135,10 98,25 68,47" />
          <path d="M68,43 C42,35 10,40 -20,55 C10,50 38,50 68,53" />
          <path d="M68,43 C98,33 135,30 175,40 C138,40 100,45 68,53" />
          <path d="M68,45 C35,50 5,65 -25,85 C5,70 33,57 68,53" />
          <path d="M68,45 C105,50 140,60 175,80 C140,63 103,55 68,53" />
          <path d="M68,48 C30,58 -5,78 -30,105 C-2,85 28,65 68,55" />
        </g>
        <circle cx="65" cy="47" r="6" fill="#0a0204" />
        <circle cx="76" cy="50" r="5" fill="#0a0204" />
        <circle cx="70" cy="43" r="5" fill="#0a0204" />
      </svg>

      {/* Right palm tree silhouette */}
      <svg className="absolute" style={{ bottom: '15%', right: '-3%', width: '260px', height: '480px', animation: 'adminPalmSwayRight 7s ease-in-out infinite', transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M105,480 C107,420 112,360 118,300 C124,240 128,180 130,130 C132,90 133,60 132,35" fill="none" stroke="#0a0204" strokeWidth="16" strokeLinecap="round" />
        <path d="M105,480 C107,420 112,360 118,300 C124,240 128,180 130,130 C132,90 133,60 132,35" fill="none" stroke="#1a0810" strokeWidth="11" strokeLinecap="round" />
        <g fill="#0a0204">
          <path d="M132,40 C150,25 180,15 215,25 C182,30 155,45 132,50" />
          <path d="M132,40 C145,15 170,-5 210,-15 C178,0 152,20 132,45" />
          <path d="M132,37 C120,10 90,-10 45,-20 C85,0 115,20 132,43" />
          <path d="M132,37 C108,15 70,0 25,-5 C65,10 102,25 132,47" />
          <path d="M132,43 C158,35 190,40 220,55 C190,50 162,50 132,53" />
          <path d="M132,43 C102,33 65,30 25,40 C62,40 100,45 132,53" />
          <path d="M132,45 C165,50 195,65 225,85 C195,70 167,57 132,53" />
          <path d="M132,45 C95,50 60,60 25,80 C60,63 97,55 132,53" />
          <path d="M132,48 C170,58 205,78 230,105 C202,85 172,65 132,55" />
        </g>
        <circle cx="135" cy="47" r="6" fill="#0a0204" />
        <circle cx="124" cy="50" r="5" fill="#0a0204" />
        <circle cx="130" cy="43" r="5" fill="#0a0204" />
      </svg>

      {/* Grass/bushes silhouette */}
      <svg className="absolute" style={{ bottom: 0, left: 0, width: '100%', height: '100px' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,100 L0,70 C30,50 60,65 90,55 C120,45 150,60 180,50 C210,40 240,58 270,48 C300,38 330,55 360,45 C390,35 420,52 450,42 C480,32 510,50 540,40 C570,30 600,48 630,38 C660,28 690,45 720,35 C750,25 780,42 810,32 C840,22 870,40 900,30 C930,20 960,38 990,28 C1020,18 1050,35 1080,25 C1110,15 1140,32 1170,22 C1200,12 1230,30 1260,20 C1290,10 1320,28 1350,18 C1380,10 1410,22 1440,15 L1440,100 Z"
          fill="#060204" />
      </svg>

      <style>{`
        @keyframes adminOceanMoonGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes adminOceanMoonPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes adminOceanStarTwinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes adminShootingStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(var(--shoot-angle, 30deg)); }
          5% { opacity: 1; }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--shoot-dist, 300px), 0) rotate(var(--shoot-angle, 30deg)); }
        }
        @keyframes adminOceanReflection {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          25% { opacity: 0.4; transform: scaleX(1.2); }
          50% { opacity: 0.9; transform: scaleX(0.8); }
          75% { opacity: 0.5; transform: scaleX(1.1); }
        }
        @keyframes adminOceanShimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes adminOceanSparkle {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          25% { opacity: 0.9; transform: scaleX(1.8); }
          50% { opacity: 0.2; transform: scaleX(0.6); }
          75% { opacity: 0.7; transform: scaleX(1.4); }
        }
        @keyframes adminOceanWaveDrift1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes adminOceanWaveDrift2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes adminOceanWaveDrift3 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }
        @keyframes adminPalmSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(4deg); }
          50% { transform: rotate(0.5deg); }
          75% { transform: rotate(-2.5deg); }
        }
        @keyframes adminPalmSwayRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-4deg); }
          50% { transform: rotate(-0.5deg); }
          75% { transform: rotate(2.5deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Admin Layout Provider ──────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_theme') as AdminTheme | null;
      if (saved && ADMIN_THEMES[saved]) return saved;
    }
    return 'blue';
  });
  const [mounted, setMounted] = useState(false);

  // Use ref + subscription pattern to satisfy lint rules for mount detection
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    // Trigger re-render after mount using subscription-based approach
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const setTheme = (newTheme: AdminTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('admin_theme', newTheme);
  };

  // Sync admin theme with site settings from DB
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.siteTheme) {
          const siteTheme = data.data.siteTheme as AdminTheme;
          if (ADMIN_THEMES[siteTheme]) {
            setThemeState(siteTheme);
            localStorage.setItem('admin_theme', siteTheme);
          }
        }
      })
      .catch(() => {});
  }, []);

  const config = ADMIN_THEMES[theme];

  // Apply CSS custom properties for admin theme
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty('--admin-accent', config.accent);
    root.style.setProperty('--admin-accent-hover', config.accentHover);
    root.style.setProperty('--admin-accent-light', config.accentLight);
    root.style.setProperty('--admin-accent-dark', config.accentDark);
    root.style.setProperty('--admin-gradient-from', config.gradientFrom);
    root.style.setProperty('--admin-gradient-to', config.gradientTo);
    root.style.setProperty('--admin-border', config.borderAccent);
    root.style.setProperty('--admin-shadow', config.shadowAccent);
    root.style.setProperty('--admin-glow', config.glowAccent);
    root.style.setProperty('--admin-sidebar-from', config.bgSidebarFrom);
    root.style.setProperty('--admin-sidebar-via', config.bgSidebarVia);
    root.style.setProperty('--admin-sidebar-to', config.bgSidebarTo);

    // Set data attribute for CSS targeting
    root.setAttribute('data-admin-theme', theme);

    return () => {
      root.removeAttribute('data-admin-theme');
    };
  }, [theme, config, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--admin-accent, #3b82f6)', borderTopColor: 'transparent' }} />
        </div>
      </div>
    );
  }

  return (
    <div data-admin-theme={theme}>
      <AdminThemeContext.Provider value={{ theme, setTheme, config }}>
        {config.weatherEffect === 'snow' && <ArcticNightEffect />}
        {(config.weatherEffect === 'rain' || config.weatherEffect === 'ocean') && <NightOceanEffect />}
        {children}
      </AdminThemeContext.Provider>
    </div>
  );
}
