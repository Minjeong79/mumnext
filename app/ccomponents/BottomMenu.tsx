"use client";
import useSWR from "swr";
import { fetchBottomMenu } from "@/lib/dogfunction";
import { useRouter } from "next/navigation";

export default function BottomMenu() {
  const fetcher = () => fetchBottomMenu();

  const { data, error } = useSWR("bottomMenu", fetcher);

//   const handleMenu = async (item: string) => {
//     const { error } = await supabase.from("writedb").select();
//     switch (item) {
//       case "일기":
//         nav(`/List`);
//         break;
//       case "산책":
//         nav(`/mapPage`);
//         break;
//       case "메인":
//         nav(`/dogMain`);
//         break;
//       default:
//         console.log("완료");
//     }
//     console.log(error);
//   };

  return (
    <>
      <h1>메뉴 바</h1>
      <div>
        <ul style={{ display: "flex", background:"#999", width:"100%", height:"80px"}}>
          {data?.map((item, index) => (
            <li key={index}>
              <button id="" >
                <img src={item.backurl} alt="메뉴 아이콘" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
