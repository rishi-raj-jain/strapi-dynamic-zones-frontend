import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const { hostname, protocol, port } = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    // Required in dev when Strapi runs on localhost (Next.js 16 blocks local IP by default)
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        ...(port ? { port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
