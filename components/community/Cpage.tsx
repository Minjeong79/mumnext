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

  return (
    <section className="w-3/4 mx-auto">
      {data?.map((item, index) => (
        <div key={index}>
          {item.id === partId && (
            <div className="flex flex-col gap-y-4">
              <h3 className="text-xl text-center p-9">
                {item.date.toString()}
              </h3>
              <div>
                <span className="text-xs">제목</span>
                <h3 className="text-xl p-2.5 border-b">{item.title}</h3>
              </div>

              <div className="border-b">
                <span className=" text-xs">내용</span>
                <div className=" h-48 p-2.5 overflow-y-scroll mb-3">
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
                      className="p-2 px-6 bg-orange-600 text-white rounded-lg text-base"
                      onClick={handleEdit}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="p-2 px-6 bg-neutral-400 text-white rounded-lg text-base"
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
    </section>
  );
}
