import { NextResponse } from "next/server";
import { fetchMainStroageImg, supabase } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const uid = formData.get("uid");
  const encodedFileName = encodeURIComponent((file as File).name);
  const randomNum = Math.random();
  try {
    if (!file) {
      // 파일이 없는 경우
      return NextResponse.json(
        { error: "파일이 존재하지 않습니다." },
        { status: 400 }
      );
    }
    const filePath = `profile/${randomNum}${encodedFileName}`;

    let imgurl = "";
    try {
      const { data, error } = await supabase.storage
        .from("profileimg")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      imgurl = await fetchMainStroageImg(filePath);

      if (error) {
        // 파일 업로드 오류
        console.error("파일 업로드 오류:", error.message);
        return NextResponse.json(
          { error: "파일 업로드에 실패했습니다." },
          { status: 500 }
        );
      }
    } catch (error) {
      console.log("스토리지 이미지 업로드 오류");
    }

    const { data, error } = await supabase
      .from("dogthemaname")
      .update({ mainimg: imgurl })
      .eq("uuid", uid)
      .select("*");

    return NextResponse.json({
      message: "프로필 이미지 업로드 성공",
    });
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
