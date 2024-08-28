"use client";
import { Suspense, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRecoilValue } from "recoil";
import { walkIconState, writePickState } from "@/app/recoil/selectors";
import DwriteTopicon from "@/components/DwriteTopicon";
import Dwritebottomicon from "@/components/Dwritebottomicon";


export default function Write() {
  const [value, setValue] = useState(false);
  const pickWIcon = useRecoilValue(writePickState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 제출 처리 로직
  };

  useEffect(() => {
    setValue(true);
    console.log(value);
    console.log(pickWIcon);
  }, [pickWIcon]);
  return (
    <>
      <h3>날짜</h3>
      <form onSubmit={handleSubmit}>
        <Suspense fallback={<p>로딩중...</p>}>
          <DwriteTopicon />
          <Dwritebottomicon />
        </Suspense>

        <textarea
          className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
          // value={txtValue}
          // onChange={(e) => setTextValue(e.target.value)}
        ></textarea>
        <button>등록</button>
        <button>취소</button>
      </form>
    </>
  );
}
