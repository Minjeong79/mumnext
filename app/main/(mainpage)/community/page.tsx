import CommunityList from "@/components/community/Clist";
import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import Link from "next/link";

export default async function Page() {
  const fetchDatas: CommunityType[] = (await fetchCommunityData()) ?? [];

  return (
    <>
      <h3>커뮤니티</h3>
      <br />
      <Link href="/main/community/write">작성</Link>
      <CommunityList fetchDatas={fetchDatas} />
    </>
  );
}
