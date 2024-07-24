"use client";
import useSWR from "swr";
import { fetchThemaImgUrlList } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function ThemaSelectImg() {
  const fetcher = () => fetchThemaImgUrlList();
  const router = useRouter();
  const { data, error } = useSWR("themaImageList", fetcher);

  const imgClickhandle = async (index: number) => {
    router.push(`/mcomponents/themaselect/main`);
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
