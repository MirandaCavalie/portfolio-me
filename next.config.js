/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio-me',
  assetPrefix: '/portfolio-me/',
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
