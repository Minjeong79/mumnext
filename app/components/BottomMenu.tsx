"use client";
import useSWR from "swr";
import { fetchBottomMenu } from "@/lib/db";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BottomMenuType {
  id: number;
  backurl: string;
  menutext: string;
}
export default function BottomMenu() {
  const router = useRouter();
  const fetcher = () => fetchBottomMenu();

  const { data, error } = useSWR("bottomMenu", fetcher);

  const handleMenu = async () => {
    // const { error } = await supabase.from("writedb").select();
    // router.push('/mcomponents/diary')
    // router.push('/mcomponents/map')
    // router.push('/mcomponents/community')
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
              <button onClick={()=> handleMenu(item.menuname)}>
                <img src={item.backurl} alt="메뉴 아이콘" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
