import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Ensure these packages are NOT bundled into client — server-only
  serverExternalPackages: ['mongoose'],

  // Webpack configuration to keep mongoose and heavy deps server-side only
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent mongoose from being bundled in client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongoose: false,
        'mongodb-memory-server': false,
        'fs/promises': false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    // Disable filesystem caching to prevent webpack cache errors
    config.cache = false;
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
