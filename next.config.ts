import type { NextConfig } from "next";

// ─── Security headers ─────────────────────────────────────────────────────────
// Applied to all routes via the headers() configuration.
// Adjust the Content-Security-Policy if you add additional third-party scripts.
const securityHeaders = [
  // Prevent browsers from MIME-sniffing content away from declared type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Deny clickjacking – only allow the page in iframes from same origin
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Disable legacy XSS auditor (modern browsers ignore, but safe to include)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Enforce HTTPS for 2 years, including subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Control how much referrer info is sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Limit browser feature access
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // Content Security Policy
  // 'unsafe-inline' is required for Framer Motion inline styles and Next.js internals.
  // 'unsafe-eval' may be required in development; remove in production if possible.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "frame-src https://www.google.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formspree.io",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Use webpack (not Turbopack) so fonts and assets resolve correctly
  experimental: {},

  // ── Security Headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Image optimization ─────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── Compression ────────────────────────────────────────────────────────────
  compress: true,

  // ── Power-off x-powered-by header ─────────────────────────────────────────
  poweredByHeader: false,

  // ── Strict mode for better React error surfacing ──────────────────────────
  reactStrictMode: true,
};

export default nextConfig;
