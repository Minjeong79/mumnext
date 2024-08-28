"use client";
import { fetchThemaImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { themaSate } from "@/app/recoil/atom";
import Image from "next/image";

interface UrlType {
  id:number;
  url:string;
  title:string;
}
export default function ThemaSelectImg() {
  const [themaPick, setThemaPick] = useState<UrlType[]>([]);
  const [themaPickState, setThemaPickState] = useRecoilState(themaSate);

  const imgClickhandle = async (index: number) => {
    setThemaPickState(index);
  };

  useEffect(() => {
    async function urlList() {
      const fetcher = await fetchThemaImgUrlList();
      if (fetcher) {
        setThemaPick(fetcher);
      }
    }
    urlList();
  }, []);

  return (
    <>
      <h1>테마 선택 화면111</h1>
      <div>
        <ul style={{ display: "flex" }}>
          {themaPick.map((item, index) => (
            <li key={index}>
              <button id="" onClick={() => imgClickhandle(index)}>
                <Image src={item.url} width={200} height={200} alt="테마 이미지" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
