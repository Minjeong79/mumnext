import HeaderPage from "@/components/Header";
import BottomMenu from "@/components/main/BottomMenu";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="sm:min-w-[800px] sm:min-h-[800px] sm:min-h-[800px] m-auto relative my-auto w-full">
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
