"use client";

import { LoginState } from "@/app/recoil/selectors";
import { MainType } from "@/lib/typs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { fetchMainImg } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function MainImgEditPage() {
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<MainType[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/setting");
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
    <div className="pt-9">
      {imageDataUrl.map((item, index) => (
        <div key={index}>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <Image
                src={item.mainimg}
                width={140}
                height={140}
                alt="유저 프로필 이미지"
              />
            </label>
            <p className="text-xs text-slate-700 text-center">
              이미지를 클릭 해서 변경 해 줘 멈!<br/>이미지명은 영어로 설정!
            </p>
            <p className="">이름 : {item.name}</p>
            {/* <div className="flex gap-x-2">
              <button
                type="submit"
                className="p-1.5 px-5 bg-orange-600 text-white rounded-lg text-base"
              >
                등록
              </button>
              <button
                type="button"
                className="p-1.5 px-5 bg-neutral-400 text-white rounded-lg text-base"
                onClick={handelCancle}
              >
                취소
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
