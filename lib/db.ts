import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';
export const WeatherURL =
"https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst";

export const WeatherSERVICEKEY =
"Y1TEjuVO5hEMU0yG1YY7J9dJvRQbv+87/sewOQKgQa9JnI2l9Xyj/Zm5gnvsy1Hu/BVCW3WofoTKePCW1ZTrkA==";

export const KakaoKey = "843e559943bc29af86f736a7f1d33577";

export const supabase = createClient();

//로그인 uid 값 가져 오기
export async function LoginUserUid(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

//로그인 첫 화면 강아지 이미지
export async function fetchDogImageUrl() {
  const { data } = await supabase.storage
    .from("img")
    .getPublicUrl("dogSelect/dog0.png");
  return data.publicUrl;
}
//강아지 선택
export async function fetchDogImgUrlList() {
  let { data, error } = await supabase.from("zdogimgdb").select("*");
  if (error) {
    throw error;
  }

  return data;
}

//테마 선택
export async function fetchThemaImgUrlList() {
  let { data, error } = await supabase.from("zdogthemaicon").select("*");
  if (error) {
    throw error;
  }

  return data;
}

//하단 메뉴
export async function fetchBottomMenu() {
  const { data, error } = await supabase.from("zbottommenu").select("*");
  if (error) {
    throw error;
  }

  return data;
}

//일기 작성 아이콘
export async function fetchWriteiconTop(){
  const { data, error } = await supabase.from("zdiarywriteimgtop").select("*");
  if (error) {
    throw error;
  }
  return data;
}
export async function fetchWriteiconBottom(){
  const { data, error } = await supabase.from("zdiarywriteimgbottom").select("*");
  if (error) {
    throw error;
  }
  return data;
}