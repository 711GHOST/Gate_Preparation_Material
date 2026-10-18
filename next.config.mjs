/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Allow large static downloads from /public/resources
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      {
        source: '/:path*',
        headers: security,
      },
      {
        source: '/resources/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }, ...security],
      },
    ];
  },
};

export default nextConfig;
