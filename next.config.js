/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Autorise la production à se terminer même s'il y a des erreurs de type
    ignoreBuildErrors: true,
  },
};

export default nextConfig;