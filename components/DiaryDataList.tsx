"use client";

import { LoginState } from "@/app/recoil/selectors";
import { DataType, IconsType } from "@/lib/typs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function DiaryDataList({
  fetchData,
  iconsData,
}: {
  fetchData: DataType[];
  iconsData: IconsType[];
}) {
  const dataUid = useRecoilValue(LoginState);
  const [data, setData] = useState<DataType[]>([]);

  const handleAllData = () => {
    const uidData = fetchData.filter((item) => item.uuid === dataUid);
    setData(uidData);
  };
  

  useEffect(() => {
    handleAllData();
  }, [dataUid]);

  return (
    <div>
      <ul style={{width:'100vw'}}>
        {data.map((item) => (
          <li
            key={item.id}
            style={{
              width: "100%",
              height: "50px",
              background: "#999",
              margin: "10px 0px",
              
            }}
          >
            <Link href={`/main/diary/${item.id}`} style={{display:"flex"}}>
                <div>{item.content}</div>
                <div>{item.walk ? <Image src={item.walkicon} width={30} height={30} alt={item.walk}/> : <></>}</div>
                <div>{item.eat ? <Image src={item.eaticon} width={30} height={30} alt={item.eat}/> : <></>}</div>
                <div>{item.pill ? <Image src={item.pillicon} width={30} height={30} alt={item.pill}/> : <></>}</div>
                <div>{item.hospital ? <Image src={item.hospitalicon} width={30} height={30} alt={item.hospital}/> : <></>}</div>
                <div>{item.beauty ? <Image src={item.beautyicon} width={30} height={30} alt={item.beauty}/> : <></>}</div>
               
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
