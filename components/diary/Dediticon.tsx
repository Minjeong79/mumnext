"use client";
import { writeIconState } from "@/app/recoil/atom";
import { LoginState } from "@/app/recoil/selectors";
import { fetchDiaryData, fetchDiaryDate, fetchWriteiconBottom } from "@/lib/db";
import { DataType, ImgType } from "@/lib/typs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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
              <li key={`${item.id}-walk`} >
                  <Image
                    src={item.walkimg}
                    width={80}
                    height={80}
                    alt={item.walk}
                  />
                  <p className="text-center">{item.walk}</p>
              </li>
              <li key={`${item.id}-eat`}>
                  <Image
                    src={item.eatimg}
                    width={80}
                    height={80}
                    alt={item.eat}
                  />
                  <p className="text-center">{item.eat}</p>
              </li>
              <li key={`${item.id}-pill`}>
                  <Image
                    src={item.pillimg}
                    width={80}
                    height={80}
                    alt={item.pill}
                  />
                  <p className="text-center">{item.pill}</p>
              </li>
              <li key={`${item.id}-hos`}>
                  <Image
                    src={item.hospitalimg}
                    width={80}
                    height={80}
                    alt={item.hospital}
                  />
                 <p className="text-center">{item.hospital}</p>
              </li>
              <li key={`${item.id}-b`}>
                  <Image
                    src={item.beautyimg}
                    width={80}
                    height={80}
                    alt={item.beauty}
                  />
                 <p className="text-center">{item.beauty}</p>
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
