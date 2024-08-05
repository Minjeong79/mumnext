"use client";
import useSWR from "swr";
import { fetchThemaImgUrlList } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themaSate } from "../recoil/atom";

export default function ThemaSelectImg() {
  const fetcher = () => fetchThemaImgUrlList();
  const { data, error } = useSWR("themaImageList", fetcher);

  const [themaPick, setThemaPick] = useRecoilState(themaSate);

  const imgClickhandle = async (index: number) => {
    setThemaPick(index);
  };

  return (
    <>
      <h1>테마 선택 화면111</h1>
      <div>
        <ul style={{ display: "flex" }}>
          {data?.map((item, index) => (
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
