
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns : [
            {
                protocol:"https",
                hostname:"etherscan.io"
            },
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    // async rewrites() {
    //     return [
    //       {
    //         source: '/github-web',
    //         destination: 'https://github.com',
    //       },
    //     ]
    //   },
};


const nextConfigFunction = async (phase) => {
      const withPWA = (await import("next-pwa")).default({
        dest: "public",
      });
      return withPWA(nextConfig);
  };

  export default nextConfigFunction;