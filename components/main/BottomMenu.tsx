"use client";
import { fetchBottomMenu } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BottomMenuType } from "@/lib/typs";

export default function BottomMenu() {
  const [bmenu, setBmenu] = useState<BottomMenuType[]>([]);

  const router = useRouter();

  const imgClickhandle = async (item: string) => {
    switch (item) {
      case "일기":
        router.push("/diary");
        break;
      case "산책":
        router.push("/map");
        break;
      case "커뮤":
        router.push("community");
        break;
      case "설정":
        router.push("/setting");
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
      <div className="absolute bottom-0 w-full">
        <ul className="flex justify-around">
          {bmenu.map((item, index) => (
            <li key={index}>
              <button onClick={() => imgClickhandle(item.menutext)}>
                <Image src={item.backurl} width={130} height={130} alt="메뉴 아이콘" />
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
}