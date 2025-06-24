import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apidev.tvku.tv',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'storage.tvku.tv',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'tvku.tv',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  }
};


export default nextConfig;
