/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.avocato.tech",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;