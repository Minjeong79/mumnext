import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function PUT(request: Request) {
  const { mainid, content } = await request.json();
  const { data, error } = await supabase
    .from("communitycomment")
    .update({ content })
    .eq("mainid", mainid)
    .select("*");

  if (error) {
    return NextResponse.json({ message: "검색 실패", error }, { status: 500 });
  }
  return NextResponse.json({
    message: "커뮤니티 수정 성공",
  });
}
