/** @type {import('next').NextConfig} */
const backendUrl = (
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL
)?.replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!backendUrl) {
      return [];
    }

    return [
      {
        source: "/musics/:path*",
        destination: `${backendUrl}/musics/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
