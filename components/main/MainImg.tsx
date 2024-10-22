"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/app/recoil/selectors";
import { fetchMainImg } from "@/lib/db";
import { MainType } from "@/lib/typs";
import TopMenu from "./TopMenu";
export default function MainImg() {
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

  return (
    <div>
      {imageDataUrl.map((item, index) => (
        <div key={index}>
          <div className="relative">
            <Image
              layout="fixed"
              src={item.thema}
              width={800}
              height={800}
              alt="유저 테마 이미지"
            />
            <TopMenu dogName={item.name} />
            <div className="absolute top-0 right-0 left-0">
              <div className="flex flex-col items-center justify-around min-h-screen">
                {item.mainimg ===
                "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/test.PNG" ? (
                  <div className="flex items-center">
                   <div className="w-36 h-36 rounded-full mx-auto ">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer">
                        <Image
                          className="w-36 h-36 rounded-full mx-auto "
                          src={item.mainimg}
                          width={40}
                          height={40}
                          alt="유저 프로필 이미지"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <button type="submit">등록</button>
                      <button type="button">취소</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={item.mainimg}
                      width={40}
                      height={40}
                      alt="유저 프로필 이미지"
                    />{" "}
                  </>
                )}

                <div className="">
                  <Image
                    src={item.dog}
                    width={220}
                    height={220}
                    alt="유저 선택한 강아지"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
