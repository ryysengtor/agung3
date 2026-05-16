import mongoose, { Schema, Document } from 'mongoose';

export interface IBannerDoc extends Document {
  imageUrl: string;
  coverUrl: string;
  title: string;
  description: string;
  link: string;
  order: number;
  isActive: boolean;
  type: 'home' | 'product';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBannerDoc>(
  {
    imageUrl: { type: String, required: true },
    coverUrl: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    type: { type: String, enum: ['home', 'product'], default: 'home' },
    category: { type: String, default: '' },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model<IBannerDoc>('Banner', BannerSchema);

export default Banner;
