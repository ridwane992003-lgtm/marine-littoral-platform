/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // 💡 Active les URLs propres pour éviter les erreurs 404 sur les boutons
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;