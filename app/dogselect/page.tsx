import DogSelectImg from "@/components/DogselectImg";
import NameForm from "@/components/NameForm";
import ThemasSkeleton from "@/components/skeleton/thema-skeleton";
import ThemaSelectImg from "@/components/ThemaSelect";
import { Suspense } from "react";

export default function DogSelectPage() {
  return (
    <div className="bg-[#FFEAD9] min-h-screen w-screen flex justify-center items-center">
      <div className="p-5 sm:p-0 sm:w-7/12 flex flex-col justify-center gap-y-8">
        <Suspense
          fallback={
            <>
              <ThemasSkeleton />
            </>
          }
        >
          <DogSelectImg />
          <ThemaSelectImg />
        </Suspense>

        <NameForm />
      </div>
    </div>
  );
}
