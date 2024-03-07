/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    baseUrl: './src',
    checkJs: true,
    jsx: 'react'
  },
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000',
    ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  }
}

module.exports = nextConfig
