"use client";
import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import Image from "next/image";

export default function CommunityPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastParts = parts[parts.length - 1];
  const numId = Number(lastParts);
  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const [data, setData] = useState<CommunityType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await fetchCommunityData();
      if (datas) {
        setData(datas);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    router.push(`/main/community/write/${lastParts}`);
  };
  const handleCancle = () => {
    window.confirm('삭제 할래 멈?');
    try {
      fetch('/api/community-delete-api',{
        method:'DELETE',
        body : JSON.stringify({id:numId})
      });
    } catch (error) {
      console.log(error);
    }
    router.push(`/main/community`);
  };
  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          {item.id === numId ? (
            <div>
              <h3>{item.title}</h3>
              <div>
                {item.imgurl ? (<Image src={item.imgurl} width={250} height={250} alt="img" />):(<div></div>)}
              </div>
              
              <p>{item.content}</p>
              <div>
                {dataUid === item.uuid ? (
                  <div>
                    <button type="button" onClick={handleEdit}>
                      수정
                    </button>
                    <button type="button" onClick={handleCancle}>
                      삭제
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
