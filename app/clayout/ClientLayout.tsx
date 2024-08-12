"use client";
import { RecoilRoot } from "recoil";
import InitializeUidState from "./UidPage";

export default function ClientLayout({children}: {
    children: React.ReactNode;
  }){
    return (
        <RecoilRoot>
            <InitializeUidState/>
            <main className="min-h-screen flex flex-col items-center">
            {children}
            </main>
        </RecoilRoot>
    )
}