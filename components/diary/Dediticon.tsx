"use client";
import { LoginState } from "@/app/recoil/selectors";
import { fetchDiaryData } from "@/lib/db";
import { DataType } from "@/lib/typs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Deditwritebottomicon({ pathId }: { pathId: number }) {
  const [data, setData] = useState<DataType[] | null>([]);
  const dataUid = useRecoilValue(LoginState);

  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData(dataUid.uid);
        setData(fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleAllData();
  }, []);

  return (
    <ul>
      {data!.map((item, index) =>
        item.id === pathId ? (
          <li key={item.id}>
            <ul className="flex w-full justify-evenly">
              <li key={`${item.id}-walk`} className="p-1">
                <Image
                  src={item.walkimg}
                  width={70}
                  height={70}
                  alt={item.walk}
                />
                <p className="text-center mt-2.5">{item.walk}</p>
              </li>
              <li key={`${item.id}-eat`} className="p-1">
                <Image
                  src={item.eatimg}
                  width={70}
                  height={70}
                  alt={item.eat}
                />
                <p className="text-center mt-2.5">{item.eat}</p>
              </li>
              <li key={`${item.id}-pill`} className="p-1">
                <Image
                  src={item.pillimg}
                  width={70}
                  height={70}
                  alt={item.pill}
                />
                <p className="text-center mt-2.5">{item.pill}</p>
              </li>
              <li key={`${item.id}-hos`} className="p-1">
                <Image
                  src={item.hospitalimg}
                  width={70}
                  height={70}
                  alt={item.hospital}
                />
                <p className="text-center mt-2.5">{item.hospital}</p>
              </li>
              <li key={`${item.id}-b`} className="p-1">
                <Image
                  src={item.beautyimg}
                  width={70}
                  height={70}
                  alt={item.beauty}
                />
                <p className="text-center mt-2.5">{item.beauty}</p>
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
