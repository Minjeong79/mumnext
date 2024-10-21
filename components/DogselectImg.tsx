"use client";
import { fetchDogImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { countState } from "@/app/recoil/atom";
import Image from "next/image";

interface UrlType {
  name: string;
  url: string;
}
export default function DogSelectImg() {
  const [dogPick, setDogPick] = useState<UrlType[]>([]);

  const [dogPickState, setDogPickState] = useRecoilState(countState);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const btnref = useRef<HTMLButtonElement>(null);

  const imgClickhandle = async (index: number) => {
    setDogPickState(index);
    setSelectedIndex(index);
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
    <div>
      <h3 className="text-2xl pb-3 text-center">강아지 선택</h3>
      <div>
        <ul className="flex justify-evenly">
          {dogPick.map((item, index) => (
            <li
              key={index}
              className={`rounded-lg p-2 ${
                selectedIndex === index ? "bg-[#EB934B]" : "hover:bg-[#EB934B]"
              }`}
            >
              <button ref={btnref} onClick={() => imgClickhandle(index)}>
                <Image
                  src={item.url}
                  width={150}
                  height={150}
                  alt="강아지 이미지"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
