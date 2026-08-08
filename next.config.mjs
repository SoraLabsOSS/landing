/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: "/landing",
	assetPrefix: "/landing",
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
};

export default nextConfig;
