import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "portfolio-strapi-b8le.onrender.com",
      },
    ],
  },
};

export default nextConfig;
