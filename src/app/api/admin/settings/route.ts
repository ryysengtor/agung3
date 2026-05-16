import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { verifyAdmin } from '@/lib/auth';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json(
        { status: 401, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    } else {
      // Ensure new fields exist on older documents
      let needsSave = false;
      if (!settings.siteSlug) {
        settings.siteSlug = slugify(settings.siteName || 'Craig Of The Creek');
        needsSave = true;
      }
      if (!settings.siteUrl) {
        settings.siteUrl = 'https://craigofthecreek.id';
        needsSave = true;
      }
      if (needsSave) {
        await settings.save();
      }
    }

    return NextResponse.json({
      status: 200,
      data: settings,
    });
  } catch (error) {
    console.error('Admin Settings GET error:', error);
    return NextResponse.json(
      { status: 500, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json(
        { status: 401, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json({
      status: 200,
      data: settings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Admin Settings PUT error:', error);
    return NextResponse.json(
      { status: 500, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
