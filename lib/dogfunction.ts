import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

//로그인 첫 화면 강아지 이미지
export async function fetchDogImageUrl(){
    const { data } = await supabase.storage
      .from("img")
      .getPublicUrl("dogSelect/dog1.png");
     
      return data.publicUrl;
  };

//강아지 선택
export async function fetchDogImgUrlList() {
  let { data, error } = await supabase.from("dogimgdb").select("*");
  if (error) {
    throw error;
  }

  return data;
}

//테마 선택
export async function fetchThemaImgUrlList(){
  let { data, error } = await supabase.from("dogthemaicon").select("*");
  if (error) {
    throw error;
  }

  return data;
};

//하단 메뉴
export async function fetchBottomMenu(){
  const { data, error } = await supabase.from("bottommenu").select("*");
  if (error) {
    throw error;
  }

  return data;
}















