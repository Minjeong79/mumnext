"use client";
import { writeIconState } from "@/app/recoil/atom";
import { fetchDiaryData, fetchDiaryDate, fetchWriteiconBottom } from "@/lib/db";
import { DataType, ImgType } from "@/lib/typs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Deditwritebottomicon({ pathId }: { pathId: number }) {
  const [data, setData] = useState<DataType[] | null>([]);
  const [pickIcon, setPickIcon] = useState<string[]>([]);
  const [icon, setIcon] = useRecoilState<string[]>(writeIconState);

  const hadleClick = (itemName: string) => {
    setPickIcon((oldIcons) => [...oldIcons, itemName]);
  };

  useEffect(() => {
    setIcon(pickIcon);
  }, [pickIcon]);

  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData();
        setData(fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleAllData();
  }, []);

  return (
    <ul style={{ display: "flex" }}>
      {data!.map((item) =>
        item.id === pathId ? (
            <li key={item.id}>
             <ul style={{ display: "flex" }}>
              <li>
              <button onClick={() => hadleClick(item.walk)} type="button">
                <Image
                  src={item.walkimg}
                  width={100}
                  height={100}
                  alt={item.walk}
                />
                {item.walk}
              </button>
              </li>
              <li>
              <button onClick={() => hadleClick(item.eat)} type="button">
                <Image
                  src={item.eatimg}
                  width={100}
                  height={100}
                  alt={item.eat}
                />
                {item.eat}
              </button>
              </li>
              <li>
              <button onClick={() => hadleClick(item.pill)} type="button">
                <Image
                  src={item.pillimg}
                  width={100}
                  height={100}
                  alt={item.pill}
                />
                {item.pill}
              </button>
              </li>
              <li>
              <button onClick={() => hadleClick(item.hospital)} type="button">
                <Image
                  src={item.hospitalimg}
                  width={100}
                  height={100}
                  alt={item.hospital}
                />
                {item.hospital}
              </button>
              </li>
              <li>
              <button onClick={() => hadleClick(item.beauty)} type="button">
                <Image
                  src={item.beautyimg}
                  width={100}
                  height={100}
                  alt={item.beauty}
                />
                {item.beauty}
              </button>
              </li>
             </ul>
            </li>
          
        ) : (
          <></>
        )
      )}
    </ul>
  );
}
