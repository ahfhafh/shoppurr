/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const env = {
  FIREBASE_API_KEY : 'AIzaSyDugRjjtm7R5tMgU5ouqY2O9Aiy_mKBlv4',
  FIREBASE_AUTH_DOMAIN : 'shop-purr.firebaseapp.com',
  FIREBASE_PROJECT_ID : 'shop-purr',
  FIREBASE_STORAGE_BUCKET : 'shop-purr.appspot.com',
  FIREBASE_MESSAGING_SENDER_ID : '128983841369',
  FIREBASE_APP_ID : '1:128983841369:web:f5ef0e4cff0a6cf4a88f48',
  FIREBASE_MEASUREMENT_ID : 'G-LH3X7RZY57'
}

module.exports = {
  nextConfig,
  env,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

