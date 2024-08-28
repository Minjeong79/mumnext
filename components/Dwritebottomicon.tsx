"use client";
import { writeIconState } from "@/app/recoil/atom";
import { fetchWriteiconBottom } from "@/lib/db";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface ImgType {
  id: number;
  name: string;
  imgurl: string;
}
export default function Dwritebottomicon() {
  const [datas, setData] = useState<ImgType[]>([]);
  const [pickIcon, setPickIcon] = useState<string[]>([]);
  const [icon, setIcon] = useRecoilState<string[]>(writeIconState);
  
  
  const hadleClick = (item:string)=>{
    setPickIcon((oldIcons) => [...oldIcons, item]);
  }
  useEffect(()=>{
    // const set = new Set(pickIcon);
    // const uniqueArr = [...set];
    console.log(pickIcon);
    setIcon(pickIcon);
  },[pickIcon])

  useEffect(() => {
    const fetch = async () => {
      const data: ImgType[] = await fetchWriteiconBottom();
      setData(data);
    };
    fetch();
  }, [icon]);
  return (
    <ul style={{ display: "flex" }}>
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
