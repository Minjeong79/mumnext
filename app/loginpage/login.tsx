'use client';
import { LoginUserUid, supabase } from "@/lib/db";
import { useRecoilState,useSetRecoilState, useRecoilValue } from "recoil";
import { loginUid } from "@/app/recoil/atom";
import { useRouter } from "next/navigation";
import { LoginState } from "@/app/recoil/selectors";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
// import { useSession, SessionProvider } from 'next-auth/react';

export default function LoginPage() {
  const [uid, setUid] = useRecoilState(loginUid);
  const [value, setValue] = useState(false);
  const dataUid = useRecoilValue(LoginState);
  // const session = useSession();
  
  useEffect(() => {
    async function userUidFunc() {
      const loginUser: User | null = await LoginUserUid();
      if (loginUser) {
        setValue(true);
        localStorage.setItem('uid', loginUser.id);
        setUid(loginUser.id);
      }
    }
    userUidFunc();
  }, [uid]);

  useEffect(() => {
    const savedUid = localStorage.getItem('uid');
    if (savedUid) {
      setUid(savedUid);
    }
  }, [value]);
  
 
  async function signInWithKakao() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `https://trtwwyqzkqlqebdiiujp.supabase.co/auth/v1/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <section>

      {dataUid ? <Link href="/mcomponents/dogselect">강아지 선택하기</Link> : <button onClick={signInWithKakao}>카카오 로그인</button>}
      
    </section>
  );
}
