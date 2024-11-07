"use client";
import { loginUid } from "@/app/recoil/atom";
import { LoginState } from "@/app/recoil/selectors";
import { supabase } from "@/lib/db";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

export default function HeaderPage() {
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  const [uid, setUid] = useRecoilState(loginUid);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    sessionStorage.removeItem("user");
    router.push("/");
    setUid({ uid: "", fullName: "" });

    if (error) {
      throw error;
    }
  }

  const handlelogin = () => {
    router.push("/");
  };
  return (
    <div className="text-right">
      {dataUid.uid ? (
        <button
          onClick={signOut}
          className="bg-white rounded-lg text-xs p-1 m-2.5"
        >
          로그아웃
        </button>
      ) : (
        <button
          className="bg-white rounded-lg text-xs p-1 m-2.5"
          onClick={handlelogin}
        >
          로그인
        </button>
      )}
    </div>
  );
}
