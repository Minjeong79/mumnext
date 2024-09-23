import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function PUT(request: Request) {
  const { id, title, content, imgurl } = await request.json();

  const { data, error } = await supabase
    .from("community")
    .update([{ title, content, imgurl }])
    .eq("id", id)
    .select("*");

  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "커뮤니티 수정 성공",
  });
}
