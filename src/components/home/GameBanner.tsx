"use client";

import { motion } from "framer-motion";
import { Flame, Shield } from "lucide-react";
import type { ICategory } from "@/types";
import type { ThemeConfig } from "./types";

export function GameBanner({ theme, category, productCount }: { theme: ThemeConfig; category: ICategory; productCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="vexa-game-banner mb-5"
      style={{ borderColor: theme.border }}
    >
      <div className="relative aspect-[4/1] overflow-hidden rounded-[18px]">
        {/* Background with gradient */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.bgStart}, ${theme.bgMid}, ${theme.bgEnd})` }} />
        {/* Abstract glow shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full" style={{ background: theme.accent, filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full" style={{ background: theme.accent, filter: "blur(40px)", opacity: 0.5 }} />
        </div>
        {/* Category image */}
        {category.image && (
          <div className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 h-20 w-20 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 z-10" style={{ borderColor: theme.border, boxShadow: theme.cardGlow }}>
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
        )}
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg sm:text-2xl">{category.icon}</span>
              <h2 className="text-base sm:text-2xl font-extrabold text-white drop-shadow-lg">{category.name}</h2>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-xs">{category.description || `Beli akun ${category.name} terpercaya dengan harga terbaik`}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: theme.bannerGrad }}>
                <Flame className="h-3 w-3" /> {productCount} Akun
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/50">
                <Shield className="h-3 w-3" /> Aman & Terpercaya
              </span>
            </div>
          </div>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: theme.bannerGrad }} />
      </div>
    </motion.div>
  );
}
