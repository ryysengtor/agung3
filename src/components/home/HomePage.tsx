"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { formatRupiah } from "@/lib/utils";
import PaymentQRIS from "@/components/PaymentQRIS";
import type { ICategory } from "@/types";
import {
  Menu, X, Search, Home, ClipboardList, ShoppingCart, Heart, Eye, Star,
  Trash2, ArrowLeft, ChevronRight, Flame, Zap, Shield, ShieldCheck, Clock, RefreshCw,
  CheckCircle2, User, CreditCard, QrCode, MessageCircle, PartyPopper,
  Copy, BadgeCheck, TreePine, Gamepad2, Lock, Handshake, ArrowRight,
  CircleDot, Key, Banknote, Sparkles, DollarSign,
  SlidersHorizontal, ChevronUp, ChevronDown, Filter,
  HelpCircle, BookOpen,
} from "lucide-react";

// ===== Import from extracted modules =====
import {
  type PageView, type CheckoutStep, type SiteSettings, type TransactionData,
  type TransactionLookup, type BannerData, type LikeData, type ProductItem,
  type CartItem, type ThemeConfig,
  GAME_THEMES, DEFAULT_THEME, HOME_BLUE_THEME, HOME_RED_THEME, getTheme,
  containerVariants, itemVariants, pageVariants,
  getSessionId, getCartItems, saveCartItems,
  WhatsAppIcon, checkoutSteps, confettiColors, confettiColorsRed,
} from "@/components/home/types";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { GameBanner } from "@/components/home/GameBanner";
import { ProductCard } from "@/components/home/ProductCard";
import { FilterModal } from "@/components/home/FilterModal";

// ===== Arctic Night Effect (for blue theme) — Immersive animated frozen night with aurora, moon, frozen lake & snow =====
function HomeArcticNightEffect() {
  // Use useMemo for stable random values — prevents re-randomization on re-renders
  const starData = React.useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      top: Math.random() * 45,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      color: i % 5 === 0 ? '#bfdbfe' : i % 5 === 1 ? '#a5f3fc' : i % 5 === 2 ? '#e0f2fe' : '#ffffff',
      twinkleDuration: Math.random() * 4 + 2,
      twinkleDelay: Math.random() * 6,
      baseOpacity: Math.random() * 0.5 + 0.3,
    })), []);

  const shootingStarData = React.useMemo(() =>
    Array.from({ length: 3 }).map((_, i) => ({
      startX: 10 + Math.random() * 55,
      startY: 2 + Math.random() * 25,
      angle: 20 + Math.random() * 35,
      travelDist: 250 + Math.random() * 350,
      duration: 0.8 + Math.random() * 0.6,
      delay: i * 4 + Math.random() * 2,
      size: 2.5 + Math.random() * 2,
      tailLength: 100 + Math.random() * 80,
    })), []);

  const sparkleData = React.useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      top: 50 + Math.random() * 20,
      left: Math.random() * 100,
      width: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    })), []);

  const snowData = React.useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 5 + 3,
      opacity: Math.random() * 0.4 + 0.15,
      drift: (Math.random() - 0.5) * 80,
    })), []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0, willChange: 'transform', transform: 'translate3d(0,0,0)', contain: 'layout' }} aria-hidden="true">
      {/* Deep arctic night sky gradient — blue/navy/cyan tones */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #010412 0%, #040818 8%, #060e24 16%, #081430 25%, #0a1838 35%, #081430 50%, #060e24 65%, #040818 80%, #010412 100%)',
      }} />

      {/* Subtle atmospheric blue nebula glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '20%', width: '40%', height: '30%',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '10%', width: '35%', height: '25%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.03) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      {/* ★★★ AURORA BOREALIS — Northern Lights (signature blue theme element) ★★★ */}
      {/* Aurora curtain 1 — main green-blue band */}
      <div style={{
        position: 'absolute', top: '2%', left: '5%', width: '90%', height: '45%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.03) 20%, rgba(34,211,238,0.06) 40%, rgba(59,130,246,0.04) 60%, rgba(139,92,246,0.03) 80%, transparent 100%)',
        filter: 'blur(30px)',
        animation: 'aroraCurtain1 12s ease-in-out infinite',
        opacity: 0.8,
      }} />
      {/* Aurora curtain 2 — shifted, different color emphasis */}
      <div style={{
        position: 'absolute', top: '4%', left: '10%', width: '80%', height: '40%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.05) 25%, rgba(59,130,246,0.07) 50%, rgba(16,185,129,0.04) 75%, transparent 100%)',
        filter: 'blur(25px)',
        animation: 'aroraCurtain2 15s ease-in-out infinite',
        opacity: 0.7,
      }} />
      {/* Aurora curtain 3 — subtle purple accent */}
      <div style={{
        position: 'absolute', top: '6%', left: '15%', width: '70%', height: '35%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 30%, rgba(59,130,246,0.06) 60%, rgba(6,182,212,0.03) 80%, transparent 100%)',
        filter: 'blur(35px)',
        animation: 'aroraCurtain3 18s ease-in-out infinite',
        opacity: 0.6,
      }} />
      {/* Aurora vertical rays — simulate light pillars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`aurora-ray-${i}`} style={{
          position: 'absolute',
          top: '3%',
          left: `${10 + i * 10 + (Math.random() - 0.5) * 5}%`,
          width: `${3 + Math.random() * 4}px`,
          height: `${30 + Math.random() * 20}%`,
          background: `linear-gradient(180deg, transparent, rgba(34,211,238,${0.04 + Math.random() * 0.06}), rgba(59,130,246,${0.03 + Math.random() * 0.04}), transparent)`,
          filter: 'blur(4px)',
          animation: `aroraRayPulse ${6 + Math.random() * 4}s ${Math.random() * 5}s ease-in-out infinite`,
          opacity: 0.6,
        }} />
      ))}

      {/* ★★★ MOON — Ice-blue tinted with professional glow ★★★ */}
      <div className="absolute" style={{ top: '5%', right: '12%', width: '100px', height: '100px' }}>
        {/* Outermost glow — large atmospheric haze */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px', width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.12) 0%, rgba(147,197,253,0.04) 30%, transparent 60%)',
          animation: 'arcticMoonGlow 8s ease-in-out infinite',
        }} />
        {/* Middle glow ring */}
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px', width: '180px', height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.18) 0%, rgba(147,197,253,0.06) 40%, transparent 65%)',
          animation: 'arcticMoonGlow 8s ease-in-out infinite 2s',
        }} />
        {/* Inner glow ring */}
        <div style={{
          position: 'absolute', top: '-15px', left: '-15px', width: '130px', height: '130px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,219,254,0.25) 0%, rgba(147,197,253,0.08) 45%, transparent 65%)',
        }} />
        {/* Moon body — ice-blue tinted */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f0f9ff, #dbeafe 20%, #93c5fd 50%, #60a5fa 80%, #3b82f6 95%)',
          boxShadow: '0 0 50px 20px rgba(147,197,253,0.30), 0 0 100px 40px rgba(59,130,246,0.12), 0 0 180px 80px rgba(59,130,246,0.05)',
          animation: 'arcticMoonPulse 10s ease-in-out infinite',
        }} />
        {/* Moon craters — ice detail */}
        <div style={{ position: 'absolute', top: '24px', left: '30px', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(96,165,250,0.25)' }} />
        <div style={{ position: 'absolute', top: '44px', left: '50px', width: '18px', height: '13px', borderRadius: '50%', background: 'rgba(96,165,250,0.18)' }} />
        <div style={{ position: 'absolute', top: '20px', left: '58px', width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(96,165,250,0.22)' }} />
        <div style={{ position: 'absolute', top: '55px', left: '35px', width: '11px', height: '10px', borderRadius: '50%', background: 'rgba(96,165,250,0.15)' }} />
      </div>

      {/* ★★★ TWINKLING STARS — Dense starfield with blue tints ★★★ */}
      {starData.map((star, i) => (
        <div key={`star-${i}`} style={{
          position: 'absolute',
          top: `${star.top}%`,
          left: `${star.left}%`,
          width: `${star.size}px`, height: `${star.size}px`,
          borderRadius: '50%',
          background: star.color,
          opacity: star.baseOpacity,
          animation: `arcticStarTwinkle ${star.twinkleDuration}s ${star.twinkleDelay}s ease-in-out infinite`,
        }} />
      ))}

      {/* ★★★ SHOOTING STARS — Blue-cyan tinted with long tails ★★★ */}
      {shootingStarData.map((ss, i) => (
        <div key={`shooting-star-${i}`} style={{
          position: 'absolute',
          top: `${ss.startY}%`,
          left: `${ss.startX}%`,
          width: `${ss.size}px`, height: `${ss.size}px`,
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: `0 0 8px 3px rgba(147,197,253,0.9), 0 0 16px 6px rgba(59,130,246,0.6), 0 0 30px 10px rgba(6,182,212,0.3)`,
          opacity: 0,
          animation: `arcticShootingStar ${ss.duration}s ${ss.delay}s ease-out infinite`,
          '--shoot-angle': `${ss.angle}deg`,
          '--shoot-dist': `${ss.travelDist}px`,
        } as React.CSSProperties} >
          {/* Long glowing tail */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '100%',
            width: `${ss.tailLength}px`, height: '2.5px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(147,197,253,0.7) 20%, rgba(59,130,246,0.3) 50%, transparent)',
            borderRadius: '2px',
          }} />
          {/* Wider glow behind tail */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '100%',
            width: `${ss.tailLength * 0.7}px`, height: '6px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to left, rgba(147,197,253,0.3), rgba(59,130,246,0.15) 30%, transparent)',
            borderRadius: '3px',
            filter: 'blur(2px)',
          }} />
        </div>
      ))}

      {/* ★★★ MOON REFLECTION on frozen lake — shimmering column ★★★ */}
      <div style={{
        position: 'absolute', top: '50%', right: '8%', width: '160px', height: '50%',
        background: 'linear-gradient(180deg, rgba(147,197,253,0.22) 0%, rgba(59,130,246,0.08) 20%, rgba(59,130,246,0.03) 50%, transparent 80%)',
        filter: 'blur(30px)',
        animation: 'arcticReflectionShimmer 7s ease-in-out infinite',
        borderRadius: '40% 40% 0 0',
      }} />

      {/* ★★★ FROZEN LAKE / ICE SURFACE — Animated ice layers with depth ★★★ */}
      {/* Ice layer 1 — far background, darkest, slowest */}
      <svg className="absolute" style={{ top: '48%', left: 0, width: '200%', height: '52%', animation: 'arcticIceDrift1 20s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,220 C200,140 400,300 600,220 C800,140 1000,300 1200,220 C1400,140 1600,300 1800,220 C2000,140 2200,300 2400,220 C2600,140 2800,300 2880,220 L2880,800 L0,800 Z"
          fill="rgba(8,24,58,0.7)" />
      </svg>
      {/* Ice layer 2 — mid background */}
      <svg className="absolute" style={{ top: '52%', left: 0, width: '200%', height: '48%', animation: 'arcticIceDrift2 15s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,260 C280,160 560,360 840,260 C1120,160 1400,360 1680,260 C1960,160 2240,360 2520,260 C2700,180 2800,300 2880,260 L2880,800 L0,800 Z"
          fill="rgba(12,32,72,0.75)" />
        {/* Ice crack detail */}
        <path d="M0,260 C280,160 560,360 840,260 C1120,160 1400,360 1680,260 C1960,160 2240,360 2520,260 C2700,180 2800,300 2880,260"
          fill="none" stroke="rgba(147,197,253,0.06)" strokeWidth="2" />
      </svg>
      {/* Ice layer 3 — mid foreground, brighter */}
      <svg className="absolute" style={{ top: '56%', left: 0, width: '200%', height: '44%', animation: 'arcticIceDrift3 11s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,280 C240,180 480,380 720,280 C960,180 1200,380 1440,280 C1680,180 1920,380 2160,280 C2400,180 2640,380 2880,280 L2880,800 L0,800 Z"
          fill="rgba(15,38,85,0.7)" />
        {/* Ice crack detail */}
        <path d="M0,280 C240,180 480,380 720,280 C960,180 1200,380 1440,280 C1680,180 1920,380 2160,280 C2400,180 2640,380 2880,280"
          fill="none" stroke="rgba(147,197,253,0.08)" strokeWidth="2" />
      </svg>
      {/* Ice layer 4 removed for performance optimization */}

      {/* Deep frozen lake body fill */}
      <div style={{
        position: 'absolute', top: '58%', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(8,24,58,0.85) 15%, rgba(4,16,42,0.92) 40%, rgba(2,10,28,0.97) 70%, #010412 100%)',
      }} />

      {/* ★★★ ICE SURFACE SHIMMER LINES — Blue moonlight reflections ★★★ */}
      <div style={{
        position: 'absolute', top: '49.5%', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.15) 10%, rgba(147,197,253,0.35) 50%, rgba(147,197,253,0.15) 90%, transparent 100%)',
        animation: 'arcticShimmer 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '51%', left: 0, right: 0, height: '1.5px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(147,197,253,0.10) 20%, rgba(147,197,253,0.25) 50%, rgba(147,197,253,0.10) 80%, transparent 95%)',
        animation: 'arcticShimmer 5s ease-in-out infinite 1.5s',
      }} />
      <div style={{
        position: 'absolute', top: '53%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 10%, rgba(147,197,253,0.08) 30%, rgba(147,197,253,0.18) 50%, rgba(147,197,253,0.08) 70%, transparent 90%)',
        animation: 'arcticShimmer 6s ease-in-out infinite 3s',
      }} />

      {/* ★★★ ICE SPARKLES — Blue glints on frozen surface ★★★ */}
      {sparkleData.map((sp, i) => (
        <div key={`sparkle-${i}`} style={{
          position: 'absolute',
          top: `${sp.top}%`,
          left: `${sp.left}%`,
          width: `${sp.width}px`,
          height: '1.5px',
          background: `rgba(147,197,253,${sp.opacity})`,
          borderRadius: '50%',
          animation: `arcticSparkle ${sp.duration}s ${sp.delay}s ease-in-out infinite`,
        }} />
      ))}

      {/* Blue-tinted ice frost highlights */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={`frost-${i}`} style={{
          position: 'absolute',
          top: `${50 + Math.random() * 5}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 35 + 12}px`,
          height: '1px',
          background: `rgba(59,130,246,${Math.random() * 0.12 + 0.04})`,
          borderRadius: '50%',
          animation: `arcticSparkle ${Math.random() * 6 + 3}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* ★★★ LEFT PINE TREE — Snow-covered silhouette ★★★ */}
      <svg className="absolute" style={{ bottom: '12%', left: '-2%', width: '240px', height: '440px', animation: 'pineSwayLeft 9s ease-in-out infinite', transformOrigin: 'bottom center', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        {/* Tree trunk */}
        <path d="M95,480 L92,340 L98,340 Z" fill="#040818" />
        {/* Tree layers (snow-covered pine) */}
        <path d="M95,340 L50,380 L65,370 L35,410 L55,398 L20,440 L80,430 L80,480 L110,480 L110,430 L170,440 L135,398 L155,410 L125,370 L140,380 Z" fill="#040c20" />
        {/* Snow on branches */}
        <path d="M55,370 Q65,365 75,370 Q65,368 55,370" fill="rgba(147,197,253,0.15)" />
        <path d="M40,400 Q55,394 70,400 Q55,397 40,400" fill="rgba(147,197,253,0.12)" />
        <path d="M25,432 Q50,425 75,432 Q50,428 25,432" fill="rgba(147,197,253,0.10)" />
        <path d="M120,370 Q130,365 140,370 Q130,368 120,370" fill="rgba(147,197,253,0.15)" />
        <path d="M130,400 Q145,394 160,400 Q145,397 130,400" fill="rgba(147,197,253,0.12)" />
        <path d="M125,432 Q150,425 175,432 Q150,428 125,432" fill="rgba(147,197,253,0.10)" />
        {/* Tree top */}
        <path d="M95,260 L70,310 L80,300 L60,340 L75,330 L55,370 L95,355 L95,340 Z" fill="#040c20" />
        <path d="M95,260 L120,310 L110,300 L130,340 L115,330 L135,370 L95,355 L95,340 Z" fill="#050d22" />
        {/* Snow on top */}
        <path d="M95,260 Q88,258 82,262 Q88,260 95,260 Q102,258 108,262 Q102,260 95,260" fill="rgba(147,197,253,0.2)" />
        <path d="M80,300 Q90,295 100,300 Q90,298 80,300" fill="rgba(147,197,253,0.15)" />
        <path d="M110,300 Q100,295 90,300 Q100,298 110,300" fill="rgba(147,197,253,0.15)" />
      </svg>

      {/* ★★★ RIGHT PINE TREE — Snow-covered silhouette (mirrored) ★★★ */}
      <svg className="absolute" style={{ bottom: '12%', right: '-2%', width: '240px', height: '440px', animation: 'pineSwayRight 10s ease-in-out infinite', transformOrigin: 'bottom center', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        {/* Tree trunk */}
        <path d="M105,480 L108,340 L102,340 Z" fill="#040818" />
        {/* Tree layers (snow-covered pine) */}
        <path d="M105,340 L60,380 L75,370 L45,410 L65,398 L30,440 L90,430 L90,480 L120,480 L120,430 L180,440 L145,398 L165,410 L135,370 L150,380 Z" fill="#040c20" />
        {/* Snow on branches */}
        <path d="M65,370 Q75,365 85,370 Q75,368 65,370" fill="rgba(147,197,253,0.15)" />
        <path d="M50,400 Q65,394 80,400 Q65,397 50,400" fill="rgba(147,197,253,0.12)" />
        <path d="M35,432 Q60,425 85,432 Q60,428 35,432" fill="rgba(147,197,253,0.10)" />
        <path d="M120,370 Q130,365 140,370 Q130,368 120,370" fill="rgba(147,197,253,0.15)" />
        <path d="M130,400 Q145,394 160,400 Q145,397 130,400" fill="rgba(147,197,253,0.12)" />
        <path d="M125,432 Q150,425 175,432 Q150,428 125,432" fill="rgba(147,197,253,0.10)" />
        {/* Tree top */}
        <path d="M105,260 L80,310 L90,300 L70,340 L85,330 L65,370 L105,355 L105,340 Z" fill="#050d22" />
        <path d="M105,260 L130,310 L120,300 L140,340 L125,330 L145,370 L105,355 L105,340 Z" fill="#040c20" />
        {/* Snow on top */}
        <path d="M105,260 Q98,258 92,262 Q98,260 105,260 Q112,258 118,262 Q112,260 105,260" fill="rgba(147,197,253,0.2)" />
        <path d="M90,300 Q100,295 110,300 Q100,298 90,300" fill="rgba(147,197,253,0.15)" />
        <path d="M120,300 Q110,295 100,300 Q110,298 120,300" fill="rgba(147,197,253,0.15)" />
      </svg>

      {/* Snow-covered ground/bushes silhouette */}
      <svg className="absolute" style={{ bottom: 0, left: 0, width: '100%', height: '80px' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L0,55 C25,40 50,50 75,42 C100,34 125,48 150,40 C175,32 200,46 225,38 C250,30 275,44 300,36 C325,28 350,42 375,34 C400,26 425,40 450,32 C475,24 500,38 525,30 C550,22 575,36 600,28 C625,20 650,34 675,26 C700,18 725,32 750,24 C775,16 800,30 825,22 C850,14 875,28 900,20 C925,12 950,26 975,18 C1000,10 1025,24 1050,16 C1075,8 1100,22 1125,14 C1150,6 1175,20 1200,12 C1225,4 1250,18 1275,10 C1300,4 1325,16 1350,8 C1375,2 1400,14 1440,8 L1440,80 Z"
          fill="#020510" />
        {/* Snow line on top of ground */}
        <path d="M0,55 C25,40 50,50 75,42 C100,34 125,48 150,40 C175,32 200,46 225,38 C250,30 275,44 300,36 C325,28 350,42 375,34 C400,26 425,40 450,32 C475,24 500,38 525,30 C550,22 575,36 600,28 C625,20 650,34 675,26 C700,18 725,32 750,24 C775,16 800,30 825,22 C850,14 875,28 900,20 C925,12 950,26 975,18 C1000,10 1025,24 1050,16 C1075,8 1100,22 1125,14 C1150,6 1175,20 1200,12 C1225,4 1250,18 1275,10 C1300,4 1325,16 1350,8 C1375,2 1400,14 1440,8"
          fill="none" stroke="rgba(147,197,253,0.08)" strokeWidth="1" />
      </svg>

      {/* ★★★ SNOWFALL — Integrated into the scene ★★★ */}
      {snowData.map((s, i) => (
        <div
          key={`snow-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: '-10px',
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            animation: `homeSnowFall ${s.duration}s ${s.delay}s linear infinite`,
            '--snow-drift': `${s.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      <style>{`
        @keyframes homeSnowFall {
          0% { transform: translateY(-10px) translateX(0) rotate(0deg); opacity: 0; }
          5% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(var(--snow-drift, 30px)) rotate(360deg); opacity: 0; }
        }
        @keyframes arcticMoonGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.65; }
        }
        @keyframes arcticMoonPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.04); filter: brightness(1.15); }
        }
        @keyframes arcticStarTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes arcticShootingStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(var(--shoot-angle, 30deg)); }
          3% { opacity: 1; }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--shoot-dist, 300px), 0) rotate(var(--shoot-angle, 30deg)); }
        }
        @keyframes arcticReflectionShimmer {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          25% { opacity: 0.4; transform: scaleX(1.15); }
          50% { opacity: 0.85; transform: scaleX(0.85); }
          75% { opacity: 0.5; transform: scaleX(1.08); }
        }
        @keyframes arcticShimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes arcticSparkle {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          25% { opacity: 0.85; transform: scaleX(1.8); }
          50% { opacity: 0.15; transform: scaleX(0.6); }
          75% { opacity: 0.6; transform: scaleX(1.3); }
        }
        @keyframes arcticIceDrift1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes arcticIceDrift2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes arcticIceDrift3 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }
        @keyframes pineSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1.5deg); }
          50% { transform: rotate(0.3deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes pineSwayRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1.5deg); }
          50% { transform: rotate(-0.3deg); }
          75% { transform: rotate(1deg); }
        }
        @keyframes aroraCurtain1 {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.8; }
          25% { transform: translateX(3%) scaleY(1.1); opacity: 0.6; }
          50% { transform: translateX(-2%) scaleY(0.9); opacity: 0.9; }
          75% { transform: translateX(1%) scaleY(1.05); opacity: 0.7; }
        }
        @keyframes aroraCurtain2 {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.7; }
          30% { transform: translateX(-3%) scaleY(1.15); opacity: 0.5; }
          60% { transform: translateX(2%) scaleY(0.85); opacity: 0.85; }
          80% { transform: translateX(-1%) scaleY(1.05); opacity: 0.65; }
        }
        @keyframes aroraCurtain3 {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.6; }
          35% { transform: translateX(2%) scaleY(1.1); opacity: 0.4; }
          65% { transform: translateX(-3%) scaleY(0.9); opacity: 0.75; }
          85% { transform: translateX(1%) scaleY(1.02); opacity: 0.55; }
        }
        @keyframes aroraRayPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.9); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}

