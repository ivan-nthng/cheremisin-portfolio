/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        esmExternals: true,
    },
}

module.exports = nextConfig
