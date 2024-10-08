"use client";
import { customAlphabet } from "nanoid";
import { fetchCommentData } from "@/lib/db";
import { CommentType, UserType } from "@/lib/typs";
import { use, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import CommentEdit from "./CcommentEdit";
import Head from "next/head";
import PushNotificationManager from "../push/PushPage";
import dynamic from "next/dynamic";

export default function CommentPage({ partId }: { partId: number }) {
  const PushNotificationManager = dynamic(() => import("../push/PushPage"), { ssr: false });
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());
  const dataUid = useRecoilValue(LoginState);
  const [dataComment, setDataComment] = useState<CommentType[]>([]);
  const [textValue, setTextValue] = useState("");
  const [editClick, setEditClick] = useState(0);

  const fetchComment = async () => {
    const data = await fetchCommentData(partId);
    if (data ) {
      setDataComment(data); // 새로운 댓글 데이터로 상태 업데이트
    }
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      mainid: numId,
      id: partId,
      uuid: dataUid.uid,
      username: dataUid.fullName,
      content: textValue,
    };
  
    try {
      const response = await fetch("/api/comment-create", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        setTextValue(""); 
        fetchComment(); 
      } else {
        console.error("Failed to create comment", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEditComment = (mainid: number) => {
    setEditClick(mainid);
  };

  const handleDeleteComment = (mainid: number) => {
    try {
      fetch("/api/comment-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainid }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handleEditComplete = () => {
    setEditClick(0);
  };

  return (
    <div>
      <div>
        {dataComment.map((item) => (
          <li key={item.mainid}>
            {item.mainid === editClick ? (
              <CommentEdit
                mainId={item.mainid}
                content={item.content}
                onEditComplete={handleEditComplete}
              />
            ) : (
              <div>
                {item.content}
                /닉네임: {item.username}
              </div>
            )}

            {item.uuid === dataUid.uid ? (
              <div>
                <button onClick={() => handleEditComment(item.mainid)}>
                  수정
                </button>

                <button onClick={() => handleDeleteComment(item.mainid)}>
                  삭제
                </button>
              </div>
            ) : (
              <></>
            )}
          </li>
        ))}
      </div>
      <br />
      <br /> 
     
     
      
      <form onSubmit={handleComment} >
      <PushNotificationManager textValue={textValue} />
        <textarea
          name="content"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="내용을 입력해주세요"
          required
        ></textarea>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
