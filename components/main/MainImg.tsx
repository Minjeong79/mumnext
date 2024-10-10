"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
export default function MainImg(){
    const dataUid = useRecoilValue(LoginState);
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
          formData.append("uid", dataUid.uid);
        
          try {
            const response = await fetch("/api/main-img-create-api", {
              method: "POST",
              body: formData,
            });
    
            if (!response.ok) {
              throw new Error("이미지를 업로드 하지 못했습니다");
            }
    
            const data = await response.json();
            console.log(data);
            // 서버에서 받은 이미지 URL을 상태에 저장
            setImageUrl(data.url);
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        handleimgSubmit();
      }, [selectedFile]);

      // const handleimgDelete = () => {
      //   const parts = imageUrl.split("/");
      //   const lastParts = parts[parts.length - 1];
    
      //   fetch("/api/community-imgdelete-api", {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ lastParts: lastParts }),
      //   })
      //     .then((response) => {
      //       if (!response.ok) {
      //         throw new Error("이미지 삭제 못 했습니다.");
      //       }
      //       return response.json();
      //     })
      //     .then((data) => {
      //       console.log(data.message); // 서버에서 보낸 메시지
      //       setImageUrl("");
      //       // router.push('/main/diary');
      //     })
      //     .catch((error) => {
      //       console.error("Error:", error);
      //     });
      // };

    
    return(<div>
      <div>
        <Image src={imageUrl} width={40} height={40} alt="유저 프로필 이미지"/>
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
        {/* <button type="button" onClick={handleimgDelete}>
          이미지 제거
        </button> */}
        <div>
          <button type="submit">등록</button>
          <button type="button">취소</button>
        </div>
        </div>)
}