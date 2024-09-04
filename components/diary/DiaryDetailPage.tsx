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
  const pathId = Number(pathname.split("/")[3]);
  const [data, setData] = useState<DataType[] | null>([]);
  const [dataIcons, setDataIcons] = useState<IconType[]>([]);

  const handleUpdate = () => {
    router.push(`/main/diary/write/${pathId}`);
  };
  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/main/diary");
  };


  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData();
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
            <section>
              <h3>{item.date.toString()}</h3>
              <div style={{ display: "flex" }}>
                {item.walk ? (
                  <div>
                    <Image
                      src={item.walkimg}
                      width={50}
                      height={50}
                      alt={item.walk}
                    />
                    <p>{item.walk}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[0].imgurl}
                      width={50}
                      height={50}
                      alt={dataIcons[0].name}
                    />
                    <p>{dataIcons[0].name}</p>
                  </div>
                )}
                {item.eat ? (
                  <div>
                    <Image
                      src={item.eatimg}
                      width={50}
                      height={50}
                      alt={item.eat}
                    />
                    <p>{item.eat}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[1].imgurl}
                      width={50}
                      height={50}
                      alt={dataIcons[1].name}
                    />
                    <p>{dataIcons[1].name}</p>
                  </div>
                )}
                {item.pill ? (
                  <div>
                    <Image
                      src={item.pillimg}
                      width={50}
                      height={50}
                      alt={item.pill}
                    />
                    <p>{item.pill}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[2].imgurl}
                      width={50}
                      height={50}
                      alt={dataIcons[2].name}
                    />
                    <p>{dataIcons[2].name}</p>
                  </div>
                )}
                {item.hospital ? (
                  <div>
                    <Image
                      src={item.hospitalimg}
                      width={50}
                      height={50}
                      alt={item.hospital}
                    />
                    <p>{item.hospital}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[3].imgurl}
                      width={50}
                      height={50}
                      alt={dataIcons[3].name}
                    />
                    <p>{dataIcons[3].name}</p>
                  </div>
                )}
                {item.beauty ? (
                  <div>
                    <Image
                      src={item.beautyimg}
                      width={50}
                      height={50}
                      alt={item.beauty}
                    />
                    <p>{item.beauty}</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={dataIcons[4].imgurl}
                      width={50}
                      height={50}
                      alt={dataIcons[4].name}
                    />
                    <p>{dataIcons[4].name}</p>
                  </div>
                )}
              </div>
              <div>{item.content}</div>
              {item.uuid === dataUid ? (
                <div style={{ marginTop: "100px" }}>
                  <div>
                    <button type="button" onClick={handleUpdate}>
                      수정
                    </button>
                    <button type="button" onClick={handelCancle}>
                      취소
                    </button>
                  </div>
                  <div>
                    <DeleteDiaryButton pathId={pathId}/>
                    <button type="button" >
                      목록
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button type="button" >
                    목록222
                  </button>
                </div>
              )}
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
