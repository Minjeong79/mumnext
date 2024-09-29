"use client";
import { LoginState } from "@/app/recoil/selectors";
import { supabase } from "@/lib/db";
import { useRecoilValue } from "recoil";

export default function HeaderPage() {
  const dataUid = useRecoilValue(LoginState);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("user");
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
