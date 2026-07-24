/** @type {import('next').NextConfig} */

// Dynamically resolve the CMS hostname from the env variable so
// changing the CMS domain only requires updating the env — no code change needed.
function getCmsHostname() {
  const raw = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || '';
  try {
    return new URL(raw).hostname;
  } catch {
    return '';
  }
}

const cmsHostname = getCmsHostname();

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: false,
    remotePatterns: [
      // Unsplash — used by fallback news images in cms-data.ts
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // CMS domain — resolved from CMS_API_URL env variable
      ...(cmsHostname ? [{ protocol: 'https', hostname: cmsHostname }] : []),
    ],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
      ],
    },
  ],
};

export default nextConfig;
