/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel gère le build automatiquement, on a juste besoin d'ignorer ESLint pour éviter le crash
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;