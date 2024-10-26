"use client";
import { LoginState } from "@/app/recoil/selectors";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function CommentEdit({
  mainId,
  content,
  onEditComplete,
}: {
  mainId: number;
  content: string;
  onEditComplete: () => void;
}) {
  const [textValue, setTextValue] = useState("");

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      mainid: mainId,
      content: textValue,
    };
    try {
      fetch("/api/comment-edit", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });
      onEditComplete();
      setTextValue("");
    } catch (error) {}
  };

  return (
    <form onSubmit={handleComment} className="border">
      <div className="flex gap-2.5">
        <textarea
          name="content"
          className="resize-none w-full p-2 outline-none rounded-md"
          defaultValue={content}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="내용을 입력해주세요"
          maxLength={50}
          required
        ></textarea>
        <div className="flex flex-col">
          <button
            type="submit"
            className="w-16 py-1 px-4 bg-orange-600 text-white text-base"
          >
            등록
          </button>
          <button
            type="button"
            className="w-16 py-1 px-4 bg-neutral-400 text-white text-base"
            onClick={onEditComplete}
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}
