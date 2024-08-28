import { fetchDogImageUrl } from "@/lib/db";
import Image from "next/image";

export default async function LoginPageImg() {
  const fetcher = await fetchDogImageUrl();

  return (
    <div>
      <Image src={fetcher} width={258} height={276} alt="강아지 이미지" />
      
    </div>
  );
}
