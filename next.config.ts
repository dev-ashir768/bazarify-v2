import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oms.getorio.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
