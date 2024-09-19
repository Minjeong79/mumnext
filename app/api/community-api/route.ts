import { NextResponse } from "next/server";
import { fetchStroageImg, supabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
      // 파일이 없는 경우
      return NextResponse.json(
        { error: "파일이 존재하지 않습니다." },
        { status: 400 }
      );
    }
    const filePath = `write/${(file as File).name}`;
    const { data, error } = await supabase.storage
      .from("communityimg")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const imgurl = await fetchStroageImg(filePath);

    if (error) {
      // 파일 업로드 오류
      console.error("파일 업로드 오류:", error.message);
      return NextResponse.json(
        { error: "파일 업로드에 실패했습니다." },
        { status: 500 }
      );
    }

    if (data) {
      return NextResponse.json({
        message: "이미지 업로드 성공",
        url: imgurl,
      });
    } else {
      return NextResponse.json(
        { error: "파일 업로드에 실패했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    // 서버 오류 처리
    console.error("서버 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
