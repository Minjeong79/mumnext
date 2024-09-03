"use client";
import { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginState, writePickState } from "@/app/recoil/selectors";
import {
  dateFunc,
  fetchDiaryData,
  fetchDiaryNoIcons,
  supabase,
} from "@/lib/db";
import { customAlphabet } from "nanoid";
import { usePathname, useRouter } from "next/navigation";
import { DataType, IconType } from "@/lib/typs";
import Deditwritebottomicon from "./Dediticon";

export default function EditWriteDiary() {
  //수정 id
  const pathname = usePathname();
  const pathId = Number(pathname.split("/")[4]);

  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const [value, setValue] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");
  const [data, setData] = useState<DataType[] | null>([]);
  const [dataIcons, setDataIcons] = useState<IconType[]>([]);
  const pickWIcon = useRecoilValue(writePickState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("zwritedb")
      .update([
        {
          id: pathId,
          uuid: dataUid,
          content: textValue,
        },
      ])
      .eq('id', pathId)
      .select("*");
    router.push("/main/diary");
    if (error) {
      throw error;
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/main/diary");
  };
  useEffect(() => {
    const newArr = Object.values(pickWIcon);
    const setArr = new Set(newArr);
    setValue(Array.from(setArr));
  }, [pickWIcon]);

  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData();
        setData(fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleAllData();
  }, []);
  useEffect(() => {}, [dataIcons]);
  return (
    <div>
      <h3>날짜fffffffffff</h3>
      {data?.map((item) =>
      
        item.id === pathId ? (
          <form onSubmit={handleSubmit} key={item.id}>
            {/* <Suspense fallback={<p>로딩중...</p>}> */}
            <Deditwritebottomicon pathId={pathId} />
            {/* </Suspense> */}

            <textarea
              name="content"
              className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
              defaultValue={item.content}
              onChange={(e) => setTextValue(e.target.value)}
              required
            ></textarea>
            <button type="submit">등록999</button>
            <button type="button" onClick={handelCancle}>
              취소
            </button>
          </form>
        ) : null
      )}
    </div>
  );
}
