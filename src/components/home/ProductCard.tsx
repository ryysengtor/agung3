"use client";

import { motion } from "framer-motion";
import { X, Star, Heart, Eye } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import type { ProductItem, LikeData, ThemeConfig } from "./types";
import { itemVariants } from "./types";

export function ProductCard({
  product, categoryInfo, likeData, likingProducts, sessionId,
  onToggleLike, onClick, theme,
}: {
  product: ProductItem; categoryInfo: { name: string; slug: string; icon: string } | undefined;
  likeData: LikeData; likingProducts: Set<string>; sessionId: string;
  onToggleLike: (id: string, e?: React.MouseEvent) => void;
  onClick: () => void; theme: ThemeConfig;
}) {
  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const hasDiscount = !!(product.originalPrice && product.originalPrice > product.price);
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
  const productId = product._id as string;
  const isLiked = likeData.userLikes.includes(productId);
  const isLiking = likingProducts.has(productId);
  const likeCount = likeData.counts[productId] ?? product.likes ?? 0;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="vexa-product-card cursor-pointer group"
        style={{
          borderColor: theme.cardBorder,
        }}
        onClick={onClick}
      >
        {/* Cover / Sampul Image - 1080x1350 Aspect Ratio, no crop */}
        <div className="relative overflow-hidden bg-[#0a0a0a]" style={{ aspectRatio: '1080/1350' }}>
          {firstImage ? (
            <>
              <img src={firstImage} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out" style={{ borderRadius: "14px 14px 0 0" }} loading="lazy" />
              {/* Subtle shimmer overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "14px 14px 0 0" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.bgStart}, ${theme.bgEnd})` }}>
              <span className="text-4xl opacity-40">{categoryInfo?.icon || "🎮"}</span>
            </div>
          )}
          {/* Sold overlay */}
          {product.isSold && (
            <div className="vexa-sold-overlay">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center h-12 w-12 rounded-full border-2" style={{ borderColor: theme.accent, background: `${theme.accent}20` }}>
                  <X className="h-7 w-7" style={{ color: theme.accent }} strokeWidth={3} />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>TERJUAL</span>
              </div>
            </div>
          )}
          {/* Badges top-left */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isFeatured && !product.isSold && (
              <span className="vexa-badge flex items-center gap-0.5" style={{ background: theme.bannerGrad }}>
                <Star className="h-2.5 w-2.5 fill-current" />Hot
              </span>
            )}
            {hasDiscount && !product.isSold && (
              <span className="vexa-badge" style={{ background: theme.bannerGrad }}>-{discountPercent}%</span>
            )}
          </div>
          {/* Heart button top-right */}
          {!product.isSold && (
            <button className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
              onClick={(e) => onToggleLike(productId, e)} disabled={isLiking}>
              <Heart className={`h-3.5 w-3.5 transition-colors ${isLiked ? "fill-[var(--home-accent)] text-[var(--home-accent)]" : "text-white/70"}`} />
            </button>
          )}
          {/* View/Like bottom-left - only show if > 0 */}
          {!product.isSold && (product.views > 0 || likeCount > 0) && (
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2">
              {product.views > 0 && (
                <span className="flex items-center gap-0.5 text-[9px] text-white/50 bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <Eye className="h-2.5 w-2.5" />{product.views}
                </span>
              )}
              {likeCount > 0 && (
                <span className="flex items-center gap-0.5 text-[9px] text-white/50 bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <Heart className="h-2.5 w-2.5" />{likeCount}
                </span>
              )}
            </div>
          )}
          {/* Bottom gradient overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
        </div>

        {/* Blue accent line separator between image and info - prominent garis biru */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.btnTo}, transparent)` }} />

        {/* Card Info - flex column with spacer for uniform button alignment */}
        <div className="card-info p-3 sm:p-4">
          {categoryInfo && (
            <span className="text-[10px] font-bold uppercase tracking-wider mb-1 block font-label" style={{ color: theme.accent }}>
              {categoryInfo.icon} {categoryInfo.name}
            </span>
          )}
          {/* Product name - FULL text visible, no truncation */}
          <h3 className="text-[13px] sm:text-sm font-bold text-white leading-snug mb-2 font-title" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
            {product.name}
          </h3>
          <div className="mb-3">
            {hasDiscount && <p className="text-[11px] line-through leading-tight font-price opacity-60" style={{ color: 'var(--home-accent)' }}>{formatRupiah(product.originalPrice!)}</p>}
            <div className="flex items-baseline gap-1">
              {product.price > 0 ? (
                <>
                  <span className="text-[10px] font-semibold opacity-50 font-body" style={{ color: 'var(--home-accent)' }}>Rp</span>
                  <span className="text-lg sm:text-xl font-price leading-none" style={{ color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                    {new Intl.NumberFormat('id-ID').format(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-base sm:text-lg font-price leading-tight" style={{ color: '#22c55e', fontVariantNumeric: 'tabular-nums' }}>Gratis</span>
              )}
            </div>
          </div>
          {/* Spacer pushes button to bottom for uniform alignment */}
          <div className="card-spacer" />
          <button
            className="w-full py-2.5 min-h-[38px] rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
            style={product.isSold
              ? { background: "rgba(255,255,255,0.05)", color: "#8a8a8a", cursor: "not-allowed", border: "1px solid rgba(255,255,255,0.05)" }
              : { background: `linear-gradient(90deg, ${theme.btnFrom}, ${theme.btnTo})`, color: "#fff", boxShadow: `0 0 12px ${theme.glow}` }
            }
            onClick={(e) => { e.stopPropagation(); if (!product.isSold) onClick(); }}
          >
            {product.isSold ? "Terjual" : "Lihat Detail"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
