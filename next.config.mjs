/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    // Mencegah build jika ada error TypeScript
    ignoreBuildErrors: false,
  },

  images: {
    // Aktifkan optimasi gambar Next.js
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
