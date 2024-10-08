import SettingCommentList from "@/components/setting/commentList";
import Link from "next/link";

export default function SettingPage(){
    return <>
        <div>
            플필 이미지
            <Link href="/main/setting/profile">프로필 편집</Link>
        </div>
        <div>
            
            <SettingCommentList/>
        </div>
       
        <button>탈퇴 하기</button>
    </>
}