// ===== Night Ocean Effect (for red theme) — Professional animated calm night sea with moon, clear waves, shooting stars & palm trees =====
function HomeNightOceanEffect() {
  // Use stable random values via useMemo-like approach with fixed seed
  const starData = React.useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      top: Math.random() * 48,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      color: i % 5 === 0 ? '#ffeaa7' : i % 5 === 1 ? '#ffd6a0' : i % 5 === 2 ? '#ffefd5' : '#ffffff',
      twinkleDuration: Math.random() * 4 + 2,
      twinkleDelay: Math.random() * 6,
      baseOpacity: Math.random() * 0.5 + 0.3,
    })), []);

  const shootingStarData = React.useMemo(() =>
    Array.from({ length: 3 }).map((_, i) => ({
      startX: 10 + Math.random() * 55,
      startY: 2 + Math.random() * 25,
      angle: 20 + Math.random() * 35,
      travelDist: 250 + Math.random() * 350,
      duration: 0.8 + Math.random() * 0.6,
      delay: i * 3.5 + Math.random() * 2,
      size: 2.5 + Math.random() * 2,
      tailLength: 100 + Math.random() * 80,
    })), []);

  const sparkleData = React.useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      top: 50 + Math.random() * 20,
      left: Math.random() * 100,
      width: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    })), []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0, willChange: 'transform', transform: 'translate3d(0,0,0)', contain: 'layout' }} aria-hidden="true">
      {/* Night sky gradient — deep crimson-black tones */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #050103 0%, #0d0306 8%, #140408 16%, #1a0610 25%, #180508 35%, #130407 50%, #0e0305 65%, #080204 80%, #050103 100%)',
      }} />

      {/* Subtle atmospheric red nebula glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '20%', width: '40%', height: '30%',
        background: 'radial-gradient(ellipse, rgba(239,68,68,0.03) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '10%', width: '35%', height: '25%',
        background: 'radial-gradient(ellipse, rgba(249,115,22,0.02) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      {/* ★★★ MOON — Large and prominent with professional glow ★★★ */}
      <div className="absolute" style={{ top: '5%', right: '12%', width: '100px', height: '100px' }}>
        {/* Outermost glow — large atmospheric haze */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px', width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.10) 0%, rgba(253,203,110,0.04) 30%, transparent 60%)',
          animation: 'oceanMoonGlow 8s ease-in-out infinite',
        }} />
        {/* Middle glow ring */}
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px', width: '180px', height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.15) 0%, rgba(253,203,110,0.05) 40%, transparent 65%)',
          animation: 'oceanMoonGlow 8s ease-in-out infinite 2s',
        }} />
        {/* Inner glow ring */}
        <div style={{
          position: 'absolute', top: '-15px', left: '-15px', width: '130px', height: '130px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253,203,110,0.22) 0%, rgba(253,203,110,0.06) 45%, transparent 65%)',
        }} />
        {/* Moon body */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fff8e1, #ffeaa7 20%, #fdcb6e 50%, #e8a830 80%, #c48820 95%)',
          boxShadow: '0 0 50px 20px rgba(253,203,110,0.30), 0 0 100px 40px rgba(253,203,110,0.12), 0 0 180px 80px rgba(253,203,110,0.05)',
          animation: 'oceanMoonPulse 10s ease-in-out infinite',
        }} />
        {/* Moon craters — subtle detail */}
        <div style={{ position: 'absolute', top: '24px', left: '30px', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(200,170,80,0.25)' }} />
        <div style={{ position: 'absolute', top: '44px', left: '50px', width: '18px', height: '13px', borderRadius: '50%', background: 'rgba(200,170,80,0.18)' }} />
        <div style={{ position: 'absolute', top: '20px', left: '58px', width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(200,170,80,0.22)' }} />
        <div style={{ position: 'absolute', top: '55px', left: '35px', width: '11px', height: '10px', borderRadius: '50%', background: 'rgba(200,170,80,0.15)' }} />
      </div>

      {/* ★★★ TWINKLING STARS — Dense starfield ★★★ */}
      {starData.map((star, i) => (
        <div key={`star-${i}`} style={{
          position: 'absolute',
          top: `${star.top}%`,
          left: `${star.left}%`,
          width: `${star.size}px`, height: `${star.size}px`,
          borderRadius: '50%',
          background: star.color,
          opacity: star.baseOpacity,
          animation: `oceanStarTwinkle ${star.twinkleDuration}s ${star.twinkleDelay}s ease-in-out infinite`,
        }} />
      ))}

      {/* ★★★ SHOOTING STARS — Big, bright, professional with long tails ★★★ */}
      {shootingStarData.map((ss, i) => (
        <div key={`shooting-star-${i}`} style={{
          position: 'absolute',
          top: `${ss.startY}%`,
          left: `${ss.startX}%`,
          width: `${ss.size}px`, height: `${ss.size}px`,
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: `0 0 8px 3px rgba(255,255,255,0.9), 0 0 16px 6px rgba(255,234,167,0.6), 0 0 30px 10px rgba(255,200,80,0.3)`,
          opacity: 0,
          animation: `oceanShootingStar ${ss.duration}s ${ss.delay}s ease-out infinite`,
          '--shoot-angle': `${ss.angle}deg`,
          '--shoot-dist': `${ss.travelDist}px`,
        } as React.CSSProperties} >
          {/* Long glowing tail */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '100%',
            width: `${ss.tailLength}px`, height: '2.5px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,234,167,0.7) 20%, rgba(255,200,80,0.3) 50%, transparent)',
            borderRadius: '2px',
          }} />
          {/* Wider glow behind tail */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '100%',
            width: `${ss.tailLength * 0.7}px`, height: '6px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to left, rgba(255,255,255,0.3), rgba(255,234,167,0.15) 30%, transparent)',
            borderRadius: '3px',
            filter: 'blur(2px)',
          }} />
        </div>
      ))}

      {/* ★★★ MOON REFLECTION on water — shimmering column ★★★ */}
      <div style={{
        position: 'absolute', top: '50%', right: '8%', width: '160px', height: '50%',
        background: 'linear-gradient(180deg, rgba(253,203,110,0.20) 0%, rgba(253,203,110,0.08) 20%, rgba(253,203,110,0.03) 50%, transparent 80%)',
        filter: 'blur(30px)',
        animation: 'oceanReflectionShimmer 7s ease-in-out infinite',
        borderRadius: '40% 40% 0 0',
      }} />

      {/* ★★★ ANIMATED OCEAN WAVES — Clear, visible, moving with depth ★★★ */}
      {/* Wave layer 1 — far background, darkest, slowest */}
      <svg className="absolute" style={{ top: '48%', left: 0, width: '200%', height: '52%', animation: 'oceanWaveDrift1 20s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,220 C200,140 400,300 600,220 C800,140 1000,300 1200,220 C1400,140 1600,300 1800,220 C2000,140 2200,300 2400,220 C2600,140 2800,300 2880,220 L2880,800 L0,800 Z"
          fill="rgba(45,12,20,0.6)" />
      </svg>
      {/* Wave layer 2 — mid background */}
      <svg className="absolute" style={{ top: '52%', left: 0, width: '200%', height: '48%', animation: 'oceanWaveDrift2 15s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,260 C280,160 560,360 840,260 C1120,160 1400,360 1680,260 C1960,160 2240,360 2520,260 C2700,180 2800,300 2880,260 L2880,800 L0,800 Z"
          fill="rgba(65,18,28,0.65)" />
      </svg>
      {/* Wave layer 3 — mid foreground, brighter with foam */}
      <svg className="absolute" style={{ top: '56%', left: 0, width: '200%', height: '44%', animation: 'oceanWaveDrift3 11s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,280 C240,180 480,380 720,280 C960,180 1200,380 1440,280 C1680,180 1920,380 2160,280 C2400,180 2640,380 2880,280 L2880,800 L0,800 Z"
          fill="rgba(85,22,35,0.6)" />
        {/* Foam/white line at wave crest */}
        <path d="M0,280 C240,180 480,380 720,280 C960,180 1200,380 1440,280 C1680,180 1920,380 2160,280 C2400,180 2640,380 2880,280"
          fill="none" stroke="rgba(253,203,110,0.08)" strokeWidth="2" />
      </svg>
      {/* Wave layer 4 — foreground, lightest, fastest */}
      <svg className="absolute" style={{ top: '60%', left: 0, width: '200%', height: '40%', animation: 'oceanWaveDrift1 8s linear infinite', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 2880 800" preserveAspectRatio="none">
        <path d="M0,300 C320,200 640,400 960,300 C1280,200 1600,400 1920,300 C2240,200 2560,400 2880,300 L2880,800 L0,800 Z"
          fill="rgba(110,28,40,0.50)" />
        {/* Foam/white line at wave crest */}
        <path d="M0,300 C320,200 640,400 960,300 C1280,200 1600,400 1920,300 C2240,200 2560,400 2880,300"
          fill="none" stroke="rgba(253,203,110,0.06)" strokeWidth="2" />
      </svg>
      {/* Wave layer 5 removed for performance optimization */}

      {/* Deep ocean body fill — gradient from wave area to bottom */}
      <div style={{
        position: 'absolute', top: '58%', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(50,14,22,0.8) 15%, rgba(35,10,18,0.9) 40%, rgba(18,5,10,0.95) 70%, #080204 100%)',
      }} />

      {/* ★★★ WATER SURFACE SHIMMER LINES — Golden moonlight reflections ★★★ */}
      <div style={{
        position: 'absolute', top: '49.5%', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(253,203,110,0.15) 10%, rgba(253,203,110,0.35) 50%, rgba(253,203,110,0.15) 90%, transparent 100%)',
        animation: 'oceanShimmer 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '51%', left: 0, right: 0, height: '1.5px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(253,203,110,0.10) 20%, rgba(253,203,110,0.25) 50%, rgba(253,203,110,0.10) 80%, transparent 95%)',
        animation: 'oceanShimmer 5s ease-in-out infinite 1.5s',
      }} />
      <div style={{
        position: 'absolute', top: '53%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 10%, rgba(253,203,110,0.08) 30%, rgba(253,203,110,0.18) 50%, rgba(253,203,110,0.08) 70%, transparent 90%)',
        animation: 'oceanShimmer 6s ease-in-out infinite 3s',
      }} />

      {/* ★★★ WATER SPARKLES — Golden glints on water surface ★★★ */}
      {sparkleData.map((sp, i) => (
        <div key={`sparkle-${i}`} style={{
          position: 'absolute',
          top: `${sp.top}%`,
          left: `${sp.left}%`,
          width: `${sp.width}px`,
          height: '1.5px',
          background: `rgba(253,203,110,${sp.opacity})`,
          borderRadius: '50%',
          animation: `oceanSparkle ${sp.duration}s ${sp.delay}s ease-in-out infinite`,
        }} />
      ))}

      {/* Red-tinted water foam highlights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`foam-${i}`} style={{
          position: 'absolute',
          top: `${50 + Math.random() * 5}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 35 + 12}px`,
          height: '1px',
          background: `rgba(239,68,68,${Math.random() * 0.12 + 0.04})`,
          borderRadius: '50%',
          animation: `oceanSparkle ${Math.random() * 6 + 3}s ${Math.random() * 5}s ease-in-out infinite`,
        }} />
      ))}

      {/* ★★★ LEFT PALM TREE — Swaying silhouette ★★★ */}
      <svg className="absolute" style={{ bottom: '12%', left: '-2%', width: '240px', height: '440px', animation: 'palmSwayLeft 7s ease-in-out infinite', transformOrigin: 'bottom center', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M95,480 C93,420 88,360 82,300 C76,240 72,180 70,130 C68,90 67,60 68,35" fill="none" stroke="#0a0204" strokeWidth="16" strokeLinecap="round" />
        <path d="M95,480 C93,420 88,360 82,300 C76,240 72,180 70,130 C68,90 67,60 68,35" fill="none" stroke="#150510" strokeWidth="11" strokeLinecap="round" />
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

      {/* ★★★ RIGHT PALM TREE — Swaying silhouette (mirrored) ★★★ */}
      <svg className="absolute" style={{ bottom: '12%', right: '-2%', width: '240px', height: '440px', animation: 'palmSwayRight 8s ease-in-out infinite', transformOrigin: 'bottom center', willChange: 'transform', backfaceVisibility: 'hidden' }} viewBox="0 0 200 480">
        <path d="M105,480 C107,420 112,360 118,300 C124,240 128,180 130,130 C132,90 133,60 132,35" fill="none" stroke="#0a0204" strokeWidth="16" strokeLinecap="round" />
        <path d="M105,480 C107,420 112,360 118,300 C124,240 128,180 130,130 C132,90 133,60 132,35" fill="none" stroke="#150510" strokeWidth="11" strokeLinecap="round" />
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

      {/* Grass/bushes silhouette at bottom */}
      <svg className="absolute" style={{ bottom: 0, left: 0, width: '100%', height: '80px' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L0,55 C25,40 50,50 75,42 C100,34 125,48 150,40 C175,32 200,46 225,38 C250,30 275,44 300,36 C325,28 350,42 375,34 C400,26 425,40 450,32 C475,24 500,38 525,30 C550,22 575,36 600,28 C625,20 650,34 675,26 C700,18 725,32 750,24 C775,16 800,30 825,22 C850,14 875,28 900,20 C925,12 950,26 975,18 C1000,10 1025,24 1050,16 C1075,8 1100,22 1125,14 C1150,6 1175,20 1200,12 C1225,4 1250,18 1275,10 C1300,4 1325,16 1350,8 C1375,2 1400,14 1440,8 L1440,80 Z"
          fill="#060204" />
      </svg>

      <style>{`
        @keyframes oceanMoonGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.65; }
        }
        @keyframes oceanMoonPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.04); filter: brightness(1.15); }
        }
        @keyframes oceanStarTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes oceanShootingStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(var(--shoot-angle, 30deg)); }
          3% { opacity: 1; }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--shoot-dist, 300px), 0) rotate(var(--shoot-angle, 30deg)); }
        }
        @keyframes oceanReflectionShimmer {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          25% { opacity: 0.4; transform: scaleX(1.15); }
          50% { opacity: 0.85; transform: scaleX(0.85); }
          75% { opacity: 0.5; transform: scaleX(1.08); }
        }
        @keyframes oceanShimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes oceanSparkle {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          25% { opacity: 0.85; transform: scaleX(1.8); }
          50% { opacity: 0.15; transform: scaleX(0.6); }
          75% { opacity: 0.6; transform: scaleX(1.3); }
        }
        @keyframes oceanWaveDrift1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes oceanWaveDrift2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes oceanWaveDrift3 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }
        @keyframes palmSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3.5deg); }
          50% { transform: rotate(0.5deg); }
          75% { transform: rotate(-2deg); }
        }
        @keyframes palmSwayRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3.5deg); }
          50% { transform: rotate(-0.5deg); }
          75% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  );
}

// ===== Main Component =====
export default function HomePage() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageView>("home");
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [productBanners, setProductBanners] = useState<BannerData[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [likeData, setLikeData] = useState<LikeData>({ counts: {}, userLikes: [] });
  const [sessionId, setSessionId] = useState("");
  const [likingProducts, setLikingProducts] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<ProductItem | null>(null);
  const [detailSelectedImageIdx, setDetailSelectedImageIdx] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("data");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [formData, setFormData] = useState({ customerName: "", customerWhatsapp: "", customerEmail: "" });
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkInput, setCheckInput] = useState("");
  const [isCheckingTransaction, setIsCheckingTransaction] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionLookup | TransactionLookup[] | null>(null);
  const likeRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const homeHeaderRef = useRef<HTMLElement | null>(null);
  const [categoryProductCounts, setCategoryProductCounts] = useState<Record<string, number>>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "newest" | "popular">("default");
  const [categorySearch, setCategorySearch] = useState("");
  const [activeSortBy, setActiveSortBy] = useState<"default" | "price_asc" | "price_desc" | "newest" | "popular">("default");
  const [activePriceMin, setActivePriceMin] = useState("");
  const [activePriceMax, setActivePriceMax] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "available">("available");
  const [activeFilterStatus, setActiveFilterStatus] = useState<"all" | "available">("available");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Current theme based on selected category and site theme
  // Default to red theme when settings haven't loaded yet (matching CSS defaults)
  const isBlueTheme = settings?.siteTheme === 'blue';
  const isRedTheme = settings?.siteTheme === 'red' || !settings?.siteTheme;
  const homeBaseTheme = isRedTheme ? HOME_RED_THEME : HOME_BLUE_THEME;
  const currentTheme = selectedCategory !== "all"
    ? getTheme(selectedCategory, settings?.siteTheme as 'red' | 'blue' | undefined)
    : homeBaseTheme;

  // Computed accent colors for the homepage (changes with siteTheme)
  // Default to red when settings haven't loaded
  const ha = !isBlueTheme ? '#ef4444' : '#3b82f6'; // home accent
  const haTo = !isBlueTheme ? '#f97316' : '#06b6d4'; // home accent gradient end
  const haDark = !isBlueTheme ? '#7f1d1d' : '#1e3a5f'; // home accent dark
  const haBg = !isBlueTheme ? '#1a0505' : '#020617'; // home accent background dark
  const haBgEnd = !isBlueTheme ? '#2d0a0a' : '#0a0a1a'; // home accent background end

  // ===== Effects =====
  useEffect(() => {
    setMounted(true);
    setTheme("dark");
    const sid = getSessionId();
    setSessionId(sid);
    setCartItems(getCartItems());
  }, [setTheme]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (homeHeaderRef.current) {
            homeHeaderRef.current.classList.toggle('home-scrolled', scrolled);
          }
          setIsScrolled(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchBanners() {
      try { const res = await fetch("/api/banners?type=home"); const data = await res.json(); if (data.data) setBanners(data.data); } catch {} finally { setIsLoadingBanners(false); }
    }
    fetchBanners();
  }, []);

  // Fetch product banners when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setProductBanners([]);
      return;
    }
    async function fetchProductBanners() {
      try {
        const res = await fetch(`/api/banners?type=product&category=${encodeURIComponent(selectedCategory)}`);
        const data = await res.json();
        if (data.data) setProductBanners(data.data);
      } catch {}
    }
    fetchProductBanners();
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchCategories() {
      try { const res = await fetch("/api/categories"); const data = await res.json(); if (data.data) setCategories(data.data); } catch { toast.error("Gagal memuat kategori"); } finally { setIsLoadingCategories(false); }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchCategoryCounts() {
      if (categories.length === 0) return;
      const counts: Record<string, number> = {};
      try {
        const res = await fetch("/api/products?");
        const data = await res.json();
        if (data.data) {
          const allProducts: ProductItem[] = data.data;
          categories.forEach((cat) => {
            counts[cat.slug] = allProducts.filter((p: ProductItem) => { const pCat = p.category as { slug?: string } | undefined; return pCat && pCat.slug === cat.slug; }).length;
          });
          setCategoryProductCounts(counts);
        }
      } catch {}
    }
    fetchCategoryCounts();
  }, [categories]);

  const fetchProducts = useCallback(async (category?: string, search?: string, minPrice?: string, maxPrice?: string, sort?: string, status?: string) => {
    setIsLoadingProducts(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== "all") params.set("category", category);
      if (search) params.set("search", search);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sort && sort !== "default") params.set("sort", sort);
      if (status && status !== "all") params.set("status", status);
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.data) setProducts(data.data);
    } catch { toast.error("Gagal memuat produk"); } finally { setIsLoadingProducts(false); }
  }, []);

  useEffect(() => { fetchProducts(selectedCategory, searchQuery, activePriceMin, activePriceMax, activeSortBy, activeFilterStatus); }, [selectedCategory, searchQuery, activePriceMin, activePriceMax, activeSortBy, activeFilterStatus, fetchProducts]);

  useEffect(() => {
    async function fetchSettings() { try { const res = await fetch("/api/settings"); const data = await res.json(); if (data.data) setSettings(data.data); } catch {} }
    fetchSettings();
  }, []);

  const fetchLikes = useCallback(async () => {
    if (!sessionId || products.length === 0) return;
    const productIds = products.map((p) => (p._id as string)).join(",");
    if (!productIds) return;
    try { const res = await fetch(`/api/likes?productIds=${productIds}&sessionId=${sessionId}`); const data = await res.json(); if (data.data) setLikeData(data.data); } catch {}
  }, [sessionId, products]);

  useEffect(() => { fetchLikes(); }, [fetchLikes]);
  useEffect(() => { likeRefreshRef.current = setInterval(fetchLikes, 10000); return () => { if (likeRefreshRef.current) clearInterval(likeRefreshRef.current); }; }, [fetchLikes]);

  // Payment polling is handled by PaymentQRIS component (no duplicate polling here).
  // PaymentQRIS calls onPaymentStatusChange to sync status back to HomePage checkout.

  const handlePaymentStatusChange = useCallback((newStatus: 'pending' | 'paid' | 'success' | 'expired' | 'cancel') => {
    if (newStatus === 'paid' || newStatus === 'success') {
      setCheckoutStep("success");
      setShowConfetti(true);
      toast.success("Pembayaran berhasil! 🎉");
    } else if (newStatus === 'expired') {
      toast.error("Waktu pembayaran habis!");
    } else if (newStatus === 'cancel') {
      toast.info("Transaksi dibatalkan");
    }
  }, []);

  // ===== Handlers =====
  const handleToggleLike = async (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!sessionId) return;
    setLikingProducts((prev) => new Set(prev).add(productId));
    try {
      const res = await fetch("/api/likes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId, sessionId }) });
      const data = await res.json();
      if (data.data) {
        setLikeData((prev) => ({
          counts: { ...prev.counts, [productId]: data.data.count },
          userLikes: data.data.liked ? [...prev.userLikes.filter((id) => id !== productId), productId] : prev.userLikes.filter((id) => id !== productId),
        }));
        setProducts((prev) => prev.map((p) => (p._id as string) === productId ? { ...p, likes: data.data.count } : p));
      }
    } catch { toast.error("Gagal mengubah like"); } finally {
      setLikingProducts((prev) => { const next = new Set(prev); next.delete(productId); return next; });
    }
  };

  const addToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const existing = getCartItems();
    if (existing.some((item) => item._id === (product._id as string))) { toast.info("Produk sudah ada di keranjang"); return; }
    const cartItem: CartItem = { _id: product._id as string, name: product.name, price: product.price, originalPrice: product.originalPrice, images: product.images, slug: product.slug };
    const updated = [...existing, cartItem];
    saveCartItems(updated); setCartItems(updated); toast.success("Ditambahkan ke keranjang! 🛒");
  };

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter((item) => item._id !== productId);
    saveCartItems(updated); setCartItems(updated); toast.success("Dihapus dari keranjang");
  };

  const isInCart = (productId: string): boolean => cartItems.some((item) => item._id === productId);

  const navigateTo = (page: PageView) => { setActivePage(page); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleProductClick = (product: ProductItem) => {
    setDetailProduct(product); setDetailOpen(true); setDetailSelectedImageIdx(0);
    fetch(`/api/products/${product.slug}`).catch(() => {});
  };

  const handleBuyNow = (product?: ProductItem) => {
    const prod = product || detailProduct;
    if (!prod) return;
    if (prod.isSold) { toast.error("Akun ini sudah terjual!"); return; }
    setSelectedProduct(prod);
    setFormData({ customerName: "", customerWhatsapp: "", customerEmail: "" });
    setTransactionData(null); setCheckoutStep("data"); setShowConfetti(false); setDetailOpen(false); setCheckoutOpen(true);
  };

  const handleCreateTransaction = async () => {
    if (!selectedProduct) { toast.error("Produk tidak ditemukan"); return; }
    if (!formData.customerName.trim()) { toast.error("Masukkan nama pelanggan"); return; }
    if (!formData.customerWhatsapp.trim()) { toast.error("Masukkan nomor WhatsApp"); return; }
    setIsCreatingTransaction(true);
    try {
      const res = await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: selectedProduct._id, customerName: formData.customerName, customerPhone: formData.customerWhatsapp, customerEmail: formData.customerEmail, customerWhatsapp: formData.customerWhatsapp }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Gagal membuat transaksi"); return; }
      const productImage = selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[0] : "";
      setTransactionData({ ...data.data, productImage }); setCheckoutStep("qris");
      toast.success("Transaksi dibuat! Silakan lakukan pembayaran.");
    } catch { toast.error("Gagal membuat transaksi. Coba lagi."); } finally { setIsCreatingTransaction(false); }
  };

  const handleCheckTransaction = async () => {
    if (!checkInput.trim()) { toast.error("Masukkan ID transaksi atau nomor WhatsApp"); return; }
    setIsCheckingTransaction(true); setTransactionResult(null);
    try {
      const isPhone = /^\d+$/.test(checkInput.trim());
      const params = isPhone ? `phone=${encodeURIComponent(checkInput.trim())}` : `transactionId=${encodeURIComponent(checkInput.trim())}`;
      const res = await fetch(`/api/transactions?${params}`);
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Transaksi tidak ditemukan"); return; }
      setTransactionResult(data.data);
    } catch { toast.error("Gagal mengecek transaksi"); } finally { setIsCheckingTransaction(false); }
  };

  const handleCopyTransactionId = () => {
    if (transactionData?.transactionId) { navigator.clipboard.writeText(transactionData.transactionId); toast.success("Kode transaksi disalin!"); }
  };

  const handleApplyFilter = () => {
    setActivePriceMin(priceMin);
    setActivePriceMax(priceMax);
    setActiveSortBy(sortBy);
    setActiveFilterStatus(filterStatus);
    setFilterOpen(false);
  };

  const handleResetFilter = () => {
    setPriceMin("");
    setPriceMax("");
    setSortBy("default");
    setFilterStatus("available");
    setActivePriceMin("");
    setActivePriceMax("");
    setActiveSortBy("default");
    setActiveFilterStatus("available");
    setFilterOpen(false);
  };

  const hasActiveFilter = activePriceMin !== "" || activePriceMax !== "" || activeSortBy !== "default" || activeFilterStatus !== "available";

  const statusBadgeVariant = (status: string) => {
    switch (status) { case "paid": case "success": return "default"; case "pending": return "secondary"; case "expired": return "destructive"; case "cancel": return "outline"; default: return "secondary"; }
  };
  const statusLabel = (status: string) => {
    switch (status) { case "paid": return "Dibayar"; case "success": return "Sukses"; case "pending": return "Menunggu"; case "expired": return "Kedaluwarsa"; case "cancel": return "Dibatalkan"; default: return status; }
  };

  const currentStepIndex = checkoutSteps.findIndex((s) => s.key === checkoutStep);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 rounded-full border-2 border-t-transparent animate-spin border-white/30" />
        </div>
      </div>
    );
  }

  // Computed accent colors for early returns (must be after mounted check)
  const isBlue = settings?.siteTheme === 'blue';
  const isRedEarly = settings?.siteTheme === 'red' || !settings?.siteTheme;
  const haEarlyAccent = !isBlue ? '#ef4444' : '#3b82f6';
  const haEarlyTo = !isBlue ? '#f97316' : '#06b6d4';
  const haEarlyDark = !isBlue ? '#7f1d1d' : '#1e3a5f';
  const haEarlyBgStart = !isBlue ? '#1a0505' : '#020617';
  const haEarlyBgMid = !isBlue ? '#2d0a0a' : '#0f172a';
  const haEarlyBgEnd = !isBlue ? '#1a0505' : '#020617';

  // ─── Maintenance Mode ────────────────────────────
  if (settings?.maintenanceMode) {
    return (
      <div data-home-theme={isBlue ? "blue" : "red"} className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(180deg, ${haEarlyBgStart}, ${haEarlyBgMid}, ${haEarlyBgEnd})` }}>
        {isBlue && <HomeArcticNightEffect />}
        {isRedEarly && <HomeNightOceanEffect />}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-10 animate-pulse">🔧</div>
          <div className="absolute top-40 right-20 text-5xl opacity-10 animate-pulse">⚙️</div>
          <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animate-pulse">🛠️</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{ background: `linear-gradient(to bottom right, ${haEarlyAccent}, ${haEarlyDark})`, boxShadow: `0 10px 15px -3px ${haEarlyAccent}33` }}
            className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl text-white overflow-hidden">
            {settings?.logoUrl && settings.logoUrl !== '/logo.svg' ? <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="w-full h-full object-cover" /> : <TreePine className="size-10" />}
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Sedang Dalam Perbaikan</h1>
          <p style={{ color: haEarlyAccent }} className="font-semibold text-lg mb-3">{settings.siteName || "RYYSENGTOR"}</p>
          <p className="text-[#8a8a8a] text-sm leading-relaxed mb-6">Website sedang dalam maintenance untuk perbaikan dan peningkatan layanan. Kami akan segera kembali! 🚀</p>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
            <motion.div style={{ background: `linear-gradient(to right, ${haEarlyAccent}, ${haEarlyTo})`, width: "40%" }} className="h-full rounded-full" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          {settings.whatsappNumber && (
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors">
              <MessageCircle className="size-4" />Hubungi Kami via WhatsApp
            </a>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div data-home-theme={isBlueTheme ? "blue" : "red"} className="min-h-screen flex flex-col vexa-bg-gaming" style={{ background: selectedCategory !== "all" ? `linear-gradient(180deg, ${currentTheme.bgStart}, ${currentTheme.bgMid}, ${currentTheme.bgEnd})` : `linear-gradient(180deg, ${homeBaseTheme.bgStart}, ${homeBaseTheme.bgMid}, ${homeBaseTheme.bgEnd})`, '--home-accent': ha, '--home-accent-to': haTo, '--home-accent-dark': haDark, '--home-accent-bg': haBg, '--home-accent-bg-end': haBgEnd } as React.CSSProperties}>

      {/* ===== THEME CSS VARS ===== */}
      <style>{`
        [data-home-theme="red"] .home-accent-text { color: #ef4444 !important; }
        [data-home-theme="red"] .home-accent-bg { background-color: #ef4444 !important; }
        [data-home-theme="red"] .home-accent-border { border-color: rgba(239,68,68,0.35) !important; }
        [data-home-theme="red"] .home-accent-fill { fill: #ef4444 !important; }
        [data-home-theme="red"] .home-gradient-btn { background: linear-gradient(to right, #ef4444, #f97316) !important; box-shadow: 0 10px 15px -3px rgba(239,68,68,0.2) !important; }
        [data-home-theme="red"] .home-gradient-border { background: linear-gradient(135deg, #ef4444, #f97316) !important; }
        [data-home-theme="red"] .home-footer-bg { background-color: #1a0505 !important; border-color: rgba(239,68,68,0.15) !important; }
        [data-home-theme="red"] .home-sold-badge { background-color: rgba(127,29,29,0.2) !important; color: #ef4444 !important; border-color: rgba(239,68,68,0.3) !important; }
        [data-home-theme="red"] .home-sold-banner { background-color: rgba(127,29,29,0.1) !important; border-color: rgba(239,68,68,0.2) !important; }
        [data-home-theme="red"] .home-checkout-border { border-color: rgba(239,68,68,0.2) !important; }
        [data-home-theme="red"] .home-checkout-title { color: #ef4444 !important; }
        [data-home-theme="red"] .home-input-focus:focus { border-color: rgba(239,68,68,0.5) !important; }
      `}</style>

      {/* ===== WEATHER EFFECTS ===== */}
      {isBlueTheme && <HomeArcticNightEffect />}
      {isRedTheme && <HomeNightOceanEffect />}

      {/* ===== SEARCH OVERLAY ===== */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 p-4" style={{ background: `linear-gradient(180deg, ${homeBaseTheme.bgStart}, ${homeBaseTheme.bgMid}, ${homeBaseTheme.bgEnd})` }}>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setSearchOpen(false)} className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <div className="flex-1 vexa-search flex items-center px-4">
                <Search className="h-4 w-4 text-[#8a8a8a] mr-2" />
                <Input placeholder="Cari akun game..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-[#8a8a8a] focus:ring-0 focus:outline-none h-10" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[#8a8a8a] hover:text-white transition-colors"><X className="h-4 w-4" /></button>
                )}
              </div>
            </div>
            {searchQuery && (
              <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
                {isLoadingProducts ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="rounded-[18px] overflow-hidden bg-[#1a1a1a]" style={{ border: `1px solid ${currentTheme.cardBorder}` }}>
                        <div className="vexa-skeleton" style={{ aspectRatio: "1080/1350" }} />
                        <div className="p-2.5 space-y-1.5"><div className="vexa-skeleton h-3 w-full" /><div className="vexa-skeleton h-5 w-16" /></div>
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="text-4xl mb-3">🔍</span>
                    <h3 className="text-base font-semibold text-white font-heading">Tidak ditemukan</h3>
                    <p className="text-xs text-[#8a8a8a] mt-1">Coba kata kunci lain</p>
                  </div>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch">
                    {products.map((product) => (
                      <ProductCard key={product._id as string} product={product}
                        categoryInfo={product.category as { name: string; slug: string; icon: string } | undefined}
                        likeData={likeData} likingProducts={likingProducts} sessionId={sessionId}
                        onToggleLike={handleToggleLike} onClick={() => { handleProductClick(product); setSearchOpen(false); }}
                        theme={currentTheme} />
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HEADER ===== */}
      <header ref={homeHeaderRef} className="sticky top-0 z-30 vexa-header">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            {/* Hamburger menu - opens sidebar */}
            <button onClick={() => setSidebarOpen(true)} className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
              <Menu className="h-5 w-5 text-white/80" />
            </button>
            {/* Logo from admin settings */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden shadow-md" style={{ background: `linear-gradient(to bottom right, ${ha}, ${haDark})`, boxShadow: `0 4px 6px -1px ${ha}20` }}>
                {settings?.logoUrl && settings.logoUrl !== '/logo.svg' ? (
                  <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="w-full h-full object-cover" />
                ) : (
                  <Gamepad2 className="h-4 w-4 text-white" />
                )}
              </div>
              <h1 className="text-sm font-extrabold tracking-tight gold-text font-heading">{settings?.siteName || "RYYSENGTOR"}</h1>
            </div>
          </div>
          {/* Search bar in center (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="vexa-search flex items-center w-full px-4 py-2">
              <Search className="h-4 w-4 text-[#8a8a8a] mr-2" />
              <Input placeholder="Cari akun game..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-[#8a8a8a] focus:ring-0 focus:outline-none h-8 text-sm" />
              {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[#8a8a8a] hover:text-white transition-colors"><X className="h-4 w-4" /></button>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="md:hidden h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
              <Search className="h-4 w-4 text-[#8a8a8a]" />
            </button>
            <button onClick={() => navigateTo("keranjang")} className="relative h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
              <ShoppingCart className="h-4 w-4 text-[#8a8a8a]" />
              {cartItems.length > 0 && <Badge className="absolute -top-1 -right-1 text-white min-w-4 h-4 px-1 border-0 text-[9px] font-bold" style={{ background: ha }}>{cartItems.length}</Badge>}
            </button>
          </div>
        </div>
      </header>

      {/* ===== SIDEBAR NAVIGATION ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 vexa-sidebar"
            >
              {/* Sidebar header with logo */}
              <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center overflow-hidden shadow-lg" style={{ background: `linear-gradient(to bottom right, ${ha}, ${haDark})`, boxShadow: `0 10px 15px -3px ${ha}30` }}>
                  {settings?.logoUrl && settings.logoUrl !== '/logo.svg' ? (
                    <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="w-full h-full object-cover" />
                  ) : (
                    <Gamepad2 className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-extrabold gold-text font-heading">{settings?.siteName || "RYYSENGTOR"}</h2>
                  <p className="text-[10px] text-white/40 truncate">{settings?.siteSlogan || "Jual Beli Akun Game Terpercaya"}</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 py-4 px-3 space-y-1">
                {[
                  { id: "home" as PageView, label: "Beranda", icon: Home },
                  { id: "cek-transaksi" as PageView, label: "Cek Pesanan", icon: ClipboardList },
                  { id: "keranjang" as PageView, label: "Cek Keranjang", icon: ShoppingCart, badge: cartItems.length },
                  { id: "bantuan" as PageView, label: "Bantuan", icon: HelpCircle },
                  { id: "tutorial" as PageView, label: "Tutorial Beli Akun", icon: BookOpen },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "text-white sidebar-nav-active"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                      style={isActive ? {
                        background: `linear-gradient(90deg, ${ha}26, ${haTo}14)`,
                        borderLeft: `3px solid ${ha}`,
                      } : { borderLeft: "3px solid transparent" }}
                    >
                      <ItemIcon className={`h-5 w-5 ${isActive ? "text-[var(--home-accent)]" : ""}`} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="vexa-badge min-w-5 h-5 px-1.5 text-[10px] flex items-center justify-center">{item.badge}</span>
                      )}
                      {isActive && <ChevronRight className="h-4 w-4 text-[var(--home-accent)]/60" />}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar footer - social links */}
              <div className="px-5 py-4 border-t border-white/10">
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">Ikuti Kami</p>
                <div className="grid grid-cols-4 gap-2">
                  {settings?.whatsappNumber && (
                    <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#25D366]/15 hover:scale-110 transition-all active:scale-95" aria-label="WhatsApp">
                      <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                    </a>
                  )}
                  {settings?.telegramUsername && (
                    <a href={`https://t.me/${settings.telegramUsername.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-sky-500/15 hover:scale-110 transition-all active:scale-95" aria-label="Telegram">
                      <svg className="h-4.5 w-4.5 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                  )}
                  {settings?.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-500/15 hover:scale-110 transition-all active:scale-95" aria-label="Instagram">
                      <svg className="h-4.5 w-4.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  )}
                  {settings?.tiktokUrl && (
                    <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all active:scale-95" aria-label="TikTok">
                      <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52V6.94a4.85 4.85 0 0 1-1-.25z"/></svg>
                    </a>
                  )}
                  {settings?.youtubeUrl && (
                    <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/15 hover:scale-110 transition-all active:scale-95" aria-label="YouTube">
                      <svg className="h-4.5 w-4.5 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                  {settings?.facebookUrl && (
                    <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-sky-600/15 hover:scale-110 transition-all active:scale-95" aria-label="Facebook">
                      <svg className="h-4.5 w-4.5 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {settings?.twitterUrl && (
                    <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all active:scale-95" aria-label="X / Twitter">
                      <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                </div>
                <p className="text-[10px] text-white/30 mt-3 text-center">© 2025 {settings?.siteName || "RYYSENGTOR"}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 relative z-10 pb-4">
        <AnimatePresence mode="wait">
          {/* ===== HOME PAGE ===== */}
          {activePage === "home" && (
            <motion.div key="home" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
              {/* Banner Carousel - ONLY on home when no category selected and no search */}
              {selectedCategory === "all" && !searchQuery && (
                <section className="pt-3 pb-0">
                  <div className="px-3.5">
                    {isLoadingBanners ? (
                      <Skeleton className="w-full rounded-2xl bg-white/5" style={{ aspectRatio: '1080/459' }} />
                    ) : banners.length > 0 ? (
                      <BannerCarousel banners={banners} slideDuration={settings?.bannerSlideDuration || 4} />
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl border py-10 sm:py-16 px-4 text-center" style={{ background: `linear-gradient(to bottom right, #1a1a1a, ${haBg})`, borderColor: `${ha}15` }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                          <Badge className="mb-3 gap-1 px-3 py-1 text-xs" style={{ background: `${ha}10`, color: ha, borderColor: `${ha}20` }}>
                            <Zap className="h-3 w-3" />Jual Beli Akun Game Terpercaya #1
                          </Badge>
                          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">{settings?.siteName || "RYYSENGTOR"}</h1>
                          <p className="mt-2 text-sm text-[#8a8a8a] max-w-md">{settings?.siteSlogan || "Dapatkan Akun Game Impianmu!"}</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ===== CATEGORY GRID (when selectedCategory === "all" and no search) ===== */}
              {selectedCategory === "all" && !searchQuery ? (
                <section className="py-4">
                  <div className="px-3.5">
                    <div className="mb-3">
                      <h2 className="text-sm font-bold flex items-center gap-2 text-white tracking-wide font-heading">
                        <Gamepad2 className="h-4 w-4" style={{ color: ha }} />PILIH GAME
                      </h2>
                      <p className="text-[11px] text-[#8a8a8a] mt-0.5">Pilih game untuk melihat daftar akun yang tersedia</p>
                    </div>

                    {isLoadingCategories ? (
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden bg-[#1a1a1a] border" style={{ borderColor: `${ha}10` }}>
                            <div className="vexa-skeleton aspect-square" />
                            <div className="p-2"><div className="vexa-skeleton h-3 w-16 mx-auto" /></div>
                          </div>
                        ))}
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="flex flex-col items-center py-12 text-center">
                        <span className="text-4xl mb-3">🎮</span>
                        <h3 className="text-base font-semibold text-white font-heading">Belum ada game</h3>
                        <p className="text-xs text-[#8a8a8a] mt-1">Game akan segera ditambahkan</p>
                      </div>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible"
                        className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        {categories.filter((c) => c.isActive).map((cat) => {
                          const catTheme = getTheme(cat.slug, settings?.siteTheme as 'red' | 'blue' | undefined);
                          const count = categoryProductCounts[cat.slug] || 0;
                          return (
                            <motion.div key={cat._id as string} variants={itemVariants}>
                              <motion.div
                                whileHover={{ y: -4, scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="relative rounded-2xl overflow-hidden cursor-pointer group border bg-[#1a1a1a]/80"
                                style={{ borderColor: `${catTheme.accent}25` }}
                                onClick={() => { setSelectedCategory(cat.slug); setSearchQuery(""); setCategorySearch(""); handleResetFilter(); }}
                              >
                                {/* Game image/icon area */}
                                <div className="relative aspect-square overflow-hidden">
                                  {cat.image ? (
                                    <>
                                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${catTheme.bgStart}, ${catTheme.bgMid})` }}>
                                      <span className="text-4xl drop-shadow-lg">{cat.icon}</span>
                                    </div>
                                  )}
                                  {/* Circular count badge - top right */}
                                  {count > 0 && (
                                    <div className="absolute top-2 right-2 z-10 flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-extrabold text-white shadow-lg"
                                      style={{ background: catTheme.bannerGrad, boxShadow: `0 2px 8px ${catTheme.glow}` }}>
                                      {count}
                                    </div>
                                  )}
                                  {/* Hover glow */}
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: `radial-gradient(circle at center, ${catTheme.glow}, transparent 70%)` }} />
                                </div>
                                {/* Game name label */}
                                <div className="px-2.5 py-2.5 text-center" style={{ background: `linear-gradient(180deg, ${catTheme.bgStart}99, ${catTheme.bgEnd}cc)` }}>
                                  <h3 className="text-[11px] sm:text-xs font-bold text-white line-clamp-1 font-title">{cat.name} Akun</h3>
                                </div>
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>

                  {/* ===== KENAPA PILIH KAMI? Section ===== */}
                  <div className="px-3.5 mt-8">
                    <div className="mb-3">
                      <h2 className="text-sm font-bold flex items-center gap-2 text-white tracking-wide font-heading">
                        <ShieldCheck className="h-4 w-4" style={{ color: ha }} />Kenapa Pilih Kami?
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {[
                        { icon: <Zap className="h-5 w-5" />, title: "Proses Kilat", desc: "Pengiriman akun cepat", color: haTo },
                        { icon: <ShieldCheck className="h-5 w-5" />, title: "Aman & Terpercaya", desc: "Garansi akun 100%", color: "#10b981" },
                        { icon: <DollarSign className="h-5 w-5" />, title: "Harga Terjangkau", desc: "Harga bersahabat", color: ha },
                        { icon: <MessageCircle className="h-5 w-5" />, title: "Support 24/7", desc: "CS selalu siap bantu", color: "#8b5cf6" },
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="rounded-2xl bg-[#1a1a1a]/80 border p-4 flex flex-col items-center text-center gap-2"
                          style={{ borderColor: `${feature.color}20` }}
                        >
                          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${feature.color}15`, color: feature.color }}>
                            {feature.icon}
                          </div>
                          <h3 className="text-xs font-bold text-white font-title">{feature.title}</h3>
                          <p className="text-[10px] text-[#8a8a8a] leading-tight">{feature.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              ) : (
                /* ===== PRODUCT LISTING (when category selected or search active) ===== */
                <section className="pt-3 pb-4">
                  <div className="px-3.5">
                    {/* Back button */}
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); handleResetFilter(); }}
                        className="flex items-center gap-1.5 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors"
                        style={{ color: currentTheme.accent }}>
                        <ArrowLeft className="h-4 w-4" />Kembali
                      </button>
                    </div>

                    {/* Product Banner (uploaded) or Game Banner (fallback) - ONLY on category pages */}
                    {selectedCategory !== "all" && !searchQuery && (() => {
                      const cat = categories.find((c) => c.slug === selectedCategory);
                      if (!cat) return null;

                      // If there are uploaded product banners for this category, show them
                      if (productBanners.length > 0) {
                        return (
                          <div className="mb-4">
                            {productBanners.length === 1 ? (
                              // Single banner - show full width
                              <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="relative w-full rounded-2xl overflow-hidden group border border-white/10 shadow-xl shadow-black/30"
                                style={{ aspectRatio: '1080/459', borderColor: currentTheme.border, boxShadow: `0 0 20px ${currentTheme.glow}` }}
                              >
                                {productBanners[0].link ? (
                                  <a href={productBanners[0].link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                    <img src={productBanners[0].coverUrl || productBanners[0].imageUrl} alt={productBanners[0].title || cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                  </a>
                                ) : (
                                  <img src={productBanners[0].coverUrl || productBanners[0].imageUrl} alt={productBanners[0].title || cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--home-accent-bg,#020617)]/80 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: currentTheme.bannerGrad }} />
                                {(productBanners[0].title || productBanners[0].description) && (
                                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                                    className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
                                    {productBanners[0].title && <h2 className="text-sm sm:text-xl font-bold text-white drop-shadow-lg line-clamp-1">{productBanners[0].title}</h2>}
                                    {productBanners[0].description && <p className="text-[10px] sm:text-xs text-white/60 mt-0.5 line-clamp-1">{productBanners[0].description}</p>}
                                  </motion.div>
                                )}
                              </motion.div>
                            ) : (
                              // Multiple banners - carousel
                              <BannerCarousel banners={productBanners} slideDuration={settings?.bannerSlideDuration || 4} isProductBanner />
                            )}
                          </div>
                        );
                      }

                      // Fallback to generated GameBanner
                      return <GameBanner theme={currentTheme} category={cat} productCount={products.length} />;
                    })()}

                    {/* Action buttons: Filter only */}
                    {selectedCategory !== "all" && !searchQuery && (
                      <div className="mb-4">
                        <button
                          onClick={() => setFilterOpen(true)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-[0.98]"
                          style={{ background: `linear-gradient(90deg, ${currentTheme.btnFrom}, ${currentTheme.btnTo})`, boxShadow: `0 0 12px ${currentTheme.glow}` }}
                        >
                          <SlidersHorizontal className="h-3.5 w-3.5" />Filter Akun
                          {hasActiveFilter && <span className="h-2 w-2 rounded-full bg-white animate-pulse" />}
                        </button>
                      </div>
                    )}

                    {/* Search bar within category */}
                    {selectedCategory !== "all" && (
                      <div className="mb-4">
                        <div className="vexa-search flex items-center px-4 py-2.5 rounded-xl" style={{ borderColor: currentTheme.border }}>
                          <Search className="h-4 w-4 text-[#8a8a8a] mr-2 shrink-0" />
                          <Input
                            placeholder="Cari Judul Akun, Skin Senjata, dll"
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="flex-1 bg-transparent border-0 text-white placeholder:text-[#8a8a8a] focus:ring-0 focus:outline-none h-8 text-sm"
                          />
                          {categorySearch && (
                            <button onClick={() => setCategorySearch("")} className="text-[#8a8a8a] hover:text-white transition-colors shrink-0">
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => { if (categorySearch) { setSearchQuery(categorySearch); } }}
                            className="ml-2 px-4 py-1.5 rounded-lg text-xs font-bold text-white shrink-0 transition-all active:scale-[0.98]"
                            style={{ background: `linear-gradient(90deg, ${currentTheme.btnFrom}, ${currentTheme.btnTo})` }}
                          >
                            Cari
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quick filter bar - horizontal scrollable chips - always visible */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 overflow-x-auto scroll-x-smooth pb-1">
                        <span className="flex items-center gap-1 text-xs font-semibold text-white/50 shrink-0">
                          <Filter className="h-3.5 w-3.5" />Filter
                        </span>
                        {[
                          { key: "price_asc" as const, label: "Termurah", icon: ChevronUp },
                          { key: "price_desc" as const, label: "Termahal", icon: ChevronDown },
                          { key: "newest" as const, label: "Terbaru", icon: Clock },
                        ].map((opt) => {
                          const IconComp = opt.icon;
                          const isActive = activeSortBy === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => {
                                if (isActive) {
                                  setActiveSortBy("default");
                                } else {
                                  setActiveSortBy(opt.key);
                                }
                              }}
                              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                                isActive
                                  ? "text-white"
                                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                              }`}
                              style={isActive ? {
                                background: `linear-gradient(90deg, ${currentTheme.btnFrom}, ${currentTheme.btnTo})`,
                                boxShadow: `0 0 8px ${currentTheme.glow}`,
                              } : { border: `1px solid rgba(255,255,255,0.08)` }}
                            >
                              <IconComp className="h-3.5 w-3.5" />
                              {opt.label}
                            </button>
                          );
                        })}
                        {hasActiveFilter && (
                          <button
                            onClick={handleResetFilter}
                            className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                            style={{ border: `1px solid rgba(255,255,255,0.08)` }}
                          >
                            <X className="h-3.5 w-3.5" />
                            Reset
                          </button>
                        )}
                        <button
                          onClick={() => setFilterOpen(true)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                          style={{ border: `1px solid rgba(255,255,255,0.08)` }}
                        >
                          <SlidersHorizontal className="h-3.5 w-3.5" />
                          Filter Lanjutan
                        </button>
                      </div>
                    </div>

                    {/* Product count + Active filter indicator */}
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs text-[#8a8a8a]">{products.length} akun tersedia</p>
                      {hasActiveFilter && (
                        <button onClick={handleResetFilter} className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors" style={{ color: currentTheme.accent }}>
                          <X className="h-2.5 w-2.5" />Hapus Filter
                        </button>
                      )}
                    </div>

                    {isLoadingProducts ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="rounded-[18px] overflow-hidden bg-[#1a1a1a]" style={{ border: `1px solid ${currentTheme.cardBorder}` }}>
                            <div className="vexa-skeleton" style={{ aspectRatio: "1080/1350" }} />
                            <div className="p-2.5 space-y-1.5"><div className="vexa-skeleton h-3 w-full" /><div className="vexa-skeleton h-3 w-2/3" /><div className="vexa-skeleton h-5 w-20" /></div>
                          </div>
                        ))}
                      </div>
                    ) : products.length === 0 ? (
                      <div className="flex flex-col items-center py-12 text-center">
                        <span className="text-4xl mb-3">🔍</span>
                        <h3 className="text-base font-semibold text-white font-heading">Akun tidak ditemukan</h3>
                        <p className="text-xs text-[#8a8a8a] mt-1">Coba ubah kategori atau kata kunci pencarian</p>
                        {selectedCategory !== "all" && (
                          <Button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); handleResetFilter(); }}
                            className="mt-4 gap-2 text-white font-bold" style={{ background: `linear-gradient(90deg, ${currentTheme.btnFrom}, ${currentTheme.btnTo})`, boxShadow: `0 0 12px ${currentTheme.glow}` }}>
                            <ArrowLeft className="h-4 w-4" />Lihat Semua Game
                          </Button>
                        )}
                      </div>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch">
                        {products.map((product) => (
                          <ProductCard key={product._id as string} product={product}
                            categoryInfo={product.category as { name: string; slug: string; icon: string } | undefined}
                            likeData={likeData} likingProducts={likingProducts} sessionId={sessionId}
                            onToggleLike={handleToggleLike} onClick={() => handleProductClick(product)}
                            theme={currentTheme} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </section>
              )}


            </motion.div>
          )}

          {/* ===== CEK TRANSAKSI PAGE ===== */}
          {activePage === "cek-transaksi" && (
            <motion.div key="cek-transaksi" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="py-6">
              <div className="px-3.5 max-w-lg mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: `${ha}10` }}>
                    <ClipboardList className="h-7 w-7" style={{ color: ha }} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Cek Pesanan</h2>
                  <p className="text-sm text-[#8a8a8a] mt-1">Masukkan ID transaksi atau nomor WhatsApp</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#1a1a1a] p-5">
                  <div className="flex gap-2">
                    <Input placeholder="ID Transaksi atau No. WhatsApp" value={checkInput} onChange={(e) => setCheckInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCheckTransaction()}
                      className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-[#8a8a8a] h-11 rounded-xl" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Button onClick={handleCheckTransaction} disabled={isCheckingTransaction}
                      className="gap-1.5 text-white font-bold h-11 px-5 rounded-xl shadow-lg" style={{ background: `linear-gradient(to right, ${ha}, ${haTo})`, boxShadow: `0 10px 15px -3px ${ha}20` }}>
                      {isCheckingTransaction ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="h-4 w-4" /></motion.div> : <Search className="h-4 w-4" />}
                      <span className="hidden sm:inline">Cek</span>
                    </Button>
                  </div>
                  <AnimatePresence>
                    {transactionResult && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                        <Separator className="mb-4" style={{ background: `${ha}15` }} />
                        {Array.isArray(transactionResult) ? (
                          <div className="space-y-4">
                            {transactionResult.map((tx, idx) => (
                              <div key={idx} className="rounded-lg p-3 space-y-2 border border-white/5" style={{ background: haBg }}>
                                <div className="flex items-center justify-between"><span className="text-xs text-[#8a8a8a]">ID Transaksi</span><span className="font-mono text-xs text-white">{tx.transactionId}</span></div>
                                <div className="flex items-center justify-between"><span className="text-xs text-[#8a8a8a]">Produk</span><span className="text-xs text-white">{tx.productName}</span></div>
                                <div className="flex items-center justify-between"><span className="text-xs text-[#8a8a8a]">Total</span><span className="text-xs font-semibold font-price" style={{ color: ha }}>{formatRupiah(tx.totalAmount)}</span></div>
                                <div className="flex items-center justify-between"><span className="text-xs text-[#8a8a8a]">Status</span><Badge variant={statusBadgeVariant(tx.status) as "default" | "secondary" | "destructive" | "outline"}>{statusLabel(tx.status)}</Badge></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between"><span className="text-sm text-[#8a8a8a]">ID Transaksi</span><span className="font-mono text-sm text-white">{transactionResult.transactionId}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-[#8a8a8a]">Produk</span><span className="text-sm text-white">{transactionResult.productName}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-[#8a8a8a]">Pelanggan</span><span className="text-sm text-white">{transactionResult.customerName}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-[#8a8a8a]">Total</span><span className="text-sm font-semibold font-price" style={{ color: ha }}>{formatRupiah(transactionResult.totalAmount)}</span></div>
                            <div className="flex items-center justify-between"><span className="text-sm text-[#8a8a8a]">Status</span><Badge variant={statusBadgeVariant(transactionResult.status) as "default" | "secondary" | "destructive" | "outline"}>{statusLabel(transactionResult.status)}</Badge></div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== KERANJANG PAGE ===== */}
          {activePage === "keranjang" && (
            <motion.div key="keranjang" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="py-6">
              <div className="px-3.5 max-w-lg mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: `${ha}10` }}>
                    <ShoppingCart className="h-7 w-7" style={{ color: ha }} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Keranjang</h2>
                  <p className="text-sm text-[#8a8a8a] mt-1">{cartItems.length > 0 ? `${cartItems.length} akun dalam keranjang` : "Keranjang kamu kosong"}</p>
                </div>
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center py-8">
                    <span className="text-5xl mb-3">🛒</span>
                    <p className="text-sm text-[#8a8a8a]">Belum ada produk di keranjang</p>
                    <Button onClick={() => navigateTo("home")} className="mt-4 gap-2 text-white font-bold rounded-xl shadow-lg" style={{ background: `linear-gradient(to right, ${ha}, ${haTo})`, boxShadow: `0 10px 15px -3px ${ha}20` }}>
                      <Home className="h-4 w-4" />Cari Akun Game
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const hasDiscount = item.originalPrice && item.originalPrice > item.price;
                      const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;
                      return (
                        <motion.div key={item._id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                          className="flex gap-3 rounded-xl bg-[#1a1a1a] border border-white/5 p-3">
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-[#0a0a0a]">
                            {firstImage ? <img src={firstImage} alt={item.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-2xl">🎮</div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight font-title">{item.name}</h3>
                            <div className="mt-1">
                              {hasDiscount && <p className="text-[10px] line-through font-price opacity-60" style={{ color: ha }}>{formatRupiah(item.originalPrice!)}</p>}
                              <div className="flex items-baseline gap-0.5">
                                <span className="text-[9px] font-semibold opacity-50 font-body" style={{ color: ha }}>Rp</span>
                                <span className="text-sm font-price leading-none text-white">{new Intl.NumberFormat('id-ID').format(item.price)}</span>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item._id)} className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center transition-colors self-center hover:opacity-80" style={{ background: `${ha}10`, color: ha }}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                    <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-[#8a8a8a]">Total ({cartItems.length} item)</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-semibold opacity-50 font-body" style={{ color: ha }}>Rp</span>
                          <span className="text-lg font-price leading-none text-white">{new Intl.NumberFormat('id-ID').format(cartTotal)}</span>
                        </div>
                      </div>
                      <Separator className="mb-3" style={{ background: `${ha}15` }} />
                      <p className="text-[10px] text-[#8a8a8a] mb-3">* Pembayaran dilakukan per item. Klik &quot;Beli Sekarang&quot; untuk memulai checkout.</p>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <Button key={item._id}
                            onClick={() => {
                              const prod = products.find((p) => (p._id as string) === item._id);
                              if (prod) { handleBuyNow(prod); } else {
                                handleBuyNow({ _id: item._id as any, name: item.name, slug: item.slug, category: "" as any, description: "", images: item.images, specs: [], price: item.price, originalPrice: item.originalPrice, views: 0, likes: 0, isActive: true, isFeatured: false, isSold: false, order: 0, createdAt: new Date(), updatedAt: new Date() });
                              }
                            }}
                            className="w-full gap-2 text-white font-bold h-10 text-xs rounded-xl shadow-lg" style={{ background: `linear-gradient(to right, ${ha}, ${haTo})`, boxShadow: `0 10px 15px -3px ${ha}15` }}>
                            <CreditCard className="h-4 w-4" />Beli &quot;{item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name}&quot;
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== BANTUAN PAGE ===== */}
          {activePage === "bantuan" && (
            <motion.div key="bantuan" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="py-6">
              <div className="px-3.5 max-w-lg mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: `${ha}10` }}>
                    <HelpCircle className="h-7 w-7" style={{ color: ha }} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Pusat Bantuan</h2>
                  <p className="text-sm text-[#8a8a8a] mt-1">Butuh bantuan? Kami siap membantu kamu!</p>
                </div>

                {/* FAQ Section */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider font-heading">Pertanyaan Umum</h3>
                  {[
                    { q: "Bagaimana cara membeli akun?", a: "Pilih akun game yang diinginkan → Klik \"Lihat Detail\" → Klik \"Order Sekarang\" → Isi data diri → Bayar via QRIS → Hubungi admin untuk mendapatkan data akun." },
                    { q: "Apakah akun yang dijual aman?", a: "Ya! Semua akun yang kami jual sudah terverifikasi dan dilengkapi garansi lifetime. Jika ada masalah, kamu bisa langsung menghubungi admin kami." },
                    { q: "Metode pembayaran apa yang tersedia?", a: "Saat ini kami menerima pembayaran melalui QRIS yang bisa digunakan dari berbagai e-wallet dan mobile banking." },
                    { q: "Bagaimana jika akun bermasalah?", a: "Segera hubungi admin melalui WhatsApp. Kami akan membantu menyelesaikan masalah dan memberikan penggantian jika diperlukan." },
                    { q: "Apakah bisa refund?", a: "Refund bisa dilakukan jika akun tidak sesuai deskripsi atau bermasalah. Hubungi admin dalam waktu 24 jam setelah pembelian." },
                  ].map((faq, idx) => (
                    <div key={idx} className="rounded-xl bg-[#1a1a1a] border border-white/5 overflow-hidden">
                      <details className="group">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-white hover:bg-white/5 transition-colors list-none">
                          <span className="flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 rounded-full items-center justify-center text-[10px] font-bold shrink-0" style={{ background: `${ha}10`, color: ha }}>{idx + 1}</span>
                            {faq.q}
                          </span>
                          <ChevronDown className="h-4 w-4 text-white/40 group-open:rotate-180 transition-transform shrink-0" />
                        </summary>
                        <div className="px-4 pb-3 pt-0">
                          <p className="text-xs text-[#8a8a8a] leading-relaxed pl-8">{faq.a}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="rounded-xl border p-5" style={{ borderColor: `${ha}20`, background: `linear-gradient(to bottom right, #1a1a1a, ${haBg})` }}>
                  <h3 className="text-sm font-bold text-white mb-3 font-heading">Hubungi Kami</h3>
                  <p className="text-xs text-[#8a8a8a] mb-4">Masih butuh bantuan? Silakan hubungi admin kami melalui:</p>
                  <div className="space-y-3">
                    {settings?.whatsappNumber && (
                      <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white font-title">WhatsApp</p>
                          <p className="text-[10px] text-white/50">Chat langsung dengan admin</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/30 ml-auto" />
                      </a>
                    )}
                    {settings?.telegramUsername && (
                      <a href={`https://t.me/${settings.telegramUsername.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors" style={{ backgroundColor: `${ha}1A`, borderColor: `${ha}33` }}>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ha}33` }}>
                          <svg className="h-5 w-5" style={{ color: ha }} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white font-title">Telegram</p>
                          <p className="text-[10px] text-white/50">{settings.telegramUsername}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/30 ml-auto" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== TUTORIAL PAGE ===== */}
          {activePage === "tutorial" && (
            <motion.div key="tutorial" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="py-6">
              <div className="px-3.5 max-w-lg mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: `${ha}10` }}>
                    <BookOpen className="h-7 w-7" style={{ color: ha }} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Tutorial Beli Akun</h2>
                  <p className="text-sm text-[#8a8a8a] mt-1">Ikuti langkah-langkah berikut untuk membeli akun game</p>
                </div>

                {/* Step-by-step tutorial */}
                <div className="space-y-4 mb-6">
                  {[
                    { step: 1, title: "Pilih Game", desc: "Pilih kategori game yang kamu inginkan dari halaman utama. Klik pada ikon game untuk melihat daftar akun yang tersedia.", icon: <Gamepad2 className="h-5 w-5" /> },
                    { step: 2, title: "Pilih Akun", desc: "Browse daftar akun yang tersedia. Gunakan filter untuk menyortir berdasarkan harga, status, atau yang terbaru. Klik \"Lihat Detail\" untuk info lengkap.", icon: <Search className="h-5 w-5" /> },
                    { step: 3, title: "Order Akun", desc: "Setelah menemukan akun yang diinginkan, klik \"Order Sekarang\". Isi data diri kamu (nama lengkap, nomor WhatsApp, email opsional).", icon: <ShoppingCart className="h-5 w-5" /> },
                    { step: 4, title: "Bayar via QRIS", desc: "Lakukan pembayaran menggunakan QRIS. Scan kode QR yang muncul menggunakan e-wallet atau mobile banking. Pastikan nominal sesuai.", icon: <QrCode className="h-5 w-5" /> },
                    { step: 5, title: "Hubungi Admin", desc: "Setelah pembayaran berhasil, hubungi admin melalui WhatsApp untuk mendapatkan data akun. Admin akan memverifikasi dan mengirimkan data akun kamu.", icon: <MessageCircle className="h-5 w-5" /> },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4"
                    >
                      {/* Step number with line */}
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0" style={{ background: `linear-gradient(to bottom right, ${ha}, ${haTo})`, boxShadow: `0 4px 6px -1px ${ha}20` }}>
                          {item.step}
                        </div>
                        {idx < 4 && <div className="w-0.5 flex-1 my-1" style={{ background: `linear-gradient(to bottom, ${ha}40, ${ha}10)` }} />}
                      </div>
                      {/* Step content */}
                      <div className="flex-1 pb-4">
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span style={{ color: ha }}>{item.icon}</span>
                            <h4 className="text-sm font-bold text-white font-heading">{item.title}</h4>
                          </div>
                          <p className="text-xs text-[#8a8a8a] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tips section */}
                <div className="rounded-xl border p-4 mb-6" style={{ borderColor: `${ha}33`, backgroundColor: `${haDark}1A` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" style={{ color: ha }} />
                    <h4 className="text-sm font-bold font-heading" style={{ color: `${ha}CC` }}>Tips Penting</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Selalu cek detail akun sebelum membeli",
                      "Pastikan nomor WhatsApp yang dimasukkan aktif",
                      "Simpan bukti pembayaran sebagai referensi",
                      "Segera hubungi admin jika ada masalah",
                      "Jangan bagikan data akun ke orang lain",
                    ].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: `${ha}B3` }}>
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: ha }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA to start buying */}
                <div className="text-center">
                  <Button onClick={() => navigateTo("home")} className="gap-2 home-gradient-btn text-white font-bold h-12 px-8 rounded-xl text-base" style={{ background: `linear-gradient(to right, ${ha}, ${haTo})`, boxShadow: `0 10px 15px -3px ${ha}33` }}>
                    <Gamepad2 className="h-5 w-5" />Mulai Beli Akun
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ===== FILTER MODAL ===== */}
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        priceMin={priceMin} priceMax={priceMax} sortBy={sortBy} filterStatus={filterStatus}
        setPriceMin={setPriceMin} setPriceMax={setPriceMax} setSortBy={setSortBy} setFilterStatus={setFilterStatus}
        onApply={handleApplyFilter} onReset={handleResetFilter}
        onQuickSort={(v) => setActiveSortBy(v as typeof activeSortBy)}
        onQuickStatusChange={(v) => setActiveFilterStatus(v)}
        onQuickPriceChange={(min, max) => { setActivePriceMin(min); setActivePriceMax(max); }}
        theme={currentTheme}
      />

      {/* ===== FOOTER ===== */}
      <footer className="border-t home-footer-bg mt-auto" style={{ borderColor: `${ha}26`, backgroundColor: haBgEnd }}>
        <div className="px-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-white/30">© 2025 {settings?.siteName || "RYYSENGTOR"}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ===== PRODUCT DETAIL DIALOG ===== */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent showCloseButton={false} className="max-w-lg max-h-[95vh] overflow-y-auto text-white p-0 rounded-2xl" style={{ backgroundColor: haBgEnd, border: `1px solid ${ha}1A` }}>
          {detailProduct && (() => {
            // Collect all images: detailImages first, then regular images
            const allImages = [
              ...((detailProduct as any).detailImages || []),
              ...(detailProduct.images || []),
            ];
            const selectedImage = allImages.length > 0 ? allImages[detailSelectedImageIdx] : null;
            const categoryTheme = detailProduct.category && typeof detailProduct.category === "object"
              ? getTheme((detailProduct.category as { slug: string }).slug, settings?.siteTheme as 'red' | 'blue' | undefined)
              : homeBaseTheme;

            return (
              <>
                <DialogHeader className="sr-only">
                  <DialogTitle>{detailProduct.name}</DialogTitle>
                  <DialogDescription>Detail produk {detailProduct.name}</DialogDescription>
                </DialogHeader>

                {/* Custom visible close button */}
                <button
                  onClick={() => setDetailOpen(false)}
                  className="vexa-close-btn"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Image Gallery Section */}
                <div className="space-y-0">
                  {/* Main Large Image - Full 1080x1350 display, no crop */}
                  <div className="relative w-full bg-[#111]">
                    {selectedImage ? (
                      <motion.img
                        key={detailSelectedImageIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        src={selectedImage}
                        alt={`${detailProduct.name} - Gambar ${detailSelectedImageIdx + 1}`}
                        className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                      />
                    ) : (
                      <div className="w-full flex items-center justify-center py-20">
                        <span className="text-7xl opacity-40">{(detailProduct.category as { icon?: string })?.icon || "🎮"}</span>
                      </div>
                    )}
                    {/* Image counter */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full z-20">
                        {detailSelectedImageIdx + 1}/{allImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Grid */}
                  {allImages.length > 1 && (
                    <div className="flex gap-2 p-3 overflow-x-auto scrollbar-thin">
                      {allImages.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setDetailSelectedImageIdx(idx)}
                          className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            detailSelectedImageIdx === idx
                              ? "border-white/80 ring-1 ring-white/20 scale-105"
                              : "border-white/10 opacity-60 hover:opacity-90"
                          }`}
                        >
                          <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain bg-[#111]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info Section - Below Image */}
                <div className="p-4 pt-2 space-y-4">
                  {/* Product Name */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                    <h2 className="text-white font-bold text-lg leading-snug tracking-tight font-heading">{detailProduct.name}</h2>
                  </motion.div>

                  {/* Status + Category Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {detailProduct.isSold ? (
                      <Badge className="home-sold-badge text-xs gap-1 font-bold" style={{ backgroundColor: `${haDark}33`, color: ha, borderColor: `${ha}4D` }}><X className="h-3 w-3" /> Akun Terjual</Badge>
                    ) : (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs gap-1 font-bold"><CheckCircle2 className="h-3 w-3" /> Akun Ready</Badge>
                    )}
                    {detailProduct.category && typeof detailProduct.category === "object" && (
                      <Badge
                        className="text-xs gap-1 font-semibold"
                        style={{
                          background: `${categoryTheme.accent}15`,
                          color: categoryTheme.accent,
                          borderColor: `${categoryTheme.accent}30`,
                        }}
                      >
                        {(detailProduct.category as { icon?: string }).icon} {(detailProduct.category as { name: string }).name}
                      </Badge>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="rounded-xl p-4 border" style={{
                    background: `${categoryTheme.accent}08`,
                    borderColor: `${categoryTheme.accent}25`,
                  }}>
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        {detailProduct.originalPrice && detailProduct.originalPrice > detailProduct.price && (
                          <p className="text-sm line-through font-medium font-price opacity-60" style={{ color: `${categoryTheme.accent}80` }}>{formatRupiah(detailProduct.originalPrice)}</p>
                        )}
                        {detailProduct.price > 0 ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-semibold opacity-50 font-body" style={{ color: categoryTheme.accent }}>Rp</span>
                            <span className="text-2xl sm:text-3xl font-price leading-none text-white">{new Intl.NumberFormat('id-ID').format(detailProduct.price)}</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-price leading-none" style={{ color: '#22c55e' }}>Gratis</span>
                        )}
                      </div>
                      {detailProduct.originalPrice && detailProduct.originalPrice > detailProduct.price && (
                        <Badge className="text-[10px] font-bold" style={{
                          background: `${categoryTheme.accent}15`,
                          color: categoryTheme.accent,
                          borderColor: `${categoryTheme.accent}25`,
                        }}>
                          Hemat <span className="font-price">Rp {new Intl.NumberFormat('id-ID').format(detailProduct.originalPrice - detailProduct.price)}</span>
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Guarantee Badges */}
                  {!detailProduct.isSold && (
                    <div className="flex items-center gap-3 justify-center">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ background: `linear-gradient(to right, ${ha}33, ${haTo}33)`, borderColor: `${ha}4D` }}>
                        <Shield className="h-4 w-4" style={{ color: ha }} /><span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${ha}CC` }}>Lifetime Guaranteed</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ background: `linear-gradient(to right, ${ha}33, ${haTo}33)`, borderColor: `${ha}4D` }}>
                        <Lock className="h-4 w-4" style={{ color: ha }} /><span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${ha}CC` }}>No Hack</span>
                      </div>
                    </div>
                  )}

                  {/* Specs - Professional Table */}
                  {detailProduct.specs && detailProduct.specs.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center h-7 w-7 rounded-lg" style={{ background: `${categoryTheme.accent}15` }}>
                          <SlidersHorizontal className="h-4 w-4" style={{ color: categoryTheme.accent }} />
                        </div>
                        <h3 className="text-sm font-bold text-white font-heading">Spesifikasi Akun</h3>
                        <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${categoryTheme.accent}30, transparent)` }} />
                      </div>
                      <div className="vexa-spec-table" style={{ borderColor: `${categoryTheme.accent}15` }}>
                        {detailProduct.specs.map((spec, idx) => {
                          const specIcons = [Shield, Zap, Star, Lock, BadgeCheck, CircleDot, Key, Banknote];
                          const SpecIcon = specIcons[idx % specIcons.length];
                          return (
                            <div key={idx} className="vexa-spec-row" style={{
                              borderLeftColor: 'transparent',
                            }}>
                              <div className="vexa-spec-icon" style={{ background: `${categoryTheme.accent}12` }}>
                                <SpecIcon className="h-3.5 w-3.5" style={{ color: categoryTheme.accent }} />
                              </div>
                              <span className="vexa-spec-label">{spec.label}</span>
                              <span className="vexa-spec-value" title={spec.value}>{spec.value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {detailProduct.description && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1 font-heading">Deskripsi</h3>
                      <p className="text-sm text-[#8a8a8a] leading-relaxed whitespace-pre-line">{detailProduct.description}</p>
                    </div>
                  )}

                  {/* Like & View */}
                  <div className="flex items-center gap-4">
                    <button className={`flex items-center gap-1.5 text-sm transition-colors ${likeData.userLikes.includes(detailProduct._id as string) ? "text-[var(--home-accent)]" : "text-[#8a8a8a] hover:text-[var(--home-accent)]"}`}
                      onClick={() => handleToggleLike(detailProduct._id as string)}>
                      <Heart className={`h-5 w-5 ${likeData.userLikes.includes(detailProduct._id as string) ? "fill-[var(--home-accent)]" : ""}`} />
                      <span className="font-medium">{likeData.counts[detailProduct._id as string] ?? detailProduct.likes ?? 0} Suka</span>
                    </button>
                    <span className="flex items-center gap-1.5 text-sm text-[#8a8a8a]">
                      <Eye className="h-5 w-5" /><span>{detailProduct.views || 0}x dilihat</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 pb-2">
                    {!detailProduct.isSold ? (
                      <>
                        <Button onClick={() => handleBuyNow()} className="w-full gap-2 text-white font-bold h-12 text-base shadow-lg rounded-xl" style={{
                          background: `linear-gradient(135deg, ${categoryTheme.btnFrom}, ${categoryTheme.btnTo})`,
                          boxShadow: `0 8px 24px ${categoryTheme.accent}25`,
                        }}>
                          <CreditCard className="h-5 w-5" />Order Sekarang
                        </Button>
                        <Button onClick={(e) => addToCart(detailProduct, e)} variant="outline" className="w-full gap-2 h-10 rounded-xl" style={{
                          borderColor: `${categoryTheme.accent}30`,
                          color: categoryTheme.accent,
                        }} disabled={isInCart(detailProduct._id as string)}>
                          <ShoppingCart className="h-4 w-4" />{isInCart(detailProduct._id as string) ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
                        </Button>
                      </>
                    ) : (
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-center gap-2 py-3 rounded-xl home-sold-banner border" style={{ backgroundColor: `${haDark}1A`, borderColor: `${ha}33` }}>
                          <X className="size-5 text-[var(--home-accent)]" /><span className="text-[var(--home-accent)] font-bold text-sm">Akun Sudah Terjual</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ===== CHECKOUT DIALOG ===== */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto home-checkout-bg text-white" style={{ backgroundColor: haBg, borderColor: `${ha}1A` }}>
          <DialogHeader>
            <DialogTitle className="home-checkout-title" style={{ color: ha }}>Checkout</DialogTitle>
            <DialogDescription className="text-[#8a8a8a]">{selectedProduct?.name || "Pembayaran akun game"}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between px-2 py-3">
            {checkoutSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              return (
                <div key={step.key} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? "bg-emerald-500 text-white" : isActive ? "home-gradient-btn text-white" : "bg-white/10 text-[#8a8a8a]"}`} style={isActive ? { background: `linear-gradient(to right, ${ha}, ${haTo})` } : undefined}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                    </div>
                    <span className={`text-[10px] ${isActive ? "text-[var(--home-accent)] font-bold" : "text-[#8a8a8a]"}`}>{step.label}</span>
                  </div>
                  {idx < checkoutSteps.length - 1 && (
                    <div className={`h-[2px] w-6 sm:w-10 mx-1 mb-4 ${idx < currentStepIndex ? "bg-emerald-500" : "bg-white/10"}`} />
                  )}
                </div>
              );
            })}
          </div>

          <Separator className="home-checkout-border" style={{ backgroundColor: `${ha}26` }} />

          <AnimatePresence mode="wait">
            {checkoutStep === "data" && (
              <motion.div key="data" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 py-2">
                {selectedProduct && (
                  <div className="flex items-center gap-3 rounded-xl bg-[#1a1a1a] p-3 border home-checkout-border" style={{ borderColor: `${ha}33` }}>
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#020617]">
                      {selectedProduct.images && selectedProduct.images.length > 0 ? <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-xl">🎮</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white line-clamp-1 font-title">{selectedProduct.name}</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[9px] font-semibold opacity-50 font-body" style={{ color: ha }}>Rp</span>
                        <span className="text-sm font-price leading-none text-white">{new Intl.NumberFormat('id-ID').format(selectedProduct.price)}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="space-y-1.5"><Label className="text-sm text-[#8a8a8a]">Nama Lengkap</Label><Input placeholder="Masukkan nama" value={formData.customerName} onChange={(e) => setFormData((p) => ({ ...p, customerName: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-[#8a8a8a] home-input-focus h-11 rounded-xl" style={{ '--input-focus-color': ha } as React.CSSProperties} /></div>
                  <div className="space-y-1.5"><Label className="text-sm text-[#8a8a8a]">Nomor WhatsApp</Label><Input placeholder="08xxxxxxxxxx" value={formData.customerWhatsapp} onChange={(e) => setFormData((p) => ({ ...p, customerWhatsapp: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-[#8a8a8a] home-input-focus h-11 rounded-xl" style={{ '--input-focus-color': ha } as React.CSSProperties} /></div>
                  <div className="space-y-1.5"><Label className="text-sm text-[#8a8a8a]">Email (opsional)</Label><Input placeholder="email@example.com" value={formData.customerEmail} onChange={(e) => setFormData((p) => ({ ...p, customerEmail: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-[#8a8a8a] home-input-focus h-11 rounded-xl" style={{ '--input-focus-color': ha } as React.CSSProperties} /></div>
                </div>
                <Button onClick={handleCreateTransaction} disabled={isCreatingTransaction} className="w-full gap-2 home-gradient-btn text-white font-bold h-12 text-base rounded-xl" style={{ background: `linear-gradient(to right, ${ha}, ${haTo})`, boxShadow: `0 10px 15px -3px ${ha}33` }}>
                  {isCreatingTransaction ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="h-5 w-5" /></motion.div> : <ArrowRight className="h-5 w-5" />}
                  Lanjut Bayar
                </Button>
              </motion.div>
            )}

            {checkoutStep === "qris" && transactionData && (
              <motion.div key="qris" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="py-2">
                <PaymentQRIS
                  transactionId={transactionData.transactionId} qrImageUrl={transactionData.qrImageUrl} totalAmount={transactionData.totalAmount}
                  originalAmount={transactionData.originalAmount} uniqueNominal={transactionData.uniqueNominal} expiredAt={transactionData.expiredAt}
                  productName={transactionData.productName} productImage={transactionData.productImage}
                  adminWhatsappNumber={settings?.whatsappNumber} onClose={() => setCheckoutOpen(false)}
                  onPaymentStatusChange={handlePaymentStatusChange}
                />
              </motion.div>
            )}

            {checkoutStep === "success" && transactionData && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 py-4 sm:py-6">
                {showConfetti && (
                  <div className="pointer-events-none fixed inset-0 z-50">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, backgroundColor: (isRedTheme ? confettiColorsRed : confettiColors)[Math.floor(Math.random() * (isRedTheme ? confettiColorsRed : confettiColors).length)], borderRadius: Math.random() > 0.5 ? "50%" : "0", width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px` }} />
                    ))}
                  </div>
                )}
                <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }} className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30">
                    <PartyPopper className="h-12 w-12 text-white" />
                  </div>
                  <motion.div className="absolute inset-0 rounded-full border-2 border-emerald-400" initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
                  <h3 className="text-xl font-bold text-emerald-400">Pembayaran Berhasil! 🎉</h3>
                  <p className="text-sm text-[#8a8a8a] mt-1">Terima kasih, pembayaran kamu sudah dikonfirmasi</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-3 text-center">
                  <p className="text-xs text-emerald-400/70 mb-0.5">Kode Transaksi</p>
                  <p className="font-mono text-sm font-bold text-emerald-300 tracking-wide">{transactionData.transactionId}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-3 rounded-xl border p-3 w-full" style={{ borderColor: `${ha}80`, backgroundColor: `${haDark}33` }}>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-emerald-900/40">
                    {transactionData.productImage ? <img src={transactionData.productImage} alt={transactionData.productName} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-xl">🎮</div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-emerald-400 truncate">{transactionData.productName}</p>
                    <div className="flex items-baseline gap-0.5 mt-0.5">
                      <span className="text-[9px] font-semibold opacity-50 font-body text-emerald-400">Rp</span>
                      <span className="text-sm font-price leading-none text-emerald-400">{new Intl.NumberFormat('id-ID').format(transactionData.totalAmount)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500"><CheckCircle2 className="h-4 w-4 text-white" /></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="w-full rounded-xl border p-3" style={{ backgroundColor: `${haDark}33`, borderColor: `${ha}80` }}>
                  <p className="text-sm text-center leading-relaxed" style={{ color: `${ha}CC` }}>
                    <span className="font-semibold">📱 Langkah selanjutnya:</span><br />Silakan chat admin untuk mendapatkan data akun yang sudah di-order
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full space-y-2.5">
                  {settings?.whatsappNumber && (
                    <a href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Halo admin, saya sudah melakukan pembayaran untuk akun ${transactionData.productName} dengan kode transaksi ${transactionData.transactionId}. Mohon kirim data akun saya. Terima kasih!`)}`} target="_blank" rel="noopener noreferrer" className="flex w-full">
                      <Button className="gap-2 w-full h-12 text-base font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-green-500/25 rounded-xl"><WhatsAppIcon className="h-5 w-5" />Chat Admin via WhatsApp</Button>
                    </a>
                  )}
                  <Button variant="outline" onClick={handleCopyTransactionId} className="gap-2 w-full h-10 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/20 rounded-xl"><Copy className="h-4 w-4" />Salin Kode Transaksi</Button>
                  <Button onClick={() => setCheckoutOpen(false)} variant="secondary" className="gap-1.5 w-full h-10 rounded-xl"><CheckCircle2 className="h-4 w-4" /> Selesai</Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
