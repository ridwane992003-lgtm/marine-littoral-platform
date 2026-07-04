/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // 💡 Obligatoire pour GitHub Pages pour lier les sous-pages comme /remote-sensing/
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;