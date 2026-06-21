/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://*.vercel-insights.com https://www.youtube.com https://s.ytimg.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  isDev
    ? "connect-src 'self' http://localhost:9000 ws://localhost:* https: wss:"
    : "connect-src 'self' https: wss:",
  "frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com",
  "media-src 'self' blob: https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
]
if (!isDev) cspDirectives.push('upgrade-insecure-requests')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=(self), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: cspDirectives.join('; '),
  },
]

const cacheImmutable = [
  { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
]

const cacheImages = [
  { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
]

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: '**.kaabarpothe.com' },
      { protocol: 'https', hostname: 'kaabarpothe.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/img/:path*', headers: cacheImages },
      { source: '/icon.svg', headers: cacheImmutable },
      { source: '/fonts/:path*', headers: cacheImmutable },
    ]
  },
  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/hajj', destination: '/packages/hajj', permanent: true },
      { source: '/umrah', destination: '/packages/umrah', permanent: true },
      { source: '/packages', destination: '/packages/umrah', permanent: false },
    ]
  },
}

export default nextConfig
