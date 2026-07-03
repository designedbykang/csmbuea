/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Allows images hosted on Supabase storage
      },
    ],
  },
}

module.exports = nextConfig