import type { ICategory, IProduct } from "@/types";
import {
  User, CreditCard, QrCode, CheckCircle2,
} from "lucide-react";

// ===== Types =====
export type PageView = "home" | "cek-transaksi" | "keranjang" | "bantuan" | "tutorial";
export type CheckoutStep = "data" | "payment" | "qris" | "success";

export interface SiteSettings {
  siteName: string; siteSlug?: string; siteUrl?: string; siteDescription: string; siteSlogan: string; logoUrl: string;
  whatsappNumber: string; telegramUsername: string;
  instagramUrl?: string; tiktokUrl?: string; youtubeUrl?: string;
  facebookUrl?: string; twitterUrl?: string; maintenanceMode?: boolean;
  siteTheme?: 'red' | 'blue';
  bannerSlideDuration?: number;
  qrisExpiredMinutes?: number;
}

export interface TransactionData {
  transactionId: string; qrString: string; qrImageUrl: string; totalAmount: number;
  originalAmount: number; uniqueNominal: number; expiredAt: string;
  productName: string; productImage?: string;
}

export interface TransactionLookup {
  transactionId: string; productName: string; customerName: string;
  totalAmount: number; status: string; createdAt: string; expiredAt: string;
}

export interface BannerData {
  _id: string; imageUrl: string; coverUrl?: string; title: string; description: string;
  link: string; order: number; isActive: boolean;
  type: 'home' | 'product'; category: string;
}

export interface LikeData { counts: Record<string, number>; userLikes: string[]; }

export type ProductItem = IProduct & { category?: { name: string; slug: string; icon: string; image?: string; accentColor?: string; borderColor?: string; glowColor?: string; bgColor?: string; theme?: string } };

export interface CartItem {
  _id: string; name: string; price: number; originalPrice?: number;
  images: string[]; slug: string;
}

// ===== PER-GAME THEME CONFIG =====
export const GAME_THEMES: Record<string, {
  name: string; accent: string; glow: string; border: string;
  bgStart: string; bgMid: string; bgEnd: string; bannerGrad: string;
  cardBorder: string; cardGlow: string; btnFrom: string; btnTo: string;
}> = {
  "free-fire": {
    name: "Free Fire", accent: "#3b82f6", glow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.35)",
    bgStart: "#020617", bgMid: "#0f172a", bgEnd: "#0a0a1a",
    bannerGrad: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    cardBorder: "rgba(59,130,246,0.35)", cardGlow: "0 0 15px rgba(59,130,246,0.12)",
    btnFrom: "#3b82f6", btnTo: "#0ea5e9",
  },
  "mobile-legends": {
    name: "Mobile Legends", accent: "#3b82f6", glow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.35)",
    bgStart: "#050b22", bgMid: "#101c45", bgEnd: "#050814",
    bannerGrad: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    cardBorder: "rgba(59,130,246,0.35)", cardGlow: "0 0 15px rgba(59,130,246,0.12)",
    btnFrom: "#3b82f6", btnTo: "#8b5cf6",
  },
  "pubg": {
    name: "PUBG", accent: "#22c55e", glow: "rgba(34,197,94,0.3)", border: "rgba(34,197,94,0.35)",
    bgStart: "#101510", bgMid: "#1a2418", bgEnd: "#090d09",
    bannerGrad: "linear-gradient(135deg, #22c55e, #16a34a)",
    cardBorder: "rgba(34,197,94,0.35)", cardGlow: "0 0 15px rgba(34,197,94,0.12)",
    btnFrom: "#22c55e", btnTo: "#16a34a",
  },
  "valorant": {
    name: "Valorant", accent: "#3b82f6", glow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.35)",
    bgStart: "#020617", bgMid: "#0f172a", bgEnd: "#0a0a1a",
    bannerGrad: "linear-gradient(135deg, #3b82f6, #2563eb)",
    cardBorder: "rgba(59,130,246,0.35)", cardGlow: "0 0 15px rgba(59,130,246,0.12)",
    btnFrom: "#3b82f6", btnTo: "#2563eb",
  },
  "genshin-impact": {
    name: "Genshin Impact", accent: "#8b5cf6", glow: "rgba(139,92,246,0.3)", border: "rgba(139,92,246,0.35)",
    bgStart: "#0e1024", bgMid: "#171d40", bgEnd: "#0a0d18",
    bannerGrad: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    cardBorder: "rgba(139,92,246,0.35)", cardGlow: "0 0 15px rgba(139,92,246,0.12)",
    btnFrom: "#8b5cf6", btnTo: "#6366f1",
  },
  "roblox": {
    name: "Roblox", accent: "#3b82f6", glow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.35)",
    bgStart: "#020617", bgMid: "#0f172a", bgEnd: "#0a0a1a",
    bannerGrad: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    cardBorder: "rgba(59,130,246,0.35)", cardGlow: "0 0 15px rgba(59,130,246,0.12)",
    btnFrom: "#3b82f6", btnTo: "#0ea5e9",
  },
};

