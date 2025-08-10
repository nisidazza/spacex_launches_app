/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
