import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  distDir: 'build', // Changes the build output directory to `build`
  async rewrites() {
    console.log('Rewriting')
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4001/api/:path*',
      },
    ]
  },
}
 
export default nextConfig