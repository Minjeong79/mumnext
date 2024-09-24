import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(request: Request) {
  const { search } = await request.json();

  let { data, error } = await supabase
    .from("community")
    .select("*")

    // Filters
    //.eq('column', 'Equal to')

    // Arrays
    .contains("content", [search]);
  if (error) {
    throw error;
  }
  return NextResponse.json({
    message: "검색 성공",
  });
}
