"use client";
import {
  fetchAllLike,
  fetchCommentData,
  fetchCommunityData,
  fetchCommunityLike,
} from "@/lib/db";
import { CommentType, CommunityType, LikeType } from "@/lib/typs";
import { useEffect, useRef, useState } from "react";
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
  const [divH, setDivH] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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
    router.push(`/community/write/${lastParts}`);
  };

  const handledelete = () => {
    console.log("click");
    window.confirm("삭제 할래 멈?");
    try {
      fetch("/api/community-delete-api", {
        method: "DELETE",
        body: JSON.stringify({ id: partId }),
      });
    } catch (error) {
      console.log(error);
    }
    router.push(`/community`);
  };

  useEffect(() => {
    setDivH(ref.current!.offsetHeight);
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className={`mx-auto w-[600px] h-[675px] mb-5 h-[${divH}]px ${
        divH >= 700 ? "overflow-y-scroll" : "overflow-hidden"
      }  `}
    >
      {data?.map((item, index) => (
        <div key={index}>
          {item.id === partId && (
            <div className="flex flex-col gap-y-3">
              <h3 className="text-xl text-center p-3.5">
                {item.date.toString()}
              </h3>
              <div>
                <span className="text-xs text-slate-500">제목</span>
                <h3 className="text-xl p-2.5 border-b">{item.title}</h3>
              </div>

              <div className="border-b">
                <span className=" text-xs text-slate-500">내용</span>
                <div
                  className={`h-36 p-2.5 mb-3  overflow-y-scroll overflow-x-hidden`}
                >
                  {item.imgurl ? (
                    <div className="w-full">
                      <Image
                        src={item.imgurl}
                        width={250}
                        height={250}
                        alt="img"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <p>{item.content}</p>
                </div>
              </div>
              <CommunityLike id={item.id} />

              <div>
                {dataUid.uid === item.uuid ? (
                  <div className="flex justify-center gap-x-2">
                    <button
                      type="button"
                      className="p-1.5 px-5 bg-orange-600 text-white rounded-lg text-base"
                      onClick={handleEdit}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="p-1.5 px-5 bg-slate-400 text-white rounded-lg text-base"
                      onClick={handledelete}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <CommentPage partId={partId} />
    </div>
  );
}
