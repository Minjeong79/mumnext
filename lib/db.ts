import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export const WeatherURL =
  "https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst";

export const WeatherSERVICEKEY =
  "Y1TEjuVO5hEMU0yG1YY7J9dJvRQbv+87/sewOQKgQa9JnI2l9Xyj/Zm5gnvsy1Hu/BVCW3WofoTKePCW1ZTrkA==";

export const KakaoKey = "843e559943bc29af86f736a7f1d33577";

export const supabase = createClient();

//로그인 uid 값 가져 오기
export async function LoginUserUid(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
export async function fetchWriteiconTop() {
  const { data, error } = await supabase.from("zdiarywriteimgtop").select("*");
  if (error) {
    throw error;
  }
  return data;
}
export async function fetchWriteiconBottom() {
  const { data, error } = await supabase
    .from("zdiarywriteimgbottom")
    .select("*");
  if (error) {
    throw error;
  }
  return data;
}

//날짜
export function dateFunc() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 06
  const day = today.getDate().toString().padStart(2, "0");
  const dateString = year + "." + month + "." + day;
  return dateString;
}
//일기 데이터 조회
export async function fetchDiaryData(uuid: string) {
  let { data, error } = await supabase
    .from("zwritedb")
    .select("*")
    .eq("uuid", uuid);
  if (error) {
    throw error;
  }
  return data;
}
//일기 데이터 날짜 조회
export async function fetchDiaryDate() {
  let { data, error } = await supabase.from("zwritedb").select("date");
  if (error) {
    throw error;
  }
  return data;
}
//일기 목록 아이콘
export async function fetchDiaryListIcons() {
  let { data, error } = await supabase.from("zlistimgdb").select("*");

  if (error) {
    throw error;
  }
  return data;
}
//일기 작성시 선택 하는 아이콘
export async function fetchDiaryNoIcons() {
  let { data, error } = await supabase.from("zdiarynowriteimg").select("*");

  if (error) {
    throw error;
  }
  return data;
}

//메인 이미지 조회
export async function fetchMainImg(uuid: string) {
  let { data, error } = await supabase
    .from("dogthemaname")
    .select("*")
    .eq("uuid", uuid);
  if (error) {
    throw error;
  }
  return data;
}
export async function fetchUserMainImg(uuid: string) {
  let { data, error } = await supabase
    .from("dogthemaname")
    .select("mainimg")
    .eq("uuid", uuid);
  if (error) {
    throw error;
  }
  return data;
}

//스토리 메인이미지 url
export async function fetchMainStroageImg(url: string): Promise<string> {
  const { data } = supabase.storage.from("profileimg").getPublicUrl(url);
  return data.publicUrl;
}

//스토리지 이미지 url
export async function fetchStroageImg(url: string): Promise<string> {
  const { data } = supabase.storage.from("communityimg").getPublicUrl(url);
  return data.publicUrl;
}

//커뮤니티 테이블 이미지
export async function fetchCommunityImg() {
  let { data, error } = await supabase.from("community").select("imgurl");

  if (error) {
    throw error;
  }
  return data;
}

//커뮤니티 데이터 조회
export async function fetchCommunityData() {
  let { data, error } = await supabase.from("community").select("*");
  if (error) {
    throw error;
  }
  return data;
}

//커뮤니티 상세페이지 조회
export async function fetchCommunityDataDetail(id: number) {
  let { data, error } = await supabase
    .from("community")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

//커뮤니티 유저 데이터 조회
export async function fetchCommunityUserData(uuid: string) {
  let { data, error } = await supabase
    .from("community")
    .select("*")
    .eq("uuid", uuid);
  if (error) {
    throw error;
  }
  return data;
}

//커뮤니티 댓글 조회
export async function fetchCommentData(id: number) {
  let { data, error } = await supabase
    .from("communitycomment")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}
//커뮤니티 유저 댓글 조회
export async function fetchCommentUserData(uuid: string) {
  let { data, error } = await supabase
    .from("communitycomment")
    .select("*")
    .eq("uuid", uuid);
  if (error) {
    throw error;
  }
  return data;
}
//좋아요 전체 조회
export async function fetchAllLike(id: number) {
  let { data, error } = await supabase
    .from("communitylike")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

//좋아요 true만 조회
export async function fetchCommunityLike(id: number) {
  let { data, error } = await supabase
    .from("communitylike")
    .select("*")
    .eq("id", id)
    .eq("like", true);
  if (error) {
    throw error;
  }
  return data;
}

//유저 탈퇴
export const userDelete = async (uuid:string) => {
  const { data, error } = await supabase.auth.admin.deleteUser(uuid);
  if (error) {
    console.error('User deletion error:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};