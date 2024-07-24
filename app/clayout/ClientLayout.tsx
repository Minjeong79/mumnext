"use client";
import { RecoilRoot } from "recoil";

export default function ClientLayout({children}: {
    children: React.ReactNode;
  }){
    return (
        <RecoilRoot>
            <main className="min-h-screen flex flex-col items-center">
            {children}
            </main>
        </RecoilRoot>
    )
}