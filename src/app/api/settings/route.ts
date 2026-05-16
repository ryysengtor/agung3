import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function GET() {
  try {
    await connectDB();

    let settings = await Settings.findOne().lean();

    if (!settings) {
      settings = await Settings.create({});
    }

    // Only return public fields (no notification settings, etc.)
    // Provide defaults for new fields that may not exist in older documents
    const publicSettings = {
      siteName: settings.siteName || 'Craig Of The Creek',
      siteSlug: settings.siteSlug || slugify(settings.siteName || 'Craig Of The Creek'),
      siteUrl: settings.siteUrl || 'https://craigofthecreek.id',
      siteDescription: settings.siteDescription,
      siteSlogan: settings.siteSlogan,
      logoUrl: settings.logoUrl,
      whatsappNumber: settings.whatsappNumber,
      telegramUsername: settings.telegramUsername,
      instagramUrl: settings.instagramUrl,
      tiktokUrl: settings.tiktokUrl,
      youtubeUrl: settings.youtubeUrl,
      facebookUrl: settings.facebookUrl,
      twitterUrl: settings.twitterUrl,
      maintenanceMode: settings.maintenanceMode,
      siteTheme: settings.siteTheme || 'blue',
      bannerSlideDuration: settings.bannerSlideDuration || 4,
      qrisExpiredMinutes: settings.qrisExpiredMinutes || 15,
    };

    return NextResponse.json({
      status: 200,
      data: publicSettings,
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { status: 500, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
