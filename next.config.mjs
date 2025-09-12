/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle node: protocol for Firebase compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "node:process": false,
        "node:path": false,
        "node:fs": false,
        "node:os": false,
        "node:crypto": false,
        "node:stream": false,
        "node:util": false,
        "node:buffer": false,
        "node:url": false,
        "node:querystring": false,
        "node:events": false,
        "node:child_process": false,
        "node:cluster": false,
        "node:dgram": false,
        "node:dns": false,
        "node:http": false,
        "node:https": false,
        "node:net": false,
        "node:readline": false,
        "node:repl": false,
        "node:tls": false,
        "node:tty": false,
        "node:vm": false,
        "node:zlib": false,
        // Additional fallbacks for Firebase
        "util": false,
        "stream": false,
        "crypto": false,
        "buffer": false,
        "url": false,
        "querystring": false,
        "events": false,
        "child_process": false,
        "cluster": false,
        "dgram": false,
        "dns": false,
        "http": false,
        "https": false,
        "net": false,
        "readline": false,
        "repl": false,
        "tls": false,
        "tty": false,
        "vm": false,
        "zlib": false,
      }
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
}

export default nextConfig
