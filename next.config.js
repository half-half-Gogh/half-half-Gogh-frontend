/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["34.216.11.123", "*"],
  },
  reactStrictMode: false,
  swcMinify: true,
  redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
