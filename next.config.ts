import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,
  devIndicators: false,
  
  // For App Router, we handle large payloads differently
  experimental: {
    serverComponentsExternalPackages: ['@langchain/community'],
  },
  
  // Important for NextAuth.js with App Router
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
