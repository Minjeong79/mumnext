"use client";

import { useRouter } from "next/navigation";

export default function DeleteDiaryButton({ pathId }: { pathId: number }) {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/diary/write/${pathId}`);
  };

  const handleDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch("/api/delete-diary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: pathId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete record");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message); // 서버에서 보낸 메시지
          router.push("/diary");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="w-full flex gap-x-2 justify-center">
      <button
        className="p-1.5 px-5 bg-[#FD943F] text-white rounded-lg text-base"
        type="button"
        onClick={handleUpdate}
      >
        수정
      </button>
      <button
        className="p-1.5 px-5 bg-slate-400 text-white rounded-lg text-base"
        type="button"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
}
