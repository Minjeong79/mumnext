import DiaryDataList from "@/components/diary/DiaryDataList";
import DiaryListSkeeleton from "@/components/skeleton/diary-skeleton-list";
import { fetchDiaryData, fetchDiaryListIcons } from "@/lib/db";
import { DataType, IconsType } from "@/lib/typs";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const iconsData: IconsType[] = (await fetchDiaryListIcons()) ?? [];
  return (
    <section className="flex flex-col h-screen sm:h-[80vh] sm:justify-around sm:gap-y-7">
      <div className="w-full mt-14 mb-8 sm:m-0">
        <h3 className="text-xl text-center sm:p-9">일기</h3>
        <div className="w-full text-right">
          <Link
            className="p-2 px-5 mr-2.5 sm:px-6 bg-zinc-500 text-white rounded-lg text-base"
            href="/diary/write"
          >
            작성
          </Link>
        </div>
      </div>
      <Suspense
        fallback={
          <>
            <DiaryListSkeeleton />
          </>
        }
      >
        <DiaryDataList iconsData={iconsData} />
      </Suspense>
    </section>
  );
}
