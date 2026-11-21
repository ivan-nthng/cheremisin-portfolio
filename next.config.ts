import type { NextConfig } from "next";
import { demoLinks, demoShortPath, type DemoLinkId } from "./src/lib/portfolio/demo-links";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...Object.entries(demoLinks).map(([id, { path, anchor }]) => ({
        source: demoShortPath(id as DemoLinkId), destination: `${path}?demo=${id}#${anchor}`, permanent: false,
      })),
      { source: '/preview/litres', destination: '/projects/litres', permanent: false },
      { source: '/preview/hito-case', destination: '/projects/ds-hito', permanent: false },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
