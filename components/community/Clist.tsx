import { fetchCommunityData } from "@/lib/db";
import { CommunityType } from "@/lib/typs";
import Image from "next/image";
import Link from "next/link";

export default async function CommunityList({
  fetchDatas,
}: {
  fetchDatas: CommunityType[];
}) {
  const data = await fetchCommunityData();

  return (
    <>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <Link href={`/main/community/${item.id}`}>
              {item.title}
              {item.imgurl ? <Image src={item.imgurl} width={100} height={100} alt="이미지" /> : <></>}
              
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
