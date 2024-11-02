"use client";
import { fetchThemaImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { themaSate } from "@/app/recoil/atom";
import Image from "next/image";

interface UrlType {
  id: number;
  url: string;
  title: string;
}
export default function ThemaSelectImg() {
  const [themaPick, setThemaPick] = useState<UrlType[]>([]);
  const [themaPickState, setThemaPickState] = useRecoilState(themaSate);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const imgClickhandle = async (index: number) => {
    console.log(index);
    setThemaPickState(index);
    setSelectedIndex(index);
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
    <div>
      <h3 className="text-2xl pb-3 text-center">테마 선택</h3>
      <ul className="flex justify-evenly">
        {themaPick.map((item, index) => (
          <li
            key={index}
            className={`rounded-lg p-2 ${
              selectedIndex === index ? "bg-[#FD943F]" : "hover:bg-[#FD943F]"
            }`}
          >
            <button id="" onClick={() => imgClickhandle(index)}>
              <Image
                src={item.url}
                width={160}
                height={160}
                alt="테마 이미지"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
