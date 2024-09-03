import DiaryDataList from "@/components/diary/DiaryDataList";
import { fetchDiaryData, fetchDiaryListIcons } from "@/lib/db";
import { DataType, IconsType } from "@/lib/typs";
import Link from "next/link";

export default async function Page() {
  const fetchData:DataType[] =  (await fetchDiaryData()) ?? [];
  const iconsData:IconsType[] = (await fetchDiaryListIcons()) ?? [];
  return (
    <>
      <div>
        <h3>일기</h3>
        <Link href="/main/diary/write">작성</Link>
      </div>
      <DiaryDataList fetchData={fetchData} iconsData={iconsData}/>
    </>
  );
}
 