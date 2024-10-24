"use client";

import { LoginState } from "@/app/recoil/selectors";
import { fetchDiaryData, fetchDiaryNoIcons, supabase } from "@/lib/db";
import { DataType, IconType } from "@/lib/typs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DeleteDiaryButton from "./Ddelete";

export default function DiaryDetailPage() {
  const dataUid = useRecoilValue(LoginState);
  const pathname = usePathname();
  const router = useRouter();
  const pathId = Number(pathname.split("/")[2]);
  const [data, setData] = useState<DataType[] | null>([]);
  const [dataIcons, setDataIcons] = useState<IconType[]>([]);

  const handelCancle = () => {
    router.push("/diary");
  };

  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData(dataUid.uid);
        const fetchDataIcons = await fetchDiaryNoIcons();

        setData(fetchData);
        if (fetchDataIcons !== null) {
          setDataIcons(fetchDataIcons);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleAllData();
  }, []);
  useEffect(() => {}, [dataIcons]);

  return (
    <div>
      {data!.map((item) => (
        <div key={item.id}>
          {item.id === pathId ? (
            <section className="flex flex-col gap-y-14 w-3/4 mx-auto">
              <h3 className="text-xl text-center p-9">
                {item.date.toString()}
              </h3>
              <div className="flex w-full justify-evenly">
                {item.walk ? (
                  <div>
                    <Image
                      src={item.walkimg}
                      width={80}
                      height={80}
                      alt={item.walk}
                    />
                    <p className="text-center">{item.walk}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[0].imgurl}
                      width={80}
                      height={80}
                      alt={dataIcons[0].name}
                    />
                    <p className="text-center">{dataIcons[0].name}</p>
                  </div>
                )}
                {item.eat ? (
                  <div>
                    <Image
                      src={item.eatimg}
                      width={80}
                      height={80}
                      alt={item.eat}
                    />
                    <p className="text-center">{item.eat}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[1].imgurl}
                      width={80}
                      height={80}
                      alt={dataIcons[1].name}
                    />
                    <p className="text-center">{dataIcons[1].name}</p>
                  </div>
                )}
                {item.pill ? (
                  <div>
                    <Image
                      src={item.pillimg}
                      width={80}
                      height={80}
                      alt={item.pill}
                    />
                    <p className="text-center">{item.pill}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[2].imgurl}
                      width={80}
                      height={80}
                      alt={dataIcons[2].name}
                    />
                    <p className="text-center">{dataIcons[2].name}</p>
                  </div>
                )}
                {item.hospital ? (
                  <div>
                    <Image
                      src={item.hospitalimg}
                      width={80}
                      height={80}
                      alt={item.hospital}
                    />
                    <p className="text-center">{item.hospital}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[3].imgurl}
                      width={80}
                      height={80}
                      alt={dataIcons[3].name}
                    />
                    <p className="text-center">{dataIcons[3].name}</p>
                  </div>
                )}
                {item.beauty ? (
                  <div>
                    <Image
                      src={item.beautyimg}
                      width={80}
                      height={80}
                      alt={item.beauty}
                    />
                    <p className="text-center">{item.beauty}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[4].imgurl}
                      width={80}
                      height={80}
                      alt={dataIcons[4].name}
                    />
                    <p className="text-center">{dataIcons[4].name}</p>
                  </div>
                )}
              </div>
              <section className="w-full">
                <div className=" h-48 p-2.5 overflow-y-scroll mb-3">{item.content}</div>
                {item.uuid === dataUid.uid && (
                <div className="flex w-full">
                    <DeleteDiaryButton pathId={pathId} />
                </div>
              )}
              </section>
            </section>
          ) : (
            <></>
          )}
        </div>
      ))}
      {}
    </div>
  );
}
