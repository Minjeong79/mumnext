"use client";
import { Suspense, useEffect, useState } from "react";
import Dwritebottomicon from "@/app/components/Dwritebottomicon";
import DwriteTopicon from "@/app/components/DwriteTopicon";
import { useFormState } from "react-dom";
import { useRecoilValue } from "recoil";
import { walkIconState } from "@/app/recoil/selectors";

export default function Write() {
  const [value, setValue] = useState(false);
  const pickWIcon = useRecoilValue(walkIconState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 제출 처리 로직
  };

  useEffect(() => {
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
