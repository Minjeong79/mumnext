"use client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginState, writePickState } from "@/app/recoil/selectors";
import { fetchDiaryData } from "@/lib/db";
import { usePathname, useRouter } from "next/navigation";
import { DataType, IconType } from "@/lib/typs";
import Deditwritebottomicon from "./Dediticon";

export default function EditWriteDiary() {
  const pathname = usePathname();
  const pathId = Number(pathname.split("/")[3]);

  const router = useRouter();
  const dataUid = useRecoilValue(LoginState);
  const [value, setValue] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");
  const [data, setData] = useState<DataType[] | null>([]);
  const [dataIcons, setDataIcons] = useState<IconType[]>([]);
  const pickWIcon = useRecoilValue(writePickState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.confirm("등록 할래 멈?");
    const requestBody = {
      id: pathId,
      content: textValue,
    };
    try {
      fetch("/api/diary-edit-api", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });
      router.push("/diary");
    } catch (error) {
      console.error("수정 못 함:", error);
    }
  };

  const handelCancle = () => {
    window.confirm("작성 취소 멈?");
    router.push("/diary");
  };
  useEffect(() => {
    const newArr = Object.values(pickWIcon);
    const setArr = new Set(newArr);
    setValue(Array.from(setArr));
  }, [pickWIcon]);

  useEffect(() => {
    const handleAllData = async () => {
      try {
        const fetchData = await fetchDiaryData(dataUid.uid);
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
      {data!.map((item) =>
        item.id === pathId ? (
          <form
            onSubmit={handleSubmit}
            key={item.id}
            className="flex flex-col gap-y-6"
          >
            {/* <Suspense fallback={<p>로딩중...</p>}> */}
            <Deditwritebottomicon pathId={pathId} />
            {/* </Suspense> */}

            <textarea
              name="content"
              className="resize-none border border-[#F5BB8C] w-full h-56 p-2.5 bg-transparent outline-none rounded-md"
              defaultValue={item.content}
              onChange={(e) => setTextValue(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-center gap-x-2">
              <button
                type="submit"
                className="p-1.5 px-5 bg-[#FD943F] text-white rounded-lg text-base"
              >
                등록
              </button>
              <button
                type="button"
                className="p-1.5 px-5 bg-slate-400 text-white rounded-lg text-base"
                onClick={handelCancle}
              >
                취소
              </button>
            </div>
          </form>
        ) : null
      )}
    </div>
  );
}
