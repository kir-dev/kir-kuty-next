/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 60 * 60 * 24, // cache images for at least 1 day
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core', 'looks-same'],
    }
}

module.exports = nextConfig
