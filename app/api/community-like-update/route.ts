import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function PUT(request: Request) {
  try {
    const { mainid, uuid, like } = await request.json();
    console.log(`${like}---${mainid}----${uuid}-----------------`);

    const { data, error } = await supabase
      .from("communitylike")
      .update({ like: like })
      .eq("mainid", mainid)
      .eq("uuid", uuid)
      .select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "커뮤 좋아요 성공",
      data,
    });
  } catch (error) {
    console.error("커뮤 좋아요 실패:", error);

    return NextResponse.json(
      {
        message: "커뮤 좋아요 실패",
      },
      { status: 500 }
    );
  }
}
