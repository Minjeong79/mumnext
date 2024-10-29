"use client";
import Image from "next/image";

export default function Error() {
  return (
    <div className="max-w-[800px] mx-auto flex flex-col justify-center itmes-center w-full gap-4">
      <Image
        className="mx-auto"
        src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/404-img.png"
        width={350}
        height={290}
        alt="404"
      />
      <p className="text-center text-3xl">페이지를 찾을 수 없다 멈!</p>
    </div>
  );
}
