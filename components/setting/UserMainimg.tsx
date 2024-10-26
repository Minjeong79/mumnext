"use client";
import { useEffect, useState } from "react";
import { LoginState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import { fetchMainImg, fetchUserMainImg } from "@/lib/db";
import { MainType } from "@/lib/typs";
import Image from "next/image";

export default function UserMainImgPage() {
  const dataUid = useRecoilValue(LoginState);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchDat = async () => {
      const data = await fetchUserMainImg(dataUid.uid);
      console.log();
      if (data) {
        setUrl(data[0].mainimg);
      }
    };
    fetchDat();
  }, []);
  console.log(url);
  return (
    <div>
      <Image src={url} width={140} height={140} alt="유저 프로필" />
    </div>
  );
}
