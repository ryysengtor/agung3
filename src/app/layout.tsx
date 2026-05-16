import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const firaMono = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Fallback defaults if DB is not available
const FALLBACK = {
  siteName: "Craig Of The Creek",
  siteSlug: "craig-of-the-creek",
  siteUrl: "https://craigofthecreek.id",
  siteDescription: "Platform jual beli akun game terpercaya",
  siteSlogan: "Dapatkan Akun Game Impianmu!",
  logoUrl: "/logo.svg",
  ogImageUrl: "/og-image.png",
};

async function getSiteSettings() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      settings = await Settings.create({});
    }
    return {
      siteName: settings.siteName || FALLBACK.siteName,
      siteSlug: settings.siteSlug || FALLBACK.siteSlug,
      siteUrl: settings.siteUrl || FALLBACK.siteUrl,
      siteDescription: settings.siteDescription || FALLBACK.siteDescription,
      siteSlogan: settings.siteSlogan || FALLBACK.siteSlogan,
      logoUrl: settings.logoUrl || FALLBACK.logoUrl,
      ogImageUrl: settings.ogImageUrl || FALLBACK.ogImageUrl,
    };
  } catch {
    return FALLBACK;
  }
}

// Dynamic metadata from database
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(site.siteUrl),
    title: `${site.siteName} - Jual Beli Akun Game Terpercaya`,
    description: site.siteDescription,
    keywords: [
      "jual akun game",
      "beli akun game",
      "akun Mobile Legends",
      "akun Free Fire",
      "akun Genshin Impact",
      "akun Valorant",
      "akun PUBG Mobile",
      "akun game murah",
      "QRIS",
      site.siteName,
      "akun game terpercaya",
    ],
    authors: [{ name: site.siteName }],
    icons: {
      icon: site.logoUrl,
    },
    openGraph: {
      title: `${site.siteName} - Jual Beli Akun Game Terpercaya`,
      description: site.siteDescription,
      url: site.siteUrl,
      siteName: site.siteName,
      type: "website",
      images: [
        {
          url: site.ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${site.siteName} - Jual Beli Akun Game`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.siteName} - Jual Beli Akun Game Terpercaya`,
      description: site.siteDescription,
      images: [site.ogImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.siteName,
              description: site.siteDescription,
              url: site.siteUrl,
              logo: `${site.siteUrl}${site.logoUrl}`,
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${plusJakarta.variable} ${firaMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
