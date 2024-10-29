"use client";
import { customAlphabet } from "nanoid";
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
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

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
        const response = await fetch("/api/community-imgapi", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
         
          throw new Error("이미지를 업로드 하지 못했습니다.");
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
        console.log(data.message); // 서버에서 보낸 메시지
        setImageUrl("");
        // router.push('/main/diary');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleComSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      id: numId,
      uuid: dataUid.uid,
      title: titleValue,
      content: textValue,
      imgurl: imageUrl,
      username: dataUid.fullName,
    };
    console.log(requestBody);
    try {
      fetch("/api/community-api", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      router.push("/community");
    } catch (error) {
      console.error("글 등록 못함:", error);
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/community");
  };
  return (
    <form onSubmit={handleComSubmit} className="flex flex-col gap-y-4">
      <div>
        <input
          className="border border-[#F5BB8C] w-full p-2.5 bg-transparent outline-none rounded-md"
          type="text"
          name="title"
          value={titleValue}
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitleValue(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          name="content"
          className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
          value={textValue}
          placeholder="내용을 입력해주세요"
          onChange={(e) => setTextValue(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        {imageUrl ? (
          <Image src={imageUrl} width={50} height={50} alt="선택한 이미지" />
        ) : (
          <></>
        )}
      </div>
      <div className="flex gap-x-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" >
          <Image
            src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/upload.png"
            width={30}
            height={30}
            alt="이미지 업로드 아이콘"
          />
        </label>
        <button type="button" onClick={handleimgDelete}>
          <Image
            src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/delete.png"
            width={30}
            height={30}
            alt="이미지 제거 아이콘"
          />
        </button>
      </div>

      <div className="flex justify-center gap-x-2">
        <button
          type="submit"
           className="p-1.5 px-5 bg-orange-600 text-white rounded-lg text-base"
        >
          등록
        </button>
        <button
          type="button"
          className="p-1.5 px-5 bg-slate-400 text-white rounded-lg text-base"
          onClick={handelCancle}
        >
          취소
        </button>
      </div>
    </form>
  );
}
