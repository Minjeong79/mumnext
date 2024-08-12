import { fetchWriteiconTop } from "@/lib/db";

interface ImgType {
  id: number;
  name: string;
  imgurl: string;
  imgurlO: string;
}

export default async function DwriteTopicon() {
  const data: ImgType[] = await fetchWriteiconTop();

  return (
    <ul>
      {data.map((item: ImgType) => (
        <li key={item.id}>
          <img src={item.imgurl} alt={item.name} />
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );
}
