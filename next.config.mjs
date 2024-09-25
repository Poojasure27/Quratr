/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',         // The path you want to redirect from
          destination: '/signup', // The path you want to redirect to
          permanent: true,      // Use a 308 Permanent Redirect
        },
      ];
    },
  };
  
  export default nextConfig;
  