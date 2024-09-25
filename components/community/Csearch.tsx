"use client";
import { CommunityType } from "@/lib/typs";
import CommunityList from "./Clist";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCommunityData } from "@/lib/db";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchCommunity({
  fetchDatas,
}: {
  fetchDatas: CommunityType[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dataCommunity, setDataCommunity] = useState<CommunityType[]>([]);
  const [searchData, setSearchData] =useState<CommunityType[]>([]);
  
  const handleSerch = () => {
    router.push(`/main/community?q=${search}`)
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
  console.log(searchData);
  return (
    <section>
      <div style={{ border: "1px solid #000" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button type="button" onClick={handleSerch}>
          검색
        </button>
      </div>
      {searchData.length > 0 ? (
        <ul>
          {searchData.map((item) => (
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
      ) : (
        <ul>
          {dataCommunity?.map((item) => (
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
      )}
    </section>
  );
}
