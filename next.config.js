/** @type {import('next').NextConfig} */
const nextConfig = {
  // for faster build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
