import { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.cloudflare.com https://*.turnstile.com https://*.googletagmanager.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://res.cloudinary.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src 'self' https://*.cloudflare.com https://*.turnstile.com https://*.youtube.com https://youtube.com;
  connect-src 'self' https://*.cloudflare.com https://*.turnstile.com https://*.vercel-storage.com https://blob.vercel-storage.com https://res.cloudinary.com https://*.google-analytics.com https://www.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://*.googletagmanager.com;
  media-src 'self' https://res.cloudinary.com;
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default nextConfig;