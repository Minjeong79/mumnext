import DiaryDetailPage from "@/components/diary/DiaryDetailPage";
import DiaryPageSkeeleton from "@/components/skeleton/diary-skeleton-page";
import { Suspense } from "react";

export default function DiaryPage() {
  return (
    <>
      <Suspense
        fallback={
          <>
            <DiaryPageSkeeleton />
          </>
        }
      >
        <DiaryDetailPage />
      </Suspense>
    </>
  );
}
