"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { fetchCommunityDataDetail } from "@/lib/db";
import { CommunityType } from "@/lib/typs";

export default function CeditPage() {
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  const id = Number(lastPart);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [cData, setCData] = useState<CommunityType[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleimgDelete = () => {
    const parts = imageUrl.split("/");
    const lastParts = parts[parts.length - 1];

    fetch("/api/community-imgdelete-api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lastParts: lastParts }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("이미지 삭제 못 했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setImageUrl("");
        // router.push(`/main/diary`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleComSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      id: cData[0]?.id,
      title: titleValue,
      content: textValue,
      imgurl: imageUrl,
    };
    try {
      fetch("/api/community-edit-api", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });
      router.push("/main/community");
    } catch (error) {
      console.error("수정 등록 못함:", error);
    }
  };

  useEffect(() => {
    const fetchComDatas = async () => {
      const datas = await fetchCommunityDataDetail(id);
      if (datas) {
        setCData(datas);
      }
    };
    fetchComDatas();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const handleimgSubmit = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/community-imgapi", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지를 업로드 하지 못했습니다");
        }

        const data = await response.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleimgSubmit();
  }, [selectedFile]);

  return (
    <div>
      <form onSubmit={handleComSubmit}>
        <h3>날짜 수정 페이지지이이이이이</h3>
        <div>
          <input
            type="text"
            name="title"
            defaultValue={cData[0]?.title}
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitleValue(e.target.value)}
            required
          />
        </div>
        <div style={{ border: "2px solid #000" }}>
          <textarea
            name="content"
            className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
            defaultValue={cData[0]?.content}
            placeholder="내용을 입력해주세요"
            onChange={(e) => setTextValue(e.target.value)}
            required
          ></textarea>
          <div>
            {cData[0]?.imgurl ? (
              <div>
                <Image
                  src={cData[0]?.imgurl}
                  width={200}
                  height={200}
                  alt="이미지"
                />
                <button>기존 이미지 삭제</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={100}
              height={100}
              alt="선택한 이미지"
            />
          ) : (
            <></>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input" style={{ cursor: "pointer" }}>
          파일 선택하기
        </label>
        <button type="button" onClick={handleimgDelete}>
          이미지 제거
        </button>
        <div style={{ marginTop: "40px" }}>
          <button type="submit">등록</button>
          <button type="button">취소</button>
        </div>
      </form>
    </div>
  );
}
