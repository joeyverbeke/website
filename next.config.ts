import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add fallback for onnxruntime-node
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'onnxruntime-node': false,
    };
    return config;
  },
};

export default nextConfig;
