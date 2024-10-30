import SearchCommunity from "@/components/community/Csearch";
import CommunityListSkeeleton from "@/components/skeleton/community-skeleton-list";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <section className="flex flex-col justify-around gap-y-7">
      <div>
        <h3 className="text-xl text-center p-9">커뮤니티</h3>
        <div className="w-full text-right">
          <Link
            className="p-1.5 px-5 bg-slate-600 text-white rounded-lg text-base"
            href="/community/write"
          >
            작성
          </Link>
        </div>
      </div>
      <Suspense
        fallback={
          <>
            <CommunityListSkeeleton />
          </>
        }
      >
        <SearchCommunity />
      </Suspense>
    </section>
  );
}
