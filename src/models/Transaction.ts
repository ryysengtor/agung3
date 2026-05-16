import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITransactionDoc extends Document {
  transactionId: string;
  cashifyTransactionId: string;
  productId: Types.ObjectId;
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
  expiredAt: Date;
  paidAt?: Date;
  canceledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransactionDoc>(
  {
    transactionId: { type: String, required: true, unique: true },
    cashifyTransactionId: { type: String, default: '' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productImage: { type: String, default: '' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    customerWhatsapp: { type: String, default: '' },
    originalAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    uniqueNominal: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'success', 'expired', 'cancel'],
      default: 'pending',
    },
    qrString: { type: String, default: '' },
    qrImageUrl: { type: String, default: '' },
    expiredAt: { type: Date, required: true },
    paidAt: { type: Date },
    canceledAt: { type: Date },
  },
  { timestamps: true }
);

TransactionSchema.index({ status: 1 });
TransactionSchema.index({ customerPhone: 1 });
TransactionSchema.index({ customerWhatsapp: 1 });
TransactionSchema.index({ createdAt: -1 });

const Transaction = mongoose.models.Transaction || mongoose.model<ITransactionDoc>('Transaction', TransactionSchema);

export default Transaction;
