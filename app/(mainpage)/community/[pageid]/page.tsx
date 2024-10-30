import CommunityPage from "@/components/community/Cpage";
import CommunityPageSkeeleton from "@/components/skeleton/community-skeleton-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense
        fallback={
          <>
            <CommunityPageSkeeleton />
          </>
        }
      >
        <CommunityPage />
      </Suspense>
    </>
  );
}
