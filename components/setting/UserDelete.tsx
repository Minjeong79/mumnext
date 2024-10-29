'use client'

import { LoginState } from "@/app/recoil/selectors";
import { userDelete } from "@/lib/db";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
export default function UserDeletePage(){
    const dataUid = useRecoilValue(LoginState);
    const router = useRouter();

    const handleUserDelete = async () => {
        if (window.confirm("잘가 멈!")) {
          const result = await userDelete(dataUid.uid);
          if (result.success) {
            alert('사용자가 삭제되었습니다.');
            router.push("/"); 
          } else {
            alert(`삭제 실패: ${result.error}`);
          }
        }
      };
    
    return <button className="mt-1.5 block p-1.5 px-6 bg-slate-500 text-white rounded-lg text-base" onClick={handleUserDelete}>탈퇴 하기</button>
}