
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

export default nextConfig;
