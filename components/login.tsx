"use client";
import { fetchMainImg, LoginUserUid, supabase } from "@/lib/db";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { loginUid } from "@/app/recoil/atom";
import { useRouter } from "next/navigation";
import { LoginState } from "@/app/recoil/selectors";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { MainType } from "@/lib/typs";

export default function LoginPage() {
  const [uid, setUid] = useRecoilState(loginUid);
  const [value, setValue] = useState(false);
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();
  // const session = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("메인으로 가기1111");
        const data = await fetchMainImg(dataUid.uid);

        const dataFind = data?.find((item) => item.uuid === dataUid.uid);
        console.log(`${dataFind} 여긴 uid`);
        if (dataFind) {
          router.push("/main");
          console.log("메인으로 가기222222222");
        } else {
          console.log("새로운 유저");
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }
    fetchData();
  }, [setUid]);

  useEffect(() => {
    const savedUid = localStorage.getItem("user");
    if (dataUid && savedUid) {
      async function fetchData() {
        console.log("메인으로 가기1111");
        const data = await fetchMainImg(dataUid.uid);

        const dataFind = data?.find((item) => item.uuid === dataUid.uid);
        console.log(dataFind);
        if (dataFind) {
          router.push("/main");
          console.log("메인으로 가기222222222");
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

  useEffect(() => {}, []);
  return (
    <div className=" mt-6 mx-auto">
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
        <button
          onClick={signInWithKakao}
          className="bg-white w-72 h-10 rounded-lg"
        >
          카카오 로그인
        </button>
      )}
    </div>
  );
}
