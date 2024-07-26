import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientLayout from "./clayout/ClientLayout";
import ClientScript from "./ccomponents/ClientScript";
import Script from 'next/script';
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
    <html lang="en" className={GeistSans.className}>
       <Script
      src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=843e559943bc29af86f736a7f1d33577&libraries=services,clusterer"
      strategy="afterInteractive" />
      <body className="bg-background text-foreground">
     
        <ClientLayout>{children}</ClientLayout>
       
      </body>
    
    </html>
  );
}
