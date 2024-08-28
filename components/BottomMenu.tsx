"use client";
import { fetchBottomMenu } from "@/lib/db";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BottomMenuType {
  id: number;
  backurl: string;
  menutext: string;
}
export default function BottomMenu() {
  const [bmenu, setBmenu] = useState<BottomMenuType[]>([]);

  const router = useRouter();

  const imgClickhandle = async (item: string) => {
    switch (item) {
      case "일기":
        router.push("/main/diary");
        break;
      case "산책":
        router.push("/main/map");
        break;
      case "커뮤":
        router.push("/main/community");
        break;
      case "설정":
        router.push("/main/setting");
        break;
      default:
        console.log("완료");
    }
  };
  useEffect(() => {
    async function urlList() {
      const fetcher = await fetchBottomMenu();
      if (fetcher) {
        setBmenu(fetcher);
      }
    }
    urlList();
  }, []);
  return (
    <>
      <h1>메뉴 바</h1>
      <div style={{ position: "absolute", bottom: "0px" }}>
        <ul
          style={{
            display: "flex",
            background: "#999",
            width: "100%",
          }}
        >
          {bmenu.map((item, index) => (
            <li key={index}>
              <button onClick={() => imgClickhandle(item.menutext)}>
                <Image src={item.backurl} width={150} height={150} alt="메뉴 아이콘" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
