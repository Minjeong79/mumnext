import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(request: Request) {
  const { search } = await request.json();

  let { data, error } = await supabase
    .from("community")
    .select("*")
    .ilike("content", `%${search}%`)
    .ilike("title", `%${search}%`)
  if (error) {
    return NextResponse.json({ message: "검색 실패", error }, { status: 500 });
  }
  return NextResponse.json({
    message: "검색 성공",
    data,
  });
}
