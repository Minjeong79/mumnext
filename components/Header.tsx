"use client";
import { loginUid } from "@/app/recoil/atom";
import { LoginState } from "@/app/recoil/selectors";
import { supabase } from "@/lib/db";
import { useRecoilState, useRecoilValue } from "recoil";

export default function HeaderPage() {
  const dataUid = useRecoilValue(LoginState);
  const [uid, setUid] = useRecoilState(loginUid);
 
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("user");
    setUid({uid:"", fullName:""});
    if (error) {
      throw error;
    }
  }
  return (
    <div className="text-right">
      {dataUid.uid ? (
        <button onClick={signOut} className="bg-white rounded-lg text-xs p-1 ">로그아웃</button>
      ) : (
        <button className="bg-white rounded-lg text-xs p-1 ">로그인</button>
      )}
    </div>
  );
}
