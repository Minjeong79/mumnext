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
import Deditwritebottomicon from "./DEditwritebottomicon";

export default function WriteEditDiary() {
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
    const walkTxt = value.filter((item) => item === "산책")[0] ?? "";
    const eatTxt = value.filter((item) => item === "밥")[0] ?? "";
    const pillTxt = value.filter((item) => item === "약")[0] ?? "";
    const hospitalTxt = value.filter((item) => item === "병원")[0] ?? "";
    const beautylTxt = value.filter((item) => item === "미용")[0] ?? "";

    const daydate = dateFunc();
    const { data, error } = await supabase
      .from("zwritedb")
      .update([
        {
          id: pathId,
          uuid: dataUid,
          eat: eatTxt,
          pill: pillTxt,
          hospital: hospitalTxt,
          beauty: beautylTxt,
          walkimg: walkTxt
            ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1.png"
            : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1-1.png",
          eatimg: eatTxt
            ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2.png"
            : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2-1.png",
          pillimg: pillTxt
            ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3.png"
            : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3-1.png",
          hospitalimg: hospitalTxt
            ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4.png"
            : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4-1.png",
          beautyimg: beautylTxt
            ? "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5.png"
            : "https://trtwwyqzkqlqebdiiujp.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5-1.png",
          content: textValue,
          date: daydate,
          walk: walkTxt,
        },
      ])
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
  console.log(pathId);
  console.log(data);
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
