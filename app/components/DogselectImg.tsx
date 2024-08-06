"use client";
import useSWR from "swr";
import { fetchDogImgUrlList } from "@/lib/db";
import { useRecoilState } from "recoil";
import { countState } from "../recoil/atom";

export default function DogSelectImg() {
  const fetcher = () => fetchDogImgUrlList();

  const { data, error } = useSWR("dogImageList", fetcher);

  const [dogPick, setDogPick] = useRecoilState(countState);

  const imgClickhandle = async (index: number) => {
    setDogPick(index);
  };

  return (
    <>
      <h1>강아지 선택 화면</h1>
      <div>
        <ul style={{ display: "flex" }}>
          {data?.map((item, index) => (
            <li key={index}>
              <button id="" onClick={() => imgClickhandle(index)}>
                <img src={item.url} alt="강아지 이미지" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
