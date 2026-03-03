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
    // In local development the WP host often resolves to 127.0.0.1 / ::1 which
    // Next's image optimizer rejects for security. Disable optimization in dev
    // so images are loaded directly from the WP host.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
