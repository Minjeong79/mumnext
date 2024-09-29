/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
})


const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["trtwwyqzkqlqebdiiujp.supabase.co"]
    }
};

module.exports = withPWA(nextConfig);
