import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function DELETE(request: Request) {
  const { lastParts } = await request.json();
  const encodedPath = `write/${lastParts}`;

  try {
    const { data, error } = await supabase.storage
      .from("communityimg")
      .remove([encodedPath]);

    if (error) {
      console.error("Supabase 에러:", error.message);
      return NextResponse.json(
        { error: `이미지 삭제 실패: ${error.message}` },
        { status: 500 }
      );
    }

    // console.log("삭제 성공:", data);
    return NextResponse.json({ message: "이미지 삭제 성공" });
  } catch (error) {
    return NextResponse.json({ error: "이미지 삭제 못함" }, { status: 500 });
  }
}
