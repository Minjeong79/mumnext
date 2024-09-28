"use client";
import { fetchCommentData, fetchCommunityData } from "@/lib/db";
import { CommentType, CommunityType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import Image from "next/image";
import CommentPage from "../comment/Ccomment";
import { customAlphabet } from "nanoid";

export default function CommunityPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastParts = parts[parts.length - 1];
  const partId = Number(lastParts);
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());
  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const [data, setData] = useState<CommunityType[]>([]);
  const [like, setLike] = useState(true);

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
    window.confirm("삭제 할래 멈?");
    try {
      fetch("/api/community-delete-api", {
        method: "DELETE",
        body: JSON.stringify({ id: partId }),
      });
    } catch (error) {
      console.log(error);
    }
    router.push(`/main/community`);
  };

  const handleLike = (mainid: number) => {
    setLike(false);
    const requestBody = {
      mainid: numId,
      id: mainid,
      uuid: dataUid.uid,
      like: like,
    };
    try {
      fetch("/api/community-like", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          {item.id === partId ? (
            <div>
              <h3>{item.title}</h3>
              <div>
                {item.imgurl ? (
                  <Image src={item.imgurl} width={250} height={250} alt="img" />
                ) : (
                  <div></div>
                )}
              </div>

              <p>{item.content}</p>
              <div style={{ background: "skyblue" }}>
                <button onClick={() => handleLike(item.id)}>좋아요</button>
              </div>
              <div>
                {dataUid.uid === item.uuid ? (
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
          <CommentPage partId={partId} />
        </div>
      ))}
    </div>
  );
}
