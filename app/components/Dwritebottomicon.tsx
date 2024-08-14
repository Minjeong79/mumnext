"use client";
import { fetchWriteiconBottom } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { writeIconState } from "../recoil/atom";

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
    const set = new Set(pickIcon);
    const uniqueArr = [...set];
    setIcon(uniqueArr);
   
    console.log(pickIcon)
    // console.log(icon)
  }

  // useEffect(() => {
  //   const set = new Set(pickIcon);
  //   const uniqueArr = [...set];
  //   setIcon(uniqueArr);
  // }, [pickIcon]); 

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
            <img src={item.imgurl} alt={item.name} />
            {item.name}
          </button>
          
        </li>
      ))}
    </ul>
  );
}
