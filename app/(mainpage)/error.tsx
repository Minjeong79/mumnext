"use client";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-[800px] h-[600px] mx-auto flex flex-col justify-center items-center w-full gap-4">
      <Image
        className="mx-auto"
        src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/404-img.png"
        width={350}
        height={290}
        alt="404"
      />
      <p className="text-center text-3xl">페이지를 찾을 수 없다 멈!</p>
      <button className="p-1.5 px-5 bg-slate-400 text-white rounded-lg text-base" onClick={()=>reset()}>다시 시도</button>
    </div>
  );
}
