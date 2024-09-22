"use client";

import { CommunityType } from "@/lib/typs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CommunityList({
  fetchDatas,
}: {
  fetchDatas: CommunityType[];
}) {
  const [data, setData] = useState<CommunityType[]>(fetchDatas);

  useEffect(() => {
    setData(fetchDatas);
  }, []);

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}
            <Image src={item.imgurl} width={100} height={100} alt="이미지" />
          </li>
        ))}
      </ul>
    </>
  );
}
