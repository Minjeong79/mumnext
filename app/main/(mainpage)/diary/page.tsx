import Link from "next/link";

export default function DiaryListPage() {
  return (
    <>
      <div>
        <h3>일기</h3>
        <Link href="/main/diary/write">작성</Link>
      </div>
      <ul>
        <li>
          <Link href="/main/diary/123">제목 날짜 아이콘리스트</Link>
        </li>
        <li>
          <Link href="/">제목 날짜 아이콘리스트</Link>
        </li>
        <li>
          <Link href="/">제목 날짜 아이콘리스트</Link>
        </li>
      </ul>
    </>
  );
}
