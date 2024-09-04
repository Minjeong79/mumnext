"use client";
import { customAlphabet } from "nanoid";
import { supabase } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cwrite() {
  const router = useRouter();
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let avatarUrl = '';

    if (selectedFile) {
        const { data, error } = await supabase
          .storage
          .from('community')
          .upload(`write/${selectedFile.name}`, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });
  
        if (error) {
          console.error('Error uploading file:', error.message);
          return;
        }
  
        avatarUrl = data.path; // 파일 업로드 경로를 저장합니다.
      }


    // const { data, error } = await supabase
    //   .from("test")
    //   .insert([{ id: numId, imgurl: selectedFile }])
    //   .select("*");
  };
  console.log(selectedFile);

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>날짜</h3>
        {/* <div>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <textarea name="content" placeholder="내용을 입력해주세요" required /> */}
        <input type="file" onChange={handleFileChange}/>
       <div>
       <button type="submit">등록</button>
       </div>
      </form>
    </div>
  );
}
