import SettingCommentList from "@/components/setting/commentList";
import UserDeletePage from "@/components/setting/UserDelete";
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
       
       <UserDeletePage/>
    </>
}