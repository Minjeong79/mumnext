import BottomMenu from "@/app/components/BottomMenu";
import Link from "next/link";

export default function DiaryListPage() {
  return (
    <>
      <div>
        <h3>일기</h3>
        <Link href="/mcomponents/diary/write">작성</Link>
      </div>
      <ul>
        <li>
          <Link href="/mcomponents/diary/123">제목 날짜 아이콘리스트</Link>
        </li>
        <li>
          <Link href="/">제목 날짜 아이콘리스트</Link>
        </li>
        <li>
          <Link href="/">제목 날짜 아이콘리스트</Link>
        </li>
      </ul>
      <BottomMenu/>
    </>
  );
}
