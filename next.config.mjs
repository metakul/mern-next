
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
