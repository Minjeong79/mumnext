import MainImg from "@/components/main/MainImg";
import MainSkeeleton from "@/components/skeleton/main-skeleton";
import { Suspense } from "react";

export default function MainPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="sm:min-w-[800px] sm:min-h-[800px] flex flex-col justify-between relative">
          <Suspense
            fallback={
              <>
                <MainSkeeleton />
              </>
            }
          >
            <MainImg />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
