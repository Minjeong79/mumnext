"use client";
import { fetchMainImg, LoginUserUid, supabase } from "@/lib/db";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUid } from "@/app/recoil/atom";
import { useRouter } from "next/navigation";
import { LoginState } from "@/app/recoil/selectors";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [uid, setUid] = useRecoilState(loginUid);
  const [value, setValue] = useState(false);
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  // const session = useSession();

  useEffect(() => {
    async function userUidFunc() {
      const loginUser: User | null = await LoginUserUid();
      const fullName = loginUser?.user_metadata.full_name;
      if (loginUser) {
        setValue(true);
        const userInfo = { uid: loginUser.id, fullName };
        sessionStorage.setItem("user", JSON.stringify(userInfo));
        setUid(userInfo);
      }
      console.log(fullName);
    }
    
    userUidFunc();
  }, [setUid]);

  useEffect(() => {
    const savedUid = localStorage.getItem("user");
    if (dataUid && savedUid) {
      async function fetchData() {
        const data = await fetchMainImg(dataUid.uid);

        const dataFind = data?.find((item) => item.uuid === dataUid.uid);
        if (dataFind) {
          router.push("/main");
        }
      }
      fetchData();
    } else {
      console.log("새로운 유저");
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

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `https://trtwwyqzkqlqebdiiujp.supabase.co/auth/v1/callback`,
      },
    })
  }


  useEffect(() => {}, []);
  return (
    <div className="mx-auto">
      {dataUid.uid ? (
        <div>
          <Link
            href="/dogselect"
            className="bg-white w-72 h-10 rounded-lg p-4 px-5"
          >
            강아지 선택하기
          </Link>
        </div>
      ) : (
        <div>

        <button
          onClick={signInWithKakao}
          className="w-72 h-10 rounded-lg flex justify-center items-center gap-2 p-2 bg-[#F5E14B]"
        >
          <Image
            src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/kakao-icon.png"
            width={16}
            height={16}
            alt="카카오 아이콘"
          />
          카카오 로그인
        </button>
       
        </div>
      )}
    </div>
  );
}
