import SearchCommunity from "@/components/community/Csearch";
import CommunityListSkeeleton from "@/components/skeleton/community-skeleton-list";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <section className="flex flex-col sm:justify-around sm:gap-y-7">
      <div className="w-full mt-14 mb-8 sm:m-0">
        <h3 className="text-xl text-center sm:p-9">커뮤니티</h3>
        <div className="w-full text-right">
          <Link
            className="p-2 px-5 mr-2.5 sm:px-6 bg-zinc-500 text-white rounded-lg text-base"
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
