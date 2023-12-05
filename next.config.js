/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gateway.pinata.cloud",
                port: "",
                pathname: "/ipfs/**",
            },
        ],
    },
    env: {
        APP_DOMAIN: process.env.APP_DOMAIN,
        MORALIS_API_KEY: process.env.MORALIS_API_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXT_PUBLIC_PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        NEXT_PUBLIC_ALCHEMY_API_URL: process.env.NEXT_PUBLIC_ALCHEMY_API_URL,
    },
};

module.exports = nextConfig;
