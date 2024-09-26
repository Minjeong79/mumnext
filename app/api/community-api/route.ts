import { NextResponse } from "next/server";
import { dateFunc, supabase } from "@/lib/db";

export async function POST(request: Request) {
  const daydate = dateFunc();
  const { id, uuid, title, content, imgurl , username } = await request.json();
  const { data, error } = await supabase
    .from("community")
    .insert([{ id, uuid, title, content, imgurl, date: daydate, username, }])
    .select("*");
  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "업로드 성공",
  });
}
