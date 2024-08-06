import { fetchDogImageUrl } from "@/lib/db";

export default async function LoginPageImg() {
  const fetcher = await fetchDogImageUrl();

  return (
    <div>
      <img src={fetcher} alt="강아지 이미지" />
      
    </div>
  );
}
