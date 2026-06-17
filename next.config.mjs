/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avocato.tech",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;