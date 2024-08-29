"use client";
import { writeIconState } from "@/app/recoil/atom";
import { fetchWriteiconBottom } from "@/lib/db";
import { ImgType } from "@/lib/typs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Dwritebottomicon() {
  const [datas, setData] = useState<ImgType[]>([]);
  const [pickIcon, setPickIcon] = useState<string[]>([]);
  const [icon, setIcon] = useRecoilState<string[]>(writeIconState);
  
  
  const hadleClick = (itemName:string)=>{
    setPickIcon((oldIcons) => [...oldIcons, itemName]);
  }

  useEffect(()=>{
    setIcon(pickIcon);
  },[pickIcon])

  useEffect(() => {
    const fetch = async () => {
      const data: ImgType[] = await fetchWriteiconBottom();
      setData(data);
    };
    fetch();
  }, []);

  return (
    <ul style={{ display: "flex" }}>
      {datas.map((item: ImgType) => (
        <li key={item.id}>
          <button onClick={()=>hadleClick(item.name)} type="button">
            <Image src={item.imgurl} width={100} height={100} alt={item.name} />
            {item.name}
          </button>
          
        </li>
      ))}
    </ul>
  );
}
