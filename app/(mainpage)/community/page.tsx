import SearchCommunity from "@/components/community/Csearch";
import Link from "next/link";

export default async function Page() {
  return (
    <section className="flex flex-col justify-around gap-y-7">
      <div>
        <h3 className="text-xl text-center p-9">커뮤니티</h3>
        <div className="w-full text-right">
          <Link
            className="p-2 px-6 bg-zinc-500 text-white rounded-lg text-base"
            href="/community/write"
          >
            작성
          </Link>
        </div>
      </div>

      <SearchCommunity />
    </section>
  );
}
