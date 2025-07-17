import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase the API payload size limit to 16MB for larger PDFs
  
  api: {
    bodyParser: {
      sizeLimit: '16mb',
    },
  },
  // Enable strict mode for React
  reactStrictMode: true,
  devIndicators: false
};

export default nextConfig;
