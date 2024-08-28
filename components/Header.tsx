'use client'
import { LoginState } from "@/app/recoil/selectors";
import { supabase } from "@/lib/db";
import { useRecoilValue } from "recoil"

export default function HeaderPage(){
    const dataUid = useRecoilValue(LoginState);
    
    async function signOut() {
        const { error } = await supabase.auth.signOut()
      }
return <header>
    {dataUid ? <button onClick={signOut}>로그아웃</button> : <button>로그인</button>}
    </header>
}