/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // `domains` is deprecated; use `remotePatterns` to allow images from
    // the WordPress host specified in environment variables.
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.WP_IMAGE_URL,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.WP_IMAGE_URL,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
