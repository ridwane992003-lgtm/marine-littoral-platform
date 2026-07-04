/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 💡 Indique à Next.js le nom de votre dépôt GitHub pour que tous les liens fonctionnent
  basePath: '/marine-littoral-platform', 
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;