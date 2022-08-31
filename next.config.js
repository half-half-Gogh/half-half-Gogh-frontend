/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['175.123.140.225', '*']
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
