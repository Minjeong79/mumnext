import SettingCommentList from "@/components/setting/commentList";
import UserDeletePage from "@/components/setting/UserDelete";
import UserMainImgPage from "@/components/setting/UserMainimg";
import Link from "next/link";

export default async function SettingPage() {
  return (
    <div className="pt-9 flex flex-col justify-between  items-center h-[500px]">
      <div className="">
        <UserMainImgPage />
        <Link
          href="/setting/profile"
          className="mt-1.5 block p-1.5 px-7 bg-orange-600 text-white rounded-lg text-base"
        >
          프로필 편집
        </Link>
      </div>
      <SettingCommentList />

      <UserDeletePage />
    </div>
  );
}
