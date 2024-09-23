import { NextResponse } from "next/server";
import { dateFunc, supabase } from "@/lib/db";

export async function POST(request: Request) {
  const daydate = dateFunc();
  const { id, uuid, eat, pill, hospital, beauty, content, walk } =
    await request.json();

  const { data, error } = await supabase
    .from("zwritedb")
    .insert([
      {
        id,
        uuid,
        eat,
        pill,
        hospital,
        beauty,
        walkimg: walk
          ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1.png"
          : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1-1.png",
        eatimg: eat
          ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2.png"
          : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2-1.png",
        pillimg: pill
          ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3.png"
          : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3-1.png",
        hospitalimg: hospital
          ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4.png"
          : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4-1.png",
        beautyimg: beauty
          ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5.png"
          : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5-1.png",
        content,
        date: daydate,
        walk: walk,
      },
    ])
    .select("*");
  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "일기 업로드 성공",
  });
}
