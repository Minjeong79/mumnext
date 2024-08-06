"use client";
import { useRouter } from "next/navigation";
import { dogSelectState, themaSelectState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import { supabase } from "@/lib/db";
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const dogPick = useRecoilValue(dogSelectState);
  const themaPick = useRecoilValue(themaSelectState);
  const router = useRouter();

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("dogthemaname").insert([
        {
          uuid: "user5",
          dog: `https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/dogSelect/${dogPick}.png`,
          thema: `https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/dogSelect/${themaPick}.png`,
          name: name,
        },
      ]);

      if (error) {
        throw error;
      }

      router.push("/mcomponents/themaselect/main");
      return data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <form onSubmit={handleSumit}>
        <input
          type="text"
          name="textname"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
