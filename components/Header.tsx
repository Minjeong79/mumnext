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
    <header>
      {dataUid.uid ? (
        <button onClick={signOut}>로그아웃</button>
      ) : (
        <button>로그인</button>
      )}
    </header>
  );
}
