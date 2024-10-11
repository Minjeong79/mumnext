'use client'

import { LoginState } from "@/app/recoil/selectors";
import { MainType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { fetchMainImg } from "@/lib/db";

export default function MainImgEditPage(){
    const dataUid = useRecoilValue(LoginState);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<MainType[]>([]);

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
      formData.append("uid", dataUid.uid);

      try {
        const response = await fetch("/api/main-img-create-api", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지를 업로드 하지 못했습니다");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleimgSubmit();
  }, [selectedFile]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMainImg(dataUid.uid);
      if (data) {
        setImageDataUrl(data);
      }
    };
    fetchData();
  }, [imageDataUrl]);
  
    return(
        <div>
      <div>
        {imageDataUrl.map((item, index) => (
          <div key={index}>
           
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-input"
                />
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                <Image
                src={item.mainimg}
                width={40}
                height={40}
                alt="유저 프로필 이미지"
              />
                </label>
                <div>
                  <button type="submit">등록</button>
                  <button type="button">취소</button>
                </div>
              </div>
        

           
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
    )
}