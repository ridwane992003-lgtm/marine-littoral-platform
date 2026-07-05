/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  // On n'active le trailingSlash et le basePath QUE pour GitHub Actions
  trailingSlash: isGithubActions ? true : false,
  basePath: isGithubActions ? '/marine-littoral-platform' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;