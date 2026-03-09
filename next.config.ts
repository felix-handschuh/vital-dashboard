import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  output: "export",
  assetPrefix: "./",
};

export default nextConfig;
