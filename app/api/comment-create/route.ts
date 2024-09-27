import { NextResponse } from "next/server";
import { dateFunc, supabase } from "@/lib/db";

export async function POST(request: Request) {
  const daydate = dateFunc();
  const { mainid, id, uuid, username, content } = await request.json();
  const { data, error } = await supabase
    .from("communitycomment")
    .insert([{ mainid, id, uuid, username, content, date: daydate }])
    .select("*");
  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "댓글 업로드 성공",
  });
}
