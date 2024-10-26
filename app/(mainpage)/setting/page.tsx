import SettingCommentList from "@/components/setting/commentList";
import UserDeletePage from "@/components/setting/UserDelete";
import UserMainImgPage from "@/components/setting/UserMainimg";
import Link from "next/link";

export default async function SettingPage() {
  return (
    <div className="">
      <div className="flex flex-col gap-y-2 items-center">
        <UserMainImgPage />
        <Link href="/setting/profile">프로필 편집</Link>
      </div>
      <div>
        <SettingCommentList />
      </div>

      <UserDeletePage />
    </div>
  );
}
