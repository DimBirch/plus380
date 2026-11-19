/** @type {import('next').NextConfig} */
// Temporary coming-soon page: "/" serves public/coming-soon.html until
// COMING_SOON=off is set in Vercel. The full site stays intact underneath.
const comingSoon = process.env.COMING_SOON !== 'off';

const nextConfig = {
  async rewrites() {
    return comingSoon
      ? { beforeFiles: [{ source: '/', destination: '/coming-soon.html' }] }
      : [];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
