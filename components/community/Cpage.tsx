"use client";
import { customAlphabet } from "nanoid";
import { fetchCommentData, fetchCommunityData } from "@/lib/db";
import { CommentType, CommunityType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import Image from "next/image";

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
  const [dataComment, setDataComment] = useState<CommentType[]>([]);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const datas = await fetchCommunityData();
      if (datas) {
        setData(datas);
      }
    };
    fetchData();

    const fetchComment = async () => {
      const data = await fetchCommentData(partId);
      if (data) {
        setDataComment(data);
      }
    };
    fetchComment();
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

  const handleComent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      mainid: numId,
      id: partId,
      uuid: dataUid,
      username: dataUid,
      content: textValue,
    };
    try {
      fetch("/api/comment-create", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      setTextValue("");
    } catch (error) {}
  };

  console.log(dataUid);
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
      <div style={{ marginTop: "30px" }}>
        <div style={{ background: "skblue" }}>
          {dataComment.map((item) => (
            <li key={item.mainid}>
              {item.content}
              /닉네임: {item.username}
              {item.uuid === dataUid ? (
                <>
                {item.uuid}
                  <button>수정</button>
                  <button>삭제</button>
                </>
              ) : (
                <>
                 {item.uuid} / 
                 {dataUid}
                 
                 </>
              )}
            </li>
          ))}
        </div>
        <br />
        <br />
        <form onSubmit={handleComent} style={{ border: "1px solid #999" }}>
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
    </div>
  );
}
