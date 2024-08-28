"use client";
import { fetchDogImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { countState } from "@/app/recoil/atom";
import Image from "next/image";

interface UrlType {
  name: string;
  url: string;
}
export default function DogSelectImg() {
  const [dogPick, setDogPick] = useState<UrlType[]>([]);

  const [dogPickState, setDogPickState] = useRecoilState(countState);

  const imgClickhandle = async (index: number) => {
    setDogPickState(index);
  };

  useEffect(() => {
    async function urlList() {
      const fetcher = await fetchDogImgUrlList();
      if (fetcher) {
        setDogPick(fetcher);
      }
    }
    urlList();
  }, []);
  return (
    <section>
      <h1>강아지 선택 화면</h1>
      <div>
        <ul style={{ display: "flex" }}>
          {dogPick.map((item, index) => (
            <li key={index}>
              <button id="" onClick={() => imgClickhandle(index)}>
                <Image src={item.url} width={258} height={276} alt="강아지 이미지" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
