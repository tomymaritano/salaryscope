import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=60' }],
    },
  ],
};

export default nextConfig;
