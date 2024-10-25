"use client";
import { CommunityType } from "@/lib/typs";
import CommunityList from "./Clist";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCommunityData } from "@/lib/db";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchCommunity() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataCommunity, setDataCommunity] = useState<CommunityType[]>([]);
  const [searchData, setSearchData] = useState<CommunityType[]>([]);

  const handleSerch = () => {
    router.push(`/community?q=${search}`);
    try {
      fetch("/api/community-search-api", {
        method: "POST",
        body: JSON.stringify({ search: search }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("검색 하지 못 했습니다.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          setSearchData(data.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const data = await fetchCommunityData();
      if (data) {
        setDataCommunity(data);
      }
    };
    fetchDatas();
  }, []);
  return (
    <section className="w-10/12 mx-auto flex flex-col gap-y-6">
      <div className="w-2/3 mx-auto bg-white rounded-full h-10 overflow-hidden">
        <div className="flex items-center">
          <input
            className="h-10 outline-none w-full pl-3 "
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />

          <button type="button" onClick={handleSerch} className="pr-3">
            <Image
              src="https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/default/search.png"
              width={30}
              height={30}
              alt="검색 아이콘"
            />
          </button>
        </div>
      </div>
      {searchData.length > 0 ? (
        <div className="max-h-96 p-2.5 overflow-y-scroll mb-3">
          <ul className="flex flex-wrap gap-4 justify-center">
            {searchData.map((item) => (
              <li
                key={item.id}
                className="w-44 h-auto bg-white p-3.5 rounded-lg gap-4 h-full"
              >
                <Link href={`/community/${item.id}`} className="block">
                  <div className="w-full">
                    {item.imgurl ? (
                      <Image
                        src={item.imgurl}
                        layout="responsive"
                        width={100}
                        height={100}
                        alt="이미지"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="max-h-96 p-2.5 overflow-y-scroll mb-3">
          <ul className="flex flex-wrap gap-4 justify-center">
            {dataCommunity?.map((item) => (
              <li
                key={item.id}
                className="w-44 h-auto bg-white p-3.5 rounded-lg h-full"
              >
                <Link href={`/community/${item.id}`} className="block">
                  <div className="w-full">
                    {item.imgurl ? (
                      <Image
                        src={item.imgurl}
                        layout="responsive"
                        width={100}
                        height={100}
                        alt="이미지"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
