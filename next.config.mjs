/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Custom domain (www.soralabs.io.vn) serves at site root — no /landing basePath
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactCompiler: true,
  experimental: { turbopackRustReactCompiler: true },
};

export default nextConfig;
