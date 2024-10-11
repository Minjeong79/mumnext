'use client'

import { LoginState } from "@/app/recoil/selectors";
import { userDelete } from "@/lib/db";
import { useRecoilValue } from "recoil";

export default function UserDeletePage(){
    const dataUid = useRecoilValue(LoginState);
    
    const handleUserDelete = async()=>{
        await userDelete(dataUid.uid);
    }
    
    
    return <button onClick={handleUserDelete}>탈퇴 하기</button>
}