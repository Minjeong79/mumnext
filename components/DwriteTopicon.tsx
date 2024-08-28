'use client'
import { walkState } from "@/app/recoil/atom";
import { fetchWriteiconTop } from "@/lib/db";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface ImgType {
  id: number;
  name: string;
  imgurl: string;
  imgurlO: string;
}

export default function DwriteTopicon() {
  const [datas, setDatas] = useState<ImgType[]>([]);
  const [icon, setIcon] = useRecoilState(walkState);

  const hadleClick = (item:string)=>{
    setIcon(item);
    console.log(item);
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const data = await fetchWriteiconTop();
      setDatas(data);
     
    }
    fetch();
  },[icon]);

  return (
    <ul>
      {datas.map((item: ImgType) => (
        <li key={item.id}>
          <button onClick={()=>hadleClick(item.name)}>
            <Image src={item.imgurl} width={100} height={100} alt={item.name} />
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
