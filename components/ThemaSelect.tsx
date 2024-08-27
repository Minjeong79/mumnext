"use client";
import { fetchThemaImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { themaSate } from "../recoil/atom";
import { useEffect, useState } from "react";

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
                <img src={item.url} alt="테마 이미지" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
