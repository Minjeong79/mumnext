import { fetchWriteiconBottom } from "@/lib/db";

interface ImgType {
  id: number;
  name: string;
  imgurl: string;
}
export default async function Dwritebottomicon() {
  const data: ImgType[] = await fetchWriteiconBottom();

  return (
    <ul style={{ display: "flex" }}>
      {data.map((item: ImgType) => (
        <li key={item.id}>
          <img src={item.imgurl} alt={item.name} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
