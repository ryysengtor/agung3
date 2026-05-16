import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILikeDoc extends Document {
  productId: Types.ObjectId;
  sessionId: string;
  createdAt: Date;
}

const LikeSchema = new Schema<ILikeDoc>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sessionId: { type: String, required: true },
  },
  { timestamps: true }
);

// Compound index: one like per session per product
LikeSchema.index({ productId: 1, sessionId: 1 }, { unique: true });
LikeSchema.index({ productId: 1 });

const Like = mongoose.models.Like || mongoose.model<ILikeDoc>('Like', LikeSchema);

export default Like;
