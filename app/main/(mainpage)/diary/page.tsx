'use client'
import { fetchDiaryData } from "@/lib/db";
import Link from "next/link";
import { useEffect } from "react";

export default function DiaryListPage() {
 
  

  useEffect(()=>{
    const test = async ()=>{
      const fetchData = await fetchDiaryData();
      console.log(fetchData);
    }
    test();
    
  },[])
  return (
    <>
      <div>
        <h3>일기</h3>
        <Link href="/main/diary/write">작성</Link>
      </div>
      <ul style={{background:"#999"}}>
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
