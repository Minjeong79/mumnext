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
// import { useSession, SessionProvider } from 'next-auth/react';

export default function LoginPage() {
  const [uid, setUid] = useRecoilState(loginUid);
  const [value, setValue] = useState(false);
  const [data, setData] = useState<MainType[]>([]);
  const dataUid = useRecoilValue(LoginState);

  // const session = useSession();

  useEffect(() => {
    async function userUidFunc() {
      const loginUser: User | null = await LoginUserUid();
      const fullName = loginUser?.user_metadata.full_name;
      if (loginUser) {
        setValue(true);
        const userInfo = { uid: loginUser.id, fullName };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUid(userInfo);
      }
    }
    userUidFunc();
  }, [setUid]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMainImg(dataUid.uid);
      if (data) {
        setData(data);
      }
    }
    fetchData();
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

  console.log(data);
  return (
    <section>
      <div>
        {dataUid.uid ? (
          <div>
            <Link href="/dogselect">강아지 선택하기</Link>

            <div>
              {data.map((item) => (
                <div>
                  {item.uuid === dataUid.uid ? (
                    <div> 만든게 있어요</div>
                  ) : (
                    <div> 만든게 없어요</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button onClick={signInWithKakao}>카카오 로그인</button>
        )}
      </div>
    </section>
  );
}
