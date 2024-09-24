import CommunityList from "@/components/community/Clist";
import SearchCommunity from "@/components/community/Csearch";
import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const fetchDatas: CommunityType[] = (await fetchCommunityData()) ?? [];
  return (
    <>
      <h3>커뮤니티</h3>
      <br />
      {searchParams.q}
      <br />
      <br />
      <CommunityList fetchDatas={fetchDatas} />
      <Link href="/main/community/write">작성</Link>
    </>
  );
}
