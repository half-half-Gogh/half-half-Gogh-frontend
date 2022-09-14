/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["34.216.11.123", "*"],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
