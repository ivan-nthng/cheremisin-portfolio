/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        esmExternals: true,
        forceSwcTransforms: true,
    },
    webpack: (config, { isServer }) => {
        // Ensure we're using the correct SWC loader
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: '@next/swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            tsx: true,
                        },
                        transform: {
                            react: {
                                runtime: 'automatic',
                            },
                        },
                    },
                },
            },
        })
        return config
    },
}

module.exports = nextConfig
