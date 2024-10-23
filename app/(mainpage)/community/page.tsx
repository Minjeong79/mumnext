import CommunityList from "@/components/community/Clist";
import SearchCommunity from "@/components/community/Csearch";
import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import Link from "next/link";

export default async function Page() {
  const fetchDatas: CommunityType[] = (await fetchCommunityData()) ?? [];
  return (
    <>
      <h3>커뮤니티</h3>
      <br />
      <SearchCommunity fetchDatas={fetchDatas} />
      <br />
      <br />
      <Link href="/main/community/write">작성</Link>
    </>
  );
}
