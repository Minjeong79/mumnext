"use client";
import {
  fetchAllLike,
  fetchCommentData,
  fetchCommunityData,
  fetchCommunityLike,
} from "@/lib/db";
import { CommentType, CommunityType, LikeType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import Image from "next/image";
import CommentPage from "../comment/Ccomment";
import CommunityLike from "./Clike";

export default function CommunityPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastParts = parts[parts.length - 1];
  const partId = Number(lastParts);

  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const [data, setData] = useState<CommunityType[]>([]);
  const [likeList, setLikeList] = useState<LikeType[]>([]);
  const [likeListAll, setLikeListAll] = useState<LikeType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await fetchCommunityData();
      if (datas) {
        setData(datas);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLike = async () => {
      const likeData = await fetchCommunityLike(partId);
      const likeAllData = await fetchAllLike(partId);
      if (likeData && likeAllData) {
        setLikeList(likeData);
        setLikeListAll(likeAllData);
      }
    };
    fetchLike();
  }, [likeList]);

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
              <CommunityLike id={item.id} likes={likeListAll} />
              {likeList.length}
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
