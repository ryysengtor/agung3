import mongoose, { Schema, Document } from 'mongoose';

export interface IUploadFileDoc extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
}

const UploadFileSchema = new Schema<IUploadFileDoc>(
  {
    filename: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

UploadFileSchema.index({ filename: 1 });

const UploadFile = mongoose.models.UploadFile || mongoose.model<IUploadFileDoc>('UploadFile', UploadFileSchema);

export default UploadFile;
