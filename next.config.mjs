/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  experimental: { turbopackRustReactCompiler: true },
};

export default nextConfig;
