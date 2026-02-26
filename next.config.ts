import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const mirageApiUrl =
  process.env.NEXT_PUBLIC_MIRAGE_API_URL ??
  "https://mirage-api-ruddy.vercel.app/api";
// Derive the origin (scheme + host) for the CSP connect-src directive
const mirageApiOrigin = new URL(mirageApiUrl).origin;

const nextConfig: NextConfig = {
  output: "standalone", // ensures SSR functions are Edge-friendly
  compress: true,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // critical CSS & Tailwind tree-shaking
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self' ${mirageApiOrigin};
              font-src 'self';
              frame-ancestors 'none';
            `.replace(/\n/g, ""),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

          // Cache headers for static assets (enables HTTP/2 multiplexing benefits)
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Optional: Extra cache for fonts, JS, CSS, images
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*).(woff2|woff|ttf|css|js|png|jpg|svg|ico|xml|txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
