import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.SUPABASE_DOMAIN || "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};

export default nextConfig;
