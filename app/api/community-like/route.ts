import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(request: Request) {
  const { mainid, id, uuid, like } = await request.json();
  const { data, error } = await supabase
    .from("communitylike")
    .insert([{ mainid, id, uuid, like }])
    .select("*");
  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "커뮤 좋아요 성공",
  });
}
