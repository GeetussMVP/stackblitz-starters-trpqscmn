const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-262c7ff9747743f0853580fc0debb426.r2.dev",
        pathname: "/**",
      },
    ],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // MUST be an absolute path to a directory
  outputFileTracingRoot: path.resolve(__dirname),
};

module.exports = nextConfig;
