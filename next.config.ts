import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.inappstory.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dodostatic.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
