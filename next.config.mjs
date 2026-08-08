/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // GitHub Pages serves at /landing/; skip in local `next dev`
  basePath: isProd ? "/landing" : "",
  assetPrefix: isProd ? "/landing" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactCompiler: true,
  experimental: { turbopackRustReactCompiler: true },
};

export default nextConfig;
