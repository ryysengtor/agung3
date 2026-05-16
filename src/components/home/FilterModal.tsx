"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown, Clock, Flame, CheckCircle2, CircleDot, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ThemeConfig } from "./types";

export function FilterModal({
  open, onClose, priceMin, priceMax, sortBy, filterStatus,
  setPriceMin, setPriceMax, setSortBy, setFilterStatus,
  onApply, onReset, onQuickSort, onQuickStatusChange, onQuickPriceChange, theme,
}: {
  open: boolean; onClose: () => void;
  priceMin: string; priceMax: string; sortBy: string; filterStatus: "all" | "available";
  setPriceMin: (v: string) => void; setPriceMax: (v: string) => void; setSortBy: (v: any) => void; setFilterStatus: (v: "all" | "available") => void;
  onApply: () => void; onReset: () => void;
  onQuickSort: (v: string) => void; onQuickStatusChange: (v: "all" | "available") => void; onQuickPriceChange: (min: string, max: string) => void;
  theme: ThemeConfig;
}) {
  const quickSortOptions = [
    { key: "price_asc", label: "Termurah", icon: ChevronUp },
    { key: "price_desc", label: "Termahal", icon: ChevronDown },
    { key: "newest", label: "Terbaru", icon: Clock },
    { key: "popular", label: "Terpopuler", icon: Flame },
  ] as const;

  const pricePresets = [
    { label: "< 50K", min: "", max: "50000" },
    { label: "50K-100K", min: "50000", max: "100000" },
    { label: "100K-500K", min: "100000", max: "500000" },
    { label: "500K+", min: "500000", max: "" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-3 mb-3 sm:mb-0 rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, #1a1a1a, #111)`, border: `1px solid ${theme.border}` }}
          >
            {/* Close button at top */}
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Filter className="h-4 w-4" style={{ color: theme.accent }} /> Filter
              </h3>
              <button onClick={onClose} className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <X className="h-4 w-4 text-white/70" />
              </button>
            </div>

            {/* Filter content */}
            <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Quick Sort Buttons - apply immediately */}
              <div>
                <Label className="text-xs font-semibold text-white/80 mb-2 block">Urutkan</Label>
                <div className="flex flex-wrap gap-2">
                  {quickSortOptions.map((opt) => {
                    const IconComp = opt.icon;
                    const isActive = sortBy === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          const newSort = isActive ? "default" : opt.key;
                          setSortBy(newSort);
                          onQuickSort(newSort);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
                          isActive
                            ? "text-white shadow-md"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                        }`}
                        style={isActive ? {
                          background: `linear-gradient(90deg, ${theme.btnFrom}, ${theme.btnTo})`,
                          boxShadow: `0 0 12px ${theme.glow}`,
                        } : { border: `1px solid ${theme.border}` }}
                      >
                        <IconComp className="h-3.5 w-3.5" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Account Status Filter - apply immediately */}
              <div>
                <Label className="text-xs font-semibold text-white/80 mb-2 block">Status Akun</Label>
                <div className="flex gap-2">
                  {([
                    { key: "available" as const, label: "Tersedia" },
                    { key: "all" as const, label: "Semua" },
                  ]).map((opt) => {
                    const isActive = filterStatus === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setFilterStatus(opt.key);
                          onQuickStatusChange(opt.key);
                        }}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                          isActive
                            ? "text-white shadow-md"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                        }`}
                        style={isActive ? {
                          background: `linear-gradient(90deg, ${theme.btnFrom}, ${theme.btnTo})`,
                          boxShadow: `0 0 12px ${theme.glow}`,
                        } : { border: `1px solid ${theme.border}` }}
                      >
                        {opt.key === "available" && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {opt.key === "all" && <CircleDot className="h-3.5 w-3.5" />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Preset Buttons - apply immediately */}
              <div>
                <Label className="text-xs font-semibold text-white/80 mb-2 block">Rentang Harga Cepat</Label>
                <div className="flex flex-wrap gap-2">
                  {pricePresets.map((preset) => {
                    const isActive = priceMin === preset.min && priceMax === preset.max;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => {
                          if (isActive) {
                            setPriceMin("");
                            setPriceMax("");
                            onQuickPriceChange("", "");
                          } else {
                            setPriceMin(preset.min);
                            setPriceMax(preset.max);
                            onQuickPriceChange(preset.min, preset.max);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                          isActive
                            ? "text-white"
                            : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                        }`}
                        style={isActive ? {
                          background: theme.accent,
                          boxShadow: `0 0 8px ${theme.glow}`,
                        } : { border: `1px solid rgba(255,255,255,0.08)` }}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Price range */}
              <div>
                <Label className="text-xs font-semibold text-white/80 mb-2 block">Rentang Harga Kustom</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-white/40">Rp</span>
                      <Input
                        type="number" placeholder="Minimal" value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 h-10 pl-9 text-sm rounded-xl"
                      />
                    </div>
                  </div>
                  <span className="text-white/30 text-xs">—</span>
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-white/40">Rp</span>
                      <Input
                        type="number" placeholder="Maksimal" value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 h-10 pl-9 text-sm rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 border-t border-white/5 space-y-2">
              <button
                onClick={onApply}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                style={{ background: `linear-gradient(90deg, ${theme.btnFrom}, ${theme.btnTo})`, boxShadow: `0 0 16px ${theme.glow}` }}
              >
                Terapkan Harga Kustom
              </button>
              <button
                onClick={onReset}
                className="w-full py-3 rounded-xl text-sm font-bold text-white/70 bg-white/5 hover:bg-white/10 transition-all"
                style={{ border: `1px solid ${theme.border}` }}
              >
                <span className="flex items-center justify-center gap-2"><RotateCcw className="h-3.5 w-3.5" />Reset Filter</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
