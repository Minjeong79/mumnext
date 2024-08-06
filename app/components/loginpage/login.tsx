"use client";

import { LoginUserUid, supabase } from "@/lib/db";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUid } from "@/app/recoil/atom";
import { useRouter } from "next/navigation";
import { LoginState } from "@/app/recoil/selectors";
import { useEffect } from "react";
import { User } from '@supabase/supabase-js';

export default function LoginPage() {
  
  const [uid, setUid] = useRecoilState(loginUid);
  const dataUid = useRecoilValue(LoginState);
  useEffect(()=>{
    async function userUidFunc() {
      const loginUser:User | null = await LoginUserUid();
      if(loginUser){
        setUid(loginUser.id);
      }
      
    }
    userUidFunc();
  },[]);

console.log(dataUid);
  
  const router = useRouter();
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
 

  return <>
 
  <button onClick={signInWithKakao}>카카오 로그인</button>;</>
}
