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
    <form onSubmit={handleComment} style={{ border: "1px solid #999" }}>
      <textarea
        name="content"
        defaultValue={content}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder="내용을 입력해주세요"
        required
      ></textarea>
      <button type="submit">등록</button>
      <button type="button" onClick={onEditComplete}>
        취소
      </button>
    </form>
  );
}
