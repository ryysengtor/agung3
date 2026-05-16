import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoryDoc extends Document {
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
  specTemplate: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: '🎮' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    accentColor: { type: String, default: '#3b82f6' },
    bgColor: { type: String, default: '#020617' },
    bannerColor: { type: String, default: '#3b82f6' },
    glowColor: { type: String, default: 'rgba(59,130,246,0.3)' },
    borderColor: { type: String, default: 'rgba(59,130,246,0.35)' },
    theme: { type: String, default: 'default' },
    specTemplate: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema);

export default Category;
