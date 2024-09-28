"use client";
import { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginState, writePickState } from "@/app/recoil/selectors";
import { dateFunc, supabase } from "@/lib/db";
import { customAlphabet } from "nanoid";
import { usePathname, useRouter } from "next/navigation";
import Dwritebottomicon from "./Dwriteicon";

export default function WriteDiary() {
  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());
  const [value, setValue] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");
  const pickWIcon = useRecoilValue(writePickState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const walkTxt = value.filter((item) => item === "산책")[0] ?? "";
    const eatTxt = value.filter((item) => item === "밥")[0] ?? "";
    const pillTxt = value.filter((item) => item === "약")[0] ?? "";
    const hospitalTxt = value.filter((item) => item === "병원")[0] ?? "";
    const beautylTxt = value.filter((item) => item === "미용")[0] ?? "";

    const requestBody = {
      id: numId,
      uuid: dataUid.uid,
      eat: eatTxt,
      pill: pillTxt,
      hospital: hospitalTxt,
      beauty: beautylTxt,
      content: textValue,
      walk: walkTxt,
    };
    try {
      fetch("/api/diary-api", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      router.push("/main/diary");
    } catch (error) {
      console.log(error);
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/main/diary");
  };
  useEffect(() => {
    const newArr = Object.values(pickWIcon);
    const setArr = new Set(newArr);
    setValue(Array.from(setArr));
  }, [pickWIcon]);
  console.log(dataUid);
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <Suspense fallback={<p>로딩중...</p>}> */}
        <Dwritebottomicon />
        {/* </Suspense> */}

        <textarea
          name="content"
          className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
          value={textValue}
          placeholder="내용을 입력해주세요"
          onChange={(e) => setTextValue(e.target.value)}
          required
        ></textarea>
        <button type="submit">등록</button>
        <button type="button" onClick={handelCancle}>
          취소
        </button>
      </form>
    </>
  );
}
