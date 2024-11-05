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
        router.push("/community");
        break;
      case "설정":
        router.push("/setting");
        break;
      case "메인":
        router.push("/main");
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
    <div className="absolute bottom-0 w-full m-auto flex justify-center">
      <div className="bg-slate-800 w-full absolute bottom-0 h-28 sm:h-36 opacity-65"></div>
      <ul className="flex gap-5 z-10 absolute bottom-3.5 px-2.5 sm:p-0">
        {bmenu.map((item, index) => (
          <li key={index}>
            <button onClick={() => imgClickhandle(item.menutext)}>
              <Image
                src={item.backurl}
                width={80}
                height={80}
                alt="메뉴 아이콘"
              />
            </button>
            <p className="text-center text-sm text-white">{item.menutext}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
