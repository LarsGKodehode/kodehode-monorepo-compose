import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone" // Necessary for containerization
};

export default nextConfig;
