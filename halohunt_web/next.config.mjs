/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    // Allow any type of image to be displayed from any domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
