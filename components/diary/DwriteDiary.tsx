"use client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginState, writePickState } from "@/app/recoil/selectors";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
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
    window.confirm("작성 할래 멈?");
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
      router.push("/diary");
    } catch (error) {
      console.log(error);
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/diary");
  };
  useEffect(() => {
    const newArr = Object.values(pickWIcon);
    const setArr = new Set(newArr);
    setValue(Array.from(setArr));
  }, [pickWIcon]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
      {/* <Suspense fallback={<p>로딩중...</p>}> */}
      <Dwritebottomicon />
      {/* </Suspense> */}

      <textarea
        name="content"
        className="resize-none border border-[#F5BB8C] w-full h-56 p-2.5 bg-transparent FD943F rounded-md"
        value={textValue}
        placeholder="내용을 입력해주세요"
        onChange={(e) => setTextValue(e.target.value)}
        required
      ></textarea>
      <div className="flex justify-center gap-x-2">
        <button
          type="submit"
          className="p-1.5 px-5 bg-[#FD943F] text-white rounded-lg text-base"
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
