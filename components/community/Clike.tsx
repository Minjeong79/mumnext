"use client";
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import { LikeType } from "@/lib/typs";
import { fetchCommunityLike } from "@/lib/db";

export default function CommunityLike({
  id,
  likes,
}: {
  id: number;
  likes: LikeType[];
}) {
  const dataUid = useRecoilValue(LoginState);
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const handleLike = (id: number) => {
    const requestBody = {
      mainid: numId,
      id: id,
      uuid: dataUid.uid,
      like: true,
    };

    console.log(dataUid.uid);
    console.log(likes);
    const userLikeUid = likes?.find((item) => item.uuid === dataUid.uid);
    console.log(userLikeUid);
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
      console.log(111111111);
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

  return (
    <div>
      <ul>
        {likes.map((item) => (
          <li key={item.mainid}>{item.id}</li>
        ))}
      </ul>
      <div style={{ background: "skyblue" }}>
        <button onClick={() => handleLike(id)}>좋아요</button>
      </div>
    </div>
  );
}
