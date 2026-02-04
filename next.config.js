/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.staticflickr.com",
        port: "",
      },
    ],
  },
  turbopack: {
    // ensure Turbopack uses this app directory as the workspace root
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
