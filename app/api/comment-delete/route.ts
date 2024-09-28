import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function DELETE(request: Request) {
  const { mainid } = await request.json();
  console.log(mainid);
  try {
    const { error } = await supabase
      .from("communitycomment")
      .delete()
      .eq("mainid", mainid);
    if (error) {
      throw error;
    }
    return NextResponse.json({ message: "댓글 삭제" });
  } catch (error) {
    return NextResponse.json({ error: "댓글 삭제 못함" }, { status: 500 });
  }
}
