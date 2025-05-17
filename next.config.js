/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["cdn.flyonui.com"],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8080',
          pathname: '/v1/users/profile/**',
        },
      ], // Adicione o domínio aqui
    },
  };
  
  module.exports = nextConfig;