import { fetchWriteiconTop } from "@/lib/db";
export default async function DwriteTopicon() {
  const fetcher = await fetchWriteiconTop();
console.log(fetcher);
  return (
    <ul>
      {fetcher.map((item, index) => (
        <li key={index}>
           <img src={item.imgurl} alt="이미지" />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
