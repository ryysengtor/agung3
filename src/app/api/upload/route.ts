import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UploadFile from '@/models/UploadFile';
import { verifyAdmin } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    // Verify admin auth
    if (!verifyAdmin(req)) {
      return NextResponse.json({ status: 401, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ status: 400, error: 'No file provided' }, { status: 400 });
    }

    // Max file size: 10MB (client-side compression reduces typical images)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ status: 400, error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${Date.now()}-${randomUUID().slice(0, 6)}.${ext}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Store in MongoDB
    await UploadFile.create({
      filename,
      originalName: file.name,
      mimeType: file.type || 'image/png',
      size: file.size,
      data: buffer,
    });

    const url = `/api/files/${filename}`;
    const elapsed = Date.now() - startTime;
    console.log(`[Upload] ${filename} (${(file.size / 1024).toFixed(1)}KB) uploaded in ${elapsed}ms`);

    return NextResponse.json({
      status: 200,
      data: { url, filename },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { status: 500, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json({ status: 401, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const fileUrl = req.nextUrl.searchParams.get('file');
    if (!fileUrl) {
      return NextResponse.json({ status: 400, error: 'No file specified' }, { status: 400 });
    }

    // Extract filename from URL (could be full URL or just filename)
    const parts = fileUrl.split('/');
    const filename = parts[parts.length - 1];

    if (!filename) {
      return NextResponse.json({ status: 400, error: 'Invalid filename' }, { status: 400 });
    }

    const deleted = await UploadFile.findOneAndDelete({ filename });

    if (!deleted) {
      // Try to delete from local filesystem as fallback
      try {
        const { unlink } = await import('fs/promises');
        const path = await import('path');
        const localPath = path.join(process.cwd(), 'storage', 'uploads', filename);
        await unlink(localPath);
      } catch {
        // File might not exist locally either, that's ok
      }
    }

    return NextResponse.json({
      status: 200,
      data: { deleted: true, filename },
    });
  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json(
      { status: 500, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
