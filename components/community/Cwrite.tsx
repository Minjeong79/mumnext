"use client";
import { customAlphabet } from "nanoid";
import { supabase } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";

export default function Cwrite() {
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    const handleimgSubmit = () => {
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      fetch('/api/community-api', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("이미지를 업로드 하지 못했습니다");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    handleimgSubmit();
  }, [selectedFile]);
  

  return (
    <div>
      <form>
        <h3>날짜</h3>
        <div>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <textarea name="content" placeholder="내용을 입력해주세요" required />
        <input type="file" onChange={handleFileChange} />
        <div>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}
