import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientLayout from "./clayout/ClientLayout";
import Head from "next/head";
export const metadata = {
  title: "강아지 기록 다이어리",
  description: "강아지 기록 다이어리 와 커뮤니티",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr" className={GeistSans.className}>
      <body className="">
        <Head>
          <link rel="manifest" href="/manifest.ts" />
          <meta
            http-equiv="Content-Security-Policy"
            content="connect-src 'self' https://trtwwyqzkqlqebdiiujp.supabase.co https://apis.data.go.kr https://sockjs-us3.pusher.com wss://ws-us3.pusher.com;"
          />
        </Head>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
