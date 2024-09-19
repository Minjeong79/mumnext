"use client";
import { customAlphabet } from "nanoid";
import { fetchStroageImg, supabase } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import Image from "next/image";

export default function Cwrite() {
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      // 파일이 선택되지 않았다면 아무 작업도 하지 않음
      return;
    }
    const handleimgSubmit = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/community-api", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지를 업로드 하지 못했습니다");
        }

        const data = await response.json();

        // 서버에서 받은 이미지 URL을 상태에 저장
        setImageUrl(data.url);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleimgSubmit();
  }, [selectedFile]);

  const handleDelete = () => {
    const parts = imageUrl.split("/");
    const lastParts = parts[parts.length - 1];

    fetch("/api/community-delete-api", {
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
        console.log(data.message); // 서버에서 보낸 메시지
        // router.push('/main/diary');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(imageUrl);
  return (
    <div>
      {/* <form> */}
      <h3>날짜</h3>
      <div>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          required
        />
      </div>
      <div>
        <textarea name="content" placeholder="내용을 입력해주세요" required />
      </div>
      <div>
        {imageUrl ? (
          <Image src={imageUrl} width={100} height={100} alt="선택한 이미지" />
        ) : (
          <></>
        )}
      </div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleDelete}>
        이미지 제거
      </button>
      <div>
        <button type="submit">등록</button>
      </div>
      {/* </form> */}
    </div>
  );
}
