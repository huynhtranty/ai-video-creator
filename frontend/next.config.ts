import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.IMAGE_URL}/**`)],
  },
};

export default nextConfig;  
