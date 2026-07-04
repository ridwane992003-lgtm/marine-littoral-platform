/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 💡 C'est la méthode moderne pour générer le site statique (remplace next export)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;