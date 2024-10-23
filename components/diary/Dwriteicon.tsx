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
    if(pickIcon.includes(itemName)){
      setPickIcon((oldIcons) => oldIcons.filter((icon) => icon !== itemName));
    }else{
      setPickIcon((oldIcons) => [...oldIcons, itemName]);
    }
   
  }

  useEffect(()=>{
    setIcon(pickIcon);
    console.log(pickIcon);
  },[pickIcon])

  useEffect(() => {
    const fetch = async () => {
      const data: ImgType[] = await fetchWriteiconBottom();
      setData(data);
    };
    fetch();
  }, []);

  return (
    <ul className="flex w-full justify-evenly">
      {datas.map((item: ImgType) => (
        <li key={item.id} className={`rounded-lg p-2 ${
          pickIcon.includes(item.name) ? "bg-[#EB934B]" : "hover:bg-[#EB934B]"
        }`}>
          <button onClick={()=>hadleClick(item.name)} type="button">
            <Image src={item.imgurl} width={80} height={80} alt={item.name} />
            <p className="px-1">{item.name}</p>
          </button>
          
        </li>
      ))}
    </ul>
  );
}
