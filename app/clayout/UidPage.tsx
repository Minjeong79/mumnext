"use client";
import { useEffect } from "react";
import { loginUid } from "../recoil/atom";
import { useRecoilState } from "recoil";

export default function InitializeUidState() {
  const [uid, setUid] = useRecoilState(loginUid);

  useEffect(() => {
    const savedUid = localStorage.getItem("user");
    if (savedUid) {
      const parsedUid = JSON.parse(savedUid);
      setUid(parsedUid);
    }
  }, [setUid]);
  return null;
}
