import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Replace with your actual GitHub repository name, e.g. "paper-fairies"
const repoName = process.env.REPO_NAME || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd && repoName ? `/${repoName}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
