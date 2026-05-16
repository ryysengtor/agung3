import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsDoc extends Document {
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
  bannerSlideDuration: number;
  siteTheme: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettingsDoc>(
  {
    siteName: { type: String, default: 'Craig Of The Creek' },
    siteSlug: { type: String, default: 'craig-of-the-creek' },
    siteUrl: { type: String, default: 'https://craigofthecreek.id' },
    siteDescription: { type: String, default: 'Platform jual beli akun game terpercaya. Akun game berkualitas, harga bersahabat, bayar QRIS!' },
    siteSlogan: { type: String, default: 'Adventure Awaits, Dapatkan Akun Impianmu!' },
    logoUrl: { type: String, default: '/logo.svg' },
    ogImageUrl: { type: String, default: '' },
    whatsappNumber: { type: String, default: '6283856801224' },
    telegramUsername: { type: String, default: '@craigofthecreek' },
    instagramUrl: { type: String, default: '' },
    tiktokUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    notifyWhatsApp: { type: Boolean, default: true },
    notifyTelegram: { type: Boolean, default: true },
    notifyOnPending: { type: Boolean, default: true },
    notifyOnSuccess: { type: Boolean, default: true },
    notifyOnExpired: { type: Boolean, default: true },
    notifyOnCancel: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    qrisExpiredMinutes: { type: Number, default: 15 },
    bannerSlideDuration: { type: Number, default: 4 },
    siteTheme: { type: String, enum: ['red', 'blue'], default: 'blue' },
  },
  { timestamps: true }
);

// Force recompilation in dev mode to pick up schema changes
if (mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

const Settings = mongoose.model<ISettingsDoc>('Settings', SettingsSchema);

export default Settings;
