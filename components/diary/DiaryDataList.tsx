"use client";

import { LoginState } from "@/app/recoil/selectors";
import { fetchDiaryData } from "@/lib/db";
import { DataType, IconsType } from "@/lib/typs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function DiaryDataList({
  iconsData,
}: {
  iconsData: IconsType[];
}) {
  const dataUid = useRecoilValue(LoginState);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const handleAllData = async () => {
      const uidData = await fetchDiaryData(dataUid.uid);
      if (uidData) {
        setData(uidData);
      }
    };
    handleAllData();
  }, [data]);

  return (
    <section className="w-[600px] mx-auto">
      <ul
        className={`h-[480px]  mx-auto flex flex-col gap-y-3 ${
          data.length >= 8 ? "overflow-y-scroll" : ""
        } `}
      >
        {data.map((item) => (
          <li key={item.id} className="bg-white rounded-lg p-3 items-center">
            <Link href={`/diary/${item.id}`} className="flex justify-between">
              <div>{item.content}</div>
              <div className="flex gap-x-1">
                {item.walk ? (
                  <Image
                    src={item.walkicon}
                    width={30}
                    height={30}
                    alt={item.walk}
                  />
                ) : (
                  <div className="hidden"></div>
                )}
                {item.eat ? (
                  <Image
                    src={item.eaticon}
                    width={30}
                    height={30}
                    alt={item.eat}
                  />
                ) : (
                  <div className="hidden"></div>
                )}
                {item.pill ? (
                  <Image
                    src={item.pillicon}
                    width={30}
                    height={30}
                    alt={item.pill}
                  />
                ) : (
                  <div className="hidden"></div>
                )}
                {item.hospital ? (
                  <Image
                    src={item.hospitalicon}
                    width={30}
                    height={30}
                    alt={item.hospital}
                  />
                ) : (
                  <div className="hidden"></div>
                )}
                {item.beauty ? (
                  <Image
                    src={item.beautyicon}
                    width={30}
                    height={30}
                    alt={item.beauty}
                  />
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
