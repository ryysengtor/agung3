import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.bmp': 'image/bmp',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    // Determine content type
    const ext = '.' + filename.split('.').pop()?.toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // ─── Strategy 1: Try MongoDB first (works on Vercel) ───
    try {
      const mongoose = await connectDB();
      const UploadFile = mongoose.models.UploadFile;
      if (UploadFile) {
        const file = await UploadFile.findOne({ filename }).select('data size mimeType').lean();
        if (file && file.data) {
          return new NextResponse(file.data.buffer as ArrayBuffer, {
            status: 200,
            headers: {
              'Content-Type': file.mimeType || contentType,
              'Content-Length': String(file.size),
              'Cache-Control': 'public, max-age=31536000, immutable',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        }
      }
    } catch {
      // MongoDB lookup failed, try local filesystem
    }

    // ─── Strategy 2: Local filesystem fallback (works in dev) ───
    try {
      const { readFile, stat } = await import('fs/promises');
      const path = await import('path');

      const STORAGE_DIR = path.join(process.cwd(), 'storage', 'uploads');
      const LEGACY_DIR = path.join(process.cwd(), 'public', 'uploads');

      // Try storage/uploads first, then public/uploads
      for (const dir of [STORAGE_DIR, LEGACY_DIR]) {
        const filepath = path.join(dir, filename);
        try {
          const fileStat = await stat(filepath);
          if (fileStat.isFile()) {
            const buffer = await readFile(filepath);
            return new NextResponse(buffer, {
              status: 200,
              headers: {
                'Content-Type': contentType,
                'Content-Length': String(fileStat.size),
                'Cache-Control': 'public, max-age=31536000, immutable',
                'X-Content-Type-Options': 'nosniff',
              },
            });
          }
        } catch {
          // File not found in this directory, try next
        }
      }
    } catch {
      // fs not available (shouldn't happen but be safe)
    }

    return new NextResponse('File not found', { status: 404 });
  } catch (error) {
    console.error('File serve error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
