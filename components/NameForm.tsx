"use client";
import { useRouter } from "next/navigation";
import {
  LoginState,
  dogSelectState,
  themaSelectState,
} from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import { supabase } from "@/lib/db";
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const dogPick = useRecoilValue(dogSelectState);
  const themaPick = useRecoilValue(themaSelectState);
  const dataUid = useRecoilValue(LoginState);
  const router = useRouter();

  console.log(dataUid.uid);
  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("dogthemaname").insert([
        {
          uuid: dataUid.uid,
          dog: `https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/dogSelect/${dogPick}.png`,
          thema: `https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/dogThemaBg/${themaPick}.png`,
          name: name,
        },
      ]);

      if (error) {
        throw error;
      }

      router.push("/main");
      return data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="sm:w-1/2 mx-auto">
      <form onSubmit={handleSumit} className="flex gap-x-3">
        <input
          className="w-44 sm:w-full h-12 rounded-lg FD943F pl-2"
          type="text"
          name="textname"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-[#FD943F] text-white w-20 sm:w-28 h-12"
        >
          등록
        </button>
      </form>
    </div>
  );
}
