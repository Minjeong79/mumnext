import DiaryDataList from "@/components/diary/DiaryDataList";
import { fetchDiaryData, fetchDiaryListIcons } from "@/lib/db";
import { DataType, IconsType } from "@/lib/typs";
import Link from "next/link";

export default async function Page() {
  const fetchData:DataType[] =  (await fetchDiaryData()) ?? [];
  const iconsData:IconsType[] = (await fetchDiaryListIcons()) ?? [];
  return (
    <div className="flex flex-col h-[80vh] justify-around gap-y-7">
      <div className="w-full">
        <h3 className="text-xl text-center p-9">일기</h3>
        <Link className="ml-4 p-3 px-6 bg-zinc-500 text-white rounded-lg text-base" href="/diary/write">작성</Link>
      </div>
      <DiaryDataList fetchData={fetchData} iconsData={iconsData}/>
    </div>
  );
}
 