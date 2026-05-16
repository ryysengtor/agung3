"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import GameLoadingScreen from "@/components/GameLoadingScreen";

const HomePage = dynamic(() => import("@/components/home/HomePage"), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  const [showLoading, setShowLoading] = useState(true);
  const [settings, setSettings] = useState<{
    siteName: string;
    logoUrl: string;
    siteTheme: "red" | "blue";
  } | null>(null);

  // Fetch settings for loading screen branding
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSettings({
            siteName: data.data.siteName || "RYYSENGTOR",
            logoUrl: data.data.logoUrl || "/logo.svg",
            siteTheme: data.data.siteTheme === "blue" ? "blue" : "red",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLoadingFinished = useCallback(() => {
    setShowLoading(false);
  }, []);

  // Show the loading screen
  if (showLoading) {
    return (
      <GameLoadingScreen
        siteName={settings?.siteName}
        logoUrl={settings?.logoUrl}
        siteTheme={settings?.siteTheme}
        onFinished={handleLoadingFinished}
        minDuration={3000}
      />
    );
  }

  // After loading screen, show the homepage
  return <HomePage />;
}
