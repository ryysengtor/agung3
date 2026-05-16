import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISpec {
  label: string;
  value: string;
}

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const SpecSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
    detailImages: { type: [String], default: [] },
    specs: [SpecSchema],
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isSold: 1 });

// Prevent OverwriteModelError in dev (hot reload) and serverless
const Product = mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema);

export default Product;
