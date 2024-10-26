import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientLayout from "./clayout/ClientLayout";
import Head from "next/head";
export const metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
