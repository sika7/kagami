import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static Export for SPA mode */
  output: 'export',
  
  /* Disable server-side features when using export */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
