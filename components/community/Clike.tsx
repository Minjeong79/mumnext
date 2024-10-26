"use client";
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import { LikeType } from "@/lib/typs";
import { fetchAllLike, fetchCommunityLike } from "@/lib/db";
import Image from "next/image";

export default function CommunityLike({ id }: { id: number }) {
  const dataUid = useRecoilValue(LoginState);
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const [likeList, setLikeList] = useState<LikeType[]>([]);
  const [likeListAll, setLikeListAll] = useState<LikeType[]>([]);

  const handleLike = (id: number) => {
    const requestBody = {
      mainid: numId,
      id: id,
      uuid: dataUid.uid,
      like: true,
    };

    const userLikeUid = likeListAll?.find((item) => item.uuid === dataUid.uid);
    if (userLikeUid) {
      const requestBodyEdit = {
        mainid: userLikeUid.mainid,
        uuid: dataUid.uid,
        like: !userLikeUid.like,
      };

      try {
        fetch("/api/community-like-update", {
          method: "PUT",
          body: JSON.stringify(requestBodyEdit),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        fetch("/api/community-like", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchLike = async () => {
      const likeData = await fetchCommunityLike(id);
      const likeAllData = await fetchAllLike(id);
      if (likeData && likeAllData) {
        setLikeList(likeData);
        setLikeListAll(likeAllData);
      }
    };
    fetchLike();
  }, [likeList]);

  return (
    <div className="flex gap-x-2">
      <button onClick={() => handleLike(id)}>
        <Image
          src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/like-icon.png"
          width={20}
          height={20}
          alt=""
        />
      </button>
      <p>{likeList.length}</p>
    </div>
  );
}
