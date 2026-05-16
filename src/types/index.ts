/**
 * Shared TypeScript types for client & server
 *
 * IMPORTANT: This file contains ONLY type definitions.
 * No mongoose imports — safe for client-side bundling.
 *
 * Server-side code should import models from @/models/*
 * Client-side code should import types from @/types/*
 */

// ─── Product ────────────────────────────────────────────────────────

export interface ISpec {
  label: string;
  value: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string | ICategoryRef;
  description: string;
  images: string[];
  detailImages: string[];
  specs: ISpec[];
  price: number;
  originalPrice?: number;
  views: number;
  likes: number;
  isActive: boolean;
  isFeatured: boolean;
  isSold: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryRef {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  image?: string;
  accentColor?: string;
  borderColor?: string;
  glowColor?: string;
  bgColor?: string;
  theme?: string;
}

// ─── Category ───────────────────────────────────────────────────────

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  order: number;
  isActive: boolean;
  accentColor: string;
  bgColor: string;
  bannerColor: string;
  glowColor: string;
  borderColor: string;
  theme: string;
  specTemplate?: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Banner ─────────────────────────────────────────────────────────

export interface IBanner {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  order: number;
  isActive: boolean;
  type: 'home' | 'product';
  category: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Transaction ────────────────────────────────────────────────────

export interface ITransaction {
  _id: string;
  transactionId: string;
  cashifyTransactionId: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp: string;
  originalAmount: number;
  totalAmount: number;
  uniqueNominal: number;
  status: 'pending' | 'paid' | 'success' | 'expired' | 'cancel';
  qrString?: string;
  qrImageUrl?: string;
  expiredAt: string;
  paidAt?: string;
  canceledAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Settings ───────────────────────────────────────────────────────

export interface ISettings {
  _id: string;
  siteName: string;
  siteSlug: string;
  siteUrl: string;
  siteDescription: string;
  siteSlogan: string;
  logoUrl: string;
  ogImageUrl: string;
  whatsappNumber: string;
  telegramUsername: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  notifyWhatsApp: boolean;
  notifyTelegram: boolean;
  notifyOnPending: boolean;
  notifyOnSuccess: boolean;
  notifyOnExpired: boolean;
  notifyOnCancel: boolean;
  maintenanceMode: boolean;
  qrisExpiredMinutes: number;
  siteTheme: 'red' | 'blue';
  createdAt: string;
  updatedAt: string;
}

// ─── Upload File ────────────────────────────────────────────────────

export interface IUploadFile {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

// ─── Like ───────────────────────────────────────────────────────────

export interface ILike {
  _id: string;
  productId: string;
  sessionId: string;
  createdAt: string;
}
