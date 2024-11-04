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
        </Head>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
