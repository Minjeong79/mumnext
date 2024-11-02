/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
});

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["trtwwyqzkqlqebdiiujp.supabase.co"],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "connect-src 'self' https://trtwwyqzkqlqebdiiujp.supabase.co  https://apis.data.go.kr  https://sockjs-us3.pusher.com  https://ws-us3.pusher.com  https://dapi.kakao.com",
                    },
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: "connect-src 'self' wss://trtwwyqzkqlqebdiiujp.supabase.co https://trtwwyqzkqlqebdiiujp.supabase.co wss://apis.data.go.kr https://apis.data.go.kr wss://sockjs-us3.pusher.com  https://sockjs-us3.pusher.com wss://ws-us3.pusher.com https://ws-us3.pusher.com wss://dapi.kakao.com https://dapi.kakao.com",
                    // },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'",
                    },
                ],
            },
        ];
    },
};

module.exports = withPWA(nextConfig);
