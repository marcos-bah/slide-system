/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos'],
      },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
      },
};

export default nextConfig;
