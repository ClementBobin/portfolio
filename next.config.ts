import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clementbobin.github.io',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
