import HeaderPage from "@/components/Header";
import BottomMenu from "@/components/main/BottomMenu";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[800px] max-h-[800px] min-h-[800px] mx-auto relative">
      <div className="absolute right-0 p-4 z-10">
        <HeaderPage />
      </div>
      {children}
      <BottomMenu />
      {/* <Suspense fallback={<div>Loading..</div>}>
           
        </Suspense> */}
    </div>
  );
}
