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
    const uidData = fetchData.filter((item) => item.uuid === dataUid.uid);
    setData(uidData);
  };
  

  useEffect(() => {
    handleAllData();
  }, [dataUid]);

  console.log(data.length)
  return (
    <section>
      <ul className={`h-[480px] w-10/12 mx-auto flex flex-col gap-y-3 ${data.length >= 8 ? "overflow-y-scroll" : "" } `}>
        {data.map((item) => (
          <li key={item.id} className="bg-white rounded-lg p-3 items-center">
            <Link href={`/diary/${item.id}`} className="flex justify-between">
                <div>{item.content}</div>
                <div className="flex gap-x-1">
                  <div>{item.walk ? <Image src={item.walkicon} width={30} height={30} alt={item.walk}/> : <></>}</div>
                  <div>{item.eat ? <Image src={item.eaticon} width={30} height={30} alt={item.eat}/> : <></>}</div>
                  <div>{item.pill ? <Image src={item.pillicon} width={30} height={30} alt={item.pill}/> : <></>}</div>
                  <div>{item.hospital ? <Image src={item.hospitalicon} width={30} height={30} alt={item.hospital}/> : <></>}</div>
                  <div>{item.beauty ? <Image src={item.beautyicon} width={30} height={30} alt={item.beauty}/> : <></>}</div>
                </div>
               
               
            </Link>
          </li>
        ))}
      </ul> 
     
    </section>
  );
}
