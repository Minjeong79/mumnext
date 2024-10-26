"use client";
import { customAlphabet } from "nanoid";
import { fetchCommentData } from "@/lib/db";
import { CommentType, UserType } from "@/lib/typs";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import CommentEdit from "./CcommentEdit";
import Head from "next/head";
import PushNotificationManager from "../push/PushPage";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function CommentPage({ partId }: { partId: number }) {
  // const PushNotificationManager = dynamic(() => import("../push/PushPage"), {
  //   ssr: false,
  // });
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());
  const dataUid = useRecoilValue(LoginState);
  const [dataComment, setDataComment] = useState<CommentType[]>([]);
  const [textValue, setTextValue] = useState("");
  const [editClick, setEditClick] = useState(0);

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
    window.confirm("댓글 삭제 할래 멈?");
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
    const fetchComment = async () => {
      const data = await fetchCommentData(partId);
      if (data) {
        setDataComment(data); // 새로운 댓글 데이터로 상태 업데이트
      }
    };
    fetchComment();
  }, [dataComment]);

  const handleEditComplete = () => {
    setEditClick(0);
  };

  //PWA
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    // setMessage(textValue);
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    }
  }, []);

  async function sendNotification(message: string) {
    const registration = await navigator.serviceWorker.getRegistration();

    // registration이 undefined가 아닐 경우에만 showNotification 호출
    if (Notification.permission === "granted" && registration) {
      showNotification(message, registration);
    } else {
      if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted" && registration) {
          showNotification(message, registration);
        }
      }
    }
  }

  const showNotification = (
    body: string,
    registration: ServiceWorkerRegistration
  ) => {
    const title = "댓글이 달렸다 멈!";
    const payload = {
      body,
      icon: "/icon/logo.png",
    };

    if ("showNotification" in registration) {
      registration.showNotification(title, payload);
    } else {
      new Notification(title, payload);
    }
  };

  return (
    <div className="mt-8">
      <ul>
        {dataComment.map((item) => (
          <li key={item.mainid} className="bg-white rounded-lg w-full p-2.5">
            {item.mainid === editClick ? (
              <CommentEdit
                mainId={item.mainid}
                content={item.content}
                onEditComplete={handleEditComplete}
              />
            ) : (
              <div>
                <p className="text-right text-xs text-slate-500">
                  닉네임: {item.username}
                </p>
                <div>{item.content}</div>
              </div>
            )}

            {item.uuid === dataUid.uid ? (
              <div className="flex justify-end gap-2.5 mt-1">
                <button onClick={() => handleEditComment(item.mainid)}>
                  <Image
                    src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/edit-icon.png"
                    width={15}
                    height={15}
                    alt="수정 아이콘"
                  />
                </button>

                <button onClick={() => handleDeleteComment(item.mainid)}>
                  <Image
                    src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/delete-icon.png"
                    width={15}
                    height={15}
                    alt="삭제 아이콘"
                  />
                </button>
              </div>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleComment} className="mt-7 relative">
        <div className="flex absolute top-0 w-full gap-2.5">
          <textarea
            name="content"
            className="resize-none w-full p-2 outline-none rounded-md"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="내용을 입력해주세요"
            maxLength={50}
            required
          ></textarea>

          <button
            type="submit"
            className="w-20 p-5 bg-orange-600 text-white rounded-lg text-base"
          >
            등록
          </button>
        </div>
        <div className="flex gap-2.5">
          <textarea
            name="content"
            value={textValue}
            className="resize-none w-full p-2 outline-none rounded-md"
            placeholder="2번"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-20 p-5 bg-orange-600 text-white rounded-lg text-base absoltue right-0 z-10"
            onClick={() => sendNotification(textValue)}
          >
            등록
          </button>
        </div>
        <p className="text-right text-xs text-slate-500 pt-2.5">
          {textValue.length} / 50
        </p>
      </form>
    </div>
  );
}
