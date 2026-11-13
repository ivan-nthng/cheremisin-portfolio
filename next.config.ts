import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/preview/litres', destination: '/projects/litres', permanent: false },
      { source: '/preview/hito-case', destination: '/projects/ds-hito', permanent: false },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
