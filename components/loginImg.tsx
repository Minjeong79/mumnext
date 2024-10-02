import { fetchDogImageUrl } from "@/lib/db";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트는 dynamic을 통해 가져오기 (기본 export 자동 처리)
const PushNotificationManager = dynamic(() => import("./push/test"), { ssr: false });

export default async function LoginPageImg() {
  const fetcher = await fetchDogImageUrl();

  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.ts" />
      </Head>
     
      <PushNotificationManager />
      <Image src={fetcher} width={258} height={276} alt="강아지 이미지" />
    </div>
  );
}
