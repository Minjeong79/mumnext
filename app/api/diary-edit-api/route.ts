import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function PUT(request: Request) {
    const {id, content} = await request.json();
    const { data, error } = await supabase
    .from("zwritedb")
    .update([
      {
        id,
        content,
      },
    ])
    .eq('id', id)
    .select("*");
    if (error) {
        throw error;
      }
      return NextResponse.json({
        message: "수정 성공",
      });
}