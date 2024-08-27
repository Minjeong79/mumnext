'use client'
import { fetchWriteiconTop } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { walkState } from "../recoil/atom";

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
            <img src={item.imgurl} alt={item.name} />
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
