import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // required for static HTML exports when using next/image, if any
  },
};

export default nextConfig;
