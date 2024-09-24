import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import Image from "next/image";
import Link from "next/link";
import SearchCommunity from "./Csearch";

export default async function CommunityList({
  fetchDatas,
  search,
}: {
  fetchDatas: CommunityType[];
  search?: string | undefined;
}) {
  const data = await fetchCommunityData();

  return (
    <>
      <SearchCommunity search={search} />
      <ul>
        {data?.map((item) => (
          <li key={item.id} style={{ background: "#999", margin: "10px" }}>
            <Link href={`/main/community/${item.id}`}>
              {item.title}
              {item.imgurl ? (
                <Image
                  src={item.imgurl}
                  width={100}
                  height={100}
                  alt="이미지"
                />
              ) : (
                <></>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
