"use client";
import useSWR from "swr";
import { fetchBottomMenu } from "@/lib/db";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BottomMenu() {
  const fetcher = () => fetchBottomMenu();

  const { data, error } = useSWR("bottomMenu", fetcher);

    const handleMenu = async (item: string) => {
      
    };

  return (
    <>
      <h1>메뉴 바</h1>
      <div style={{position:'absolute', bottom:'0px'}}>
        <ul
          style={{
            display: "flex",
            background: "#999",
            width: "100%",
          }}
        >
          {data?.map((item, index) => (
            <li key={index}>
              <button onClick={handleMenu()}>
                <img src={item.backurl} alt="메뉴 아이콘" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
