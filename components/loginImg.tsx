import { fetchDogImageUrl } from "@/lib/db";
import Image from "next/image";
import Head from "next/head";
export default async function LoginPageImg() {
  const fetcher = await fetchDogImageUrl();

  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Image src={fetcher} width={258} height={276} alt="강아지 이미지" />
    </div>
  );
}