export const DEFAULT_THEME = {
  name: "Game", accent: "#3b82f6", glow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.35)",
  bgStart: "#020617", bgMid: "#0f172a", bgEnd: "#020617",
  bannerGrad: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  cardBorder: "rgba(59,130,246,0.35)", cardGlow: "0 0 15px rgba(59,130,246,0.12)",
  btnFrom: "#3b82f6", btnTo: "#06b6d4",
};

export const HOME_RED_THEME: ThemeConfig = {
  name: "Crimson Blaze",
  accent: "#ef4444",
  glow: "rgba(239,68,68,0.3)",
  border: "rgba(239,68,68,0.35)",
  bgStart: "#1a0505",
  bgMid: "#2d0a0a",
  bgEnd: "#1a0505",
  bannerGrad: "linear-gradient(135deg, #ef4444, #f97316)",
  cardBorder: "rgba(239,68,68,0.35)",
  cardGlow: "0 0 15px rgba(239,68,68,0.12)",
  btnFrom: "#ef4444",
  btnTo: "#f97316",
};

export const HOME_BLUE_THEME: ThemeConfig = {
  name: "Arctic Frost",
  accent: "#3b82f6",
  glow: "rgba(59,130,246,0.3)",
  border: "rgba(59,130,246,0.35)",
  bgStart: "#020617",
  bgMid: "#0f172a",
  bgEnd: "#020617",
  bannerGrad: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  cardBorder: "rgba(59,130,246,0.35)",
  cardGlow: "0 0 15px rgba(59,130,246,0.12)",
  btnFrom: "#3b82f6",
  btnTo: "#06b6d4",
};

export type ThemeConfig = typeof DEFAULT_THEME;

export function getTheme(slug: string, baseTheme?: 'red' | 'blue') {
  const theme = GAME_THEMES[slug] || DEFAULT_THEME;
  // If red theme is active (or no theme specified = default to red), override ALL blue/cyan accent colors with red variants
  if (baseTheme === 'red' || !baseTheme) {
    // Helper: convert any dark background to red-tinted version
    const redBg = (original: string): string => {
      // If it's a dark blue/navy/purple color, convert to red-tinted equivalent
      const redMap: Record<string, string> = {
        '#020617': '#1a0505', '#0f172a': '#2d0a0a', '#0a0a1a': '#1a0505',
        '#050b22': '#1a0505', '#101c45': '#2d0a0a', '#050814': '#1a0505',
        '#0e1024': '#1a0505', '#171d40': '#2d0a0a', '#0a0d18': '#1a0505',
        '#101510': '#1a0505', '#1a2418': '#2d0a0a', '#090d09': '#1a0505',
      };
      return redMap[original.toLowerCase()] || '#1a0505';
    };
    return {
      ...theme,
      accent: '#ef4444',
      glow: 'rgba(239,68,68,0.3)',
      border: 'rgba(239,68,68,0.35)',
      cardBorder: 'rgba(239,68,68,0.35)',
      cardGlow: '0 0 15px rgba(239,68,68,0.12)',
      btnFrom: '#ef4444',
      btnTo: '#f97316',
      bannerGrad: 'linear-gradient(135deg, #ef4444, #f97316)',
      bgStart: redBg(theme.bgStart),
      bgMid: redBg(theme.bgMid),
      bgEnd: redBg(theme.bgEnd),
    };
  }
  return theme;
}

// ===== Animation Variants =====
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};
export const pageVariants = {
  enter: { opacity: 0, x: 15 },
  center: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -15, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
};

// ===== Helpers =====
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("cotc_session_id");
  if (!sid) {
    sid = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem("cotc_session_id", sid);
  }
  return sid;
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem("cotc_cart"); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cotc_cart", JSON.stringify(items));
}

// ===== WhatsApp Icon =====
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ===== Checkout Steps =====
export const checkoutSteps: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "data", label: "Data", icon: User },
  { key: "payment", label: "Bayar", icon: CreditCard },
  { key: "qris", label: "QRIS", icon: QrCode },
  { key: "success", label: "Selesai", icon: CheckCircle2 },
];

// ===== Confetti Colors =====
export const confettiColors = ["#3b82f6", "#10b981", "#06b6d4", "#ec4899", "#8b5cf6", "#0ea5e9"];
export const confettiColorsRed = ["#ef4444", "#f97316", "#f87171", "#ec4899", "#8b5cf6", "#dc2626"];
